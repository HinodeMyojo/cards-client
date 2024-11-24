import axios from "axios";
import { useAuthStore } from "@/stores/authStore";
import router from '@/router/router'

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

        // Если мы при запросе получаем 401 ошибку И не было попыток повтороного реквеста И пользователь авторизован
        if (error.response.status === 401 && !originalRequest._retry && authStore.isUserLogin) {
            // Проставляем флаг повторого запроса (ибо больше 1 раза смысла не имеет)
            originalRequest._retry = true;
            try{
                // Пытаемся обновить токен
                const newAccessToken = await authStore.refreshAccessToken();
                console.log("Обноленный токен");
                console.log(newAccessToken);
                // Если обновление прошло успешно, то добавляем его в headers
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return api(originalRequest);
            }
            catch(error){
                // Если обновление не удалось, то очищаем токены и выходим на страницу входа
                console.error(error);
                authStore.cleanData();
                router.push('/login')
            }
        }

        throw error;
        
    });

export default api;
