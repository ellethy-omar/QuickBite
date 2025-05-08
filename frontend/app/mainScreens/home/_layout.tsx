import React from 'react';
import { Stack } from 'expo-router';
import colors from '@/app/styles/colors';

export default function HomeLayout() {
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
          title: "Restaurants", // ✅ Home screen title
        }}
      />
      <Stack.Screen 
        name="[id]" 
        options={{
          title: "Restaurant Details", // ✅ When clicking on a restaurant
          headerBackTitle: "Restaurants", // ✅ Back button text
        }}
      />
    </Stack>
  );
}
