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
      <Profile />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ProfileSideBar from '@/components/ModuleElements/ProfileSideBar.vue'
import ConcreteModule from '@/components/ModuleElements/ConcreteModule.vue'
import CreateModule from '@/components/ModuleElements/CreateModule.vue'
import Profile from '@/components/ModuleElements/Profile.vue'

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

// Иконки
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
