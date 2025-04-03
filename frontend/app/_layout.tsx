import { Stack, useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import 'react-native-gesture-handler';
import { Provider, useSelector } from 'react-redux';
import store, { RootState } from './store'; // Import the Redux store and RootState type

export default function RootLayout() {
  return (
    <Provider store={store}>
      <LayoutWithRole />
    </Provider>
  );
}

function LayoutWithRole() {
  const router = useRouter();

  // Access the user's role and authentication status from the Redux store
  const role = useSelector((state: RootState) => state.user.role);
  const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/');
    } else if (role === 'admin') {
      router.replace('/adminScreens'); // Redirect to admin layout
    } else if (role === 'user') {
      router.replace('/mainScreens'); // Redirect to main layout
    }
  }, [role, isAuthenticated]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ title: 'Home' }} />
      <Stack.Screen name="authScreens/login" options={{ title: 'Login' }} />
      <Stack.Screen name="authScreens/signup" options={{ title: 'Signup' }} />
      <Stack.Screen name="authScreens/forgotPassword" options={{ title: 'Forgot Password' }} />
      <Stack.Screen name="mainScreens" />
      <Stack.Screen name="adminScreens" />
    </Stack>
  );
}