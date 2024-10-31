<template>
    <div class="main">
        <div class="container">
            <div class="profile">
                <div class="profile-image">
                    <div id="sideBarAvatar" class="sideBarAvatar">
                        <img v-if="avatarSrc" :src="avatarSrc" alt="User Avatar" />
                        <p v-else>Загрузка аватара...</p>
                    </div>
                </div>
                <div class="profile-info">
                    <div id="userName" class="userName">{{ storedUserName }}</div>
                </div>
            </div>
            <hr />
            <div class="search">
                <v-autocomplete label="Поиск"
                    :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"></v-autocomplete>
            </div>
            <hr />
            <div class="tree"></div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import api from '@/plugins/axios';

const storedUserName = ref('Пользователь');
const avatarSrc = ref('');

const LoadUserData = async () => {
    const userName = localStorage.getItem('userName');
    const storedAvatar = localStorage.getItem('userAvatar');

    if (userName) storedUserName.value = userName;
    if (storedAvatar) {
        avatarSrc.value = storedAvatar;
    } else {
        try {
            const response = await api.get(`/user/whoami`);
            const base64Avatar = `data:image/png;base64,${response.data.avatar}`;
            avatarSrc.value = base64Avatar;
            storedUserName.value = response.data.userName;
            localStorage.setItem('userAvatar', base64Avatar);
            localStorage.setItem('userName', response.data.userName);
        } catch (error) {
            console.error('Error loading user data:', error);
        }
    }
};

onMounted(() => {
    LoadUserData();
});
</script>

<style scoped>
.main {
    display: flex;
    border-radius: 25px;
    width: 100%;
    height: 50%;
    background-color: #202127;
}

hr {
    height: 2px;
    background-color: #272A2F;
    border: none;
    margin: 10px 0;
}

.container {
    display: flex;
    flex: 1;
    flex-direction: column;
    margin: 15px;
    background-color: #202127;
}

.profile {
    width: 100%;
    display: flex;
    flex-direction: row;
    gap: 30px;
    margin-bottom: 5px;
    background-color: transparent;
}

.profile-image {
    border-radius: 50%;
    overflow: hidden;
    width: 160px;
    height: 160px;
    display: flex;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.profile-image img {
    border-radius: 50%;
    max-width: 100%;
    max-height: 100%;
    border: 4px solid #808080;
    object-fit: cover;
    filter: blur(0.2px);
}

.profile-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 15px;
    margin-top: 15px;
    margin-bottom: 15px;
    font-size: large;
    background-color: transparent;
}

.userName {
    font-weight: 500;
    background-color: transparent;
}
</style>
