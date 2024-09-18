import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:5173',
});

// Add a request interceptor to include the JWT token in headers
instance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default instance;
