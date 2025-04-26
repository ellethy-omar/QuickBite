import * as SecureStore from "expo-secure-store";
import apiClient from "../apiclient";

export const fetchUserOrders = async () => {
    try {
        const token = await SecureStore.getItemAsync('jwtToken');
        if(!token) {
            throw new Error('No token found');
        }
        const response = await apiClient.get('/api/driver/getAllOrders', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
        });
        console.log("response from fetchUserOrders", response.data);
        return response.data;
    } catch (error) {
        console.error("error fetching orders", error);
        throw error;
    }
}
