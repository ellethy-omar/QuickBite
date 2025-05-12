import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ActivityIndicator, StyleSheet, Alert, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { GetRestaurantProducts, AddRestaurantProduct, EditRestaurantProduct, EditRestaurantProductImage } from '@/app/endpoints/restaurantEndpoints';
import { useNotification } from '@/app/context/notificationContext';
import * as ImagePicker from 'expo-image-picker';
import { Switch } from 'react-native';
import colors from '@/app/styles/colors';

export default function AddOrEditProductScreen() {
  console.log('🛠 AddOrEditProductScreen mounted');
  const params = useLocalSearchParams();
  const productId = params.productId as string | undefined;
  const router = useRouter();
  const { showNotification } = useNotification();

  const [formData, setFormData] = useState({
    _id: '',
    name: '',
    description: '',
    price: '',
    category: '',
    stockAvailable: '',
    isAvailable: true,
    image: '',
  });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [newImageBase64, setNewImageBase64] = useState<string | null>(null);

  const isFormValid = formData.name.trim() && formData.price.trim() && formData.category.trim() && formData.stockAvailable.trim();

  useEffect(() => {
    console.log('📋 All params:', params);
    if (productId) {
      const fetchProduct = async () => {
        try {
          setLoading(true);
          console.log('📡 Fetching products to find product:', productId);
          const response = await GetRestaurantProducts();
          console.log('📦 Fetched products:', response.data);
          const product = response.data.find((p: any) => p._id === productId);
          if (product) {
            setFormData({
              _id: product._id,
              name: product.name || '',
              description: product.description || '',
              price: product.price ? product.price.toString() : '',
              category: product.category || '',
              stockAvailable: product.stockAvailable ? product.stockAvailable.toString() : '',
              isAvailable: product.isAvailable ?? true,
              image: product.image || '',
            });
            console.log('✅ Product loaded:', product);
          } else {
            console.warn('⚠️ Product not found for id:', productId);
            showNotification('Product not found.', 'error');
          }
        } catch (error: any) {
          console.error('❌ Error fetching product:', {
            message: error.message,
            response: error.response?.data,
            status: error.response?.status,
          });
          showNotification('Failed to load product.', 'error');
        } finally {
          setLoading(false);
        }
      };
      fetchProduct();
    }
  }, [productId, showNotification]);

  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.7,
      base64: true,
    });

    console.log('📷 Image picker result:', {
      canceled: result.canceled,
      assets: result.assets ? result.assets.map(a => ({
        uri: a.uri,
        base64Length: a.base64?.length,
      })) : null,
    });

    if (!result.canceled && result.assets?.[0]?.base64) {
      const base64 = result.assets[0].base64.replace(/^data:image\/[a-z]+;base64,/, '');
      setNewImageBase64(base64);
      console.log('✅ Image selected, cleaned Base64 length:', base64.length);
    } else {
      console.warn('⚠️ Image selection canceled or no Base64 data');
    }
  };

  const handleSave = async () => {
    if (!isFormValid) {
      Alert.alert('Error', 'Please fill in all required fields.');
      console.warn('⚠️ Form invalid, missing required fields:', {
        name: formData.name.trim(),
        price: formData.price.trim(),
        category: formData.category.trim(),
        stockAvailable: formData.stockAvailable.trim(),
      });
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
        stockAvailable: parseInt(formData.stockAvailable),
        isAvailable: formData.isAvailable,
      };

      console.log('📤 Sending product payload:', payload);

      let savedProductId = formData._id;

      if (productId) {
        // ✅ EDIT
        const response = await EditRestaurantProduct(payload);
        console.log('✅ Product updated successfully:', response);
        showNotification('Product updated successfully!', 'success');
      } else {
        // ✅ ADD
        const response = await AddRestaurantProduct(payload);
        savedProductId = response._id;
        console.log('✅ Product added successfully:', response);
        showNotification('Product added successfully!', 'success');
      }

      // ✅ Upload image if selected
      if (newImageBase64 && savedProductId) {
        const imagePayload = {
          _id: savedProductId,
          imageBase64: newImageBase64,
          tags: ['product'],
        };
        console.log('📸 Sending image upload:', {
          productId: savedProductId,
          imageBase64Length: newImageBase64.length,
          tags: imagePayload.tags,
        });
        try {
          const imageResponse = await EditRestaurantProductImage(imagePayload);
          console.log('✅ Product image updated successfully:', imageResponse);
          showNotification('Product image updated!', 'success');
        } catch (imageError: any) {
          console.error('❌ Detailed error updating product image:', {
            message: imageError.message,
            response: imageError.response?.data,
            status: imageError.response?.status,
          });
          showNotification('Failed to update product image.', 'error');
        }
      } else if (newImageBase64 && !savedProductId) {
        console.warn('⚠️ Skipping image upload: missing productId');
      }

      router.back();
    } catch (error: any) {
      console.error('❌ Error saving product:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
      showNotification('Failed to save product.', 'error');
    } finally {
      setSaving(false);
    }
  };

  if (productId && loading) {
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
        style={[styles.input, { height: 80, textAlignVertical: 'top' }]}
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

      <Text style={styles.label}>Stock Available</Text>
      <TextInput
        style={styles.input}
        value={formData.stockAvailable}
        keyboardType="numeric"
        onChangeText={(text) => setFormData({ ...formData, stockAvailable: text })}
        placeholder="Enter stock available"
      />

      <View style={styles.switchContainer}>
        <Text style={styles.label}>Available</Text>
        <Switch
          value={formData.isAvailable}
          onValueChange={(value) => setFormData({ ...formData, isAvailable: value })}
        />
      </View>

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
            {productId ? 'Update Product' : 'Add Product'}
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
    marginBottom: 10,
  },
});