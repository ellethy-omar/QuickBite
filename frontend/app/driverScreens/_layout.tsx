import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Tabs } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { MaterialIcons } from '@expo/vector-icons';
import colors from '@/app/styles/colors';

export default function DriverScreensLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Tabs
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarIcon: ({ color, size, focused }) => {
              let iconName = 'person';
              if (route.name === 'ordersView') {
                iconName = focused ? 'receipt-long' : 'receipt-long';
              } else if (route.name === 'profileView') {
                iconName = focused ? 'person' : 'person-outline';
              } else if (route.name === 'currentOrderView') {
                iconName = focused ? 'directions-car' : 'directions-car';
              }
              return (
                <MaterialIcons
                  name={iconName as keyof typeof MaterialIcons.glyphMap}
                  size={size}
                  color={color}
                />
              );
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
          <Tabs.Screen name="ordersView" options={{ title: 'Orders' }} />
          <Tabs.Screen name="profileView" options={{ title: 'Profile' }} />
          <Tabs.Screen name="currentOrderView" options={{ title: 'Tracking' }} />
        </Tabs>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
});