import api from "@/plugins/axios";


export const moduleService = {
    getModuleById(id) {
        return api.get(`/module?id=${id}`)
    }
}