<template>
  <div class="main">
    <div class="container">
      <!-- Секция профиля пользователя -->
      <div class="profile">
        <div class="profile-image">
          <div
            id="sideBarAvatar"
            class="sideBarAvatar"
            @click="handleAvatarClick"
          >
            <template v-if="isLoadingUserData">
              <v-progress-circular color="green" indeterminate></v-progress-circular>
            </template>
            <template v-else>
              <img v-if="avatarSrc" :src="avatarSrc" alt="User Avatar" />
              <p v-else>Аватар недоступен</p>
            </template>
          </div>
        </div>
        
        <div class="profile-info">
          <div id="userName" class="userName">
            {{ isLoadingUserData ? 'Загрузка...' : storedUserName }}
          </div>
        </div>
      </div>

      <!-- Кнопки действий -->
      <div class="extra-buttons">
        <BaseButton
          :label="isUserProfile ? 'Редактировать' : 'Подписаться'"
          :width="'100%'"
          :size="'medium'"
          :color="'#272A2F'"
          :disabled="isLoadingUserData"
        />
      </div>

      <!-- Поиск и модули -->
      <template v-if="isUserProfile">
        <hr />
        <div class="search">
          <SearchAutocomplete @input="loadUserModules" />
        </div>
        <hr />
        
        <div class="module-list">
          <div v-if="isLoadingModules" class="loader">Загрузка модулей...</div>
          <div v-else-if="modules.length" class="moduleItems">
            <ModuleItem
              v-for="module in modules"
              :key="module.id"
              :title="module.title"
              :id="module.id"
              @click="handleModuleClick(module.id)"
            >
            {{ module.title }}
          </ModuleItem>
          </div>
          <div v-else class="empty-state">
            <p>Здесь пока ничего нет!</p>
            <p>Создайте или добавьте модули!</p>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import api from '@/plugins/axios';
import SearchAutocomplete from '@/components/UI/SearchAutocomplete.vue';
import ModuleItem from '@/components/UI/ModuleItem.vue';
import BaseButton from '@/components/UI/buttons/BaseButton.vue';

const props = defineProps({
  isUserProfile: {
    type: Boolean,
    default: false,
  },
  userName: String,
  userAvatar: String,
});

const router = useRouter();

// State variables
const storedUserName = ref('Пользователь');
const avatarSrc = ref('');
const modules = ref([]);
const isLoadingUserData = ref(true);
const isLoadingModules = ref(false);

// Lifecycle hooks
onMounted(() => {
  if (props.isUserProfile) {
    fetchUserData();
    fetchUserModules();
  } else {
    initializeGuestProfile();
  }
});

watch(() => props.isUserProfile, (newVal) => {
  if (newVal) {
    fetchUserData();
    fetchUserModules();
  } else {
    initializeGuestProfile();
  }
});

// Data fetching methods
const fetchUserData = async () => {
  if (!props.isUserProfile) return;

  isLoadingUserData.value = true;
  try {
    const { data } = await api.get('/user/whoami');
    const avatar = `data:image/png;base64,${data.avatar}`;
    
    storedUserName.value = data.userName;
    avatarSrc.value = avatar;
    
    // Update localStorage only if needed
    if (localStorage.getItem('userName') !== data.userName) {
      localStorage.setItem('userName', data.userName);
      localStorage.setItem('userAvatar', avatar);
    }
  } catch (error) {
    console.error('Ошибка загрузки данных пользователя:', error);
  } finally {
    isLoadingUserData.value = false;
  }
};

const fetchUserModules = async (searchQuery = '') => {
  if (!props.isUserProfile) return;
  
  isLoadingModules.value = true;
  try {
    const { data } = await api.get('/module/used-modules', {
      params: { textSearch: searchQuery.trim() || undefined }
    });
    modules.value = data;
  } catch (error) {
    console.error('Ошибка загрузки модулей:', error);
  } finally {
    isLoadingModules.value = false;
  }
};

// Event handlers
const handleAvatarClick = () => {
  if (!isLoadingUserData.value) {
    router.push(`/${storedUserName.value}`);
  }
};

const handleModuleClick = (moduleId) => {
  router.push(`/module/${moduleId}`);
};

const initializeGuestProfile = () => {
  storedUserName.value = props.userName;
  avatarSrc.value = props.userAvatar;
};
</script>

<style scoped>
  .search {
    border-radius: 10px;
  }

  .main {
    display: flex;
    border-radius: 25px;
    width: 100%;
    min-height: 400px;
    background-color: #202127;
  }

  hr {
    height: 2px;
    background-color: #272a2f;
    border: none;
    margin: 10px 0;
  }

  .moduleItems {
    background-color: #202127;
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  .moduleItems p {
    background-color: #202127;
  }

  .extra-buttons {
    display: flex;
    flex-direction: column;
    margin-top: 10px;
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

  .sideBarAvatar {
    background-color: #202127;
    display: flex;
    justify-content: center;
    cursor: pointer;
    align-items: center;
    min-height: 160px;
    min-width: 160px;
  }

  .sideBarAvatar img {
    border-radius: 100%;
    width: 160px;
    height: 160px;
    object-fit: cover;
    border: 4px solid #808080;
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
