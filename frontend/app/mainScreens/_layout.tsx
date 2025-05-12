import React from 'react';
import { Tabs } from 'expo-router';
import { IconSymbol, IconSymbolName } from '@/components/ui/IconSymbol';
import colors from '@/app/styles/colors';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import ChatBotBubble from '../components/chatBotBubble';

export default function MainScreensLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Tabs
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => {
            let iconName: IconSymbolName = 'person';
            if (route.name === 'home') {
              iconName = focused ? 'house.fill' : 'house.fill';
            } else if (route.name === 'settings') {
              iconName = focused ? 'chevron.left.forwardslash.chevron.right' : 'chevron.left.forwardslash.chevron.right';
            } else if (route.name === 'orders') {
              iconName = focused ? 'paperplane.fill' : 'paperplane.fill';
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
        <Tabs.Screen name="orders" options={{ title: 'Orders' }} />
        <Tabs.Screen name="settings" options={{ title: 'Settings' }} />
      </Tabs>
      <ChatBotBubble />
    </GestureHandlerRootView>
  );
}