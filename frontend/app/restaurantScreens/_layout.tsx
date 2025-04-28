import React from 'react';
import { Tabs } from 'expo-router';
import { IconSymbol } from '@/components/ui/IconSymbol'; // ✅ Assuming you have the IconSymbol component
import colors from '@/app/styles/colors';

export default function RestaurantLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size, focused }) => {
          let iconName = 'fork.knife';
          if (route.name === 'dashboard') {
            iconName = focused ? 'rectangle.grid.2x2.fill' : 'rectangle.grid.2x2';
          } else if (route.name === 'orders') {
            iconName = focused ? 'cart.fill' : 'cart';
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
      <Tabs.Screen name="orders" options={{ title: 'Orders' }} />
      <Tabs.Screen name="settings" options={{ title: 'Settings' }} />
    </Tabs>
  );
}
