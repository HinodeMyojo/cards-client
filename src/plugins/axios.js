import axios from "axios";
import { useAuthStore } from "@/stores/authStore";

// Получаем базовый URL
const api = axios.create({
    baseURL: import.meta.env.VITE_APP_BACKEND_URL,
});

// Если у нас есть токен авторизации в localStorage - то добавляем его в headers
api.interceptors.request.use((config) => {
    const authStore = useAuthStore();
    if (authStore.accessToken) {
        config.headers.Authorization = `Bearer ${authStore.accessToken}`;
    }
    return config;
});


api.interceptors.response.use((response) => 
    response, 
    async (error) => {
        const authStore = useAuthStore();
        const originalRequest = error.config;
        console.log(originalRequest);


        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try{
                const newAccessToken = await authStore.refreshAccessToken();
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return api(originalRequest);
            }
            catch(error){
                console.error(error);
                authStore.clearTokens();
            }
        }

        throw error;
        
    });

export default api;
