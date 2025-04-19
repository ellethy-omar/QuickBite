import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://192.168.1.181:4123',
});

export default apiClient;