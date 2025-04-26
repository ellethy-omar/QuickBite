import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { setUserDetails } from '@/app/slices/userSlice'; 
import { useNotification } from '@/app/context/notificationContext';
import colors from '@/app/styles/colors';
// import { UpdateUserProfile } from '@/app/endpoints/userEndpoints'; // 🧠 UNCOMMENT later when you have real endpoint

export default function ProfileSettingsScreen() {
  const dispatch = useDispatch();
  const { showNotification } = useNotification();
  const reduxUser = useSelector((state: any) => state.user);

  const [userData, setUserData] = useState(reduxUser);
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
    isDefault: false,
  });

  const updateField = (field: string, value: string) => {
    setUserData({
      ...userData,
      [field]: value
    });
  };

  const setDefaultAddress = (id: string) => {
    const updatedAddresses = userData.addresses.map((address: any) => ({
      ...address,
      isDefault: (address._id || address.id) === id
    }));
    setUserData({ ...userData, addresses: updatedAddresses });
  };

  const handleAddOrEditAddress = () => {
    if (!newAddress.label || !newAddress.street || !newAddress.city || !newAddress.area) {
      Alert.alert('Error', 'All required fields (label, street, city, area) must be filled.');
      return;
    }

    if (isEditing && editAddressId) {
      const updatedAddresses = userData.addresses.map((address: any) =>
        (address._id || address.id) === editAddressId
          ? { ...newAddress, id: editAddressId }
          : address
      );
      setUserData({ ...userData, addresses: updatedAddresses });
    } else {
      const newAddressWithId = {
        ...newAddress,
        id: (Math.random() * 1000000).toFixed(0) // ✨ Random ID since frontend only
      };
      setUserData({
        ...userData,
        addresses: [...userData.addresses, newAddressWithId],
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
      isDefault: false,
    });
  };

  const handleDeleteAddress = (id: string) => {
    const addressToDelete = userData.addresses.find((address: any) => (address._id || address.id) === id);

    if (addressToDelete?.isDefault) {
      Alert.alert('Error', 'Cannot delete the default address.');
      return;
    }

    Alert.alert(
      'Confirm Deletion',
      'Are you sure you want to delete this address?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            const updatedAddresses = userData.addresses.filter((address: any) => (address._id || address.id) !== id);
            setUserData({ ...userData, addresses: updatedAddresses });
          },
        },
      ]
    );
  };

  const handleEditAddress = (address: any) => {
    setNewAddress(address);
    setEditAddressId(address._id || address.id);
    setIsAddingAddress(true);
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      dispatch(setUserDetails(userData));
      showNotification('Profile updated successfully!', 'success');
      // await UpdateUserProfile(userData); // 🧠 Real saving when endpoint is ready
      console.log('📦 Saved user profile:', JSON.stringify(userData, null, 2));
    } catch (error) {
      console.error('Error saving profile:', error);
      showNotification('Failed to update profile.', 'error');
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* --- Profile Information --- */}
      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.input}
        value={userData.name}
        onChangeText={(text) => updateField('name', text)}
        placeholder="Name"
      />

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        value={userData.email}
        onChangeText={(text) => updateField('email', text)}
        placeholder="Email"
      />

      <Text style={styles.label}>Phone</Text>
      <TextInput
        style={styles.input}
        value={userData.phone}
        onChangeText={(text) => updateField('phone', text)}
        placeholder="Phone"
      />

      {/* --- Addresses Section --- */}
      <Text style={styles.sectionTitle}>Addresses</Text>

      {userData.addresses.length === 0 ? (
        <Text style={{ color: '#666', marginBottom: 10 }}>No addresses yet.</Text>
      ) : (
        userData.addresses.map((address: any, index: number) => (
          <View key={address._id || address.id} style={styles.addressCard}>
            <Text style={styles.addressLabel}>{address.label}</Text>
            <Text style={styles.addressText}>{address.street}, {address.area}</Text>
            <Text style={styles.addressText}>{address.building} • Floor {address.floor} • Apt {address.apartment}</Text>
            {address.isDefault && <Text style={styles.defaultBadge}>Default</Text>}
            <View style={{ flexDirection: 'row', marginTop: 8 }}>
              <TouchableOpacity style={styles.editButton} onPress={() => handleEditAddress(address)}>
                <Text style={styles.buttonText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.deleteButton, address.isDefault && styles.disabledDeleteButton]}
                onPress={() => handleDeleteAddress(address._id || address.id)}
                disabled={address.isDefault}
              >
                <Text style={styles.buttonText}>
                  {address.isDefault ? 'Undeletable' : 'Delete'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ))
      )}

      {/* --- Add New Address --- */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => {
          setIsAddingAddress(true);
          setIsEditing(false);
          setNewAddress({
            label: '',
            street: '',
            city: '',
            area: '',
            building: '',
            floor: '',
            apartment: '',
            isDefault: false,
          });
        }}
      >
        <Text style={{ color: 'white', fontWeight: 'bold' }}>+ Add New Address</Text>
      </TouchableOpacity>

      {/* --- Address Form --- */}
      {isAddingAddress && (
        <View style={styles.addressForm}>
          <TextInput style={styles.input} placeholder="Label" value={newAddress.label} onChangeText={(text) => setNewAddress({ ...newAddress, label: text })} />
          <TextInput style={styles.input} placeholder="Street" value={newAddress.street} onChangeText={(text) => setNewAddress({ ...newAddress, street: text })} />
          <TextInput style={styles.input} placeholder="Area" value={newAddress.area} onChangeText={(text) => setNewAddress({ ...newAddress, area: text })} />
          <TextInput style={styles.input} placeholder="City" value={newAddress.city} onChangeText={(text) => setNewAddress({ ...newAddress, city: text })} />
          <TextInput style={styles.input} placeholder="Building" value={newAddress.building} onChangeText={(text) => setNewAddress({ ...newAddress, building: text })} />
          <TextInput style={styles.input} placeholder="Floor" value={newAddress.floor} onChangeText={(text) => setNewAddress({ ...newAddress, floor: text })} />
          <TextInput style={styles.input} placeholder="Apartment" value={newAddress.apartment} onChangeText={(text) => setNewAddress({ ...newAddress, apartment: text })} />

          <TouchableOpacity style={styles.saveButton} onPress={handleAddOrEditAddress}>
            <Text style={{ color: 'white', fontWeight: 'bold' }}>{isEditing ? 'Update Address' : 'Add Address'}</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* --- Save Profile --- */}
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={{ color: 'white', fontWeight: 'bold' }}>Save Changes</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: 16 },
  label: { fontSize: 14, fontWeight: 'bold', marginTop: 10, color: colors.text },
  input: { backgroundColor: '#f9f9f9', padding: 10, borderRadius: 8, marginTop: 6, marginBottom: 10, borderColor: '#ddd', borderWidth: 1 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginVertical: 15, color: colors.primary },
  addressCard: { backgroundColor: '#fff', padding: 12, borderRadius: 8, marginBottom: 10, borderColor: '#ddd', borderWidth: 1 },
  addressLabel: { fontWeight: 'bold', color: colors.primary, marginBottom: 5 },
  addressText: { color: '#666', fontSize: 12 },
  defaultBadge: { marginTop: 5, color: '#4CAF50', fontWeight: 'bold', fontSize: 12 },
  editButton: { backgroundColor: colors.primary, padding: 6, borderRadius: 4, marginRight: 10 },
  deleteButton: { backgroundColor: '#f44336', padding: 6, borderRadius: 4 },
  disabledDeleteButton: { backgroundColor: '#bbb' },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 12 },
  addButton: { backgroundColor: colors.primary, padding: 14, borderRadius: 8, marginTop: 20, alignItems: 'center' },
  saveButton: { backgroundColor: colors.primary, padding: 14, borderRadius: 8, marginTop: 20, alignItems: 'center' },
  addressForm: { marginTop: 20 },
});
