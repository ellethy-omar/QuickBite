import axios from 'axios';
import * as SecureStore from 'expo-secure-store'; // 🧠 Important

const apiClient = axios.create({
    baseURL: 'http://quickbite.zapto.org',
});

export default apiClient;
