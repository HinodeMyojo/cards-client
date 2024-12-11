import api from "@/plugins/axios";

export const moduleService = {
    async getModuleById(id) {
        try {
            return await api.get(`/module?id=${id}`);
        } catch (error) {
            console.error("Ошибка получения модуля по ID:", error);
            throw error;
        }
    },
    async getHeaders() {
        try {
            return await api.get("/module/header");
        } catch (error) {
            console.error("Ошибка получения headers:", error);
            throw error;
        }
    },
    async createModule(data) {
        try {
            return await api.post(`/module`, data);
        } catch (error) {
            console.error("Ошибка создания модуля:", error);
            throw error;
        }
    },
    async deleteModule(id) {
        try {
            return await api.delete(`/module`, { data: { id } });
        } catch (error) {
            console.error("Ошибка при удалении модуля:", error);
            throw error;
        }
    },
    async deleteModuleFromLibrary(id) {
        try {
            return await api.delete("/module/library", { data: { id } });
        } catch (error) {
            console.error("Ошибка при удалении модуля из библиотеки:", error);
            throw error;
        }
    }
};
