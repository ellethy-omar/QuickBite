import apiClient from '../apiclient';
import * as SecureStore from 'expo-secure-store';
import { isTokenExpired, refreshAuthToken } from '@/app/utils/authHelpers';

export const fetchAllUsers = async () => {
    try {
        const response = await apiClient.get('/api/admin/getAllUsers');

        return response.data;
    } catch (error: any) {
        console.error("error", error.response?.data || error.message);
        throw error;
    }
}

export const fetchAllRestaurants = async () => {
    try {
        const response = await apiClient.get('/api/admin/getAllRestaurants');

        console.log("response", JSON.stringify(response.data, null, 2));
        const mappedRestaurants = response.data.map((restaurant: any) => ({
            id: restaurant._id,
            name: restaurant.name,
            description: restaurant.description,
            cuisines: restaurant.cuisineType,
            rating: restaurant.rating,
            address: restaurant.address,
            phone: restaurant.contact.phone,
            email: restaurant.contact.email,
            image: restaurant.logo,
            banner: restaurant.coverImage,
            isActive: restaurant.isActive,
            isBanned: restaurant.isBanned,
        }));

        return mappedRestaurants;
    } catch (error: any) {
        console.error("error", error.response?.data || error.message);
        throw error;
    }
}