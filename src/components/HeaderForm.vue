<template>
  <div class="main-header">
    <div class="wrapper">
      <div class="container">
        <div class="logotype">
          <a class="logo" @click="Home">
              <UIIcon path="logo.svg" width="35px" height="35px" />
              <span class="logo-text">pleiades</span>
          </a>
        </div>
        <div class="content">
          <div class="content-body">
            <div class="main">
              <a href="">Главная</a>
              <a href="">Модули</a>
            </div>                        
              <div class="right">
                <div class="language">
                  <a class="switch-lang">
                      <UIIcon path="language.svg" />
                      <UIIcon width="22px" height="22px" path="downArrowhead.svg" />
                  </a>
                </div>
                <div v-if="isUserLogin" class="login-user">
                  <div>
										<v-menu class="v-menu-header">
                  <template v-slot:activator="{ props }">
                      <div v-bind="props" class="userProfile">
													<div id="userAvatar" class="userAvatar"></div>
                          <UIIcon width="22px" height="22px" path="downArrowhead.svg" />
                      </div>
                  </template>
                  <v-list class="v-list-header" 
                          style="border-radius: 10px; background: transparent; min-width: 200px">
                      
                      <v-list-item 
                          v-for="(item, index) in items" 
                          :key="index" 
                          :value="index" 
                          class="v-item-header" 
                          :class="{ 'border-style': index === 3 }" 
                          style="overflow: hidden;"
													@click="handleClick(item)">
                          
                          <v-list-item-title 
                              :class="{ 'highlight-title': index === 3 }" 
                              style="background-color: #272A2F; text-wrap: wrap;">
                              {{ item.title }}
                          </v-list-item-title>
                      </v-list-item>
                  </v-list>
                  </v-menu>
									</div>
									<!-- <button @click="logout">Выход</button> -->
                </div>
                <div v-else class="auth-header">
                  <a @click="loginUser" href="">Вход</a>
                  <button @click="registerUser" class="register">Регистрация</button>
                  <h2>{{ authStore.token }}</h2>
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import UIIcon from './UI/UIIcon.vue';
import router from '@/router/router';
import { ref, onMounted, computed } from 'vue';
import { useAuthStore } from '@/stores/authStore';
import api from '@/plugins/axios';

const authStore = useAuthStore();

// const isUserLogin = authStore.isUserLogin;
const isUserLogin = computed(() => authStore.isUserLogin);

// const avatar = null;

onMounted(() => {
		LoadAvatar();
		LoadUserName();
}); 

const logout = async () => {
    await authStore.cleanTokens();
    router.push('/');
}


const LoadAvatar = () => {
  const storedAvatar = localStorage.getItem('userAvatar');
  if (storedAvatar) {
			SetAvatarToPage(storedAvatar);
  }else{
      GetAvatar();
  }
}

const GetAvatar = async () => {
	try{
		const response = await api.get(`/user/whoami`);
		const base64Avatar = `data:image/png;base64,${response.data.avatar}`;
    SetAvatarToPage(base64Avatar);
    localStorage.setItem('userAvatar', base64Avatar);
		localStorage.setItem('userName', response.data.userName);
	}
	catch(error){
		console.error(error);
	}
}

const SetAvatarToPage = (base64Avatar, width = 40, height = 40) => {
    const avatarImage = document.createElement('img');
    avatarImage.src = base64Avatar;
		avatarImage.width = width; 
    avatarImage.height = height; 
		avatarImage.style.borderRadius = '50%';
    const avatarContainer = document.getElementById('userAvatar');

    if (avatarContainer) {
			avatarContainer.innerHTML = '';
      avatarContainer.appendChild(avatarImage);
    } else {
        console.error("Element with id 'userAvatar' not found.");
    }
};


const storedUserName = ref('');

const items = ref([
  { title: 'Привет, {storedUserName}!', action: 'home' },
  { title: 'Достижения', action: 'achievements' },
  { title: 'Настройки', action: 'settings' },
  { title: 'Выйти из аккаунта', action: 'logout' },
  { title: 'Политика конфиденциальности', action: 'privacy' },
]);

const LoadUserName = () => {
  const userName = localStorage.getItem('userName');
  if (userName) {
    storedUserName.value = userName;
  }
	else
	{
		storedUserName.value = "Пользователь"
	}
};


const handleClick = (item) => {
  switch (item.action) {
    case 'profile':
      router.push('/profile');
      break;
    case 'achievements':
      router.push('/achievements');
      break;
    case 'settings':
      router.push('/settings');
      break;
    case 'logout':
      authStore.cleanTokens(); // Выполняем logout
      router.push('/');
      break;
    case 'privacy':
      router.push('/privacy-policy');
      break;
    default:
      console.warn('Неизвестное действие:', item.action);
  }
};

const Home = () => {
    router.push('/');
}

const loginUser = () => {
    router.push('/login');
}
const registerUser = () => {
    router.push('/register');
};

</script>

<style scoped>

.userProfile
{
	display: flex; 
	flex-direction: row; 
	align-items: center; 
	gap: 10px;
	cursor: pointer;
}

.v-list
{
    padding: 0px;
    background-color: #272A2F;
    margin-top: 10px;   
}

.border-style {
    border-top: solid #323232;
    border-bottom: solid #323232;
}

.highlight-title {
    color: #FF5858;
}

.v-item-header{
    background-color: #272A2F;
}
.v-item-title-header{
    background-color: #272A2F;
}

.main-header{
    /* display: flex; */
    text-decoration: none;
    width: 100%;
    height: 64px;
    
}
.login-user{
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: 10px;
}

a, button{
    font-size: 16px;
    font-weight: 500;
}

button{
    background-color: #272A2F;
    border: 1px solid #3B4047;
    padding: 10px 20px;
    border-radius: 10px;
    cursor: pointer;
    transition: 0.4s ease;
    box-sizing: border-box;
}

button:hover{
    border: 1px solid #D459FF;
}

a:hover{
    color: white;
    transition: 0.3s ease;
}

.wrapper{
    padding-left: 20%;
    padding-right: 20%;
    width: 100%;
    height: 100%;
}
.container{
    display: flex;
    max-width: 100%;
    height: 64px;
    flex: 1;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 30px;
}

.right{
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 20px;
}

.logo{
    flex-shrink: 0;
    display: flex;
    align-items: center;
    gap: 10px;
}
.content{
    flex-grow: 1;
}

.content-body{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
}
.main, .auth-header{
    display: flex;
    align-items: center;
    gap: 30px;
}

.switch-lang{
    display: flex;
    align-items: center;
    gap: 5px;
    
}

.logo{
    cursor: pointer;
}

/* .switch-lang:hover{
    
} */

.logo-text{
    font-weight: 700;
}

</style>