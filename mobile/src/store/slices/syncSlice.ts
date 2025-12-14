import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SyncState {
  status: 'idle' | 'syncing' | 'error';
  lastSyncedAt: string | null;
  pendingChanges: number;
  error: string | null;
}

const initialState: SyncState = {
  status: 'idle',
  lastSyncedAt: null,
  pendingChanges: 0,
  error: null,
};

const syncSlice = createSlice({
  name: 'sync',
  initialState,
  reducers: {
    setSyncStatus: (state, action: PayloadAction<'idle' | 'syncing' | 'error'>) => {
      state.status = action.payload;
    },
    setSyncedAt: (state, action: PayloadAction<string>) => {
      state.lastSyncedAt = action.payload;
      state.error = null;
    },
    setPendingChanges: (state, action: PayloadAction<number>) => {
      state.pendingChanges = action.payload;
    },
    setSyncError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setSyncStatus, setSyncedAt, setPendingChanges, setSyncError } = syncSlice.actions;
export default syncSlice.reducer;
