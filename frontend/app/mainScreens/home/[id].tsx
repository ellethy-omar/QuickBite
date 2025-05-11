import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, SafeAreaView, ActivityIndicator, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { useNotification } from '@/app/context/notificationContext';
import colors from '@/app/styles/colors';
import { GetProductsForRestaurant, CreateOrder, GetMyOrders } from '@/app/endpoints/userEndpoints';
import { MenuItem } from '@/app/types/restaurant';

export default function RestaurantDetailsScreen() {
  const params = useLocalSearchParams();
  const router = useRouter();
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
      console.log('🛒 Raw products response:', JSON.stringify(response.data, null, 2));

      const mapped = response.data.map((prod) => ({
        id: prod._id,
        name: prod.name,
        price: prod.price,
        description: prod.description,
        image: prod.image || 'https://i.imgur.com/6VBx3io.png',
        stockAvailable: prod.stockAvailable,
        restraurantId: prod.restraurantId,
        category: prod.category,
        isAvailable: prod.isAvailable ?? true, // Default to true if undefined
      }));

      console.log('🛒 Mapped products:', mapped);
      setProducts(mapped);

      // Warn if no products are available
      if (mapped.length > 0 && mapped.every((p) => !p.isAvailable)) {
        showNotification('No products are currently available.', 'error');
      }
    } catch (err) {
      console.error('❌ Error fetching products:', err);
      showNotification('Failed to load products.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await GetMyOrders();
      console.log('📦 Orders fetched:', response.data);

      const normalizeId = (rid: any): string =>
        typeof rid === 'string' ? rid : String(rid?._id || '');

      const activeOrder = response.data.find(
        (order) =>
          normalizeId(order.restaurantID) === restaurantID &&
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
      showNotification('Failed to check active orders.', 'error');
    }
  };

  useEffect(() => {
    console.log('🍔 Route Params:', params);
    console.log('👤 Current user:', user);
    fetchProducts();
    fetchOrders();
  }, [restaurantID, user]);

  const addToCart = (productId: string) => {
    const product = products.find((p) => p.id === productId);
    if (!product) {
      showNotification('Product not found.', 'error');
      return;
    }
    if (!product.isAvailable) {
      showNotification('This item is not available.', 'error');
      return;
    }
    setCart((prev) => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1,
    }));
    showNotification('Added to cart!', 'success');
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => {
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
      const product = products.find((p) => p.id === productId);
      return product ? total + product.price * quantity : total;
    }, 0);
  };

  const confirmCheckout = () => {
    if (!user.addresses || user.addresses.length === 0) {
      Alert.alert(
        'No Address Found',
        'You need to add a delivery address to place an order.',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Add Address', onPress: () => router.push('/mainScreens/settings/profile') },
        ]
      );
      return;
    }

    Alert.alert(
      'Confirm Order',
      `You are about to place an order for ${Object.values(cart).reduce((a, b) => a + b, 0)} items totaling $${calculateTotal().toFixed(2)}.`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Confirm', onPress: handleCheckout },
      ]
    );
  };

  const handleCheckout = async () => {
    if (!restaurantID || Object.keys(cart).length === 0) {
      showNotification('Cart is empty!', 'error');
      return;
    }

    if (!user.addresses || user.addresses.length === 0) {
      showNotification('No address found. Please add an address.', 'error');
      return;
    }

    const defaultAddress = user.addresses.find((addr) => addr.isDefault) || user.addresses[0];
    // Clean address object to remove _id and validate fields
    const cleanedAddress = {
      label: defaultAddress.label || 'Home',
      area: defaultAddress.area || '',
      street: defaultAddress.street || '',
      building: defaultAddress.building || '',
      floor: defaultAddress.floor || '',
      apartment: defaultAddress.apartment || '',
      isDefault: defaultAddress.isDefault || true,
    };

    const orderItems = Object.entries(cart).map(([productId, quantity]) => ({
      productId,
      quantity,
    }));

    // Validate product IDs and stock
    const invalidItems = orderItems.filter((item) => {
      const product = products.find((p) => p.id === item.productId);
      return !product || !product.isAvailable || (product.stockAvailable && item.quantity > product.stockAvailable);
    });
    if (invalidItems.length > 0) {
      showNotification('Some items in your cart are invalid or out of stock.', 'error');
      return;
    }

    const orderPayload = {
      restaurantID,
      items: orderItems,
      address: cleanedAddress,
    };
    console.log('📦 Order payload:', JSON.stringify(orderPayload, null, 2));

    try {
      const response = await CreateOrder(orderPayload);
      console.log('✅ Order created:', response);
      showNotification('Order placed successfully!', 'success');
      setCart({});
      await fetchOrders(); // Refresh active order status
    } catch (error: any) {
      console.error('❌ Error placing order:', error);
      const status = error.response?.status;
      const errorMessage = error.response?.data?.error || 'Unknown error';
      const fullResponse = error.response?.data || {};
      console.error('❌ Server error message:', errorMessage);
      console.error('❌ Full server response:', JSON.stringify(fullResponse, null, 2));
      if (status === 403) {
        showNotification(`Missing required order details: ${errorMessage}`, 'error');
      } else if (status === 420) {
        showNotification('Please log in again.', 'error');
      } else if (status === 469) {
        showNotification('You don’t have permission to place this order.', 'error');
      } else if (status === 500) {
        showNotification('Server error. Please contact support (Ref: Omar).', 'error');
      } else {
        showNotification(`Failed to place order: ${errorMessage}`, 'error');
      }
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

        {products.map((product) => (
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
                <TouchableOpacity
                  style={[styles.quantityButton, !product.isAvailable && { backgroundColor: '#ccc' }]}
                  onPress={() => addToCart(product.id)}
                  disabled={!product.isAvailable}
                >
                  <Text style={styles.quantityButtonText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      {Object.keys(cart).length > 0 && (
        <TouchableOpacity
          style={[styles.cartBar, orderingBlocked && false && { backgroundColor: '#ccc' }]}
          disabled={orderingBlocked && false}
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