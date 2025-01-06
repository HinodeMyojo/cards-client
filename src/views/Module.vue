<template>
  <div class="module-container">
    <div class="module-sidebar">
      <ProfileSideBar />
    </div>
    <div class="module-main" v-if="typeOfModuleState === 'concreteModule'">
      <ConcreteModule />
    </div>
    <div class="module-main" v-else-if="typeOfModuleState === 'createModule'">
      <CreateModule @refreshData="refreshData" />
    </div>
    <div class="module-main" v-else-if="typeOfModuleState === 'profile'">
      <Profile :isAuth="isUserProfile" />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import ProfileSideBar from '@/components/moduleElements/profile/SideBar.vue'
import ConcreteModule from '@/components/moduleElements/ConcreteModule.vue'
import CreateModule from '@/components/moduleElements/CreateModule.vue'
import Profile from '@/components/moduleElements/profile/Profile.vue'
import { useRoute } from 'vue-router';

const props = defineProps({
  typeOfModuleState: {
    type: String,
    default: ''
  }
})

// TODO сделать логику обновления сайд-бара
const refreshStatus = ref(null);
const refreshData = () => {
  refreshStatus.value = true;
};

// Проверка логина юзера
const isUserProfile = ref(false);
const route = useRoute();

const checkUserProfileLogin = (usernameFromRequest) => {
  const usernameFromLocalStorage = localStorage.getItem('userName');
  if (
    usernameFromLocalStorage === usernameFromRequest) {
    isUserProfile.value = true;
  }
  else {
    isUserProfile.value = false;
  }
  console.log(isUserProfile.value);
}

onMounted(() => {
  const userNameFromUrlRoute = route.params.username;
  if (props.typeOfModuleState === 'profile' && userNameFromUrlRoute != '') {
    checkUserProfileLogin(userNameFromUrlRoute);
  }
})

// Отслеживаем изменение роута (чтобы при изменении ника - обновлялась страница)
watch(() => route.params.username, (newUsername) => {
  checkUserProfileLogin(newUsername);
});

</script>

<style scoped>
.module-container {
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 30px;
}

.module-sidebar {
  flex: 0.45;
}

.module-main {
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 30px;
}

:deep(hr) {
  height: 2px;
  background-color: #3f3f3f;
  border: none;
}
</style>
