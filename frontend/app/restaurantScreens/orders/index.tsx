import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, StyleSheet, RefreshControl, Modal } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import {
  RGetRestaurantAllCalledOrders,
  RGetRestaurantAllRequiredOrders,
  RGetOrdersHistory,
  RAcceptOrder,
  RRejectOrder,
  GetRestaurantProducts,
} from '@/app/endpoints/restaurantEndpoints';
import { useNotification } from '@/app/context/notificationContext';
import colors from '@/app/styles/colors';

interface Order {
  _id: string;
  status: string;
  userID: {
    _id: string;
    name: string;
    phone: string;
    addresses: {
      label?: string;
      area?: string;
      street?: string;
      building?: string;
      floor?: string;
      apartment?: string;
      isDefault?: boolean;
    }[];
  };
  restaurantID: string;
  deliveryDriverID?: string;
  items: { productId: { _id: string; name?: string }; quantity: number }[];
  totalAmount: number;
  createdAt: string;
  updatedAt?: string;
  processingStartedAt?: string;
  deliveredAt?: string;
}

interface Product {
  _id: string;
  name: string;
}

export default function ROrdersScreen() {
  console.log('🛠 ROrdersScreen component mounted');
  const router = useRouter();
  const { showNotification } = useNotification();
  const [calledOrders, setCalledOrders] = useState<Order[]>([]);
  const [requiredOrders, setRequiredOrders] = useState<Order[]>([]);
  const [historyOrders, setHistoryOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState<'new' | 'inProgress' | 'history'>('new');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalAction, setModalAction] = useState<'accept' | 'reject' | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const fetchProducts = async () => {
    try {
      console.log('📦 Fetching restaurant products for order details...');
      const response = await GetRestaurantProducts();
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
    }
  };

  const fetchOrders = async () => {
    try {
      console.log('📡 Fetching restaurant orders...');
      setLoading(true);
      const [calledResponse, requiredResponse, historyResponse] = await Promise.all([
        RGetRestaurantAllCalledOrders(),
        RGetRestaurantAllRequiredOrders(),
        RGetOrdersHistory(),
      ]);

      console.log('📦 Fetched called orders:', calledResponse.data);
      console.log('📦 Fetched required orders:', requiredResponse.data);
      console.log('📦 Fetched history orders:', historyResponse.data);

      setCalledOrders(calledResponse.data || []);
      setRequiredOrders(requiredResponse.data || []);
      setHistoryOrders(historyResponse.data || []);

      console.log('✅ Restaurant orders fetched successfully:', {
        calledCount: calledResponse.data.length,
        requiredCount: requiredResponse.data.length,
        historyCount: historyResponse.data.length,
        calledOrderIds: calledResponse.data.map((o: Order) => o._id),
        requiredOrderIds: requiredResponse.data.map((o: Order) => o._id),
        historyOrderIds: historyResponse.data.map((o: Order) => o._id),
      });
    } catch (error: any) {
      console.error('❌ Error fetching restaurant orders:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
      showNotification('Failed to load orders.', 'error');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    console.log('🔄 Refreshing restaurant orders...');
    fetchProducts().then(fetchOrders);
  }, []);

  useFocusEffect(
    useCallback(() => {
      console.log('🛠 ROrdersScreen focused, fetching products and orders...');
      fetchProducts().then(fetchOrders);
    }, [])
  );

  const handleAcceptOrder = async (orderId: string) => {
    try {
      console.log('✅ Accepting restaurant order:', orderId);
      const response = await RAcceptOrder(orderId);
      console.log('✅ Restaurant order accepted successfully:', response.order);
      showNotification('Order accepted successfully!', 'success');
      setModalVisible(false);
      fetchOrders();
    } catch (error: any) {
      console.error('❌ Error accepting restaurant order:', {
        orderId,
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
      showNotification('Failed to accept order.', 'error');
      setModalVisible(false);
    }
  };

  const handleRejectOrder = async (orderId: string) => {
    try {
      console.log('❌ Rejecting restaurant order:', orderId);
      const response = await RRejectOrder(orderId);
      console.log('✅ Restaurant order rejected successfully:', response.order);
      showNotification('Order rejected successfully!', 'success');
      setModalVisible(false);
      fetchOrders();
    } catch (error: any) {
      console.error('❌ Error rejecting restaurant order:', {
        orderId,
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
      showNotification('Failed to reject order.', 'error');
      setModalVisible(false);
    }
  };

  const openModal = (action: 'accept' | 'reject', order: Order) => {
    console.log(`🖱 Opening modal for ${action} order:`, order._id);
    setModalAction(action);
    setSelectedOrder(order);
    setModalVisible(true);
  };

  const closeModal = () => {
    console.log('🖱 Closing modal');
    setModalVisible(false);
    setModalAction(null);
    setSelectedOrder(null);
  };

  const handleFilterChange = useCallback((newFilter: 'new' | 'inProgress' | 'history') => {
    console.log('🔍 Changing filter to:', newFilter);
    setFilter(newFilter);
  }, []);

  const getFilteredOrders = useMemo(() => {
    switch (filter) {
      case 'new':
        return calledOrders;
      case 'inProgress':
        return requiredOrders;
      case 'history':
        return historyOrders;
      default:
        return calledOrders;
    }
  }, [filter, calledOrders, requiredOrders, historyOrders]);

  const getProductName = (productId: { _id: string; name?: string }) => {
    const product = products.find(p => p._id === productId._id);
    console.log('🔗 Mapping product:', { productId: productId._id, productName: product?.name || 'Unknown Product' });
    return product ? product.name : 'Unknown Product';
  };

  const formatAddress = (address: Order['userID']['addresses'][0]) => {
    const parts = [
      address.street || 'N/A',
      address.building || 'N/A',
      address.floor ? `Floor ${address.floor}` : 'N/A',
      address.apartment ? `Apt ${address.apartment}` : 'N/A',
      address.area || 'N/A',
    ].filter(part => part !== 'N/A');
    return parts.length > 0 ? parts.join(', ') : 'Address not provided';
  };

  const renderOrderCard = ({ item }: { item: Order }) => {
    console.log('📄 Rendering restaurant order card:', item._id);
    const address = Array.isArray(item.userID.addresses) && item.userID.addresses[0] ? item.userID.addresses[0] : {};
    console.log('📍 Order address:', { orderId: item._id, address });
    console.log('📋 Items:', item.items.map(i => ({ quantity: i.quantity, productName: getProductName(i.productId) })));
    return (
      <View style={styles.orderCard}>
        <View style={styles.orderDetails}>
          <Text style={styles.orderId}>Order #{item._id.slice(-6)}</Text>
          <Text style={styles.orderStatus}>
            Status: {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
          </Text>
          <Text style={styles.orderTotal}>Total: ${item.totalAmount.toFixed(2)}</Text>
          <Text style={styles.orderDate}>
            Created: {new Date(item.createdAt).toLocaleDateString()}
          </Text>
          <Text style={styles.orderCustomer}>Customer: {item.userID.name}</Text>
          <Text style={styles.orderPhone}>Phone: {item.userID.phone}</Text>
          <Text style={styles.orderAddress}>
            Address: {formatAddress(address)}
          </Text>
          <Text style={styles.orderItems}>
            Items: {item.items.map(i => `${i.quantity}x ${getProductName(i.productId)}`).join(', ')}
          </Text>
        </View>
        {item.status === 'called' && (
          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: '#4CAF50' }]}
              onPress={() => openModal('accept', item)}
            >
              <Text style={styles.actionButtonText}>Accept</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: '#F44336' }]}
              onPress={() => openModal('reject', item)}
            >
              <Text style={styles.actionButtonText}>Reject</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };

  const renderModal = () => {
    if (!selectedOrder || !modalAction) return null;
    const address = Array.isArray(selectedOrder.userID.addresses) && selectedOrder.userID.addresses[0] ? selectedOrder.userID.addresses[0] : {};
    console.log('📍 Modal address:', { orderId: selectedOrder._id, address });
    console.log('📋 Modal items:', selectedOrder.items.map(i => ({ quantity: i.quantity, productName: getProductName(i.productId) })));
    return (
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {modalAction === 'accept' ? 'Confirm Accept Order' : 'Confirm Reject Order'}
            </Text>
            <View style={styles.modalOrderDetails}>
              <Text style={styles.modalOrderId}>Order #{selectedOrder._id.slice(-6)}</Text>
              <Text style={styles.modalOrderCustomer}>Customer: {selectedOrder.userID.name}</Text>
              <Text style={styles.modalOrderPhone}>Phone: {selectedOrder.userID.phone}</Text>
              <Text style={styles.modalOrderAddress}>
                Address: {formatAddress(address)}
              </Text>
              <Text style={styles.modalOrderItems}>
                Items: {selectedOrder.items.map(i => `${i.quantity}x ${getProductName(i.productId)}`).join(', ')}
              </Text>
              <Text style={styles.modalOrderTotal}>Total: ${selectedOrder.totalAmount.toFixed(2)}</Text>
            </View>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: modalAction === 'accept' ? '#4CAF50' : '#F44336' }]}
                onPress={() =>
                  modalAction === 'accept'
                    ? handleAcceptOrder(selectedOrder._id)
                    : handleRejectOrder(selectedOrder._id)
                }
              >
                <Text style={styles.modalButtonText}>Confirm</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: '#666' }]}
                onPress={closeModal}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  if (loading) {
    console.log('⏳ Rendering loading state');
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Loading orders...</Text>
      </View>
    );
  }

  if (!loading && calledOrders.length === 0 && requiredOrders.length === 0 && historyOrders.length === 0) {
    console.log('📭 Rendering empty state');
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.emptyText}>No orders yet.</Text>
      </View>
    );
  }

  console.log('📋 Rendering restaurant order list:', {
    filter,
    count: getFilteredOrders.length,
    orderIds: getFilteredOrders.map(o => o._id),
  });
  return (
    <View style={styles.container}>
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[styles.filterButton, filter === 'new' && styles.filterButtonActive]}
          onPress={() => handleFilterChange('new')}
        >
          <Text style={[styles.filterText, filter === 'new' && styles.filterTextActive]}>New</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, filter === 'inProgress' && styles.filterButtonActive]}
          onPress={() => handleFilterChange('inProgress')}
        >
          <Text style={[styles.filterText, filter === 'inProgress' && styles.filterTextActive]}>
            In Progress
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, filter === 'history' && styles.filterButtonActive]}
          onPress={() => handleFilterChange('history')}
        >
          <Text style={[styles.filterText, filter === 'history' && styles.filterTextActive]}>History</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={getFilteredOrders}
        keyExtractor={(item) => item._id}
        renderItem={renderOrderCard}
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
      {renderModal()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: 16 },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background, padding: 16 },
  loadingText: { fontSize: 16, color: '#666', marginTop: 12 },
  emptyText: { fontSize: 16, color: '#666', marginBottom: 20, textAlign: 'center' },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
  },
  filterButtonActive: {
    backgroundColor: colors.primary,
  },
  filterText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
  },
  filterTextActive: {
    color: '#fff',
  },
  orderCard: {
    backgroundColor: '#fff',
    padding: 12,
    marginBottom: 12,
    borderRadius: 8,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  orderDetails: {
    marginBottom: 8,
  },
  orderId: { fontWeight: 'bold', fontSize: 16, color: colors.primary },
  orderStatus: { fontSize: 14, color: '#666', marginTop: 4 },
  orderTotal: { fontWeight: 'bold', fontSize: 14, color: '#000', marginTop: 4 },
  orderDate: { fontSize: 12, color: '#999', marginTop: 4 },
  orderCustomer: { fontSize: 14, color: '#666', marginTop: 4 },
  orderPhone: { fontSize: 14, color: '#666', marginTop: 4 },
  orderAddress: { fontSize: 14, color: '#666', marginTop: 4 },
  orderItems: { fontSize: 12, color: '#666', marginTop: 4 },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  actionButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginLeft: 8,
  },
  actionButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 12,
  },
  modalOrderDetails: {
    marginBottom: 20,
  },
  modalOrderId: { fontSize: 16, fontWeight: 'bold', color: '#000' },
  modalOrderCustomer: { fontSize: 14, color: '#666', marginTop: 8 },
  modalOrderPhone: { fontSize: 14, color: '#666', marginTop: 8 },
  modalOrderAddress: { fontSize: 14, color: '#666', marginTop: 8 },
  modalOrderItems: { fontSize: 14, color: '#666', marginTop: 8 },
  modalOrderTotal: { fontSize: 16, fontWeight: 'bold', color: '#000', marginTop: 8 },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 8,
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});