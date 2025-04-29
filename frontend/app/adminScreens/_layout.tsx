import React from 'react';
import { Tabs } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import colors from '@/app/styles/colors';
import 'react-native-gesture-handler';
import { MaterialIcons } from '@expo/vector-icons';
import Ionicons from '@expo/vector-icons/Ionicons'; // Import Ionicons

export default function AdminScreensLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Tabs
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => {
            let iconName = 'person'; // Default icon for MaterialIcons
            let IconComponent: typeof MaterialIcons | typeof Ionicons = MaterialIcons; // Default icon component

            if (route.name === 'dashboard') {
              iconName = focused ? 'dashboard' : 'dashboard-customize';
            } else if (route.name === 'manageBusiness') {
              iconName = focused ? 'restaurant' : 'restaurant-outline'; // Use Ionicons names
              IconComponent = Ionicons; // Switch to Ionicons for this condition
            } else if (route.name === 'usersManage') {
              iconName = focused ? 'people' : 'people-outline';
            }

            return <IconComponent name={iconName as any} size={size} color={color} />;
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
        <Tabs.Screen name="manageBusiness" options={{ title: 'Restaurants' }} />
        <Tabs.Screen name="dashboard" options={{ title: 'Dashboard' }} />
        <Tabs.Screen name="usersManage" options={{ title: 'Customers' }} />
      </Tabs>
    </GestureHandlerRootView>
  );
}