import { defineStore } from "pinia";
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_APP_BACKEND_URL,
});

export const useAuthStore = defineStore({
  id: "authStore",
  state: () => ({
      accessToken: localStorage.getItem("accessToken"),
      refreshToken: localStorage.getItem("refreshToken"),
      isUserLogin: !localStorage.getItem("accessToken"),
  }),
  actions:{
      setTokens({ access, refresh })
      {
          this.accessToken = access;
          this.refreshToken = refresh;
          localStorage.setItem("accessToken", access);
          localStorage.setItem("refreshToken", refresh);
      },
      cleanTokens() {
          this.accessToken = null;
          this.refreshToken = null;
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
      },
      async refreshAccessToken(){
        try
        {
          const response = await api.post('/auth/refresh', 
            {
              refresh: this.refreshToken,
            });

          this.setTokens(
            {
              access: response.data.access,
              refresh: response.data.refresh,
            });
            return response.data.access;
        }
        catch (error)
        {
          this.clearTokens();
          throw error;
        }
      }
  }
});