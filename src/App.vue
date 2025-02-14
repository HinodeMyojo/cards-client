<template>
  <div v-if="isAuthRoute" class="app-login">
    <router-view></router-view>
  </div>
  <div v-else class="main-app">
    <div class="app">
      <header>
        <HeaderForm />
      </header>
      <div class="main-content">
        <div class="main-wrapper">
          <router-view></router-view>
        </div>
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

  box-sizing: border-box;
  color: #d9d9d9;
  /* color: #F0F6FC; */
}

a {
  text-decoration: none;
}

.main-app {
  display: flex;
  width: 100%;
  align-self: center;
  justify-content: center;
  background-color: #1B1B1F;
}

.app {
  display: flex;
  flex-direction: column;
  width: 1140px;
  min-height: 100vh;
  display: flex;
  margin-bottom: 20px;

}

.app-login {
  background-color: #242429;
}

.main-content {
  margin-top: 25px;
}

@media screen and (max-width: 768px) {
  .app-login {
    max-width: 100%;
}
}

</style>
