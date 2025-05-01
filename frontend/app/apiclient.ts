import axios from 'axios';
import * as SecureStore from 'expo-secure-store'; // 🧠 Important

const apiClient = axios.create({
    baseURL: 'http://192.168.1.187:4123',
});

export default apiClient;
