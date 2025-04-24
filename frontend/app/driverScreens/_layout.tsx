import React from 'react';
import { Tabs } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { MaterialIcons } from '@expo/vector-icons';
import colors from '@/app/styles/colors';
import 'react-native-gesture-handler';

export default function DriverScreensLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Tabs
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => {
            let iconName = 'person';
            if (route.name === 'ordersView') {
              iconName = focused ? 'receipt-long' : 'home';
            } else if (route.name === 'profile') {
              iconName = focused ? 'person' : 'person-outline';
            }
            return <MaterialIcons name={iconName as keyof typeof MaterialIcons.glyphMap} size={size} color={color} />;
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
        <Tabs.Screen name="ordersView" options={{ title: 'Orders' }} />
      </Tabs>
    </GestureHandlerRootView>
  );
}