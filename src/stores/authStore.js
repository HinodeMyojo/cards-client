import { defineStore } from 'pinia';
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_APP_BACKEND_URL,
});

export const useAuthStore = defineStore({
  id: 'authStore',
  state: () => ({
    accessToken: localStorage.getItem('accessToken'),
    refreshToken: localStorage.getItem('refreshToken'),
    isUserLogin: !!localStorage.getItem('accessToken'),
    userId:  localStorage.getItem("userId"),
    userAvatar: localStorage.getItem("userAvatar"),
    userName: localStorage.getItem("userName"),
  }),
  actions: {
    checkUserLogin() {
      this.isUserLogin = !!localStorage.getItem('accessToken');
    },
    
    setTokens({ access, refresh }) {
      this.accessToken = access;
      this.refreshToken = refresh;
      localStorage.setItem('accessToken', access);
      localStorage.setItem('refreshToken', refresh);
      this.checkUserLogin();
    },
    cleanData() {
      this.accessToken = null;
      this.refreshToken = null;
      localStorage.clear();
      this.checkUserLogin();
      location.reload();
    },
    async refreshAccessToken() {
      try {
        const response = await api.post('/auth/refresh', {
          accessToken: this.accessToken,
          refreshToken: this.refreshToken,
        });

        this.setTokens({
          access: response.data.access,
          refresh: response.data.refresh,
        });
        return response.data.access;
      } catch (error) {
        this.cleanData();
        this.isUserLogin = false;
        throw error;
      }
    },
  },
});
