import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ActivityIndicator, StyleSheet, Alert, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { AddRestaurantProduct, EditRestaurantProduct, GetRestaurantProducts, EditRestaurantProductImage } from '@/app/endpoints/restaurantEndpoints';
import { useNotification } from '@/app/context/notificationContext';
import * as ImagePicker from 'expo-image-picker';
import { Switch } from 'react-native';
import colors from '@/app/styles/colors';

export default function AddOrEditProductScreen() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const router = useRouter();
  const { showNotification } = useNotification();

  const [formData, setFormData] = useState({
    _id: '',
    name: '',
    description: '',
    price: '',
    category: '',
    isAvailable: true,
    image: '',
  });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [newImageBase64, setNewImageBase64] = useState<string | null>(null);

  const isFormValid = formData.name.trim() && formData.price.trim() && formData.category.trim();

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        try {
          setLoading(true);
          const response = await GetRestaurantProducts();
          const product = response.data.find((p: any) => p._id === id);
          if (product) {
            setFormData({
              _id: product._id,
              name: product.name,
              description: product.description,
              price: product.price.toString(),
              category: product.category,
              isAvailable: product.isAvailable,
              image: product.image || '',
            });
          }
        } catch (error) {
          console.error('Error fetching product:', error);
          showNotification('Failed to load product.', 'error');
        } finally {
          setLoading(false);
        }
      };
      fetchProduct();
    }
  }, [id]);

  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.7,
      base64: true,
    });

    if (!result.canceled && result.assets?.[0]?.base64) {
      setNewImageBase64(result.assets[0].base64);
    }
  };

  const handleSave = async () => {
    if (!isFormValid) {
      Alert.alert('Error', 'Please fill in all required fields.');
      return;
    }
  
    try {
      setSaving(true);
  
      const payload = {
        _id: formData._id,
        name: formData.name.trim(),
        description: formData.description.trim(),
        price: parseFloat(formData.price),
        category: formData.category.trim(),
        isAvailable: formData.isAvailable,
      };
  
      let productId = formData._id;
  
      if (id) {
        // ✅ EDIT
        await EditRestaurantProduct(payload);
        showNotification('Product updated successfully!', 'success');
      } else {
        // ✅ ADD
        const response = await AddRestaurantProduct({
          ...payload,
          stockAvailable: 99, // only needed in Add
        });
        productId = response._id;
        showNotification('Product added successfully!', 'success');
      }
  
      // ✅ Upload image if selected
      if (newImageBase64 && productId) {
        await EditRestaurantProductImage({
          _id: productId,
          imageBase64: newImageBase64,
          tags: ['product'],
        });
        showNotification('Product image updated!', 'success');
      }
  
      router.back();
    } catch (error) {
      console.error('❌ Error saving product:', error);
      showNotification('Failed to save product.', 'error');
    } finally {
      setSaving(false);
    }
  };
  
  

  if (id && loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 100 }}>
      {formData.image || newImageBase64 ? (
        <Image
          source={{ uri: newImageBase64 ? `data:image/jpeg;base64,${newImageBase64}` : formData.image }}
          style={styles.productImage}
          resizeMode="cover"
        />
      ) : null}

      <TouchableOpacity style={styles.imageButton} onPress={handlePickImage}>
        <Text style={styles.imageButtonText}>Upload / Change Image</Text>
      </TouchableOpacity>

      <Text style={styles.label}>Product Name</Text>
      <TextInput 
        style={styles.input} 
        value={formData.name} 
        onChangeText={(text) => setFormData({ ...formData, name: text })} 
        placeholder="Enter product name" 
      />

      <Text style={styles.label}>Description</Text>
      <TextInput 
        style={[styles.input, { height: 80 }]} 
        value={formData.description} 
        multiline 
        onChangeText={(text) => setFormData({ ...formData, description: text })} 
        placeholder="Enter description" 
      />

      <Text style={styles.label}>Price</Text>
      <TextInput 
        style={styles.input} 
        value={formData.price} 
        keyboardType="decimal-pad" 
        onChangeText={(text) => setFormData({ ...formData, price: text })} 
        placeholder="Enter price" 
      />

      <Text style={styles.label}>Category</Text>
      <TextInput 
        style={styles.input} 
        value={formData.category} 
        onChangeText={(text) => setFormData({ ...formData, category: text })} 
        placeholder="Enter category" 
      />
      {/* <View style={styles.switchContainer}>
  <Text style={styles.label}>Available:</Text>
  <Switch
    value={formData.isAvailable}
    onValueChange={(value) => setFormData({ ...formData, isAvailable: value })}
  />
</View> */}

      <TouchableOpacity
        style={[
          styles.saveButton,
          { backgroundColor: isFormValid ? colors.primary : '#ccc' }
        ]}
        onPress={handleSave}
        disabled={!isFormValid || saving}
      >
        {saving ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.saveButtonText}>
            {id ? 'Update Product' : 'Add Product'}
          </Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background },
  productImage: { width: '100%', height: 180, borderRadius: 8, marginBottom: 10 },
  label: { fontSize: 14, fontWeight: 'bold', marginTop: 10, color: colors.text },
  input: { backgroundColor: '#f9f9f9', padding: 10, borderRadius: 8, marginTop: 6, marginBottom: 10, borderColor: '#ddd', borderWidth: 1 },
  imageButton: { backgroundColor: '#ddd', padding: 10, borderRadius: 8, alignItems: 'center', marginBottom: 20 },
  imageButtonText: { fontSize: 14, fontWeight: 'bold', color: '#333' },
  saveButton: { padding: 14, borderRadius: 8, marginTop: 20, alignItems: 'center' },
  saveButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  
});
