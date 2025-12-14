import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useAppSelector } from '../store';
import { LoginScreen } from '../screens/LoginScreen';
import { TaskListScreen } from '../screens/TaskListScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TaskListStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name="TaskListHome" component={TaskListScreen} />
  </Stack.Navigator>
);

const ProfileStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name="ProfileHome" component={ProfileScreen} />
  </Stack.Navigator>
);

const MainTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarIcon: ({ focused, color, size }) => {
        let iconName = 'home';

        if (route.name === 'Tasks') {
          iconName = focused ? 'check-circle' : 'check-circle-outline';
        } else if (route.name === 'Profile') {
          iconName = focused ? 'account' : 'account-outline';
        }

        return <Icon name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: '#007AFF',
      tabBarInactiveTintColor: '#999',
    })}
  >
    <Tab.Screen
      name="Tasks"
      component={TaskListStack}
      options={{ title: 'Tarefas' }}
    />
    <Tab.Screen
      name="Profile"
      component={ProfileStack}
      options={{ title: 'Perfil' }}
    />
  </Tab.Navigator>
);

export const RootNavigator = () => {
  const token = useAppSelector((state) => state.auth.token);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {token ? (
        <Stack.Screen
          name="MainTabs"
          component={MainTabs}
          options={{
            animationEnabled: false,
          }}
        />
      ) : (
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            animationEnabled: false,
          }}
        />
      )}
    </Stack.Navigator>
  );
};
