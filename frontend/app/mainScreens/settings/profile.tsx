import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import colors from '@/app/styles/colors';

// This would typically come from your API or state management
const initialUserData = {
  name: 'xKimozZ',
  email: 'xkimozz@example.com',
  phone: '2021234567',
  addresses: [
    {
      street: 'Main St.',
      city: 'Cairo',
      area: 'Downtown',
      label: 'Home',
      building: 'Building A',
      floor: '3rd Floor',
      apartment: 'Apt 301',
      isDefault: true
    }
  ],
  createdAt: '2025-04-18T08:45:30.000Z'
};

export default function ProfileSettingsScreen() {
  const [userData, setUserData] = useState(initialUserData);
  
  // Helper function to update user data fields
  const updateField = (field: string, value: string) => {
    setUserData({
      ...userData,
      [field]: value
    });
  };

  // Save changes function (would connect to your backend)
  const handleSave = () => {
    console.log('Saving user data:', userData);
    // Here you would make an API call to update the user profile
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Personal Information</Text>
        
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Full Name</Text>
          <TextInput
            style={styles.input}
            value={userData.name}
            onChangeText={(value) => updateField('name', value)}
            placeholder="Enter your name"
          />
        </View>
        
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Email Address</Text>
          <TextInput
            style={styles.input}
            value={userData.email}
            onChangeText={(value) => updateField('email', value)}
            placeholder="Enter your email"
            keyboardType="email-address"
          />
        </View>
        
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            style={styles.input}
            value={userData.phone}
            onChangeText={(value) => updateField('phone', value)}
            placeholder="Enter your phone number"
            keyboardType="phone-pad"
          />
        </View>
      </View>
      
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Default Address</Text>
          <TouchableOpacity>
            <Text style={styles.manageButton}>Manage All</Text>
          </TouchableOpacity>
        </View>
        
        {userData.addresses && userData.addresses.length > 0 && (
          <View style={styles.addressCard}>
            <Text style={styles.addressLabel}>{userData.addresses[0].label}</Text>
            <Text style={styles.addressText}>
              {userData.addresses[0].building}, {userData.addresses[0].floor}
            </Text>
            <Text style={styles.addressText}>
              {userData.addresses[0].apartment}, {userData.addresses[0].street}
            </Text>
            <Text style={styles.addressText}>
              {userData.addresses[0].area}, {userData.addresses[0].city}
            </Text>
          </View>
        )}
      </View>
      
      <View style={styles.section}>
        <Text style={styles.infoText}>Account created on: {new Date(userData.createdAt).toLocaleDateString()}</Text>
      </View>
      
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save Changes</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 16,
  },
  section: {
    marginBottom: 24,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 16,
  },
  fieldContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
    color: colors.text,
  },
  input: {
    backgroundColor: '#f9f9f9',
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#eee',
    fontSize: 16,
  },
  addressCard: {
    padding: 12,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#eee',
  },
  addressLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: colors.text,
  },
  addressText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 4,
  },
  infoText: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
  },
  manageButton: {
    color: colors.primary,
    fontWeight: '500',
  },
  saveButton: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 40,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});