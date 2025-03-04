<template>
  <v-app>
    <v-navigation-drawer>
      <v-list
        :items="menuItems"
      ></v-list>
    </v-navigation-drawer>
  </v-app>
  <div class="main-header">
    <div class="wrapper">
      <div class="container">
        <div class="burger-menu">
          <button class="menu" @click="drawer = !drawer"><svg-icon type="mdi" :path="menu" size="30"></svg-icon></button>
        </div>
        <div class="logotype">
          <a class="logo" @click="Home">
            <UIIcon :icon="logoIcon" width="35px" height="35px" :color="white" />
            <span class="logo-text">PLEIADIX</span>
          </a>
        </div>
        <div class="content">
          <div class="content-body">
            <div class="main">
              <v-menu>
                <template v-slot:activator="{ props }">
                  <v-btn 
                    variant="text"
                    v-bind="props"
                    class="logo-text"
                  >
                    Главная
                    <svg-icon type="mdi" :path="downPath" size="30"></svg-icon>
                  </v-btn>
                </template>
                <v-list style="background-color: transparent">
                  <v-list-item
                    v-for="(item, index) in menuItems"
                    :key="index"
                    :value="index"
                    style="background-color: #272a2f;"
                    @click="handleClick(item)">
                    <v-list-item-title style="background-color: #272a2f; ">
                      {{ item.title }}
                    </v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </div>
            <div class="right">
              <div class="language">
                <a class="switch-lang">
                  <UIIcon :icon="languageIcon" :color="white" />
                  <UIIcon :size="22" :icon="downArrowheadIcon" :color="white" />
                </a>
              </div>
              <div v-if="isUserLogin" class="login-user" id="menu-activator">
                <!-- Кнопка "Добавить" -->
                <div class="add-button" style="color: red">
                  <svg-icon type="mdi" :path="path" :size="33"></svg-icon>
                </div>
                <!-- Меню для кнопки добавить -->
                <div>
                  <v-menu activator="#menu-activator" class="v-menu-header">
                    <v-list class="v-list-header" style="background-color: transparent; min-width: 180px">
                      <v-list-item v-for="(item, index) in addButtonItems" :key="index" :value="index"
                        class="v-item-header" @click="handleClick(item)">
                        <v-list-item-title style="background-color: #272a2f; text-wrap: wrap">
                          {{ item.title }}
                        </v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-menu>
                </div>
                <!-- Меню -->
                <div>
                  <v-menu class="v-menu-header">
                    <template v-slot:activator="{ props }">
                      <div v-bind="props" class="userProfile">
                        <div id="userAvatar" class="userAvatar"></div>
                        <UIIcon :icon="downArrowheadIcon" :color="white" :size="22" />
                      </div>
                    </template>
                    <v-list class="v-list-header" style="
                        border-radius: 10px;
                        background: transparent;
                        min-width: 200px;
                      ">
                      <v-list-item v-for="(item, index) in items" :key="index" :value="index" class="v-item-header"
                        :class="{ 'border-style': index === 3 }" style="overflow: hidden" @click="handleClick(item)">
                        <v-list-item-title :class="{ 'highlight-title': index === 3 }"
                          style="background-color: #272a2f; text-wrap: wrap">
                          {{ item.title }}
                        </v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-menu>
                </div>
              </div>
              <div v-else class="auth-header">
                <a @click="loginUser" class="login">Вход</a>
                <button @click="registerUser" class="register">
                  Регистрация
                </button>
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
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiPlusCircleOutline, mdiMenu, mdiChevronDown } from '@mdi/js';
import { ref, onMounted, computed } from 'vue';
import { useAuthStore } from '@/stores/authStore';
import api from '@/plugins/axios';
import { languageIcon, downArrowheadIcon, logoIcon } from '@/assets/icons/index.js'
const authStore = useAuthStore();

// const isUserLogin = authStore.isUserLogin;
const isUserLogin = computed(() => authStore.isUserLogin);

// const avatar = null;

// Для иконок
const path = ref(mdiPlusCircleOutline);
const menu = ref(mdiMenu);
const downPath = ref(mdiChevronDown);

// Для мобильного меню

const menuItems = ref([
  { title: 'Главная', action: 'main' }, 
  { title: 'Модули', action: '' }
]);


// const menues = ref([
//   { title: 'Профиль', value: 'profile' },
//   { title: 'Достижения', value: 'achievements' },]);

onMounted(() => {
  if (isUserLogin.value) {
    LoadUser();
  }
});

const logout = async () => {
  await authStore.cleanData();
  cleanLocalStorage();
  router.push('/');
};

const LoadUser = async () => {
  try {
    if (authStore.userAvatar && authStore.userName) {
      updatePageWithUserData(authStore.userAvatar, authStore.userName);
      return;
    } 
    await authStore.whoami();

    if (authStore.userAvatar && authStore.userName) {
      updatePageWithUserData(authStore.userAvatar, authStore.userName);
    } else {
      console.log('User data is still unavailable after whoami call.');
    }

  } catch (error) {
    console.error('Error loading user:', error);
  }
};

const updatePageWithUserData = (avatar, userName) => {
  SetAvatarToPage(avatar);
  SetUserNameToPage(userName);
};



const SetUserNameToPage = (userName) => {
  storedUserName.value = userName;
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

const items = computed(() => [
  {
    title: `Привет, ${storedUserName.value}!`,
    action: `profile`,
  },
  { title: 'Достижения', action: 'achievements' },
  { title: 'Настройки', action: 'settings' },
  { title: 'Выйти из аккаунта', action: 'logout' },
  { title: 'Политика конфиденциальности', action: 'privacy' },
]);

const addButtonItems = [
  { title: 'Создать модуль', action: 'createModule' },
  { title: 'Создать папку', action: 'createFolder' },
];


const drawer = ref(false);



const handleClick = (item) => {
  switch (item.action) {
    case 'profile': // Явное указание действия для перехода в профиль
      router.push(`/profile/${storedUserName.value}`);
      break;
    case 'createModule':
      router.push('/module/create');
      break;
    case 'createFolder':
      router.push('/folder/create');
      break;
    case 'achievements':
      router.push('/achievements');
      break;
    case 'settings':
      router.push('/settings');
      break;
    case 'logout':
      logout();
      router.push('/');
      break;
    case 'main':
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
};

const loginUser = () => {
  router.push('/login');
};
const registerUser = () => {
  router.push('/register');
};

const cleanLocalStorage = () => {
  localStorage.removeItem('userAvatar');
  localStorage.removeItem('userName');
  localStorage.removeItem('recoveryEmail');
  localStorage.removeItem('userId');
};
</script>

<style scoped>
.add-button {
  cursor: pointer;
}

.add-button svg-icon {
  fill: currentColor;
}

.userProfile {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  cursor: pointer;
}

.v-list {
  padding: 0px;
  background-color: #272a2f;
  margin-top: 10px;
}

.v-list {
  background: transparent;
}

.border-style {
  border-top: solid #323232;
  border-bottom: solid #323232;
}

.highlight-title {
  color: #ff5858;
}

.v-item-header {
  background-color: #272a2f;
}

.v-item-title-header {
  background-color: #272a2f;
}

.main-header {
  text-decoration: none;
  width: 100%;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.wrapper {
  width: 100%;
  height: 100%;
  display: flex;
}

.login {
  cursor: pointer;
}

.login-user {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
}

a,
.register {
  font-size: 16px;
  font-weight: 500;
}

.register {}

.register:hover {
  border: 1px solid #d459ff;
}

a:hover {
  color: white;
  transition: 0.3s ease;
}

.container {
  display: flex;
  max-width: 100%;
  height: 64px;
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 40px;
}

.right {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
}

.logo {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  gap: 10px;
}

.content {
  flex-grow: 1;
}

.content-body {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.main {
  display: flex;
  align-items: center;
  gap: 40px;
}

.auth-header {
  display: flex;
  align-items: center;
  gap: 40px;
}

.switch-lang {
  display: flex;
  align-items: center;
  gap: 5px;
}

.logo {
  cursor: pointer;
}

.logo-text {
  font-weight: 700;
}

@media screen and (min-width: 768px) 
{
 .burger-menu{
  display: none;
 } 
}


@media screen and (max-width: 768px) {
  .main-header {
    text-decoration: none;
    width: 100%;
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .menu {
    display: flex;
    min-width: 40px;
    min-height: 40px;
    align-items: center;
    justify-content: center;
  }

  .menu:active {

    border-radius: 50px;
    border: 0px;
    background-color: #3b4047;
    transform: scale(0.95);
    transition: 0.1s;
  }

  .menu:hover {
    border-radius: 50px;
    border: 0px;
    background-color: #3b4047;
    transition: 0.3s ease;
  }

  .content-body {
    justify-content: end;
  }

  .login {
    background-color: #272a2f;
    border: 1px solid #3b4047;
    padding: 8px 15px;
    border-radius: 10px;
    cursor: pointer;
    transition: 0.4s ease;
    box-sizing: border-box;
  }

  .container {
    gap: 15px;
  }

  .logo-text,
  .main,
  .language,
  .register {
    display: none;
  }

  .burger-menu {
    display: flex;
    align-items: center;
  }
}
</style>
