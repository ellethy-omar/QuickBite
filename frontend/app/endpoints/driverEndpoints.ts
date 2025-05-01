import { OrderDriver } from '../types/orderDriver';
import apiClient from '../apiclient';
import { isTokenExpired, refreshAuthToken } from '@/app/utils/authHelpers';
import * as SecureStore from 'expo-secure-store';
import { DriverData } from '../types/driver';

export const fetchUserOrders = async () => {
  try {
      let token = await SecureStore.getItemAsync('jwtToken');
      if (!token) {
        throw new Error('No token found');
      }

      if (isTokenExpired(token)) {
        console.log("Token expired, refreshing...");
        token = await refreshAuthToken();
        if (!token) {
          throw new Error('Failed to refresh token');
        }
        await SecureStore.setItemAsync('jwtToken', token);
      }
      
      const response = await apiClient.get('/api/driver/getAllAvailableOrders', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      console.log("response", JSON.stringify(response.data.data, null,2));
      const orders: OrderDriver[] = response.data.data.map((order: any) => ({
        orderId: order._id,
        deliveryAddress: order.userID.addresses.find((address: any) => address.isDefault == true),
        userId: order.userID == null ? {name: "Guest", phone: "333", email: "none", _id: "fmfnjnwdoi"} : order.userID,
        totalAmount: order.totalAmount,
        restaurantId: {...order.restaurantID, logo: order.restaurantLogo, phone: order.restaurantID.contact.phone},
        items: order.items.map((item: any) => ({
          itemId: item.productId._id,
          itemPrice: item.productId.price,
          itemName: item.productId.name,
          itemQuantity: item.quantity,
        })),
        createdOn: order.createdAt,
        restaurantLogo: order.restaurantLogo,
      }));
      
      return orders.slice(0, 3);
    } catch (error: any) {
      console.error("error fetching orders", error.response?.data || error.message);
      throw error;
    }
  };

export const acceptOrder = async (orderId: string) => {
  try {
    let token = await SecureStore.getItemAsync('jwtToken');
    if (!token) {
      throw new Error('No token found');
    }

    if (isTokenExpired(token)) {
      console.log("Token expired, refreshing...");
      token = await refreshAuthToken();
      if (!token) {
        throw new Error('Failed to refresh token');
      }
      await SecureStore.setItemAsync('jwtToken', token);
    }

    const response = await apiClient.put(
      `/api/driver/acceptOrder?orderId=${orderId}`,
      null,
      {
        headers: {
          Authorization:`Bearer ${token}`,
        },
      }
    );
    

    return response.data;
  } catch (error: any) {
    console.error("error accepting order", error.response?.data || error.message);
    throw error;
  }
}

export const fetchDriverProfile = async ()  => {
  try {
    let token = await SecureStore.getItemAsync('jwtToken');
    if (!token) {
      throw new Error('No token found');
    }

    if (isTokenExpired(token)) {
      console.log("Token expired, refreshing...");
      token = await refreshAuthToken();
      if (!token) {
        throw new Error('Failed to refresh token');
      }
      await SecureStore.setItemAsync('jwtToken', token);
    }

    const response = await apiClient.get('/api/driver/getDriverProfile', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    return response.data.driver;
  } catch (error: any) {
    console.error("error", error.response?.data || error.message);
    throw error;
  }
}

export const editDriverProfile = async (driverData: DriverData) => {
  console.log(driverData)
  const body = {
    name: "kanye west",
    email: driverData.email,
    phone: driverData.phone,
    vehicle: {
      plateNumber: driverData.vehicle.plateNumber,
      category: driverData.vehicle.type,
      model: driverData.vehicle.model
    }
  }

  try {
    let token = await SecureStore.getItemAsync('jwtToken');
    if (!token) {
      throw new Error('No token found');
    }

    if (isTokenExpired(token)) {
      console.log("Token expired, refreshing...");
      token = await refreshAuthToken();
      if (!token) {
        throw new Error('Failed to refresh token');
      }
      await SecureStore.setItemAsync('jwtToken', token);
    }

    console.log("body", body);
    const response = await apiClient.put('/api/driver/updateDriverProfile', body, {
      headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error: any) {
    console.error("error", error.response?.data || error.message);
    throw error;
  }
}
