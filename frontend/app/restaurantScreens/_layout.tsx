import React from 'react';
import { Tabs } from 'expo-router';
import { IconSymbol, IconSymbolName } from '@/components/ui/IconSymbol';
import colors from '@/app/styles/colors';

export default function RestaurantScreensLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size, focused }) => {
          let iconName: IconSymbolName = 'fork.knife';
          if (route.name === 'dashboard') {
            iconName = focused ? 'list.bullet.rectangle.fill' : 'list.bullet.rectangle';
          } else if (route.name === 'settings') {
            iconName = focused ? 'gearshape.fill' : 'gearshape';
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
      <Tabs.Screen name="dashboard" options={{ title: 'Products' }} />
      <Tabs.Screen name="settings" options={{ title: 'Settings' }} />
    </Tabs>
  );
}
