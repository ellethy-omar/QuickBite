// restaurantEndpoints.ts
import apiClient from "../apiclient";

// --- GET: Fetch restaurant profile
export const GetRestaurantProfile = async (): Promise<any> => {
  try {
    const response = await apiClient.get('/api/restaurant/getRestaurantProfile');
    return response.data;
  } catch (error) {
    console.error('Error fetching restaurant profile:', error);
    throw error;
  }
};

// --- GET: Fetch restaurant's products
export const GetRestaurantProducts = async (): Promise<any> => {
  try {
    const response = await apiClient.get('/api/restaurant/getRestaurantProducts');
    return response.data;
  } catch (error) {
    console.error('Error fetching restaurant products:', error);
    throw error;
  }
};

// --- POST: Add new product
export const AddRestaurantProduct = async (productData: {
  name: string;
  description: string;
  price: number;
  category: string;
  isAvailable: boolean;
}): Promise<any> => {
  try {
    const response = await apiClient.post('/api/restaurant/addRestaurantProduct', productData);
    return response.data;
  } catch (error) {
    console.error('Error adding restaurant product:', error);
    throw error;
  }
};

// --- PUT: Edit existing product
export const EditRestaurantProduct = async (productData: {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  isAvailable: boolean;
}): Promise<any> => {
  try {
    const response = await apiClient.put('/api/restaurant/editRestaurantProduct', productData);
    return response.data;
  } catch (error) {
    console.error('Error editing restaurant product:', error);
    throw error;
  }
};
