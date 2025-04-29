import { OrderDriver } from '../types/orderDriver';
import apiClient from '../apiclient';
import * as SecureStore from 'expo-secure-store';
import { create } from 'react-test-renderer';

export const fetchUserOrders = async () => {
    try {
      const token = await SecureStore.getItemAsync('jwtToken');
      if (!token) {
        throw new Error('No token found');
      }
  
      const response = await apiClient.get('/api/driver/getAllAvailableOrders', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      console.log("response from fetchUserOrders", JSON.stringify(response.data.data, null, 2));

      const products = response.data.products;

      const orders: OrderDriver[] = response.data.data.map((order: any) => ({
        orderId: order._id,
        restaurantName: order.restaurantName,
        restaurantAddress: order.restaurantAddress,
        deliveryAddress: order.userAddress,
        restaurantPhone: order.restaurantPhone,
        userId: order.userID,
        userName: order.userName,
        totalAmount: order.totalAmount,
        restaurantId: order.restaurantID,
        items: order.items.map((item: any) => ({
          itemId: item._id,
          itemDescription: products.find((product: any) => product._id === item.productId)?.description,
          itemPrice: products.find((product: any) => product._id === item.productId)?.price,
          itemName: products.find((product: any) => product._id === item.productId)?.name,
          itemImage: "https://picsum.photos/200/300", //products.find((product: any) => product._id === item.productId)?.image,
          itemQuantity: item.quantity,
        })),
        createdOn: order.createdOn,
        restaurantLogo: order.restaurantLogo,
      }));
  
      return orders;
    } catch (error: any) {
      console.error("error fetching orders", error.response?.data || error.message);
      throw error;
    }
  };