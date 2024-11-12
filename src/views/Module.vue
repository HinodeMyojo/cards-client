<template>
  <div class="module-container">
    <div class="module-sidebar">
      <ProfileSideBar />
    </div>
    <div class="module-main" v-if="typeOfModuleState === 'concreteModule'">
      <ConcreteModule />
    </div>
    <div class="module-main" v-else-if="typeOfModuleState === 'createModule'">
      <CreateModule />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ProfileSideBar from '@/components/Main/ProfileSideBar.vue'
import ConcreteModule from './ConcreteModule.vue'
import CreateModule from './CreateModule.vue'

const props = defineProps({
  typeOfModuleState: {
    type: String,
    default: ''
  }
})

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
