import React, {useEffect, useState} from 'react';
import { Text, StyleSheet, View, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import colors from '../styles/colors';
import { OrderDriver } from '../types/orderDriver';
import OrderContainer from '../components/orderContainer';
import { fetchUserOrders } from '../endpoints/driverEndpoints';
import { useNotification } from '../context/notificationContext';

export default function OrdersView() {
    const { showNotification } = useNotification();
    const [fetching, setFetching] = useState(true);
    const [orders, setOrders] = useState<OrderDriver[]>([]);

    useEffect(() => {
      if(!fetching) return;

      const fetchOrders = async () => {
        try {
          const response = await fetchUserOrders();
          console.log(response);
          setOrders(response);
        } catch {
          showNotification("an error occurred while fetching orders", "error");
        } finally {
          setFetching(false);
        }
      }

      fetchOrders();
    }, [fetching]);

    return (
        <View style={styles.background}>
          <Text style={styles.titleText}>Active Orders</Text>
          <Text style={styles.subTitleText}>
            Please select the most suitable order and head to restaurant for pickup
          </Text>
          {/* Add flex: 1 to ScrollView */}
          <ScrollView contentContainerStyle={styles.scrollViewContent} style={styles.scrollView} bounces={false} overScrollMode='never' contentInset={{top: 50, bottom: 0}} showsVerticalScrollIndicator={false}>
            <View style={styles.ordersListContainer}>
              {fetching ? (
                <Text style={styles.noResultsText}>Loading...</Text>
              ) : (
                <>
              {orders.length > 0 ? (
                orders.map((order) => <OrderContainer key={order.orderId} order={order} />)
              ) : (
                <Text style={styles.noResultsText}>No active orders available</Text>
              )}
              </>
              )}
            </View>
          </ScrollView>
        </View>
      );
}

const styles = StyleSheet.create({
    background: {
      flex: 1, // Allow the parent container to take up the full screen height
      backgroundColor: colors.primary,
      paddingTop: 50,
    },
    titleText: {
      fontSize: 24,
      fontWeight: '800',
      color: 'white',
      textAlign: 'center',
      marginBottom: 20,
    },
    subTitleText: {
      width: '90%',
      marginHorizontal: 'auto',
      fontSize: 14,
      fontWeight: '500',
      color: 'white',
      marginBottom: 15,
    },
    scrollView: {
      flex: 1, // Make the ScrollView take up the remaining height
    },
    scrollViewContent: {
      flexGrow: 1, // Ensure content stretches to fill the ScrollView
    },
    ordersListContainer: {
        backgroundColor: colors.background,
        borderTopEndRadius: 20,
        borderTopStartRadius: 20,
        padding: 10,
        paddingTop: 15,
        flex: 1,
        gap: 15,
    },
    noResultsText: {
      color: colors.primary,
      fontSize: 16,
      fontWeight: '700',
      textAlign: 'center',
      marginTop: 50,
    },
  });