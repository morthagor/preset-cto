import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo, { NetInfoState } from '@react-native-community/netinfo';
import { apiClient } from './ApiClient';
import { setSyncStatus, setSyncedAt } from '../store/slices/syncSlice';

interface SyncQueueItem {
  id: string;
  entityId: string;
  operation: 'CREATE' | 'UPDATE' | 'DELETE';
  data: any;
  clientTimestamp: string;
  synced: boolean;
}

interface SyncEvent {
  type: 'sync_start' | 'sync_complete' | 'sync_error' | 'conflict_detected';
  message?: string;
  data?: any;
}

class SyncServiceClass {
  private syncQueue: Map<string, SyncQueueItem> = new Map();
  private isSyncing = false;
  private syncListeners: ((event: SyncEvent) => void)[] = [];
  private connectionListener: any = null;

  async initialize(dispatch: any) {
    // Load queue from storage
    await this.loadSyncQueue();

    // Setup connection listener
    this.connectionListener = NetInfo.addEventListener((state: NetInfoState) => {
      if (state.isConnected && state.isInternetReachable) {
        this.syncWithServer(dispatch).catch((err) => {
          console.error('Sync error:', err);
        });
      }
    });

    // Try initial sync
    const isConnected = await NetInfo.fetch();
    if (isConnected.isConnected && isConnected.isInternetReachable) {
      this.syncWithServer(dispatch).catch((err) => {
        console.error('Initial sync error:', err);
      });
    }
  }

  async syncWithServer(dispatch: any) {
    if (this.isSyncing) return;

    this.isSyncing = true;
    this.notifySyncEvent({ type: 'sync_start' });

    try {
      dispatch(setSyncStatus('syncing'));

      // Push local changes
      if (this.syncQueue.size > 0) {
        const changes = Array.from(this.syncQueue.values());
        const pushResult = await apiClient.syncPush(changes);

        // Handle conflicts
        if (pushResult.conflicts && pushResult.conflicts.length > 0) {
          this.handleConflicts(pushResult.conflicts);
          this.notifySyncEvent({ type: 'conflict_detected', data: pushResult.conflicts });
        }

        // Mark as synced
        for (const syncedId of pushResult.synced || []) {
          this.syncQueue.delete(syncedId);
        }

        await this.saveSyncQueue();
      }

      // Pull updates
      const lastSync = await AsyncStorage.getItem('last_sync_timestamp') || '2020-01-01T00:00:00Z';
      const pullResult = await apiClient.syncPull(lastSync);

      // Apply updates to local DB
      if (pullResult.updates && pullResult.updates.length > 0) {
        await this.applyRemoteUpdates(pullResult.updates);
      }

      // Update last sync time
      await AsyncStorage.setItem('last_sync_timestamp', new Date().toISOString());

      dispatch(setSyncStatus('idle'));
      dispatch(setSyncedAt(new Date().toISOString()));
      this.notifySyncEvent({ type: 'sync_complete' });
    } catch (error: any) {
      console.error('Sync failed:', error);
      dispatch(setSyncStatus('error'));
      this.notifySyncEvent({
        type: 'sync_error',
        message: error.message || 'Erro desconhecido na sincronização',
      });
    } finally {
      this.isSyncing = false;
    }
  }

  addToQueue(entityId: string, operation: 'CREATE' | 'UPDATE' | 'DELETE', data?: any) {
    const queueItem: SyncQueueItem = {
      id: `${entityId}-${operation}-${Date.now()}`,
      entityId,
      operation,
      data: data || {},
      clientTimestamp: new Date().toISOString(),
      synced: false,
    };

    this.syncQueue.set(queueItem.id, queueItem);
    this.saveSyncQueue().catch((err) => {
      console.error('Error saving sync queue:', err);
    });
  }

  private async loadSyncQueue() {
    try {
      const stored = await AsyncStorage.getItem('sync_queue');
      if (stored) {
        const items = JSON.parse(stored);
        items.forEach((item: SyncQueueItem) => {
          this.syncQueue.set(item.id, item);
        });
      }
    } catch (error) {
      console.error('Error loading sync queue:', error);
    }
  }

  private async saveSyncQueue() {
    try {
      const items = Array.from(this.syncQueue.values());
      await AsyncStorage.setItem('sync_queue', JSON.stringify(items));
    } catch (error) {
      console.error('Error saving sync queue:', error);
    }
  }

  private handleConflicts(conflicts: any[]) {
    // For now, server wins (last-write-wins)
    // In future, you can implement more sophisticated conflict resolution
    conflicts.forEach((conflict) => {
      console.warn(`Conflict detected for ${conflict.recordId}:`, conflict);
    });
  }

  private async applyRemoteUpdates(updates: any[]) {
    // Apply updates to local database
    // This would integrate with your WatermelonDB or local storage
    for (const update of updates) {
      console.log(`Applying update for ${update.id}`);
      // TODO: Update local DB
    }
  }

  subscribeToSyncEvents(listener: (event: SyncEvent) => void) {
    this.syncListeners.push(listener);
    return () => {
      this.syncListeners = this.syncListeners.filter((l) => l !== listener);
    };
  }

  private notifySyncEvent(event: SyncEvent) {
    this.syncListeners.forEach((listener) => listener(event));
  }

  destroy() {
    if (this.connectionListener) {
      this.connectionListener();
    }
  }
}

export const SyncService = new SyncServiceClass();
