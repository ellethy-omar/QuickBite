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
    password?: string; // optional, unless you want to allow password update here
  };
  openingHours: any; // you can refine the type if needed
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
