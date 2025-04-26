import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '@/app/styles/colors';

export default function RestaurantSettingsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Restaurant Settings</Text>
      <Text style={styles.text}>Coming soon...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
  },
  text: {
    fontSize: 16,
    marginTop: 10,
    color: '#666',
  },
});
