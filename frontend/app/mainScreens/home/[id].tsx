import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, SafeAreaView, ActivityIndicator, Alert } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { useNotification } from '@/app/context/notificationContext';
import colors from '@/app/styles/colors';
import { GetProductsForRestaurant, CreateOrder, GetMyOrders } from '@/app/endpoints/userEndpoints';
import { MenuItem } from '@/app/types/restaurant';

export default function RestaurantDetailsScreen() {
  const params = useLocalSearchParams();
  const user = useSelector((state: RootState) => state.user);
  const { showNotification } = useNotification();

  const [products, setProducts] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState<{ [productId: string]: number }>({});
  const [hasActiveOrder, setHasActiveOrder] = useState(false);

  const restaurantID = params.id as string;
  const name = params.name as string;
  const banner = params.banner as string;
  const logo = params.image as string;
  const bio = params.bio as string;
  const phone = params.phone as string;
  const isActive = params.isActive === 'true';
  const openingHours = params.openingHours ? JSON.parse(params.openingHours as string) : {};

  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
  const now = new Date();
  const todayHours = openingHours?.[today];

  let isOpen = false;
  if (todayHours) {
    const [openH, openM] = todayHours.open.split(':').map(Number);
    const [closeH, closeM] = todayHours.close.split(':').map(Number);
    const openTime = new Date();
    const closeTime = new Date();
    openTime.setHours(openH, openM, 0);
    closeTime.setHours(closeH, closeM, 0);
    isOpen = now >= openTime && now <= closeTime;
  }

  const fetchProducts = async () => {
    try {
      const response = await GetProductsForRestaurant(restaurantID);
      console.log('🛒 Products fetched:', response.data);
  
      const mapped = response.data.map((prod) => ({
        id: prod._id,
        name: prod.name,
        price: prod.price,
        description: prod.description,
        image: prod.image || 'https://i.imgur.com/6VBx3io.png',
      }));
  
      setProducts(mapped);
    } catch (err) {
      console.error('❌ Error fetching products:', err);
      showNotification('Failed to load products.', 'error');
    } finally {
      setLoading(false);
    }
  };
  
  
  const fetchOrders = async (restaurantID) => {
    try {
      const response = await GetMyOrders();
      console.log('📦 Orders fetched:', response.data);
  
      const normalizeId = (rid: any): string =>
        typeof rid === 'string' ? rid : String(rid?._id || '');
      
      const activeOrder = response.data.find(
        (order) =>
          normalizeId(order.restaurantID) === String(restaurantID) &&
          (order.status === 'pending' || order.status === 'processing')
      );
            
  
      if (activeOrder) {
        console.log('⚠️ Found active order:', activeOrder);
        setHasActiveOrder(true);
      } else {
        console.log('✅ No active orders found');
        setHasActiveOrder(false);
      }
    } catch (err) {
      console.error('❌ Error checking active orders:', err);
    }
  };

  useEffect(() => {
    console.log('🍔 Route Params:', params);
  
    fetchProducts(restaurantID, setProducts, setLoading, showNotification);
    fetchOrders(restaurantID);
  }, [restaurantID]);
  

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
    return Object.entries(cart).reduce((total, [productId, quantity]) => {
      const product = products.find(p => p.id === productId);
      return product ? total + product.price * quantity : total;
    }, 0);
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
    if (!restaurantID || Object.keys(cart).length === 0) {
      showNotification('Cart is empty!', 'error');
      return;
    }

    if (!user.addresses || user.addresses.length === 0) {
      showNotification('No address found. Please update your profile.', 'error');
      return;
    }

    const defaultAddress = user.addresses.find(addr => addr.isDefault) || user.addresses[0];

    const orderItems = Object.entries(cart).map(([productId, quantity]) => ({
      productId,
      quantity,
    }));

    try {
      const response = await CreateOrder({
        restaurantID,
        items: orderItems,
        address: defaultAddress,
      });
      console.log('✅ Order created:', response);
      showNotification('Order placed successfully!', 'success');
      setCart({});
      fetchOrders(restaurantID);
    } catch (error) {
      console.error('❌ Error placing order:', error);
      showNotification('Failed to place order. Try again.', 'error');
    }
  };

  const orderingBlocked = !isActive || !isOpen || hasActiveOrder;

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
        <Image source={{ uri: banner }} style={styles.banner} />
        <View style={styles.header}>
          <Image source={{ uri: logo }} style={styles.logo} />
          <View style={{ flex: 1 }}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.statusText}>
              {isActive ? (isOpen ? '🟢 Open Now' : '🔴 Closed') : '🚫 Temporarily Inactive'}
            </Text>
            {phone && <Text style={styles.phone}>📞 {phone}</Text>}
          </View>
        </View>
        {bio && <Text style={styles.bio}>{bio}</Text>}

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
        <TouchableOpacity
          style={[styles.cartBar, orderingBlocked && { backgroundColor: '#ccc' }]}
          disabled={orderingBlocked}
          onPress={confirmCheckout}
        >
          <Text style={styles.cartBarText}>
            {hasActiveOrder
              ? '🕒 Order already in progress'
              : `${Object.values(cart).reduce((a, b) => a + b, 0)} items • $${calculateTotal().toFixed(2)} ➔ Checkout`}
          </Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  productsContainer: { padding: 16, paddingBottom: 100 },
  banner: { width: '100%', height: 160, borderRadius: 8, marginBottom: 12 },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  logo: { width: 60, height: 60, borderRadius: 30, marginRight: 12 },
  name: { fontSize: 20, fontWeight: '700', color: colors.text },
  statusText: { fontSize: 14, marginTop: 4 },
  phone: { fontSize: 12, color: '#444', marginTop: 4 },
  bio: { fontSize: 13, color: '#666', marginBottom: 16 },
  productCard: { backgroundColor: '#fff', marginBottom: 16, borderRadius: 10, overflow: 'hidden', flexDirection: 'row', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 2, elevation: 2 },
  productImage: { width: 100, height: 100 },
  productInfo: { flex: 1, padding: 12 },
  productName: { fontSize: 16, fontWeight: 'bold', color: colors.text },
  productDesc: { fontSize: 12, color: '#666', marginVertical: 4 },
  productPrice: { fontSize: 14, fontWeight: '600', color: colors.primary, marginVertical: 6 },
  cartActions: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  quantityButton: { backgroundColor: colors.primary, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 4 },
  quantityButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  quantityText: { marginHorizontal: 8, fontSize: 16, fontWeight: '600' },
  cartBar: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: colors.primary, padding: 16, alignItems: 'center', justifyContent: 'center' },
  cartBarText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});
