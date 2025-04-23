import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { useNavigation } from 'expo-router';
import { NavigationProp } from '@react-navigation/native';
import colors from '@/app/styles/colors';
import { RootStackParamList } from '@/app/types/rootStack';

export default function SettingsIndex() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  
  const settingsOptions = [
    { 
      title: 'Profile Settings', 
      description: 'Update your name, photo, and personal details',
      route: 'profile'  // No leading slash for navigate
    },
    { 
      title: 'Account Settings', 
      description: 'Manage password and account security options',
      route: 'account'
    },
    { 
      title: 'Notification Settings', 
      description: 'Control when and how you receive notifications',
      route: 'notifications'
    },
  ];
  
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      
      {settingsOptions.map((option, index) => (
        <TouchableOpacity 
          key={index} 
          style={styles.optionItem}
          onPress={() => navigation.navigate(option.route as keyof RootStackParamList)}
        >
          <View>
            <Text style={styles.optionTitle}>{option.title}</Text>
            <Text style={styles.optionDescription}>{option.description}</Text>
          </View>
          <Text style={styles.arrow}>→</Text>
        </TouchableOpacity>
      ))}
    </SafeAreaView>
  );
}

// Styles stay the same
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
    marginTop: 16,
    color: colors.primary,
  },
  optionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    elevation: 2,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
  },
  optionDescription: {
    fontSize: 14,
    color: '#888',
    marginTop: 4,
  },
  arrow: {
    fontSize: 16,
    color: colors.primary,
  },
});