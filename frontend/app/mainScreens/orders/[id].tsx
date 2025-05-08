import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { GetMyOrders, CancelOrder } from '@/app/endpoints/userEndpoints';
import { RawOrder } from '@/app/types/orders';
import colors from '@/app/styles/colors';
import { useNotification } from '@/app/context/notificationContext';

export default function OrderDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { showNotification } = useNotification();

  const [order, setOrder] = useState<RawOrder | null>(null);
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState(false);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await GetMyOrders();
        const found = response.data.find((o) => o._id === id);
        setOrder(found || null);
      } catch (err) {
        console.error('❌ Failed to fetch orders:', err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchOrder();
  }, [id]);

  const handleCancel = async () => {
    Alert.alert('Cancel Order', 'Are you sure you want to cancel this order?', [
      { text: 'No', style: 'cancel' },
      {
        text: 'Yes',
        onPress: async () => {
          try {
            setCancelling(true);
            await CancelOrder(order!._id);
            showNotification('Order cancelled successfully.', 'success');
            router.back();
          } catch (err) {
            console.error('❌ Error cancelling order:', err);
            showNotification('Failed to cancel order.', 'error');
          } finally {
            setCancelling(false);
          }
        },
      },
    ]);
  };

  if (loading || !order) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={{ marginTop: 12 }}>Loading order details...</Text>
      </View>
    );
  }

  const restaurant = order.restaurantID;
  const formattedDate = new Date(order.createdAt).toLocaleString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit'
  });

  const isCancelable = !order.deliveryDriverID && order.status === 'pending';

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Order #{order._id}</Text>
        <Text style={[
  styles.statusLabel,
  order.status === 'cancelled'
    ? styles.statusCancelled
    : order.status === 'delivered'
    ? styles.statusDelivered
    : styles.statusProcessing
]}>
  {order.status.toUpperCase()}
</Text>

        <Text style={styles.subtitle}>{formattedDate}</Text>

        <View style={styles.restaurantRow}>
          <Image source={{ uri: restaurant.logo }} style={styles.restaurantLogo} />
          <Text style={styles.restaurantName}>{restaurant.name}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Items</Text>
          {order.items.map((item, index) => (
            <View key={index} style={styles.itemRow}>
              <Text style={styles.itemText}>{item.quantity}x</Text>
              <Text style={styles.itemText}>{item.productId?.name || 'Item'}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Total Amount</Text>
          <Text style={styles.total}>${order.totalAmount.toFixed(2)}</Text>
        </View>

        {order.deliveryDriverID && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Driver Assigned</Text>
            <Text style={styles.itemText}>
              A driver has accepted your order. (ID: {order.deliveryDriverID.slice(0, 6)}…)
            </Text>
          </View>
        )}


        {isCancelable && (
          <TouchableOpacity 
            style={[styles.cancelButton, cancelling && { opacity: 0.6 }]} 
            onPress={handleCancel}
            disabled={cancelling}
          >
            <Ionicons name="close-circle" size={18} color="#fff" style={{ marginRight: 6 }} />
            <Text style={styles.cancelText}>{cancelling ? 'Cancelling...' : 'Cancel Order'}</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity style={styles.supportButton}>
          <FontAwesome name="question-circle" size={16} color={colors.primary} />
          <Text style={styles.supportText}>Need help with this order?</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  card: { margin: 16, backgroundColor: '#fff', borderRadius: 12, padding: 16, elevation: 2 },
  title: { fontSize: 18, fontWeight: '600', color: colors.text },
  subtitle: { fontSize: 13, color: '#777', marginBottom: 12 },
  restaurantRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  restaurantLogo: { width: 40, height: 40, borderRadius: 20, marginRight: 12 },
  restaurantName: { fontSize: 16, fontWeight: '500', color: colors.text },
  section: { marginBottom: 16 },
  sectionTitle: { fontSize: 15, fontWeight: '600', marginBottom: 8, color: colors.text },
  itemRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  itemText: { fontSize: 14, color: '#444' },
  total: { fontSize: 16, fontWeight: '700', color: colors.primary },
  cancelButton: {
    backgroundColor: '#d9534f',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 6,
    marginTop: 12,
  },
  cancelText: { color: '#fff', fontWeight: '600' },
  supportButton: { flexDirection: 'row', alignItems: 'center', marginTop: 16 },
  supportText: { marginLeft: 6, color: colors.primary, fontWeight: '500' },
  statusLabel: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    fontSize: 13,
    fontWeight: '600',
    marginTop: 6,
    marginBottom: 12,
    textTransform: 'uppercase'
  },
  statusDelivered: {
    backgroundColor: '#E8F5E9',
    color: '#2e7d32',
  },
  statusProcessing: {
    backgroundColor: '#FFF8E1',
    color: '#FFA000',
  },
  statusCancelled: {
    backgroundColor: '#FCE4EC',
    color: '#C62828',
  },
  
});
