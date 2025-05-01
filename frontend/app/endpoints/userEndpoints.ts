// userEndpoints.ts
import apiClient from "../apiclient";
import { OrderDetails, RawOrder } from "../types/orders"; // 🔥 importing your real type

// --- PUT: Update user profile ---
export const UpdateUserProfile = async (profileData: {
  name: string;
  email: string;
  phone: string;
  addresses: {
    label: string;
    area: string;
    street: string;
    building: string;
    floor: string;
    apartment: string;
    isDefault: boolean;
  }[];
}) => {
  try {
    const response = await apiClient.put('/api/user/updateUserProfile', profileData);
    return response.data;
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
};

// --- GET: Fetch user profile ---
export const GetUserProfile = async (): Promise<{
  user: {
    name: string;
    email: string;
    phone: string;
    addresses: {
      label: string;
      area: string;
      street: string;
      building: string;
      floor: string;
      apartment: string;
      isDefault: boolean;
    }[];
    createdAt: string;
  }
}> => {
  try {
    const response = await apiClient.get('/api/user/getUserProfile');
    return response.data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};

export async function GetMyOrders(): Promise<{
  message: string;
  data: RawOrder[];
}> {
  try {
    const response = await apiClient.get('/api/user/getMyOrders');
    return response.data;
  } catch (error) {
    console.error('Error fetching user orders:', error);
    throw error;
  }
}

// --- PUT: Update user profile photo ---
export const UpdateUserProfilePhoto = async (photoData: {
  imageBase64: string;
  tags: string[];
}): Promise<any> => {
  try {
    const response = await apiClient.put('/api/user/updateUserProfilePhoto', photoData);
    return response.data;
  } catch (error) {
    console.error('Error updating profile photo:', error);
    throw error;
  }
};

// --- POST: Create a new order ---
export const CreateOrder = async (orderData: {
  restaurantID: string,
  items: { productId: string, quantity: number }[],
  address: {
    label: string,
    area: string,
    street: string,
    building: string,
    floor: string,
    apartment: string,
    isDefault: boolean,
  }
}): Promise<OrderDetails> => {
  try {
    const response = await apiClient.post('/api/user/createOrder', orderData);
    return response.data;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};

// --- GET: Get all restaurants ---
export const GetAllRestaurants = async (): Promise<any> => {
  try {
    const response = await apiClient.get('/api/user/getAllRestaurants');
    return response.data;
  } catch (error) {
    console.error('Error fetching restaurants:', error);
    throw error;
  }
};

// --- GET: Get products for a specific restaurant ---
export const GetProductsForRestaurant = async (restaurantID: string): Promise<{
  name: string;
  description: string;
  price: number;
  restraurantID: string;
  category: string;
  isAvailable: boolean;
  image: string;
}[]> => {
  try {
    const response = await apiClient.get(`/api/user/getProductsForRestaurant?restraurantID=${restaurantID}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching products for restaurant:', error);
    throw error;
  }
};

// --- PUT: Update an order ---
export const UpdateOrder = async (orderUpdateData: any): Promise<any> => {
  try {
    const response = await apiClient.put('/api/user/updateOrder', orderUpdateData);
    return response.data;
  } catch (error) {
    console.error('Error updating order:', error);
    throw error;
  }
};

export const CancelOrder = async (orderId: string): Promise<{ message: string }> => {
  console.log('📦 Cancelling order with ID:', orderId);

  try {
    const response = await apiClient.put(
      '/api/user/cancelOrder',
      {}, // ✅ send empty object instead of `null`
      {
        params: { orderID: orderId },
      }
    );

    return response.data;
  } catch (error) {
    console.error('❌ Error cancelling order:', error);
    throw error;
  }
};
