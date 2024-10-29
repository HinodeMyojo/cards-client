<template>
  <div v-if="isAuthRoute" class="app-login">
    <router-view></router-view>
  </div>
  <div v-else class="app">
    <header>
      <HeaderForm />
    </header>
    <div class="main-content">
      <div class="main-wrapper">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { authRoutes } from './router/router'
import HeaderForm from './components/HeaderForm.vue'

const route = useRoute()

const isAuthRoute = computed(() => {
  const normalizedPath = route.path.endsWith('/') ? route.path.slice(0, -1) : route.path
  console.log(normalizedPath)
  return authRoutes.some((e) => normalizedPath === e.path)
})

// const isUserLogin = null;

// const GetToken = () => {
//     if (localStorage.getItem('token')) {
//       isUserLogin = true;
//     }
// }


</script>

<style>
* {
  font-family: 'Roboto', sans-serif;
  margin: 0;
  padding: 0;
  background-color: #1B1B1F;
  box-sizing: border-box;
  color: #d9d9d9;
}

a {
  text-decoration: none;
}

.app {
  display: flex;
  flex-direction: column;
}

.app-login {
  /* Стили для страниц логина, регистрации и восстановления пароля */
  background-color: #242429;
  /* Добавь другие специфические стили для логина здесь */
}

.main-content {
  width: 100%;
  height: 100vh;
}

.main-wrapper {
  padding-left: 20%;
  padding-right: 20%;
  width: 100%;
  height: 100vh;
}
</style>
