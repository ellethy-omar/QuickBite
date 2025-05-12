import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, Image, StyleSheet, RefreshControl } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import { useRouter } from 'expo-router';
import { GetRestaurantProducts } from '@/app/endpoints/restaurantEndpoints';
import { useNotification } from '@/app/context/notificationContext';
import colors from '@/app/styles/colors';

export default function DashboardScreen() {
  const router = useRouter();
  const { showNotification } = useNotification();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await GetRestaurantProducts();
      console.log('📦 Fetched products:', response.data);
      setProducts(response.data || []);
      console.log('✅ Products fetched successfully:', {
        count: response.data.length,
        productIds: response.data.map((p: any) => p._id),
      });
    } catch (error: any) {
      console.error('❌ Error fetching products:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
      showNotification('Failed to load products.', 'error');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    console.log('🔄 Refreshing products...');
    fetchProducts();
  }, []);

  useFocusEffect(
    useCallback(() => {
      console.log('🛠 DashboardScreen focused, fetching products...');
      fetchProducts();
    }, [])
  );

  const handleAddProduct = () => {
    console.log('➕ Navigating to add new product');
    router.push('/restaurantScreens/dashboard/addOrEditProduct');
  };

  const handleEditProduct = (productId: string) => {
    console.log('✏️ Navigating to edit product:', productId);
    router.push(`/restaurantScreens/dashboard/addOrEditProduct?id=${productId}`);
  };

  if (loading) {
    console.log('⏳ Rendering loading state');
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Loading products...</Text>
      </View>
    );
  }

  if (!loading && products.length === 0) {
    console.log('📭 Rendering empty state');
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.emptyText}>No products yet. Add your first one!</Text>
        <TouchableOpacity style={styles.addButton} onPress={handleAddProduct}>
          <Text style={styles.addButtonText}>+ Add New Product</Text>
        </TouchableOpacity>
      </View>
    );
  }

  console.log('📋 Rendering product list:', { count: products.length });
  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.productCard}
            onPress={() => handleEditProduct(item._id)}
          >
            {/* --- Product Image --- */}
            <Image
              source={{ uri: item.image || 'https://via.placeholder.com/150' }}
              style={styles.productImage}
              resizeMode="cover"
            />
            {/* --- Product Details --- */}
            <View style={styles.productDetails}>
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.productCategory}>{item.category}</Text>
              <Text style={styles.productDescription} numberOfLines={2}>
                {item.description}
              </Text>
              <View style={styles.priceAvailabilityRow}>
                <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
                {/* Optional: Uncomment to show availability */}
                {/* <Text
                  style={[
                    styles.availability,
                    { color: item.isAvailable ? '#4CAF50' : '#F44336' },
                  ]}
                >
                  {item.isAvailable ? 'Available' : 'Unavailable'}
                </Text> */}
              </View>
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={{ paddingBottom: 100 }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[colors.primary]}
            tintColor={colors.primary}
          />
        }
      />
      <TouchableOpacity style={styles.floatingAddButton} onPress={handleAddProduct}>
        <Text style={styles.floatingAddButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: 16 },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background, padding: 16 },
  loadingText: { fontSize: 16, color: '#666', marginTop: 12 },
  emptyText: { fontSize: 16, color: '#666', marginBottom: 20, textAlign: 'center' },
  addButton: { backgroundColor: colors.primary, padding: 14, borderRadius: 8, alignItems: 'center', width: '80%' },
  addButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  productCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 12,
    marginBottom: 12,
    borderRadius: 8,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  productImage: { width: 80, height: 80, borderRadius: 8, marginRight: 12 },
  productDetails: { flex: 1, justifyContent: 'center' },
  productName: { fontWeight: 'bold', fontSize: 16, color: colors.primary },
  productCategory: { fontSize: 12, color: '#999', marginTop: 2 },
  productDescription: { fontSize: 12, color: '#666', marginTop: 4 },
  priceAvailabilityRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 },
  productPrice: { fontWeight: 'bold', color: '#000', fontSize: 14 },
  availability: { fontWeight: 'bold', fontSize: 12 },
  floatingAddButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: colors.primary,
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  floatingAddButtonText: { color: 'white', fontSize: 32, fontWeight: 'bold' },
});