import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import colors from '@/app/styles/colors';
import { OrderDetails, OrderDetailsMap } from '@/app/types/orders';

// Sample data - In a real app, this would come from your API
const sampleOrderDetails: OrderDetailsMap = {
  '1001': {
    id: '1001',
    restaurantName: 'Burger Palace',
    restaurantLogo: 'https://via.placeholder.com/60',
    date: '2025-04-19 13:45:00',
    total: 24.99,
    subtotal: 19.99,
    deliveryFee: 3.00,
    tax: 2.00,
    status: 'Delivered',
    paymentMethod: 'Credit Card (Visa **** 4242)',
    driver: {
      name: 'Ahmed M.',
      phone: '+201234567890',
      photo: 'https://randomuser.me/api/portraits/men/32.jpg',
    },
    deliveryAddress: {
      label: 'Home',
      full: 'Building A, 3rd Floor, Apt 301, Main St., Downtown, Cairo'
    },
    items: [
      { id: '1', name: 'Double Cheese Burger', quantity: 1, price: 9.99 },
      { id: '2', name: 'French Fries (Large)', quantity: 1, price: 4.50 },
      { id: '3', name: 'Chocolate Milkshake', quantity: 1, price: 5.50 }
    ],
    timeline: [
      { status: 'Order Placed', time: '2025-04-19 13:30:00' },
      { status: 'Order Confirmed', time: '2025-04-19 13:32:00' },
      { status: 'Preparing', time: '2025-04-19 13:35:00' },
      { status: 'Out for Delivery', time: '2025-04-19 13:40:00' },
      { status: 'Delivered', time: '2025-04-19 13:45:00' }
    ]
  },
  '1002': {
    id: '1002',
    restaurantName: 'Pizza Heaven',
    restaurantLogo: 'https://via.placeholder.com/60',
    date: '2025-04-18 19:20:00',
    total: 32.50,
    subtotal: 26.00,
    deliveryFee: 4.00,
    tax: 2.50,
    status: 'Delivered',
    paymentMethod: 'PayPal',
    driver: {
      name: 'Sarah K.',
      phone: '+201122334455',
      photo: 'https://randomuser.me/api/portraits/women/44.jpg',
    },
    deliveryAddress: {
      label: 'Work',
      full: 'Office Tower, 15th Floor, Suite 1502, Business Ave., New Cairo'
    },
    items: [
      { id: '1', name: 'Pepperoni Pizza (Large)', quantity: 1, price: 14.00 },
      { id: '2', name: 'Hawaiian Pizza (Medium)', quantity: 1, price: 12.00 },
    ],
    timeline: [
      { status: 'Order Placed', time: '2025-04-18 18:55:00' },
      { status: 'Order Confirmed', time: '2025-04-18 18:57:00' },
      { status: 'Preparing', time: '2025-04-18 19:05:00' },
      { status: 'Out for Delivery', time: '2025-04-18 19:15:00' },
      { status: 'Delivered', time: '2025-04-18 19:20:00' }
    ]
  },
  '1003': {
    id: '1003',
    restaurantName: 'Sushi Express',
    restaurantLogo: 'https://via.placeholder.com/60',
    date: '2025-04-17 12:15:00',
    total: 45.75,
    subtotal: 38.96,
    deliveryFee: 3.99,
    tax: 2.80,
    status: 'Delivered',
    paymentMethod: 'Credit Card (Mastercard **** 8765)',
    driver: {
      name: 'Omar L.',
      phone: '+201027384950',
      photo: 'https://randomuser.me/api/portraits/men/67.jpg',
    },
    deliveryAddress: {
      label: 'Home',
      full: 'Building A, 3rd Floor, Apt 301, Main St., Downtown, Cairo'
    },
    items: [
      { id: '1', name: 'California Roll', quantity: 2, price: 10.99 },
      { id: '2', name: 'Salmon Nigiri', quantity: 1, price: 8.99 },
      { id: '3', name: 'Spicy Tuna Roll', quantity: 1, price: 11.99 },
      { id: '4', name: 'Miso Soup', quantity: 2, price: 3.50 }
    ],
    timeline: [
      { status: 'Order Placed', time: '2025-04-17 11:45:00' },
      { status: 'Order Confirmed', time: '2025-04-17 11:48:00' },
      { status: 'Preparing', time: '2025-04-17 11:55:00' },
      { status: 'Out for Delivery', time: '2025-04-17 12:08:00' },
      { status: 'Delivered', time: '2025-04-17 12:15:00' }
    ]
  },
  '1005': {
    id: '1005',
    restaurantName: 'Salad Bar',
    restaurantLogo: 'https://via.placeholder.com/60',
    date: '2025-04-19 14:20:00',
    total: 15.99,
    subtotal: 12.99,
    deliveryFee: 2.00,
    tax: 1.00,
    status: 'Processing',
    paymentMethod: 'Credit Card (Mastercard **** 5555)',
    driver: null,
    deliveryAddress: {
      label: 'Home',
      full: 'Building A, 3rd Floor, Apt 301, Main St., Downtown, Cairo'
    },
    items: [
      { id: '1', name: 'Caesar Salad', quantity: 1, price: 8.99 },
      { id: '2', name: 'Fresh Orange Juice', quantity: 1, price: 4.00 }
    ],
    timeline: [
      { status: 'Order Placed', time: '2025-04-19 14:20:00' },
      { status: 'Processing', time: '2025-04-19 14:21:00' }
    ]
  }
};

// Helper function to format date and time
const formatDateTime = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export default function OrderDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);

  useEffect(() => {
    // In a real app, this would be an API call
    if (id && sampleOrderDetails[id]) {
      setOrderDetails(sampleOrderDetails[id]);
    }
  }, [id]);

  if (!orderDetails) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading order details...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Order Status Card */}
      <View style={styles.statusCard}>
        <View style={styles.statusHeader}>
          <Text style={styles.orderIdText}>Order #{orderDetails.id}</Text>
          <Text style={styles.dateText}>{formatDateTime(orderDetails.date)}</Text>
        </View>
        
        <View style={styles.restaurantInfo}>
          <Image 
            source={{ uri: orderDetails.restaurantLogo }} 
            style={styles.restaurantLogo} 
          />
          <Text style={styles.restaurantName}>{orderDetails.restaurantName}</Text>
        </View>
        
        <View style={styles.statusSteps}>
          {orderDetails.timeline.map((step, index) => (
            <View key={index} style={styles.statusStep}>
              <View style={[
                styles.statusDot, 
                index <= orderDetails.timeline.length - 1 ? styles.statusDotActive : {}
              ]} />
              {index < orderDetails.timeline.length - 1 && (
                <View style={styles.statusLine} />
              )}
              <View style={styles.statusTextContainer}>
                <Text style={styles.statusStepText}>{step.status}</Text>
                <Text style={styles.statusTimeText}>
                  {new Date(step.time).toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>
      
      {/* Order Items */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Order Items</Text>
        {orderDetails.items.map((item) => (
          <View key={item.id} style={styles.itemRow}>
            <View style={styles.itemQuantity}>
              <Text style={styles.quantityText}>{item.quantity}x</Text>
            </View>
            <View style={styles.itemDetails}>
              <Text style={styles.itemName}>{item.name}</Text>
            </View>
            <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
          </View>
        ))}
      </View>
      
      {/* Payment Summary */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Payment Summary</Text>
        <View style={styles.paymentRow}>
          <Text style={styles.paymentLabel}>Subtotal</Text>
          <Text style={styles.paymentValue}>${orderDetails.subtotal.toFixed(2)}</Text>
        </View>
        <View style={styles.paymentRow}>
          <Text style={styles.paymentLabel}>Delivery Fee</Text>
          <Text style={styles.paymentValue}>${orderDetails.deliveryFee.toFixed(2)}</Text>
        </View>
        <View style={styles.paymentRow}>
          <Text style={styles.paymentLabel}>Tax</Text>
          <Text style={styles.paymentValue}>${orderDetails.tax.toFixed(2)}</Text>
        </View>
        <View style={[styles.paymentRow, styles.totalRow]}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>${orderDetails.total.toFixed(2)}</Text>
        </View>
        <View style={styles.paymentMethodContainer}>
          <FontAwesome name="credit-card" size={16} color="#666" />
          <Text style={styles.paymentMethodText}>{orderDetails.paymentMethod}</Text>
        </View>
      </View>
      
      {/* Delivery Details */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Delivery Details</Text>
        <View style={styles.deliveryInfo}>
          <View style={styles.addressContainer}>
            <FontAwesome name="map-marker" size={16} color="#666" style={styles.iconMargin} />
            <View>
              <Text style={styles.addressLabel}>{orderDetails.deliveryAddress.label}</Text>
              <Text style={styles.addressText}>{orderDetails.deliveryAddress.full}</Text>
            </View>
          </View>
        </View>
        
        {orderDetails.driver && (
          <View style={styles.driverInfo}>
            <Image source={{ uri: orderDetails.driver.photo }} style={styles.driverPhoto} />
            <View style={styles.driverDetails}>
              <Text style={styles.driverName}>{orderDetails.driver.name}</Text>
              <Text style={styles.driverRole}>Delivery Driver</Text>
            </View>
            <TouchableOpacity style={styles.callButton}>
              <Ionicons name="call" size={18} color="#fff" />
            </TouchableOpacity>
          </View>
        )}
      </View>
      
      {/* Help and Support */}
      <TouchableOpacity style={styles.helpButton}>
        <FontAwesome name="question-circle" size={16} color={colors.primary} style={styles.iconMargin} />
        <Text style={styles.helpButtonText}>Need help with this order?</Text>
      </TouchableOpacity>
      
      {/* Reorder Button */}
      <TouchableOpacity style={styles.reorderButton}>
        <Text style={styles.reorderButtonText}>Reorder</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusCard: {
    backgroundColor: '#fff',
    padding: 16,
    margin: 16,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  statusHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  orderIdText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  dateText: {
    fontSize: 13,
    color: '#777',
  },
  restaurantInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
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
  statusSteps: {
    marginTop: 8,
  },
  statusStep: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    position: 'relative',
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#ccc',
    marginTop: 4,
    marginRight: 8,
  },
  statusDotActive: {
    backgroundColor: colors.primary,
  },
  statusLine: {
    position: 'absolute',
    left: 5.5,
    top: 16,
    width: 1,
    height: 25,
    backgroundColor: '#ccc',
  },
  statusTextContainer: {
    marginBottom: 16,
  },
  statusStepText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
  },
  statusTimeText: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
  },
  section: {
    backgroundColor: '#fff',
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  itemQuantity: {
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  quantityText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 14,
    color: colors.text,
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  paymentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  paymentLabel: {
    fontSize: 14,
    color: '#666',
  },
  paymentValue: {
    fontSize: 14,
    color: colors.text,
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 12,
    marginTop: 4,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  totalValue: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  paymentMethodContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    padding: 12,
    backgroundColor: '#f9f9f9',
    borderRadius: 6,
  },
  paymentMethodText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#666',
  },
  deliveryInfo: {
    marginBottom: 16,
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  iconMargin: {
    marginRight: 8,
    marginTop: 2,
  },
  addressLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
  },
  addressText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  driverInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  driverPhoto: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  driverDetails: {
    flex: 1,
    marginLeft: 12,
  },
  driverName: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
  },
  driverRole: {
    fontSize: 13,
    color: '#888',
  },
  callButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  helpButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
  },
  helpButtonText: {
    color: colors.primary,
    fontWeight: '500',
  },
  reorderButton: {
    backgroundColor: colors.primary,
    marginHorizontal: 16,
    marginBottom: 24,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  reorderButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});