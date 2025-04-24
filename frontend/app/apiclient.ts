import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://172.20.10.2:4123',
});

export default apiClient;