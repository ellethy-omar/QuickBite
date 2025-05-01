import { jwtDecode } from 'jwt-decode';
import apiClient from '../apiclient';
import * as SecureStore from 'expo-secure-store';

export const isTokenExpired = (token: string): boolean => {
  try {
    const decoded: { exp: number } = jwtDecode(token); // Decode the token to get the expiration time
    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
    return decoded.exp < currentTime; // Check if the token is expired
  } catch (error) {
    console.error('Error decoding token:', error);
    return true; // If decoding fails, assume the token is expired
  }
};

export const refreshAuthToken = async (): Promise<string | null> => {
  try {
    const refreshToken = await SecureStore.getItemAsync('refreshToken'); // Retrieve the refresh token
    if (!refreshToken) {
      throw new Error('No refresh token found');
    }

    const response = await apiClient.post('/api/auth/refresh', {
      refreshToken, // Send the refresh token to the backend
    });

    const newToken = response.data.token; // Assume the backend returns the new token
    await SecureStore.setItemAsync('jwtToken', newToken); // Save the new token
    return newToken;
  } catch (error) {
    console.error('Error refreshing token:', error.response?.data || error.message);
    return null; // Return null if refreshing fails
  }
};