import { Stack } from 'expo-router';
import React from 'react';

export default function ROrdersLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerTitle: 'Orders',
      }}
    />
  );
}