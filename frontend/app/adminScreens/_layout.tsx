// filepath: d:\Projects\quickbite\QuickBite\frontend\app\mainScreens\adminScreens\_layout.tsx
import React from 'react';
import { Tabs } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { IconSymbol, IconSymbolName } from '@/components/ui/IconSymbol';
import colors from '@/app/styles/colors';
import 'react-native-gesture-handler';

export default function AdminScreensLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Tabs
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => {
            let iconName: IconSymbolName = 'person';
            if (route.name === 'dashboard') {
              iconName = focused ? 'house.fill' : 'house';
            } else if (route.name === 'manageBusiness') {
              iconName = focused ? 'briefcase.fill' : 'briefcase';
            }
            return <IconSymbol name={iconName} size={size} color={color} />;
          },
          tabBarStyle: {
            backgroundColor: colors.background,
            borderTopWidth: 1,
            borderColor: colors.secondary,
            height: 80,
          },
          tabBarLabelStyle: {
            fontSize: 10,
            fontWeight: '700',
          },
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tabs.Screen name="manageBusiness" options={{ title: 'Manage Business' }} />
        <Tabs.Screen name="dashboard" options={{ title: 'Dashboard' }} />
      </Tabs>
    </GestureHandlerRootView>
  );
}