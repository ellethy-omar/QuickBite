import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://quickbite.zapto.org', // Your local server
  headers: {
    'Content-Type': 'application/json', // Standard header
  },
});

// 🛡 Intercept all outgoing requests
apiClient.interceptors.request.use(
  async (config) => {
    const token = await SecureStore.getItemAsync('jwtToken'); // Get the stored token
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
