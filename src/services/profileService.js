import api from "@/plugins/axios";

// Функция для получения пользователя по имени
export async function getUserByUserName(username) {
    try {
        // Делаем асинхронный запрос
        const response = await api.get(`user/getByUserName?userName=${username}`);
        return response.data;
    } catch (error) {
        // axios ловит ошбику
    }
}
