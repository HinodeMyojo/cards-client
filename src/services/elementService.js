import api from "@/plugins/axios";


export const elementService = {
    getElementById(id) {
        return api.get(`/module/${id}`)
    },
    deleteElement(id) {
        return api.delete(`/element/${id}`)
    },
    addElementToModule(model) {
        return api.post(`/element`, model)
    }
}