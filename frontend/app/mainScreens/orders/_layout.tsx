import React from 'react';
import { Stack } from 'expo-router';
import colors from '@/app/styles/colors';

export default function OrdersLayout() {
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
          title: "My Orders",
        }}
      />
      <Stack.Screen 
        name="[id]" 
        options={{
          title: "Order Details",
          headerBackTitle: "Orders"
        }}
      />
    </Stack>
  );
}