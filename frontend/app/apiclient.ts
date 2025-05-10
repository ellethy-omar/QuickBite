import axios from 'axios';
import * as SecureStore from 'expo-secure-store'; // Secure storage for tokens
import { isTokenExpired, refreshAuthToken } from './utils/authHelpers'; // Token helpers

const apiClient = axios.create({
  baseURL: 'https://quickbite.zapto.org', // Your local server
  headers: {
    'Content-Type': 'application/json', // Standard header
  },
});

// 🛡 Intercept all outgoing requests
apiClient.interceptors.request.use(
  async (config) => {
    if (config.skipAuth) {
      return config;
    }

    // Example: Exclude specific URLs
    const excludedUrls = ['/public-endpoint', '/another-public-endpoint'];
    if (excludedUrls.some((url) => config.url?.startsWith(url))) {
      return config;
    }

    // Add token logic
    let token = await SecureStore.getItemAsync('jwtToken');
    if (!token) {
      throw new Error('No token found');
    }

    if (isTokenExpired(token)) {
      console.log('Token expired, refreshing...');
      token = await refreshAuthToken();
      if (!token) {
        throw new Error('Failed to refresh token');
      }
      await SecureStore.setItemAsync('jwtToken', token);
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Attach Authorization header
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
