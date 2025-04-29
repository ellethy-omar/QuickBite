import { Stack } from 'expo-router';
import React from 'react';
import 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import store from './store';
import { NotificationProvider } from './context/notificationContext';

export default function RootLayout() {
  return (
    <Provider store={store}>
      <NotificationProvider>
        <LayoutWithRole />
      </NotificationProvider>
    </Provider>
  );
}

function LayoutWithRole() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ title: 'Home' }} />
      <Stack.Screen name="authScreens/login" options={{ title: 'Login' }} />
      <Stack.Screen name="authScreens/signup" options={{ title: 'Signup' }} />
      <Stack.Screen name="authScreens/forgotPassword" options={{ title: 'Forgot Password' }} />
      <Stack.Screen name="mainScreens" />
      <Stack.Screen name="adminScreens" />
      <Stack.Screen name="driverScreens" />
    </Stack>
  );
}