import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, View, ScrollView, SafeAreaView, RefreshControl } from 'react-native';
import colors from '../styles/colors';
import { OrderDriver } from '../types/orderDriver';
import { useNotification } from '../context/notificationContext';
import { fetchActiveOrders } from '../endpoints/adminEndpoints';
import AdminOrderContainer from '../components/adminOrderContainer';

export default function LiveOrdersView() {
  const { showNotification } = useNotification();
  const [fetching, setFetching] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [orders, setOrders] = useState<OrderDriver[]>([]);

  const fetchOrders = async () => {
    try {
      const response = await fetchActiveOrders();
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
        Active orders being delivered, press to view details.
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
                  <AdminOrderContainer key={order.orderId} order={order} />
                  <View key={index} style={{width: "80%", height: 1, backgroundColor: "gray", marginHorizontal: "auto"}} />
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
    fontSize: 28,
    fontWeight: '800',
    color: 'white',
    textAlign: 'center',
    marginBottom: 10,
  },
  subTitleText: {
    width: '90%',
    marginHorizontal: 'auto',
    fontSize: 14,
    fontWeight: '500',
    color: 'white',
    textAlign: 'center',
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