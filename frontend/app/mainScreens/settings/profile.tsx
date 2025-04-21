import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
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
  const [isEditing, setIsEditing] = useState(false);
  const [editAddressId, setEditAddressId] = useState<string | null>(null);
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [newAddress, setNewAddress] = useState({
    label: '',
    street: '',
    city: '',
    area: '',
    building: '',
    floor: '',
    apartment: '',
    isDefault: false
  });

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

  // Add or edit address function
  const handleAddOrEditAddress = () => {
    // Validate form fields
    if (!newAddress.label || !newAddress.street || !newAddress.city || !newAddress.area) {
      Alert.alert('Error', 'All required fields (label, street, city, area) must be filled.');
      return;
    }

    if (isEditing && editAddressId) {
      // Edit existing address
      const updatedAddresses = userData.addresses.map(address =>
        address.id === editAddressId ? { ...newAddress, id: editAddressId } : address
      );
      setUserData({
        ...userData,
        addresses: updatedAddresses
      });
    } else {
      // Add new address
      const newAddressWithId = {
        ...newAddress,
        id: (userData.addresses.length + 1).toString()
      };
      setUserData({
        ...userData,
        addresses: [...userData.addresses, newAddressWithId]
      });
    }

    setIsAddingAddress(false);
    setIsEditing(false);
    setEditAddressId(null);
    setNewAddress({
      label: '',
      street: '',
      city: '',
      area: '',
      building: '',
      floor: '',
      apartment: '',
      isDefault: false
    });
  };

  // Delete address function
  const handleDeleteAddress = (id: string) => {
    Alert.alert(
      'Confirm Deletion',
      'Are you sure you want to delete this address?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            const updatedAddresses = userData.addresses.filter(address => address.id !== id);

            // If the deleted address was the default, set a new default
            const wasDefault = userData.addresses.find(address => address.id === id)?.isDefault;
            if (wasDefault && updatedAddresses.length > 0) {
              updatedAddresses[0].isDefault = true; // Set the first remaining address as default
            }

            setUserData({
              ...userData,
              addresses: updatedAddresses
            });
          },
        },
      ]
    );
  };

  // Start editing an address
  const handleEditAddress = (address: typeof newAddress) => {
    setNewAddress(address);
    setEditAddressId(address.id);
    setIsAddingAddress(true);
    setIsEditing(true);
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
                <View style={styles.addressActions}>
                  <TouchableOpacity 
                    style={styles.editButton} 
                    onPress={() => handleEditAddress(address)}
                  >
                    <Text style={styles.editButtonText}>Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={[
                      styles.deleteButton, 
                      (userData.addresses.length === 1 || address.isDefault) && styles.disabledButton
                    ]} 
                    onPress={() => handleDeleteAddress(address.id)}
                    disabled={userData.addresses.length === 1 || address.isDefault}
                  >
                    <Text style={styles.deleteButtonText}>
                      {address.isDefault ? 'Undeletable' : 'Delete'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          }
          return null;
        })}
      </View>

      {!isAddingAddress ? (
        <TouchableOpacity style={styles.addAddressButton} onPress={() => setIsAddingAddress(true)}>
          <Text style={styles.addAddressText}>+ Add New Address</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.newAddressForm}>
          <TextInput 
            style={styles.smallInput} 
            placeholder="Label (e.g., Home)" 
            value={newAddress.label}
            onChangeText={(value) => setNewAddress({ ...newAddress, label: value })}
          />
          <TextInput 
            style={styles.smallInput} 
            placeholder="Street" 
            value={newAddress.street}
            onChangeText={(value) => setNewAddress({ ...newAddress, street: value })}
          />
          <TextInput 
            style={styles.smallInput} 
            placeholder="City" 
            value={newAddress.city}
            onChangeText={(value) => setNewAddress({ ...newAddress, city: value })}
          />
          <TextInput 
            style={styles.smallInput} 
            placeholder="Area" 
            value={newAddress.area}
            onChangeText={(value) => setNewAddress({ ...newAddress, area: value })}
          />
          <TextInput 
            style={styles.smallInput} 
            placeholder="Building" 
            value={newAddress.building}
            onChangeText={(value) => setNewAddress({ ...newAddress, building: value })}
          />
          <TextInput 
            style={styles.smallInput} 
            placeholder="Floor" 
            value={newAddress.floor}
            onChangeText={(value) => setNewAddress({ ...newAddress, floor: value })}
          />
          <TextInput 
            style={styles.smallInput} 
            placeholder="Apartment" 
            value={newAddress.apartment}
            onChangeText={(value) => setNewAddress({ ...newAddress, apartment: value })}
          />
          <View style={styles.formActions}>
            <TouchableOpacity 
              style={styles.addAddressButton} 
              onPress={handleAddOrEditAddress}
            >
              <Text style={styles.addAddressText}>{isEditing ? 'Confirm Edit' : 'Add'}</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.cancelButton} 
              onPress={() => {
                setIsAddingAddress(false);
                setIsEditing(false);
                setEditAddressId(null);
                setNewAddress({
                  label: '',
                  street: '',
                  city: '',
                  area: '',
                  building: '',
                  floor: '',
                  apartment: '',
                  isDefault: false
                });
              }}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

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
    marginBlock: 24,
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
    marginBottom: 12,
  },
  // Address styles
  addressCard: {
    padding: 12,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#eee',
    marginBottom: 12,
  },
  addressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  addressLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  addressText: {
    fontSize: 12,
    color: '#555',
  },
  addressActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  editButton: {
    backgroundColor: colors.primary,
    padding: 8,
    borderRadius: 4,
    alignItems: 'center',
    marginRight: 8,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 8,
    borderRadius: 4,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
  addAddressButton: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
    marginVertical: 8,
  },
  addAddressText: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 14,
  },
  newAddressForm: {
    marginTop: 12,
  },
  smallInput: {
    backgroundColor: '#f9f9f9',
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#eee',
    fontSize: 12,
    marginBottom: 8,
  },
  formActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 8,
  },
  cancelButton: {
    backgroundColor: 'red',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
    marginLeft: 8,
  },
  cancelButtonText: {
    color: '#fff',
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