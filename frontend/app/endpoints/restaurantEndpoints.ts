import apiClient from "../apiclient";

// --- PUT: Update restaurant profile
export const UpdateRestaurantProfile = async (profileData: {
  name: string;
  description: string;
  cuisineType: string[];
  address: {
    street: string;
    city: string;
    area: string;
  };
  contact: {
    phone: string;
    email: string;
    password?: string;
  };
  openingHours: any;
  isActive: boolean;
}): Promise<any> => {
  try {
    const response = await apiClient.put('/api/restaurant/updateRestaurantProfile', profileData);
    return response.data;
  } catch (error) {
    console.error('Error updating restaurant profile:', error);
    throw error;
  }
};

// --- PUT: Update restaurant logo
export const UpdateRestaurantLogo = async (payload: {
  imageBase64: string;
  tags: string[];
}): Promise<any> => {
  try {
    const response = await apiClient.put('/api/restaurant/updateRestaurantLogo', payload);
    return response.data;
  } catch (error) {
    console.error('Error updating restaurant logo:', error);
    throw error;
  }
};

// --- PUT: Update restaurant cover image
export const UpdateRestaurantCover = async (payload: {
  imageBase64: string;
  tags: string[];
}): Promise<any> => {
  try {
    const response = await apiClient.put('/api/restaurant/updateRestaurantCoverImage', payload);
    return response.data;
  } catch (error) {
    console.error('Error updating restaurant cover image:', error);
    throw error;
  }
};

// --- PUT: Edit existing product image
export const EditRestaurantProductImage = async (imageData: {
  _id: string;
  imageBase64: string;
  tags: string[];
}): Promise<any> => {
  try {
    const response = await apiClient.put('/api/restaurant/editRestaurantProductImage', imageData);
    return response.data;
  } catch (error) {
    console.error('Error updating product image:', error);
    throw error;
  }
};

// --- PUT: Update restaurant profile photo
export const UpdateRestaurantProfilePhoto = async (photoData: {
  imageBase64: string;
  tags: string[];
}): Promise<any> => {
  try {
    const response = await apiClient.put('/api/restaurant/updateRestaurantProfilePhoto', photoData);
    return response.data;
  } catch (error) {
    console.error('Error updating restaurant profile photo:', error);
    throw error;
  }
};

// --- GET: Fetch restaurant profile
export const GetRestaurantProfile = async (): Promise<any> => {
  try {
    const response = await apiClient.get('/api/restaurant/getRestaurantProfie');
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
  stockAvailable?: number;
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

// --- GET: Fetch new "called" orders
export const RGetRestaurantAllCalledOrders = async (): Promise<any> => {
  try {
    const response = await apiClient.get('/api/restaurant/getRestaurantAllCalledOrders');
    return response.data;
  } catch (error) {
    console.error('Error fetching restaurant called orders:', error);
    throw error;
  }
};

// --- GET: Fetch pending/processing orders
export const RGetRestaurantAllRequiredOrders = async (): Promise<any> => {
  try {
    const response = await apiClient.get('/api/restaurant/getRestaurantAllRequiredOrders');
    return response.data;
  } catch (error) {
    console.error('Error fetching restaurant required orders:', error);
    throw error;
  }
};

// --- GET: Fetch order history
export const RGetOrdersHistory = async (): Promise<any> => {
  try {
    const response = await apiClient.get('/api/restaurant/getOrdersHistory');
    return response.data;
  } catch (error) {
    console.error('Error fetching restaurant order history:', error);
    throw error;
  }
};

// --- PUT: Accept a "called" order
export const RAcceptOrder = async (orderId: string): Promise<any> => {
  try {
    const response = await apiClient.put(`/api/restaurant/acceptOrder?orderID=${orderId}`);
    return response.data;
  } catch (error) {
    console.error('Error accepting restaurant order:', error);
    throw error;
  }
};

// --- PUT: Reject a "called" order
export const RRejectOrder = async (orderId: string): Promise<any> => {
  try {
    const response = await apiClient.put(`/api/restaurant/rejectOrder?orderID=${orderId}`);
    return response.data;
  } catch (error) {
    console.error('Error rejecting restaurant order:', error);
    throw error;
  }
};