import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import colors from '@/app/styles/colors';
import { OrderSummary } from '@/app/types/orders';

// Sample data - In a real app, this would come from your API
const sampleOrders: OrderSummary[] = [
  {
    id: '1001',
    restaurantName: 'Burger Palace',
    restaurantLogo: 'https://via.placeholder.com/60',
    date: '2025-04-19 13:45:00',
    total: 24.99,
    status: 'Delivered',
    items: 3
  },
  {
    id: '1002',
    restaurantName: 'Pizza Heaven',
    restaurantLogo: 'https://via.placeholder.com/60',
    date: '2025-04-18 19:20:00',
    total: 32.50,
    status: 'Delivered',
    items: 2
  },
  {
    id: '1003',
    restaurantName: 'Sushi Express',
    restaurantLogo: 'https://via.placeholder.com/60',
    date: '2025-04-17 12:15:00',
    total: 45.75,
    status: 'Delivered',
    items: 4
  },
  {
    id: '1004',
    restaurantName: 'Taco Time',
    restaurantLogo: 'https://via.placeholder.com/60',
    date: '2025-04-15 20:05:00',
    total: 18.25,
    status: 'Delivered',
    items: 2
  },
  {
    id: '1005',
    restaurantName: 'Salad Bar',
    restaurantLogo: 'https://via.placeholder.com/60',
    date: '2025-04-12 13:30:00',
    total: 15.99,
    status: 'Processing',
    items: 1
  },
];

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
  const [orders, setOrders] = useState<OrderSummary[]>(sampleOrders);
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'active', 'past'
  
  // Filter orders based on the active tab
  const filteredOrders = orders.filter(order => {
    if (activeTab === 'all') return true;
    if (activeTab === 'active') return ['Processing', 'Preparing', 'On the way'].includes(order.status);
    if (activeTab === 'past') return order.status === 'Delivered';
    return true;
  });

  // Fix for the TypeScript error
  const navigateToOrderDetail = (id: string) => {
    // Use "as any" to bypass TypeScript checking for the path format
    // This tells TypeScript to trust us that this is valid
    (router as any).push(`mainScreens/orders/${id}`);
  };

  const renderOrderItem = ({ item }: { item: OrderSummary }) => (
    <TouchableOpacity 
      style={styles.orderCard}
      onPress={() => navigateToOrderDetail(item.id)}
    >
      <View style={styles.orderHeader}>
        <View style={styles.restaurantInfo}>
          <Image 
            source={{ uri: item.restaurantLogo }} 
            style={styles.restaurantLogo} 
          />
          <View>
            <Text style={styles.restaurantName}>{item.restaurantName}</Text>
            <Text style={styles.orderDate}>{formatDate(item.date)}</Text>
          </View>
        </View>
        <View style={[
          styles.statusContainer, 
          item.status === 'Processing' ? styles.processingStatus : styles.deliveredStatus
        ]}>
          <Text style={[
            styles.statusText,
            item.status === 'Processing' ? styles.processingText : styles.deliveredText
          ]}>{item.status}</Text>
        </View>
      </View>
      
      <View style={styles.divider} />
      
      <View style={styles.orderFooter}>
        <Text style={styles.itemsText}>{item.items} {item.items > 1 ? 'items' : 'item'}</Text>
        <Text style={styles.totalText}>${item.total.toFixed(2)}</Text>
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
      
      {filteredOrders.length > 0 ? (
        <FlatList
          data={filteredOrders}
          renderItem={renderOrderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.ordersList}
          showsVerticalScrollIndicator={false}
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
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  activeTab: {
    backgroundColor: colors.primary + '20', // semi-transparent primary color
  },
  tabText: {
    fontSize: 14,
    color: '#777',
    fontWeight: '500',
  },
  activeTabText: {
    color: colors.primary,
    fontWeight: '600',
  },
  ordersList: {
    padding: 16,
    paddingBottom: 24,
  },
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
  restaurantInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  restaurantLogo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  restaurantName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  orderDate: {
    fontSize: 13,
    color: '#888',
    marginTop: 2,
  },
  statusContainer: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  deliveredStatus: {
    backgroundColor: '#E8F5E9',
  },
  processingStatus: {
    backgroundColor: '#FFF8E1',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  deliveredText: {
    color: '#388E3C',
  },
  processingText: {
    color: '#FFA000',
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 12,
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemsText: {
    fontSize: 14,
    color: '#666',
  },
  totalText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  arrowContainer: {
    position: 'absolute',
    right: 16,
    top: '50%',
    marginTop: -9,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 60,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#555',
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#888',
    marginTop: 8,
  },
});