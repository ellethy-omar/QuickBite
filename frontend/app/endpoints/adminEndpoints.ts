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

export const fetchAllDrivers = async () => {
    try {
        const response = await apiClient.get('/api/admin/getAllDrivers');

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
            isActive: restaurant.isActive,
            isBanned: restaurant.isBanned,
            coverImage: restaurant.coverImage,
        }));

        return mappedRestaurants;
    } catch (error: any) {
        console.error("error", error.response?.data || error.message);
        throw error;
    }
}

export const fetchRestaurantProducts = async (id: string) => {
    try {
        const response = await apiClient.get(`/api/admin/getAllProductsOfCertainRestaurant?restraurantID=${id}`);
        const mappedRestaurants = response.data.data.map((item: any) => ({
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

export const fetchAdminMail = async (type: string, status: string) => {
    try {
        const response = await apiClient.get(`api/admin/getAllRequests?status=${status}&senderModel=${type}`);
        console.log("response", response.data.requests);

        const mappedMail = response.data.requests.map((item: any) => ({
            name: item.senderId.name,
            id: item._id,
            senderId: item.senderId._id,
            status: item.status,
            senderModel: item.senderModel,
            description: item.description,
            createdAt: item.createdAt,
        }));

        return mappedMail;
    } catch (error: any) {
        console.error("error", error.response?.data || error.message);
        throw error;
    }
}

export const replyToMail = async (id: string, message: string, status: string) => {
    try {
        const response = await apiClient.put('/api/admin/processRequest', {
            status: status,
            requestId: id,
            adminMessage: message
        });
        return response;

    } catch (error: any) {
        console.error("error", error.response?.data || error.message);
        throw error;
    }
};

export const sendMessageAdmin = async (userId: string, message: string, type: string) => {
    try {
        const response = await apiClient.post('/api/admin/sendNotification', {
            receiverId: userId,
            description: message,
            data: {},
            receiverModel: type
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

export const banDriverAccess = async (userId: string, flag: boolean) => {
    try {
        if(!flag) {
            const response = await apiClient.put(`/api/admin/banDriver?driverId=${userId}`);
            return response;
        } else {
            const response = await apiClient.put(`/api/admin/unbanDriver?driverId=${userId}`);
            return response;
        }
    } catch (error: any) {
        console.error("error", error.response?.data || error.message);
        throw error;
    }
}

export const banRestaurantAccess = async (userId: string, flag: boolean) => {
    try {
        if(!flag) {
            const response = await apiClient.put(`/api/admin/banRestaurant?restaurantId=${userId}`);
            return response;
        } else {
            const response = await apiClient.put(`/api/admin/unbanRestaurant?restaurantId=${userId}`);
            return response;
        }
    } catch (error: any) {
        console.error("error", error.response?.data || error.message);
        throw error;
    }
}