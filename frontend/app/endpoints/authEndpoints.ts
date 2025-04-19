import { UserFormData } from "../types/authTypes"

export const UserLogin = async (userData: UserFormData) => {
    const reqBody = {
        username: userData.name,
        password: userData.password,
        email: userData.email,
    }
    try {
        const response = await fetch('http://192.168.1.182:4123/api/auth/registerUser', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(reqBody)}
        );
        return response;
    } catch (error) {
        console.error('Error:', error);
    }
}