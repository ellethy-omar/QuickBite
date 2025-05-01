import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://quickbite.zapto.org/',
});

export default apiClient;
