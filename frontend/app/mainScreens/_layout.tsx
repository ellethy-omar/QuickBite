import React from 'react';
import { Tabs } from 'expo-router';
import { IconSymbol, IconSymbolName } from '@/components/ui/IconSymbol';

export default function MainScreensLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size, focused }) => {
          let iconName: IconSymbolName = 'person';

          if (route.name === 'home') {
            iconName = focused ? 'house.fill' : 'house';
          } else if (route.name === 'settings') {
            iconName = focused ? 'gearshape.2.fill' : 'gearshape.2';
          } else if (route.name === 'dashboard') {
            iconName = focused ? 'house.fill' : 'house';
          }

          return <IconSymbol name={iconName} size={size} color={color} />;
        },
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 0,
          height: 80,
        },
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '700',
        },
        tabBarActiveTintColor: '#576CD6',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tabs.Screen name="home" options={{ title: 'Home' }} />
      <Tabs.Screen name="settings" options={{ title: 'Settings' }} />
      <Tabs.Screen name="dashboard" options={{ title: 'Dashboard' }} />
    </Tabs>
  );
}