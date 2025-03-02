<template>
  <div class="module-container">
    <ProfileSideBar class="module-sidebar"
      v-if="isSidebarVisible"
      :isUserProfile="isUserProfile"
      :userName="userNameFromUrlRoute"
      :userAvatar="userAvatar"
    />
    
    <div class="module-main">
      <ConcreteModule 
        v-if="typeOfModuleState === 'concreteModule' && moduleInfo" 
        :module="moduleInfo" 
      />
      <CreateModule 
        v-else-if="typeOfModuleState === 'createModule'" 
        @refreshData="refreshData" 
      />
      <Profile 
        v-else-if="typeOfModuleState === 'profile'" 
        :is-user-profile="isUserProfile" 
        :can-view-profile="canViewProfile" 
        :user-id="userId"
        :is-email-confirmed="isEmailConfirmed"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';
import ProfileSideBar from '@/components/moduleElements/profile/SideBar.vue';
import ConcreteModule from '@/components/moduleElements/ConcreteModule.vue';
import CreateModule from '@/components/moduleElements/CreateModule.vue';
import Profile from '@/components/moduleElements/profile/Profile.vue';
import { 
  getProfileAccess,
  getUserById 
} from '@/services/profileService';
import { moduleService } from '@/services/moduleService';

const authStore = useAuthStore();
const route = useRoute();

const props = defineProps({
  typeOfModuleState: {
    type: String,
    required: true,
    validator: value => ['concreteModule', 'createModule', 'profile'].includes(value)
  },
});

// Состояние компонента
const isUserProfile = ref(false);
const canViewProfile = ref(false);
const userId = ref(null);
const isEmailConfirmed = ref(false);
const userAvatar = ref('');
const moduleInfo = ref(null);
const userNameFromUrlRoute = ref(route.params.username);
const refreshStatus = ref(false);

// Вычисляемое свойство для видимости сайдбара
const isSidebarVisible = computed(() => {
  return ['concreteModule', 'profile', 'createModule'].includes(props.typeOfModuleState);
});

// Основная логика проверки доступа
const checkAccess = async () => {
  try {
    switch(props.typeOfModuleState) {
      case 'profile': 
        await handleProfileAccess();
        break;
      case 'concreteModule':
        await handleConcreteModuleAccess();
        break;
      case 'createModule':
        await handleCreateModuleAccess();
        break;
    }
  } catch (error) {
    console.error('Ошибка проверки доступа:', error);
  }
};

// Обработчики для каждого состояния
const handleProfileAccess = async () => {
  const response = await getProfileAccess(route.params.username);
  const { 
    isUserProfile: userAccess,
    canViewProfile: viewAccess,
    id,
    avatar,
    isEmailConfirmed: emailConfirmed
  } = response;
  
  Object.assign([isUserProfile, canViewProfile, userId, userAvatar, isEmailConfirmed], 
               [userAccess, viewAccess, id, `data:image/png;base64,${avatar}`, emailConfirmed]);
};

const handleConcreteModuleAccess = async () => {
  const moduleId = route.params.id;
  moduleInfo.value = (await moduleService.getModuleById(moduleId)).data;
  const user = await getUserById(moduleInfo.value.creatorId);
  setupUserProfile(user);
};

const handleCreateModuleAccess = async () => {
  const user = await getUserById(authStore.userId);
  setupUserProfile(user);
};

// Вспомогательная функция для настройки профиля пользователя
const setupUserProfile = (user) => {
  isUserProfile.value = user.id == authStore.userId;
  userAvatar.value = `data:image/png;base64,${user.avatar}`;
  userNameFromUrlRoute.value = user.userName;
  userId.value = user.id;
};

// Обновление данных
const refreshData = async () => {
  refreshStatus.value = true;
  await checkAccess();
  refreshStatus.value = false;
};

// Отслеживание изменений роута
watch(
  () => [route.params.username, route.params.id, props.typeOfModuleState],
  () => checkAccess(),
  { deep: true }
);

onMounted(checkAccess);
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
