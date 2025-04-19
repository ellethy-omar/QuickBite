import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Image } from 'react-native';
import colors from '@/app/styles/colors';

// This would typically come from your API or state management
const initialUserData = {
  name: 'xKimozZ',
  email: 'xkimozz@example.com',
  phone: '2021234567',
  profilePicture: 'https://randomuser.me/api/portraits/men/32.jpg', // Sample image URL from API
  addresses: [
    {
      id: '1',
      street: 'Main St.',
      city: 'Cairo',
      area: 'Downtown',
      label: 'Home',
      building: 'Building A',
      floor: '3rd Floor',
      apartment: 'Apt 301',
      isDefault: true
    },
    {
      id: '2',
      street: 'Business Ave.',
      city: 'Cairo',
      area: 'New Cairo',
      label: 'Work',
      building: 'Office Tower',
      floor: '15th Floor',
      apartment: 'Suite 1502',
      isDefault: false
    },
    {
      id: '3',
      street: 'Family Rd.',
      city: 'Alexandria',
      area: 'Montazah',
      label: 'Parents',
      building: 'Villa 27',
      floor: 'Ground Floor',
      apartment: '',
      isDefault: false
    }
  ],
  createdAt: '2025-04-18T08:45:30.000Z'
};

export default function ProfileSettingsScreen() {
  const [userData, setUserData] = useState(initialUserData);
  const [expandedAddresses, setExpandedAddresses] = useState(false);
  
  // Helper function to update user data fields
  const updateField = (field: string, value: string) => {
    setUserData({
      ...userData,
      [field]: value
    });
  };

  // Placeholder for image selection - this will be replaced with API integration
  const handleProfilePictureSelect = () => {
    console.log('Select profile picture');
    // In the future, this will trigger the API to provide a new profile image URL
  };

  // Set an address as default
  const setDefaultAddress = (id: string) => {
    const updatedAddresses = userData.addresses.map(address => ({
      ...address,
      isDefault: address.id === id
    }));

    setUserData({
      ...userData,
      addresses: updatedAddresses
    });
  };

  // Save changes function (would connect to your backend)
  const handleSave = () => {
    console.log('Saving user data:', userData);
    // Here you would make an API call to update the user profile
  };

  return (
    <ScrollView style={styles.container}>
      {/* Profile Picture Section */}
      <View style={styles.profilePictureContainer}>
        {userData.profilePicture ? (
          <Image 
            source={{ uri: userData.profilePicture }} 
            style={styles.profilePicture} 
          />
        ) : (
          <View style={styles.profilePicturePlaceholder}>
            <Text style={styles.profilePicturePlaceholderText}>
              {userData.name ? userData.name.charAt(0).toUpperCase() : 'U'}
            </Text>
          </View>
        )}
        <TouchableOpacity 
          style={styles.changePhotoButton}
          onPress={handleProfilePictureSelect}
        >
          <Text style={styles.changePhotoText}>Change Photo</Text>
        </TouchableOpacity>
      </View>
      
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
          <Text style={styles.sectionTitle}>Delivery Addresses</Text>
          <TouchableOpacity onPress={() => setExpandedAddresses(!expandedAddresses)}>
            <Text style={styles.manageButton}>{expandedAddresses ? 'Collapse' : 'Show All'}</Text>
          </TouchableOpacity>
        </View>
        
        {userData.addresses && userData.addresses.map((address, index) => {
          // Always show default address or all addresses if expanded
          if (address.isDefault || expandedAddresses) {
            return (
              <View key={address.id} style={[styles.addressCard, index > 0 && styles.marginTop]}>
                <View style={styles.addressHeader}>
                  <Text style={styles.addressLabel}>{address.label}</Text>
                  {address.isDefault ? (
                    <View style={styles.defaultBadge}>
                      <Text style={styles.defaultBadgeText}>Default</Text>
                    </View>
                  ) : (
                    <TouchableOpacity onPress={() => setDefaultAddress(address.id)}>
                      <Text style={styles.setDefaultText}>Set as Default</Text>
                    </TouchableOpacity>
                  )}
                </View>
                
                <Text style={styles.addressText}>
                  {address.building}{address.floor ? `, ${address.floor}` : ''}
                </Text>
                <Text style={styles.addressText}>
                  {address.apartment ? `${address.apartment}, ` : ''}{address.street}
                </Text>
                <Text style={styles.addressText}>
                  {address.area}, {address.city}
                </Text>
              </View>
            );
          }
          return null;
        })}

        <TouchableOpacity style={styles.addAddressButton}>
          <Text style={styles.addAddressText}>+ Add New Address</Text>
        </TouchableOpacity>
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
  // Profile picture styles
  profilePictureContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#f9f9f9',
    borderWidth: 2,
    borderColor: '#fff',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  profilePicturePlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.primary + '30', // semi-transparent primary color
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  profilePicturePlaceholderText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: colors.primary,
  },
  changePhotoButton: {
    marginTop: 8,
  },
  changePhotoText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '600',
  },
  // Section styles
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
  // Form field styles
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
  // Address styles
  addressCard: {
    padding: 12,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#eee',
  },
  marginTop: {
    marginTop: 12,
  },
  addressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  addressLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  addressText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 4,
  },
  defaultBadge: {
    backgroundColor: colors.primary + '20',
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  defaultBadgeText: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '500',
  },
  setDefaultText: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '500',
  },
  addAddressButton: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 14,
    alignItems: 'center',
    marginTop: 12,
  },
  addAddressText: {
    color: colors.primary,
    fontWeight: '500',
    fontSize: 14,
  },
  // Misc styles
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