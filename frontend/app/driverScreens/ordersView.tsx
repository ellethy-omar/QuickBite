import React, {useState} from 'react';
import { Text, StyleSheet, View, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import colors from '../styles/colors';
import { OrderDriver } from '../types/orderDriver';
import OrderContainer from '../components/orderContainer';

export default function OrdersView() {
    const [orders, setOrders] = useState<OrderDriver[]>([
        {
            orderId: '1',
            userId: '1',
            restaurantId: '1',
            createdOn: new Date().toISOString(),
            deliveryAddress: {
                label: "home",
                area: "Giza",
                street: "Street 1",
                building: "4",
                floor: "3",
                apartment: "2",
                isDefault: true,
            },
            totalAmount: 100,
            userName: "John Doe",
            restaurantName: "Restaurant 1",
            restaurantLogo: "https://fastly.picsum.photos/id/696/200/300.jpg?hmac=Ukxvga_1GYxgfAqzwDhBPfVta6-hJKUhayVlI1yMIdk",
            restaurantPhone: "0111111111",
            restaurantAddress: {
                area: "Giza",
                city: "Cairo",
                street: "Street 1",
            },
        },
        {
            orderId: '2',
            userId: '2',
            restaurantId: '2',
            createdOn: new Date().toISOString(),
            deliveryAddress: {
                label: "work",
                area: "Cairo",
                street: "Street 2",
                building: "5",
                floor: "4",
                apartment: "3",
                isDefault: false,
            },
            totalAmount: 150,
            userName: "Jane Smith",
            restaurantName: "Restaurant 2",
            restaurantLogo: "https://fastly.picsum.photos/id/696/200/300.jpg?hmac=Ukxvga_1GYxgfAqzwDhBPfVta6-hJKUhayVlI1yMIdk",
            restaurantPhone: "0122222222",
            restaurantAddress: {
                area: "Cairo",
                city: "Cairo",
                street: "Street 2",
            },
        }
    ]);

    return (
        <View style={styles.background}>
          <Text style={styles.titleText}>Active Orders</Text>
          <Text style={styles.subTitleText}>
            Please select the most suitable order and head to restaurant for pickup
          </Text>
          {/* Add flex: 1 to ScrollView */}
          <ScrollView contentContainerStyle={styles.scrollViewContent} style={styles.scrollView} bounces={false} overScrollMode='never' contentInset={{top: 50, bottom: 0}} showsVerticalScrollIndicator={false}>
            <View style={styles.ordersListContainer}>
              {orders.length > 0 ? (
                orders.map((order) => <OrderContainer key={order.orderId} order={order} />)
              ) : (
                <Text style={styles.noResultsText}>No active orders available</Text>
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