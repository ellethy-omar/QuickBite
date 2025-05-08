import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Alert, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { setUserDetails } from '@/app/slices/userSlice'; 
import { useNotification } from '@/app/context/notificationContext';
import { UpdateUserProfile, GetUserProfile, UpdateUserProfilePhoto } from '@/app/endpoints/userEndpoints';
import colors from '@/app/styles/colors';
import * as ImagePicker from 'expo-image-picker';

export default function ProfileSettingsScreen() {
  const dispatch = useDispatch();
  const { showNotification } = useNotification();
  const reduxUser = useSelector((state: any) => state.user);

  const [userData, setUserData] = useState(reduxUser);
  const [profileImage, setProfileImage] = useState<string | null>(null);
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

  useEffect(() => {
    const fetchProfileImage = async () => {
      try {
        const data = await GetUserProfile();
        console.log('Fetched user profile:', data);
        setProfileImage(data.user?.profilePicture || null);
      } catch (err) {
        console.error('Error fetching profile image:', err);
      }
    };

    fetchProfileImage();
  }, []);

  const updateField = (field: string, value: string) => {
    setUserData({ ...userData, [field]: value });
  };

  const setDefaultAddress = (id: string) => {
    const updatedAddresses = userData.addresses.map((address: any) => ({
      ...address,
      isDefault: (address._id || address.id) === id,
    }));
    setUserData({ ...userData, addresses: updatedAddresses });
  };

  const handleAddOrEditAddress = () => {
    if (!newAddress.label || !newAddress.street || !newAddress.city || !newAddress.area) {
      Alert.alert('Error', 'All required fields (label, street, city, area) must be filled.');
      return;
    }

    let updatedAddresses = [...userData.addresses];

    if (newAddress.isDefault) {
      updatedAddresses = updatedAddresses.map((addr) => ({ ...addr, isDefault: false }));
    }

    if (isEditing && editAddressId) {
      updatedAddresses = updatedAddresses.map((address: any) =>
        (address._id || address.id) === editAddressId
          ? { ...newAddress, id: editAddressId }
          : address
      );
    } else {
      const newAddressWithId = {
        ...newAddress,
        id: (Math.random() * 1000000).toFixed(0),
      };
      updatedAddresses.push(newAddressWithId);
    }

    setUserData({ ...userData, addresses: updatedAddresses });
    cancelEditing();
  };

  const handleDeleteAddress = (id: string) => {
    const addressToDelete = userData.addresses.find((address: any) => (address._id || address.id) === id);

    if (addressToDelete?.isDefault) {
      Alert.alert('Error', 'Cannot delete the default address.');
      return;
    }

    Alert.alert('Confirm Deletion', 'Are you sure you want to delete this address?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          const updatedAddresses = userData.addresses.filter((address: any) => (address._id || address.id) !== id);
          setUserData({ ...userData, addresses: updatedAddresses });
        },
      },
    ]);
  };

  const handleEditAddress = (address: any) => {
    setNewAddress(address);
    setEditAddressId(address._id || address.id);
    setIsAddingAddress(true);
    setIsEditing(true);
  };

  const cancelEditing = () => {
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

  const handleSave = async () => {
    try {
      if (!userData.name?.trim() || !userData.email?.trim() || !userData.phone?.trim()) {
        Alert.alert('Validation Error', 'Name, Email, and Phone are required.');
        return;
      }

      if (userData.addresses.length === 0) {
        Alert.alert('Validation Error', 'At least one address is required.');
        return;
      }

      const hasDefault = userData.addresses.some((addr: any) => addr.isDefault);
      if (!hasDefault) {
        Alert.alert('Validation Error', 'Please select a default address.');
        return;
      }

      await UpdateUserProfile({
        name: userData.name.trim(),
        email: userData.email.trim(),
        phone: userData.phone.trim(),
        addresses: userData.addresses.map((addr: any) => ({
          label: addr.label?.trim() ?? '',
          area: addr.area?.trim() ?? '',
          street: addr.street?.trim() ?? '',
          building: addr.building?.trim() ?? '',
          floor: addr.floor?.trim() ?? '',
          apartment: addr.apartment?.trim() ?? '',
          isDefault: addr.isDefault ?? false,
        })),
      });

      dispatch(setUserDetails(userData));
      showNotification('Profile updated successfully!', 'success');
    } catch (error) {
      console.error('🔴 Error saving profile:', error);
      showNotification('Failed to update profile.', 'error');
    }
  };

  const handleImagePick = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      showNotification('Permission to access media library is required.', 'error');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      base64: true,
      allowsEditing: true,
      quality: 0.8,
    });

    if (result.canceled) {
      console.log('🚫 Image picker cancelled');
      return;
    }

    try {
      const base64 = result.assets?.[0]?.base64;
      if (!base64) {
        showNotification('Failed to read image.', 'error');
        return;
      }

      const res = await UpdateUserProfilePhoto({
        imageBase64: `data:image/jpeg;base64,${base64}`,
        tags: ['profile'],
      });

      setProfileImage(res.imageURL);
      showNotification('Profile image updated!', 'success');
    } catch (error) {
      console.error('Image upload failed:', error);
      showNotification('Failed to upload image.', 'error');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.avatarContainer} onPress={handleImagePick}>
        <Image
          source={{ uri: profileImage || 'https://i.imgur.com/6VBx3io.png' }}
          style={styles.avatar}
        />
      </TouchableOpacity>

      {/* Profile Info */}
      <Text style={styles.label}>Name</Text>
      <TextInput style={styles.input} value={userData.name} onChangeText={(text) => updateField("name", text)} placeholder="Name" />
      <Text style={styles.label}>Email</Text>
      <TextInput style={styles.input} value={userData.email} onChangeText={(text) => updateField("email", text)} placeholder="Email" />
      <Text style={styles.label}>Phone</Text>
      <TextInput style={styles.input} value={userData.phone} onChangeText={(text) => updateField("phone", text)} placeholder="Phone" />

      {/* Addresses */}
      <Text style={styles.sectionTitle}>Addresses</Text>

      {userData.addresses.length === 0 ? (
        <Text style={{ color: "#666", marginBottom: 10 }}>No addresses yet.</Text>
      ) : (
        userData.addresses.map((address: any) => (
          <View key={address._id || address.id} style={styles.addressCard}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
              <Text style={styles.addressLabel}>{address.label}</Text>
              {address.isDefault && <Text style={styles.defaultBadge}>Default</Text>}
            </View>

            {(address.street || address.area) && (
              <Text style={styles.addressText}>
                {address.street}
                {address.street && address.area ? ", " : ""}
                {address.area}
              </Text>
            )}

            {(address.building || address.floor || address.apartment) && (
              <Text style={styles.addressText}>
                {address.building && `Building ${address.building}`}
                {address.building && address.floor && " • "}
                {address.floor && `Floor ${address.floor}`}
                {address.floor && address.apartment && " • "}
                {address.apartment && `Apt ${address.apartment}`}
              </Text>
            )}

            {address.city && <Text style={styles.addressText}>{address.city}</Text>}

            <View style={{ flexDirection: "row", marginTop: 8, justifyContent: "space-between" }}>
              <TouchableOpacity style={styles.editButton} onPress={() => handleEditAddress(address)}>
                <Text style={styles.buttonText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.deleteButton, address.isDefault && styles.disabledDeleteButton]}
                onPress={() => handleDeleteAddress(address._id || address.id)}
                disabled={address.isDefault}
              >
                <Text style={styles.buttonText}>
                  {address.isDefault ? "Undeletable" : "Delete"}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.defaultButton, address.isDefault && styles.disabledDefaultButton]}
                onPress={() => setDefaultAddress(address._id || address.id)}
                disabled={address.isDefault}
              >
                <Text style={styles.buttonText}>Set Default</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))
      )}

      {/* Add / Edit Address Form */}
      {isAddingAddress ? (
        <View style={styles.addressForm}>
          {["Label", "Street", "Area", "City", "Building", "Floor", "Apartment"].map((field, idx) => (
            <TextInput
              key={idx}
              style={styles.input}
              placeholder={field}
              value={(newAddress as any)[field.toLowerCase()]}
              onChangeText={(text) => setNewAddress({ ...newAddress, [field.toLowerCase()]: text })}
            />
          ))}

          <View style={{ flexDirection: "row", marginTop: 20 }}>
            <TouchableOpacity style={[styles.saveButton, { flex: 1, marginTop: 0, marginRight: 8 }]} onPress={handleAddOrEditAddress}>
              <Text style={{ color: 'white', fontWeight: 'bold' }}>{isEditing ? 'Update Address' : 'Add Address'}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.cancelButton, { flex: 1 }]} onPress={cancelEditing}>
              <Text style={{ color: 'white', fontWeight: 'bold' }}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => {
            setIsAddingAddress(true);
            setIsEditing(false);
            setNewAddress({
              label: "",
              street: "",
              city: "",
              area: "",
              building: "",
              floor: "",
              apartment: "",
              isDefault: false,
            });
          }}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>+ Add New Address</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={{ color: "white", fontWeight: "bold" }}>Save Changes</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: 16 },
  avatarContainer: { alignItems: 'center', marginBottom: 16 },
  avatar: { width: 100, height: 100, borderRadius: 50 },
  cameraOverlay: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: colors.primary,
    borderRadius: 20,
    paddingVertical: 4,
    paddingHorizontal: 8,
    transform: [{ translateX: 10 }, { translateY: 10 }],
  },
  label: { fontSize: 14, fontWeight: 'bold', marginTop: 10, color: colors.text },
  input: { backgroundColor: '#f9f9f9', padding: 10, borderRadius: 8, marginTop: 6, marginBottom: 10, borderColor: '#ddd', borderWidth: 1 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginVertical: 15, color: colors.primary },
  addressCard: { backgroundColor: '#fff', padding: 12, borderRadius: 8, marginBottom: 10, borderColor: '#ddd', borderWidth: 1 },
  addressLabel: { fontWeight: 'bold', color: colors.primary, marginBottom: 5 },
  addressText: { color: '#666', fontSize: 12 },
  defaultBadge: { backgroundColor: '#4CAF50', color: '#fff', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 4, fontSize: 10, overflow: 'hidden' },
  editButton: { backgroundColor: colors.primary, padding: 6, borderRadius: 4, flex: 1, marginRight: 5 },
  deleteButton: { backgroundColor: '#f44336', padding: 6, borderRadius: 4, flex: 1, marginRight: 5 },
  defaultButton: { backgroundColor: '#3F51B5', padding: 6, borderRadius: 4, flex: 1 },
  disabledDeleteButton: { backgroundColor: '#bbb' },
  disabledDefaultButton: { backgroundColor: '#bbb' },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 12, textAlign: 'center' },
  addButton: { backgroundColor: colors.primary, padding: 14, borderRadius: 8, marginTop: 20, alignItems: 'center' },
  saveButton: { backgroundColor: colors.primary, padding: 14, borderRadius: 8, alignItems: 'center', justifyContent: 'center', marginTop: 20 },
  formSaveButton: { backgroundColor: colors.primary, padding: 14, borderRadius: 8, alignItems: 'center', justifyContent: 'center', marginBottom: 20 },
  cancelButton: { backgroundColor: '#aaa', padding: 14, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  addressForm: { marginTop: 20 },
});
