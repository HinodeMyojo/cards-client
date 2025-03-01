<template>
  <div class="module-container">
    <div class="module-sidebar" v-if="isUserProfile">
      <ProfileSideBar :isAuth="isUserProfile" :userName="userNameFromUrlRoute" :userAvatar="userAvatar" />
    </div>
    <div class="module-sidebar" v-else>
      <ProfileSideBar :isAuth="isUserProfile" :userName="userNameFromUrlRoute" :userAvatar="userAvatar" />
    </div>
    <div class="module-main" v-if="typeOfModuleState === 'concreteModule'">
      <ConcreteModule v-if="moduleInfo" :module="moduleInfo" />
    </div>
    <div class="module-main" v-else-if="typeOfModuleState === 'createModule'">
      <CreateModule @refreshData="refreshData" />
    </div>
    <div class="module-main" v-else-if="typeOfModuleState === 'profile'">
      <Profile :is-user-profile="isUserProfile" :can-view-profile="canViewProfile" :userId="userId"
        :isEmailConfirmed="isEmailConfirmed" />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';
import ProfileSideBar from '@/components/moduleElements/profile/SideBar.vue';
import ConcreteModule from '@/components/moduleElements/ConcreteModule.vue';
import CreateModule from '@/components/moduleElements/CreateModule.vue';
import Profile from '@/components/moduleElements/profile/Profile.vue';
import { useRoute } from 'vue-router';
import { getProfileAccess } from '@/services/profileService.js';
import { getUserById } from '@/services/profileService.js';
import { moduleService } from '@/services/moduleService.js';

const props = defineProps({
  typeOfModuleState: {
    type: String,
    default: '',
  },
});

// TODO сделать логику обновления сайд-бара
const refreshStatus = ref(null);
const refreshData = () => {
  refreshStatus.value = true;
};

// Флаги доступа
const isUserProfile = ref(null);
const canBlockUser = ref(null);
const canViewProfile = ref(null);
const canDeleteUser = ref(null);
const canEditUser = ref(null);

// Для конкретного модуля
const moduleInfo = ref(null);

const route = useRoute();
const userNameFromUrlRoute = ref(route.params.username);
const userId = ref(0);
const isEmailConfirmed = ref(false);
const userAvatar = ref('');

// Проверка что это вообще за пользак
const checkUserProfileAccess = async () => {
  const usernameFromRequest = route.params.username;
  if (props.typeOfModuleState === 'profile' && usernameFromRequest) {
    const response = await getProfileAccess(usernameFromRequest);

    // Выставляем флаги
    isUserProfile.value = response.isUserProfile;
    canBlockUser.value = response.canBlockUser;
    canViewProfile.value = response.canViewProfile;
    canDeleteUser.value = response.canDeleteUser;
    canEditUser.value = response.canEditUser;

    userId.value = response.id;
    isEmailConfirmed.value = response.isEmailConfirmed;
    userAvatar.value = `data:image/png;base64,${response.avatar}`;
  }
  if (props.typeOfModuleState === 'concreteModule') {
    const moduleId = route.params.id;
    moduleInfo.value = (await moduleService.getModuleById(moduleId)).data;
    userId.value = moduleInfo.value.creatorId;
    const user = await getUserById(moduleInfo.value.creatorId);
    userAvatar.value = `data:image/png;base64,${user.avatar}`;
    console.log(user);
    userNameFromUrlRoute.value = user.userName;

  } else {
    console.log('Боба');
    console.log(props.typeOfModuleState);
  }
};

onMounted(() => {
  console.log('Компонент смонтирован');
  checkUserProfileAccess();
});

// Отслеживаем изменение роута (чтобы при изменении ника - обновлялась страница)
watch(
  () => route.params.username,
  () => {
    checkUserProfileAccess();
  }
);
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
e
