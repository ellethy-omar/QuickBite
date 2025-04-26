import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { AddRestaurantProduct, EditRestaurantProduct, GetRestaurantProducts } from '@/app/endpoints/restaurantEndpoints';
import { useNotification } from '@/app/context/notificationContext';
import colors from '@/app/styles/colors';

export default function AddOrEditProductScreen() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const router = useRouter();
  const { showNotification } = useNotification();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    isAvailable: true,
  });

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        try {
          const response = await GetRestaurantProducts();
          const product = response.data.find((p: any) => p._id === id);
          if (product) {
            setFormData({
              name: product.name,
              description: product.description,
              price: product.price.toString(),
              category: product.category,
              isAvailable: product.isAvailable,
            });
          }
        } catch (error) {
          console.error('Error fetching product:', error);
          showNotification('Failed to load product.', 'error');
        }
      };

      fetchProduct();
    }
  }, [id]);

  const handleSave = async () => {
    if (!formData.name || !formData.price || !formData.category) {
      Alert.alert('Error', 'Please fill in all required fields.');
      return;
    }
  
    const cleanedProduct = {
      name: formData.name.trim(),
      description: formData.description.trim(),
      price: parseFloat(formData.price), // 💥 MAKE SURE it's number
      category: formData.category.trim(),
      isAvailable: formData.isAvailable ?? true, // 💥 FORCE boolean
    };
  
    try {
      if (id) {
        await EditRestaurantProduct({
          _id: id,
          ...cleanedProduct,
        });
        showNotification('Product updated successfully!', 'success');
      } else {
        await AddRestaurantProduct(cleanedProduct);
        showNotification('Product added successfully!', 'success');
      }
      router.back();
    } catch (error) {
      console.error('🔴 Error saving product:', error);
      showNotification('Failed to save product.', 'error');
    }
  };
  
  
  

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Product Name</Text>
      <TextInput
        style={styles.input}
        value={formData.name}
        onChangeText={(text) => setFormData({ ...formData, name: text })}
        placeholder="Enter product name"
      />

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={styles.input}
        value={formData.description}
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

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>{id ? 'Update Product' : 'Add Product'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: colors.background },
  label: { fontSize: 14, fontWeight: 'bold', marginTop: 10, color: colors.text },
  input: { backgroundColor: '#f9f9f9', padding: 10, borderRadius: 8, marginTop: 6, marginBottom: 10, borderColor: '#ddd', borderWidth: 1 },
  saveButton: { backgroundColor: colors.primary, padding: 14, borderRadius: 8, marginTop: 20, alignItems: 'center' },
  saveButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});
