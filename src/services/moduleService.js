import api from "@/plugins/axios";

export const moduleService = {
    async getUsedModules(textSearch) {
        try{
            return await api.get('/module/used-modules', {params: {textSearch}});
        } catch (error) {
            console.error("Ошибка получения модулей:", error);
            throw error;
        }
    },
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
            return await api.delete(`/module?id=${id}`);
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
    },
    async getModules(addAvatar, addUserName, sortTime, sortOption) {
        try {
            return await api.get(`/modules?AddCreatorAvatar=${addAvatar}&AddCreatorUserName=${addUserName}&SortTime=${sortTime}&SortOption=${sortOption}`);
        } catch (error) {
            console.error("Ошибка получения модулей:", error);
            throw error;
        }
    },
    async getSortDropDown(){
        try{
            return await api.get('/modules/sortOptions');
        } catch (error) {
            console.error("Ошибка получения списка модулей:", error);
            throw error;
        }
    }
};
