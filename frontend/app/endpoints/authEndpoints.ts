import { UserFormData, RestaurantFormData } from "../types/authTypes"
import apiClient from "../apiclient";

export const UserSignupRoute = async (userData: UserFormData) => {
    const reqBody = {
        username: userData.name,
        password: userData.password,
        email: userData.email,
        phone: userData.phone,
        addresses: [{...userData.address, isDefault: true}]
    }
    try {
        const response = await apiClient.post('/api/auth/registerUser', reqBody);
        return response;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

export const RestaurantSignupRoute = async (restaurantData: RestaurantFormData) => {
    const reqBody = {
        name: restaurantData.name,
        password: restaurantData.password,
        email: restaurantData.email,
        phone: restaurantData.phone,
        cuisines: restaurantData.cuisines,
        address: restaurantData.address,
        description: restaurantData.description,
        image: restaurantData.image,
        openingHours: restaurantData.openingHours
    }
    try {
        const response = await apiClient.post('/api/auth/registerRestaurant', reqBody);
        return response;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

export const LoginRestaurantRoute = async (name: string, password: string) => {
    const reqBody = {
        emailOrPhone: name,
        password: password,
    }
    try {
        const response = await apiClient.post('/api/auth/loginRestaurant', reqBody);
        return response;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

export const LoginDriverRoute = async (name: string, password: string) => {
    const reqBody = {
        emailOrPhone: name,
        password: password,
    }
    try {
        const response = await apiClient.post('/api/auth/loginDriver', reqBody);
        return response;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

export const LoginUserRoute = async (name: string, password: string) => {
    const reqBody = {
        usernameOrEmail: name,
        password: password,
    }
    try {
        const response = await apiClient.post('/api/auth/loginUser', reqBody);
        return response;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}