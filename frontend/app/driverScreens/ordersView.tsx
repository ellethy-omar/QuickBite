import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, View, ScrollView, SafeAreaView, RefreshControl } from 'react-native';
import colors from '../styles/colors';
import { OrderDriver } from '../types/orderDriver';
import OrderContainer from '../components/orderContainer';
import { fetchUserOrders } from '../endpoints/driverEndpoints';
import { useNotification } from '../context/notificationContext';

export default function OrdersView() {
  const { showNotification } = useNotification();
  const [fetching, setFetching] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [orders, setOrders] = useState<OrderDriver[]>([]);

  const fetchOrders = async () => {
    try {
      const response = await fetchUserOrders();
      setOrders(response);
    } catch (error) {
      showNotification('An error occurred while fetching orders', 'error');
    } finally {
      setTimeout(() => {
      setFetching(false);
      setRefreshing(false);
      }, 2000);
    }
  };

  useEffect(() => {
    if (!fetching) return;
    fetchOrders();
  }, [fetching]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchOrders();
  };
  
  return (
    <SafeAreaView style={styles.background}>
      <Text style={styles.titleText}>Active Orders</Text>
      <Text style={styles.subTitleText}>
        Please select the most suitable order and head to the restaurant for pickup
      </Text>

      <View style={styles.ordersListContainer}>
        <ScrollView 
          contentContainerStyle={styles.scrollViewContent}
          style={styles.scrollView}
          bounces={true}
          overScrollMode="never"
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[colors.primary]} />
          }
        >
          {fetching ? (
            <Text style={styles.noResultsText}>Loading...</Text>
          ) : (
            <View style={{ gap: 15}}>
              {orders.length > 0 ? (
                orders.map((order, index) => 
                  <>
                    <OrderContainer key={order.orderId} order={order} />
                    <View key={index} style={{width: "80%", height: 1, backgroundColor: "gray", marginVertical: 5, marginHorizontal: "auto"}} />
                  </>
              )
              ) : (
                <Text style={styles.noResultsText}>No active orders available</Text>
              )}
            </View>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: colors.primary,
    paddingTop: 15,
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
    flex: 1, 
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  ordersListContainer: {
    backgroundColor: colors.background,
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    padding: 10,
    overflow: 'hidden',
    paddingTop: 15,
    flex: 1,
  },
  noResultsText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 50,
  },
});