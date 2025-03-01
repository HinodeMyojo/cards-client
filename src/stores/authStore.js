import { defineStore } from 'pinia';

import api from '@/plugins/axios';

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
      this.isUserLogin = !!this.accessToken;
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
      this.userId = null;
      this.userAvatar = null;
      this.userName = null;
      localStorage.clear();
      this.checkUserLogin();
      location.reload();
    },
    async whoami() {
      try {
        const response = await api.get('/user/whoami');
        this.ProcessUserData(response.data);
      } catch (error) {
        console.error('Error in whoami:', error.message || error);
        this.cleanData();
        throw new Error('Failed to load user data');
      }
    },
    ProcessUserData (data) {
      try {
        const base64Avatar = `data:image/png;base64,${data.avatar}`;
        this.saveUserDataToStorage({
          userAvatar: base64Avatar,
          userName: data.userName,
          userId: data.id,
        });
        this.userAvatar = base64Avatar;
        this.userName = data.userName;
        this.userId = data.id;
      } catch (error) {
        console.error('Error processing user data:', error);
      }
    },
    saveUserDataToStorage(userData) {
      try {
        Object.entries(userData).forEach(([key, value]) => {
          localStorage.setItem(key, value);
        });
      } catch (error) {
        console.error('Error saving user data to storage:', error.message || error);
        throw new Error('Failed to save user data');
      }
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
