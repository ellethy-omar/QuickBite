import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, Alert, ActivityIndicator, RefreshControl } from 'react-native';
import { useFocusEffect, useRouter } from 'expo-router';
import { GetRestaurantProducts, DeleteRestaurantProduct } from '@/app/endpoints/restaurantEndpoints';
import { useNotification } from '@/app/context/notificationContext';
import colors from '@/app/styles/colors';
import { Ionicons } from '@expo/vector-icons';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image?: string;
  stockAvailable: number;
  isAvailable: boolean;
}

export default function DashboardScreen() {
  console.log('🛠 DashboardScreen component mounted');
  const router = useRouter();
  const { showNotification } = useNotification();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchProducts = async () => {
    try {
      console.log('📡 Fetching restaurant products...');
      const response = await GetRestaurantProducts();
      console.log('📦 Fetched products:', response.data);
      setProducts(response.data || []);
      console.log('✅ Products fetched successfully:', {
        count: response.data.length,
        productIds: response.data.map((p: Product) => p._id),
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

  const handleDeleteProduct = async (productId: string, productName: string) => {
    Alert.alert(
      'Delete Product',
      `Are you sure you want to delete "${productName}"? This cannot be undone.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              console.log('🗑 Deleting product:', productId);
              await DeleteRestaurantProduct(productId);
              console.log('✅ Product deleted successfully:', productId);
              showNotification('Product deleted successfully!', 'success');
              fetchProducts();
            } catch (error: any) {
              console.error('❌ Error deleting product:', {
                productId,
                message: error.message,
                response: error.response?.data,
                status: error.response?.status,
              });
              showNotification(
                error.response?.status === 404
                  ? 'Product not found.'
                  : error.response?.status === 420
                  ? 'Authorization token invalid.'
                  : error.response?.status === 469
                  ? 'Not authorized to delete product.'
                  : 'Failed to delete product.',
                'error'
              );
            }
          },
        },
      ]
    );
  };

  const renderProductCard = ({ item }: { item: Product }) => {
    console.log('📄 Rendering product card:', item._id);
    return (
      <View style={styles.productCard}>
        <Image
          source={{ uri: item.image || 'https://via.placeholder.com/150' }}
          style={styles.productImage}
        />
        <View style={styles.productDetails}>
          <Text style={styles.productName}>{item.name}</Text>
          <Text style={styles.productDescription} numberOfLines={2}>
            {item.description}
          </Text>
          <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
          <Text style={styles.productStock}>
            Stock: x{item.stockAvailable} 
            {/* {item.isAvailable ? '(Available)' : '(Unavailable)'} */}
          </Text>
        </View>
        <View style={styles.productActions}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => router.push(`/restaurantScreens/dashboard/addOrEditProduct?productId=${item._id}`)}
          >
            <Ionicons name="pencil" size={20} color={colors.primary} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => handleDeleteProduct(item._id, item.name)}
          >
            <Ionicons name="trash" size={20} color="#d9534f" />
          </TouchableOpacity>
        </View>
      </View>
    );
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

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={(item) => item._id}
        renderItem={renderProductCard}
        contentContainerStyle={{ paddingBottom: 100 }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[colors.primary]}
            tintColor={colors.primary}
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No products yet.</Text>
          </View>
        }
      />
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => router.push('/restaurantScreens/dashboard/addOrEditProduct')}
      >
        <Ionicons name="add" size={30} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background },
  loadingText: { fontSize: 16, color: '#666', marginTop: 12 },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  emptyText: { fontSize: 16, color: '#666', textAlign: 'center' },
  productCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 12,
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 8,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  productImage: { width: 80, height: 80, borderRadius: 8, marginRight: 12 },
  productDetails: { flex: 1 },
  productName: { fontSize: 16, fontWeight: 'bold', color: colors.text },
  productDescription: { fontSize: 14, color: '#666', marginTop: 4 },
  productPrice: { fontSize: 14, fontWeight: 'bold', color: colors.primary, marginTop: 4 },
  productStock: { fontSize: 12, color: '#666', marginTop: 4 },
  productActions: { justifyContent: 'space-between', alignItems: 'center' },
  actionButton: { padding: 8 },
  floatingButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: colors.primary,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
});