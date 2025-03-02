import { defineStore } from 'pinia';

import api from '@/plugins/axios';

export const usePermissionsStore = defineStore({
    id: "permissionsStore",
    state:() => ({
        userPermissions: []
    }),
    actions:{
        async getUserPermissions(){
            var response = await api("permission/get")
            this.userPermissions = response.data
        },
        checkPermissions(permission){
            return this.userPermissions.includes(permission)
        }
    }
})