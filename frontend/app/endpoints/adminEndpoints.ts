import apiClient from '../apiclient';

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

export const fetchRestaurantProducts = async () => {
    try {
        const response = await apiClient.get('/api/restaurant/getRestaurantProducts');

        const mappedRestaurants = response.data.map((item: any) => ({
            name: item.name,
            description: item.description,
            price: item.price,
            image: item.image
        }));

        return mappedRestaurants;
    } catch (error: any) {
        console.error("error", error.response?.data || error.message);
        throw error;
    }
}

export const fetchDriverMail = async () => {
    try {
        const response = await apiClient.get('/api/restaurant/getRestaurantProducts');

        const mappedRestaurants = response.data.map((item: any) => ({
            name: item.name,
            description: item.description,
            price: item.price,
            image: item.image
        }));

        return mappedRestaurants;
    } catch (error: any) {
        console.error("error", error.response?.data || error.message);
        throw error;
    }
}

export const sendMessageUser = async (userId: string, message: string) => {
    try {
        const response = await apiClient.post('/api/admin/sendWarningToUser', {
            userId: userId,
            message: message
        });
        return response;
    } catch (error: any) {
        console.error("error", error.response?.data || error.message);
        throw error;
    }
}

export const banUserAccess = async (userId: string, flag: boolean) => {
    try {
        if(!flag) {
        const response = await apiClient.put(`/api/admin/banUser?userId=${userId}`);
        return response;
        } else {
            const response = await apiClient.put(`/api/admin/unbanUser?userId=${userId}`);
            return response;
        }
    } catch (error: any) {
        console.error("error", error.response?.data || error.message);
        throw error;
    }
}