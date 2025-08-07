import axios from "axios";
import { statusCodes } from "./statusCodes";

const baseUrl = import.meta.env.VITE_BASE_URL;
const MAX_RETRIES = 2;
const api = axios.create({
    baseURL: 'http://localhost:3000/api',
    withCredentials: true
});

api.interceptors.response.use(
    response => response,
    async (error) => {
        const originalRequest = error.config;

        if (originalRequest.url.includes("/auth/refresh")) {
            return Promise.reject(error);
        }
        originalRequest._retryCount = originalRequest._retryCount || 0;

        if (error.response?.status === statusCodes.UNAUTHORIZED && originalRequest._retryCount < MAX_RETRIES) {
            originalRequest._retryCount += 1;

            try {
                await api.post('/auth/refresh');
                return api(originalRequest);
            } catch (refreshError) {
                return Promise.reject(refreshError);
            }
        }
    }
)

export default api;