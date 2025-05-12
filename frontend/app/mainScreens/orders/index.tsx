import React, { useState, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, ActivityIndicator, RefreshControl } from 'react-native';
import { useRouter } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import colors from '@/app/styles/colors';
import { RawOrder } from '@/app/types/orders';
import { GetMyOrders } from '@/app/endpoints/userEndpoints';

// Helper function to format date
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric',
    year: 'numeric'
  });
};

export default function OrdersScreen() {
  const router = useRouter();
  const [orders, setOrders] = useState<RawOrder[]>([]);
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'active', 'past'
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchOrders = async () => {
    try {
      const response = await GetMyOrders();
      console.log('📦 Orders fetched:', response.data);
      setOrders(response.data);
    } catch (error) {
      console.error('❌ Failed to fetch orders:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchOrders();
    }, [])
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchOrders();
  }, []);

  const filteredOrders = orders.filter(order => {
    if (activeTab === 'all') return true;
    if (activeTab === 'active') return ['called', 'pending', 'processing', 'Preparing', 'On the way'].includes(order.status);
    if (activeTab === 'past') return ['delivered', 'cancelled'].includes(order.status);
    return true;
  });

  const navigateToOrderDetail = (id: string) => {
    router.push(`mainScreens/orders/${id}`);
  };

  const renderOrderItem = ({ item }: { item: RawOrder }) => (
    <TouchableOpacity 
      style={styles.orderCard}
      onPress={() => navigateToOrderDetail(item._id)}
    >
      <View style={styles.orderHeader}>
        <View style={styles.restaurantInfo}>
          <Image 
            source={{ uri: item.restaurantID.logo }} 
            style={styles.restaurantLogo} 
          />
          <View>
            <Text style={styles.restaurantName}>{item.restaurantID.name}</Text>
            <Text style={styles.orderDate}>{formatDate(item.createdAt)}</Text>
          </View>
        </View>
        <View style={[
          styles.statusContainer,
          item.status === 'called' ? styles.calledStatus :
          item.status === 'cancelled' ? styles.cancelledStatus :
          item.status === 'processing' || item.status === 'pending' ? styles.processingStatus :
          styles.deliveredStatus
        ]}>
          <Text style={[
            styles.statusText,
            item.status === 'called' ? styles.calledText :
            item.status === 'cancelled' ? styles.cancelledText :
            item.status === 'processing' || item.status === 'pending' ? styles.processingText :
            styles.deliveredText
          ]}>{item.status}</Text>
        </View>
      </View>
      
      <View style={styles.divider} />
      
      <View style={styles.orderFooter}>
        <Text style={styles.itemsText}>{item.items.length} {item.items.length > 1 ? 'items' : 'item'}</Text>
        <Text style={styles.totalText}>${item.totalAmount.toFixed(2)}</Text>
      </View>
      
      <View style={styles.arrowContainer}>
        <FontAwesome name="angle-right" size={18} color="#999" />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'all' && styles.activeTab]}
          onPress={() => setActiveTab('all')}
        >
          <Text style={[styles.tabText, activeTab === 'all' && styles.activeTabText]}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'active' && styles.activeTab]}
          onPress={() => setActiveTab('active')}
        >
          <Text style={[styles.tabText, activeTab === 'active' && styles.activeTabText]}>Active</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'past' && styles.activeTab]}
          onPress={() => setActiveTab('past')}
        >
          <Text style={[styles.tabText, activeTab === 'past' && styles.activeTabText]}>Past</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator style={{ marginTop: 40 }} size="large" color={colors.primary} />
      ) : filteredOrders.length > 0 ? (
        <FlatList
          data={filteredOrders}
          renderItem={renderOrderItem}
          keyExtractor={item => item._id}
          contentContainerStyle={styles.ordersList}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[colors.primary]}
              tintColor={colors.primary}
            />
          }
        />
      ) : (
        <View style={styles.emptyContainer}>
          <FontAwesome name="list-alt" size={60} color="#ccc" />
          <Text style={styles.emptyText}>No orders found</Text>
          <Text style={styles.emptySubtext}>Orders you place will appear here</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  tab: { paddingVertical: 8, paddingHorizontal: 16, borderRadius: 20 },
  activeTab: { backgroundColor: colors.primary + '20' },
  tabText: { fontSize: 14, color: '#777', fontWeight: '500' },
  activeTabText: { color: colors.primary, fontWeight: '600' },
  ordersList: { padding: 16, paddingBottom: 24 },
  orderCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    position: 'relative',
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  restaurantInfo: { flexDirection: 'row', alignItems: 'center' },
  restaurantLogo: { width: 40, height: 40, borderRadius: 20, marginRight: 12 },
  restaurantName: { fontSize: 16, fontWeight: '600', color: colors.text },
  orderDate: { fontSize: 13, color: '#888', marginTop: 2 },
  statusContainer: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  calledStatus: { backgroundColor: '#E0F7FA' },
  deliveredStatus: { backgroundColor: '#E8F5E9' },
  processingStatus: { backgroundColor: '#FFF8E1' },
  cancelledStatus: { backgroundColor: '#fdecea' },
  statusText: { fontSize: 12, fontWeight: '500' },
  calledText: { color: '#0288D1' },
  deliveredText: { color: '#388E3C' },
  processingText: { color: '#FFA000' },
  cancelledText: { color: '#d9534f' },
  divider: { height: 1, backgroundColor: '#eee', marginVertical: 12 },
  orderFooter: { flexDirection: 'row', justifyContent: 'space-between' },
  itemsText: { fontSize: 14, color: '#666' },
  totalText: { fontSize: 16, fontWeight: '600', color: colors.text },
  arrowContainer: {
    position: 'absolute',
    right: 16,
    top: '50%',
    marginTop: -9,
  },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingBottom: 60 },
  emptyText: { fontSize: 18, fontWeight: '500', color: '#555', marginTop: 16 },
  emptySubtext: { fontSize: 14, color: '#888', marginTop: 8 },
});