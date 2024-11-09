<template>
  <div class="module-container">
    <div class="module-sidebar">
      <ProfileSideBar />
    </div>
    <div class="module-main">
      <div class="module-head">
        <div class="module-title">
          <h2>{{ moduleInfo.title }}</h2>
          <div class="module-button">
            <Button text="Редактировать" :onClick="editModule" />
            <h3 class="delete-module" @click="deleteModule">Удалить</h3>
          </div>
        </div>
        <hr />
        <div v-if="elements.length > 0" class="module-card">
          <Card :wordsArray="elements" />
        </div>
        <div class="module-choice-button">
          <button class="choice-button">
            <svg-icon type="mdi" :path="pathMdiCards"></svg-icon>
            <p>Карточки</p>
          </button>
          <button class="choice-button">
            <svg-icon type="mdi" :path="pathMdiFountainPenTip"></svg-icon>
            <p>Письменный тест</p>
          </button>
          <button class="choice-button">
            <svg-icon type="mdi" :path="pathMdiSchool"></svg-icon>
            <p>Проверка знаний</p>
          </button>
        </div>
      </div>
      <div class="module-info">
      </div>
    </div>
  </div>
</template>

<script setup>
import ProfileSideBar from '@/components/Main/ProfileSideBar.vue';
import { onMounted, ref, watch } from 'vue';
import { useModuleService } from '@/components/composables/useModuleService';
import { useRoute } from 'vue-router';
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiCards } from '@mdi/js';
import { mdiFountainPenTip } from '@mdi/js';
import { mdiSchool } from '@mdi/js';
import Button from '@/components/UI/Button.vue';
import Card from '@/components/Main/Card.vue';

// Иконки
const pathMdiCards = ref(mdiCards)
const pathMdiFountainPenTip = ref(mdiFountainPenTip)
const pathMdiSchool = ref(mdiSchool)

const route = useRoute();
let moduleId = route.params.id;
const { getModuleById, currentModule } = useModuleService();
const moduleInfo = ref('');
const elements = ref([]);

onMounted(async () => {
  await getModuleById(moduleId);
  moduleInfo.value = currentModule.value;
  elements.value = moduleInfo.value.elements || [];
});

watch(
  () => route.params.id,
  async (newId) => {
    moduleId = newId;
    await getModuleById(newId);
    moduleInfo.value = currentModule.value;
    elements.value = moduleInfo.value.elements || [];
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

.module-head {
  background-color: var(--module-bg-color, #202127);
  border-radius: 25px;
}

.module-head {
  padding: 10px 20px;
  height: 520px;
}

.module-title {
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.module-title h2 {
  font-size: 28px;
}

.module-button {
  display: flex;
  gap: 10px;
  align-items: center;
}

.delete-module {
  font-size: 16px;
  font-weight: 700;
  color: #F84545;
}

.module-card {
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
}

.module-choice-button {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  width: 90%;
  margin: 0 auto;
  margin-top: 30px;
}

.choice-button {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  justify-content: center;
  background-color: #2B2C34;
  width: 200px;
  height: 50px;
  border-radius: 10px;
  font-size: 18px;
  color: white;
  border: none;
  transition: all 0.3s ease;
}

.choice-button:hover {
  background-color: #474855;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
}

.choice-button:active {
  background-color: #474855;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  transform: translateY(2px);
}



hr {
  height: 2px;
  background-color: #3f3f3f;
  border: none;
}
</style>
