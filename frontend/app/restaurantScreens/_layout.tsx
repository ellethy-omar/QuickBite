import React from 'react';
import { Tabs } from 'expo-router';
import { IconSymbol } from '@/components/ui/IconSymbol';
import colors from '@/app/styles/colors';

export default function RestaurantLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size, focused }) => {
          let iconName: string = 'fork.knife';

          switch (route.name) {
            case 'dashboard':
              iconName = focused ? 'house.fill' : 'house.fill';
              break;
            case 'orders':
              iconName = focused ? 'paperplane.fill' : 'paperplane.fill';
              break;
            case 'settings':
              iconName = focused ? 'chevron.left.forwardslash.chevron.right' : 'chevron.left.forwardslash.chevron.right';
              break;
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
          fontSize: 11,
          fontWeight: '600',
          marginBottom: 5,
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
