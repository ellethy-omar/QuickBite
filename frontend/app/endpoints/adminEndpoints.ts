import apiClient from '../apiclient';
import { OrderDriver } from '../types/orderDriver';


export const updateProfileInformation = async (profileData: {name: string, phone: string, email: string}) => {
    try {
        const response = await apiClient.put('/api/admin/updateAdminProfile', {
            name: profileData.name,
            phone: profileData.phone,
            email: profileData.email
        });

        return response;
    } catch (error: any) {
        console.error("error", error.response?.data || error.message);
        throw error;
    }
}

export const updateProfilePicture = async (image: string) => {
    try {
        if(image === "")
            throw new Error("can't upload nothing");
        const response = await apiClient.put('/api/admin/updateAdminProfilePhoto', {
            imageBase64: image,
            tags: []
        });

        return response;
    } catch (error: any) {
        console.error("error", error.response?.data || error.message);
        throw error;
    }
}

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

export const fetchActiveOrders = async () => {
    try {
        const driversData = await fetchAllDrivers();
        const response = await apiClient.get('/api/admin/getProcessingOrders');
        const orders: OrderDriver[] = response.data.data
            .filter((order: any) => order.status !== 'pending')
            .map((order: any) => ({
            orderId: order._id,
            deliveryAddress: order.userID.addresses.find((address: any) => address.isDefault == true),
            userId: order.userID == null ? {name: "Guest", phone: "333", email: "none", _id: "fmfnjnwdoi"} : order.userID,
            totalAmount: order.totalAmount,
            driverId: driversData.find((driver: any) => driver._id === order.deliveryDriverID) || {
                _id: "none",
                name: "Guest",
                phone: "333",
                profilePicture: "none",
                vehicle: {
                    category: "none",
                    model: "none",
                    plateNumber: "none"
                }
            },
            restaurantId: {...order.restaurantID, logo: order.restaurantID.logo, phone: order.restaurantID.contact.phone},
            items: order.items.map((item: any) => ({
                itemId: item.productId._id,
                itemPrice: item.productId.price,
                itemName: item.productId.name,
                itemQuantity: item.quantity,
                itemDescription: item.productId.description,
            })),
            createdOn: order.createdAt,
            }));
      
        return orders;
    } catch (error: any) {
        console.error("error", error.response?.data || error.message);
        throw error;
    }
}

export const fetchUsersOrders = async (userId: string) => {
    try {
        const response = await apiClient.get(`/api/admin/getAllOrdersForCetainUser?userId=${userId}`);
        const orders: OrderDriver[] = response.data.data.map((order: any) => ({
            orderId: order._id,
            deliveryAddress: order.userID.addresses.find((address: any) => address.isDefault == true),
            userId: order.userID,
            totalAmount: order.totalAmount,
            driverId: order.deliveryDriverID,
            restaurantId: {...order.restaurantID, logo: order.restaurantID.logo, phone: order.restaurantID.contact.phone},
            items: order.items.map((item: any) => ({
                itemId: item.productId._id,
                itemPrice: item.productId.price,
                itemName: item.productId.name,
                itemQuantity: item.quantity,
                itemDescription: item.productId.description,
            })),
            createdOn: order.createdAt,
            status: order.status,
        }));

        return orders;
    } catch (error: any) {
        console.error("error", error.response?.data || error.message);
        throw error;
    }
}

export const fetchDriversOrders = async (driverId: string) => {
    try {
        const response = await apiClient.get(`/api/admin/getDriverOrdersHistory?driverId=${driverId}`);
        const orders: OrderDriver[] = response.data.data.map((order: any) => ({
            orderId: order._id,
            deliveryAddress: order.userID.addresses.find((address: any) => address.isDefault == true),
            userId: order.userID,
            totalAmount: order.totalAmount,
            driverId: order.deliveryDriverID,
            restaurantId: {...order.restaurantID, logo: order.restaurantID.logo, phone: order.restaurantID.contact.phone},
            items: order.items.map((item: any) => ({
                itemId: item.productId._id,
                itemPrice: item.productId.price,
                itemName: item.productId.name,
                itemQuantity: item.quantity,
                itemDescription: item.productId.description,
            })),
            createdOn: order.createdAt,
            status: order.status,
        }));

        return orders;
    } catch (error: any) {
        console.error("error", error.response?.data || error.message);
        throw error;
    }
}