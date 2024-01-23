import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:8800/api/",
    timeout: 10000,
    headers: {
        "Content-Type" : 'application/json',
    },
});

instance.interceptors.response.use(
    (response) => response.data,
    (error) => {
        if (error.response) {
            console.error('Response error:', error?.response?.status, error?.response?.data);
        } else if (error.request) {
            console.error('No response received:', error.request);
        } else {
            console.error('Request error:', error.message);
        }
        return Promise.reject(error?.response?.data);
    }
)

instance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})

export default instance;