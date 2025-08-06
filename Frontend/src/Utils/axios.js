import axios from "axios";

const baseUrl = import.meta.env.VITE_BASE_URL;

const api = axios.create({
    baseURL: 'http://localhost:3000/api',
    withCredentials: true
});

export default api;