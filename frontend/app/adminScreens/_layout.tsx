import React from 'react';
import { Tabs } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import colors from '@/app/styles/colors';
import 'react-native-gesture-handler';
import { MaterialIcons } from '@expo/vector-icons';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function AdminScreensLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Tabs
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => {
            let iconName = 'person';
            let IconComponent: typeof MaterialIcons | typeof Ionicons = MaterialIcons;

            if (route.name === 'dashboard') {
              iconName = focused ? 'dashboard' : 'dashboard-customize';
            } else if (route.name === 'manageBusiness') {
              iconName = focused ? 'restaurant' : 'restaurant-outline';
              IconComponent = Ionicons;
            } else if (route.name === 'usersManage') {
              iconName = focused ? 'people' : 'people-outline';
            } else if (route.name === 'driversManage') {
              iconName = focused ? 'directions-car' : 'directions-car';
            } else if (route.name === 'liveOrdersView') {
              iconName = focused ? 'receipt-long' : 'receipt-long';
            }
            return <IconComponent name={iconName as any} size={size} color={color} />;
          },
          tabBarStyle: {
            backgroundColor: colors.background,
            borderTopWidth: 1,
            borderColor: colors.secondary,
            height: 60,
          },
          tabBarLabelStyle: {
            fontSize: 10,
            fontWeight: '700',
          },
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tabs.Screen name="dashboard" options={{ title: 'Dashboard' }} />
        <Tabs.Screen name="manageBusiness" options={{ title: 'Restaurants' }} />
        <Tabs.Screen name="usersManage" options={{ title: 'Customers' }} />
        <Tabs.Screen name="driversManage" options={{ title: 'Drivers' }} />
        <Tabs.Screen name="liveOrdersView" options={{title: "Orders"}} />
      </Tabs>
    </GestureHandlerRootView>
  );
}