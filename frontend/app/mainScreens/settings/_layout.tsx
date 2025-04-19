import { Stack } from 'expo-router';
import React from 'react';
import colors from '@/app/styles/colors';

export default function SettingsLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.background,
        },
        headerTintColor: colors.primary,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen 
        name="index" 
        options={{ 
          headerShown: false,
          title: "Settings"
        }}
      />
      <Stack.Screen 
        name="profile" 
        options={{ 
          headerTitle: "Profile Settings",
        }}
      />
      <Stack.Screen 
        name="account" 
        options={{ 
          headerTitle: "Account Settings",
        }}
      />
      <Stack.Screen 
        name="notifications" 
        options={{ 
          headerTitle: "Notification Settings",
        }}
      />
    </Stack>
  );
}