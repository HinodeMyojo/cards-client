<template>
  <div class="module-container">
    <div class="module-sidebar" v-if="isUserProfile">
      <ProfileSideBar :isAuth="isUserProfile" :userName="userNameFromUrlRoute" :userAvatar="userAvatar" />
    </div>
    <div class="module-sidebar" v-else>
      <ProfileSideBar :isAuth="isUserProfile" :userName="userNameFromUrlRoute" :userAvatar="userAvatar" />
    </div>
    <div class="module-main" v-if="typeOfModuleState === 'concreteModule'">
      <ConcreteModule />
    </div>
    <div class="module-main" v-else-if="typeOfModuleState === 'createModule'">
      <CreateModule @refreshData="refreshData" />
    </div>
    <div class="module-main" v-else-if="typeOfModuleState === 'profile'">
      <Profile :isAuth="isUserProfile" :userId="userId" :isEmailConfirmed="isEmailConfirmed" />
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
import { getUserByUserName } from '@/services/profileService.js'

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
const isUserProfile = ref(null);
const route = useRoute();
const userNameFromUrlRoute = route.params.username;
const userId = ref(0);
const isEmailConfirmed = ref(false);
const userAvatar = ref('');

// Проверка что это вообще за пользак
const checkUserProfileLoginOrExist = async (usernameFromRequest) => {
  if (props.typeOfModuleState === 'profile' && usernameFromRequest) {
    const response = await getUserByUserName(usernameFromRequest);

    console.log(response);

    isUserProfile.value = response.isUserProfile;
    userId.value = response.id;
    isEmailConfirmed.value = response.isEmailConfirmed;
    userAvatar.value = `data:image/png;base64,${response.avatar}`;
  }
}

onMounted(() => {
  checkUserProfileLoginOrExist(userNameFromUrlRoute);
})

// Отслеживаем изменение роута (чтобы при изменении ника - обновлялась страница)
watch(() => route.params.username, (newUsername) => {
  checkUserProfileLoginOrExist(newUsername);
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
