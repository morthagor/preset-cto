import React, { useEffect } from 'react';
import { View, StatusBar, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import Toast from 'react-native-toast-message';
import { store } from './src/store';
import { RootNavigator } from './src/navigation/RootNavigator';
import { SyncService } from './src/services/SyncService';
import { useAppDispatch } from './src/store';
import useWebStyles from './src/hooks/useWebStyles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

const AppContent: React.FC = () => {
  const dispatch = useAppDispatch();
  useWebStyles();

  useEffect(() => {
    // Initialize sync service on app start
    SyncService.initialize(dispatch);

    // Listen for sync events
    const unsubscribe = SyncService.subscribeToSyncEvents((event) => {
      if (event.type === 'sync_complete') {
        Toast.show({
          type: 'success',
          text1: 'Sincronização concluída',
        });
      } else if (event.type === 'sync_error') {
        Toast.show({
          type: 'error',
          text1: 'Erro na sincronização',
          text2: event.message,
        });
      }
    });

    return unsubscribe;
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
      <Toast />
    </View>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}
