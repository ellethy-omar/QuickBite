import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, SafeAreaView, ActivityIndicator, Alert } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { useNotification } from '@/app/context/notificationContext';
import colors from '@/app/styles/colors';
import { GetProductsForRestaurant, CreateOrder } from '@/app/endpoints/userEndpoints';
import { MenuItem } from '@/app/types/restaurant';

export default function RestaurantDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { showNotification } = useNotification();
  const user = useSelector((state: RootState) => state.user);

  const [products, setProducts] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState<{ [productId: string]: number }>({});

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await GetProductsForRestaurant(id as string);
        const mappedProducts: MenuItem[] = response.data.map((prod: any) => ({
          id: prod._id,
          name: prod.name,
          price: prod.price,
          description: prod.description,
          image: prod.image || 'https://via.placeholder.com/100',
        }));
        setProducts(mappedProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
        showNotification('Failed to load products.', 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [id]);

  const addToCart = (productId: string) => {
    setCart(prev => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1,
    }));
    showNotification('Added to cart!', 'success');
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => {
      const updatedCart = { ...prev };
      if (updatedCart[productId] > 1) {
        updatedCart[productId] -= 1;
      } else {
        delete updatedCart[productId];
      }
      return updatedCart;
    });
  };

  const calculateTotal = () => {
    let total = 0;
    for (const productId in cart) {
      const product = products.find(p => p.id === productId);
      if (product) {
        total += product.price * cart[productId];
      }
    }
    return total;
  };

  const confirmCheckout = () => {
    Alert.alert(
      "Confirm Order",
      `You are about to place an order for ${Object.values(cart).reduce((a, b) => a + b, 0)} items totaling $${calculateTotal().toFixed(2)}.`,
      [
        { text: "Cancel", style: "cancel" },
        { text: "Confirm", onPress: handleCheckout },
      ]
    );
  };

  const handleCheckout = async () => {
    if (!id || Object.keys(cart).length === 0) {
      showNotification('Cart is empty!', 'error');
      return;
    }

    if (!user.addresses || user.addresses.length === 0) {
      showNotification('No address found. Please update your profile.', 'error');
      return;
    }

    const defaultAddress = user.addresses.find(addr => addr.isDefault) || user.addresses[0];

    if (!defaultAddress) {
      showNotification('No valid address found.', 'error');
      return;
    }

    const orderItems = Object.keys(cart).map(productId => ({
      productId,
      quantity: cart[productId],
    }));

    try {
      const orderData = {
        restaurantID: id as string,
        items: orderItems,
        address: defaultAddress,
      };

      const response = await CreateOrder(orderData);
      console.log('Order created:', response);
      showNotification('Order placed successfully!', 'success');
      setCart({});
    } catch (error) {
      console.error('Error placing order:', error);
      showNotification('Failed to place order. Try again.', 'error');
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.productsContainer}>
        {products.map(product => (
          <View key={product.id} style={styles.productCard}>
            <Image source={{ uri: product.image }} style={styles.productImage} />
            <View style={styles.productInfo}>
              <Text style={styles.productName}>{product.name}</Text>
              <Text style={styles.productDesc}>{product.description}</Text>
              <Text style={styles.productPrice}>${product.price.toFixed(2)}</Text>

              <View style={styles.cartActions}>
                <TouchableOpacity style={styles.quantityButton} onPress={() => removeFromCart(product.id)}>
                  <Text style={styles.quantityButtonText}>−</Text>
                </TouchableOpacity>
                <Text style={styles.quantityText}>{cart[product.id] || 0}</Text>
                <TouchableOpacity style={styles.quantityButton} onPress={() => addToCart(product.id)}>
                  <Text style={styles.quantityButtonText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      {Object.keys(cart).length > 0 && (
        <TouchableOpacity style={styles.cartBar} onPress={confirmCheckout}>
          <Text style={styles.cartBarText}>
            {Object.values(cart).reduce((a, b) => a + b, 0)} items • ${calculateTotal().toFixed(2)} ➔ Checkout
          </Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background },
  productsContainer: { padding: 16, paddingBottom: 100 },
  productCard: { backgroundColor: '#fff', marginBottom: 16, borderRadius: 10, overflow: 'hidden', flexDirection: 'row', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 2, elevation: 2 },
  productImage: { width: 100, height: 100 },
  productInfo: { flex: 1, padding: 12 },
  productName: { fontSize: 16, fontWeight: 'bold', color: colors.text },
  productDesc: { fontSize: 12, color: '#666', marginVertical: 4 },
  productPrice: { fontSize: 14, fontWeight: '600', color: colors.primary, marginVertical: 6 },
  cartActions: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  quantityButton: { backgroundColor: colors.primary, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 4 },
  quantityButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  quantityText: { marginHorizontal: 8, fontSize: 16, fontWeight: '600', color: colors.text },
  cartBar: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: colors.primary, padding: 16, alignItems: 'center', justifyContent: 'center' },
  cartBarText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});
