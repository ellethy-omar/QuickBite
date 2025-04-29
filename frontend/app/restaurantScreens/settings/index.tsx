import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image, StyleSheet, ActivityIndicator, Switch } from 'react-native';
import { useNotification } from '@/app/context/notificationContext';
import { GetRestaurantProfile, UpdateRestaurantProfile, UpdateRestaurantProfilePhoto } from '@/app/endpoints/restaurantEndpoints';
import * as ImagePicker from 'expo-image-picker';
import colors from '@/app/styles/colors';

export default function RestaurantSettingsScreen() {
  const { showNotification } = useNotification();
  const [restaurant, setRestaurant] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [logo, setLogo] = useState<string | null>(null);
  const [coverImage, setCoverImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await GetRestaurantProfile();
        setRestaurant(data.restaurant);
        setLogo(data.restaurant.logo);
        setCoverImage(data.restaurant.coverImage);
      } catch (error) {
        showNotification('Failed to load restaurant profile.', 'error');
        console.error('Error fetching restaurant profile:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handlePickImage = async (type: 'logo' | 'cover') => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.7,
      base64: true,
    });

    if (!result.canceled && result.assets?.[0]?.base64) {
      try {
        await UpdateRestaurantProfilePhoto({
          imageBase64: result.assets[0].base64,
          tags: [type],
        });
        showNotification(`${type === 'logo' ? 'Logo' : 'Cover image'} updated successfully!`, 'success');
        if (type === 'logo') setLogo(`data:image/jpeg;base64,${result.assets[0].base64}`);
        else setCoverImage(`data:image/jpeg;base64,${result.assets[0].base64}`);
      } catch (error) {
        showNotification('Failed to upload image.', 'error');
        console.error('Upload image error:', error);
      }
    }
  };

  const handleSave = async () => {
    if (!restaurant.name?.trim() || !restaurant.description?.trim()) {
      showNotification('Name and Description are required.', 'error');
      return;
    }

    try {
      setSaving(true);

      await UpdateRestaurantProfile({
        name: restaurant.name,
        description: restaurant.description,
        cuisineType: restaurant.cuisineType,
        address: {
          street: restaurant.address.street || '',
          city: restaurant.address.city || '',
          area: restaurant.address.area || '',
        },
        contact: {
          phone: restaurant.contact.phone || '',
          email: restaurant.contact.email || '',
          password: restaurant.contact.password || '',
        },
        openingHours: restaurant.openingHours,
        isActive: restaurant.isActive,
      });

      showNotification('Profile updated successfully!', 'success');
    } catch (error) {
      showNotification('Failed to update profile.', 'error');
      console.error('Update profile error:', error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (!restaurant) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={{ color: colors.text }}>No restaurant profile found.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Cover Image */}
      <TouchableOpacity onPress={() => handlePickImage('cover')} style={styles.imagePicker}>
        {coverImage ? (
          <Image source={{ uri: coverImage }} style={styles.coverImage} />
        ) : (
          <Text style={styles.imagePlaceholder}>Upload Cover Image</Text>
        )}
      </TouchableOpacity>

      {/* Logo */}
      <TouchableOpacity onPress={() => handlePickImage('logo')} style={styles.logoPicker}>
        {logo ? (
          <Image source={{ uri: logo }} style={styles.logoImage} />
        ) : (
          <Text style={styles.imagePlaceholder}>Upload Logo</Text>
        )}
      </TouchableOpacity>

      {/* Editable Fields */}
      <Text style={styles.label}>Restaurant Name</Text>
      <TextInput style={styles.input} value={restaurant.name} onChangeText={(text) => setRestaurant({ ...restaurant, name: text })} />

      <Text style={styles.label}>Description</Text>
      <TextInput style={[styles.input, { height: 80 }]} multiline value={restaurant.description} onChangeText={(text) => setRestaurant({ ...restaurant, description: text })} />

      <Text style={styles.label}>Cuisine Types (comma-separated)</Text>
      <TextInput
        style={styles.input}
        value={restaurant.cuisineType?.join(', ') || ''}
        onChangeText={(text) => setRestaurant({ ...restaurant, cuisineType: text.split(',').map((t) => t.trim()) })}
      />

      <Text style={styles.sectionTitle}>Address</Text>
      <Text style={styles.label}>Street</Text>
      <TextInput
        style={styles.input}
        value={restaurant.address?.street || ''}
        onChangeText={(text) => setRestaurant({ ...restaurant, address: { ...restaurant.address, street: text } })}
      />
      <Text style={styles.label}>City</Text>
      <TextInput
        style={styles.input}
        value={restaurant.address?.city || ''}
        onChangeText={(text) => setRestaurant({ ...restaurant, address: { ...restaurant.address, city: text } })}
      />
      <Text style={styles.label}>Area</Text>
      <TextInput
        style={styles.input}
        value={restaurant.address?.area || ''}
        onChangeText={(text) => setRestaurant({ ...restaurant, address: { ...restaurant.address, area: text } })}
      />

      <Text style={styles.sectionTitle}>Contact</Text>
      <Text style={styles.label}>Phone</Text>
      <TextInput
        style={styles.input}
        value={restaurant.contact?.phone || ''}
        onChangeText={(text) => setRestaurant({ ...restaurant, contact: { ...restaurant.contact, phone: text } })}
      />
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        value={restaurant.contact?.email || ''}
        onChangeText={(text) => setRestaurant({ ...restaurant, contact: { ...restaurant.contact, email: text } })}
      />

      <Text style={styles.sectionTitle}>Status</Text>
      <View style={styles.switchContainer}>
        <Text style={styles.label}>Active:</Text>
        <Switch
          value={restaurant.isActive}
          onValueChange={(value) => setRestaurant({ ...restaurant, isActive: value })}
        />
      </View>

      {/* Save Button */}
      <TouchableOpacity style={styles.saveButton} onPress={handleSave} disabled={saving}>
        <Text style={{ color: 'white', fontWeight: 'bold' }}>{saving ? 'Saving...' : 'Save Changes'}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: 16 },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background },
  imagePicker: { width: '100%', height: 150, backgroundColor: '#eee', borderRadius: 8, marginBottom: 16, justifyContent: 'center', alignItems: 'center' },
  logoPicker: { alignSelf: 'center', width: 100, height: 100, borderRadius: 50, backgroundColor: '#eee', marginBottom: 16, justifyContent: 'center', alignItems: 'center' },
  coverImage: { width: '100%', height: '100%', borderRadius: 8 },
  logoImage: { width: 100, height: 100, borderRadius: 50 },
  imagePlaceholder: { color: '#999', fontSize: 12 },
  label: { fontWeight: 'bold', marginTop: 10, color: colors.text },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginTop: 20, color: colors.primary },
  input: { backgroundColor: '#f9f9f9', padding: 10, borderRadius: 8, marginTop: 6, borderColor: '#ddd', borderWidth: 1 },
  switchContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 10 },
  saveButton: { backgroundColor: colors.primary, padding: 14, borderRadius: 8, marginTop: 20, alignItems: 'center' },
});
