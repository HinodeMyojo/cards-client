<template>
  <div class="main">
    <div class="container">
      <div class="profile">
        <div class="profile-image">
          <div
            id="sideBarAvatar"
            class="sideBarAvatar"
            @click="handleAvatarClick()"
          >
            <template v-if="isLoadingUserData">
              <v-progress-circular color="green" indeterminate />
            </template>
            <template v-else>
              <img v-if="avatarSrc" :src="avatarSrc" alt="User Avatar" />
              <p v-else>Аватар недоступен</p>
            </template>
          </div>
        </div>
        
        <div class="profile-info">
          <div class="userName">
            {{ isLoadingUserData ? 'Загрузка...' : userName }}
          </div>
        </div>
      </div>

      <div class="extra-buttons">
        <BaseButton
          :label="isUserProfile ? 'Редактировать' : 'Подписаться'"
          :width="'100%'"
          :size="'medium'"
          :color="'#272A2F'"
          :disabled="isLoadingUserData"
        />
      </div>

      <template v-if="isUserProfile">
        <hr />
        <div class="search">
          <SearchAutocomplete @input="$emit('search', $event)" />
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
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import BaseButton from '@/components/UI/buttons/BaseButton.vue';
import SearchAutocomplete from '@/components/UI/SearchAutocomplete.vue';
import ModuleItem from '@/components/UI/ModuleItem.vue';

const router = useRouter();

const props = defineProps({
  isUserProfile: Boolean,
  userName: String,
  avatarSrc: String,
  modules: Array,
});

const isLoadingUserData = ref(false);
const isLoadingModules = ref(false);

// Event handlers
const handleAvatarClick = () => {
if (!isLoadingUserData.value) {
router.push(`/${props.userName}`);
}
};

const handleModuleClick = (moduleId) => {
router.push(`/module/${moduleId}`);
};

// const initializeGuestProfile = () => {
// storedUserName.value = props.userName;
// avatarSrc.value = props.userAvatar;
// };

// defineEmits(['avatar-click', 'module-click', 'search']);
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