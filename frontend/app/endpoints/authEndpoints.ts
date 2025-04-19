import { UserFormData } from "../types/authTypes"
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