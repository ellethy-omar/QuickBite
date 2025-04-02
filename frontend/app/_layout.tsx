import { Stack } from 'expo-router';
import React from 'react';

export default function RootLayout() {
  return (
    <Stack screenOptions={{headerShown: false}}>
      <Stack.Screen name="index" options={{ title: 'main'}} />
      <Stack.Screen name="authScreens/login" options={{ title: 'Login' }} />
      <Stack.Screen name="authScreens/signup" options={{ title: 'Signup' }} />
      <Stack.Screen name="mainScreens" options={{ headerShown: false }} />
      {/* Add more screens as needed */}
    </Stack>
  );
}