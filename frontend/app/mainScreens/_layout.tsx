import React from 'react';
import { Tabs } from 'expo-router';
import { IconSymbol, IconSymbolName } from '@/components/ui/IconSymbol';
import colors from '@/app/styles/colors';

export default function MainScreensLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size, focused }) => {
          let iconName: IconSymbolName = 'person';
          if (route.name === 'home') {
            iconName = focused ? 'house.fill' : 'house';
          } else if (route.name === 'settings') {
            iconName = focused ? 'gearshape.2.fill' : 'gearshape.2';
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
      <Tabs.Screen name="home" options={{ title: 'Home' }} />
      <Tabs.Screen name="orders" options={{ title: 'Orders', tabBarButton: () => null }} />
      <Tabs.Screen name="settings" options={{ title: 'Settings' }} />
    </Tabs>
  );
}