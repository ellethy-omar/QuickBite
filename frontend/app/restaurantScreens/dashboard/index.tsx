import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { GetRestaurantProducts } from '@/app/endpoints/restaurantEndpoints';
import { useNotification } from '@/app/context/notificationContext';
import colors from '@/app/styles/colors';

export default function DashboardScreen() {
  const router = useRouter();
  const { showNotification } = useNotification();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await GetRestaurantProducts();
        setProducts(response.data || []);
      } catch (error) {
        console.error('Error fetching products:', error);
        showNotification('Failed to load products.', 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList 
        data={products}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.productCard}
            onPress={() => router.push(`/restaurantScreens/dashboard/addOrEditProduct?id=${item._id}`)}
          >
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productDescription}>{item.description}</Text>
            <Text style={styles.productPrice}>${item.price}</Text>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity style={styles.addButton} onPress={() => router.push('/restaurantScreens/dashboard/addOrEditProduct')}>
        <Text style={styles.addButtonText}>+ Add New Product</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: 16 },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background },
  productCard: { backgroundColor: '#fff', padding: 16, marginBottom: 12, borderRadius: 8, borderColor: '#ddd', borderWidth: 1 },
  productName: { fontWeight: 'bold', fontSize: 16, color: colors.primary },
  productDescription: { fontSize: 12, color: '#666', marginTop: 4 },
  productPrice: { marginTop: 6, fontWeight: '600', color: '#000' },
  addButton: { backgroundColor: colors.primary, padding: 14, borderRadius: 8, marginTop: 20, alignItems: 'center' },
  addButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});
