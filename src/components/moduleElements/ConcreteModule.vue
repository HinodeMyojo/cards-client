<template>
  <div class="module-head">
    <div class="module-title">
      <h2>{{ moduleInfo.title }}</h2>
      <div class="module-button">
        <BaseButton v-if="isAuth && CheckUserCanEditModule()" label=" Редактировать" color="#272A2F" size="medium" />
        <div v-if=isAuth class="delete-module">
          <Modal :text="modalText" :type="modalType" v-model:dialog="isDialogOpen" @answer="handleAnswer" />
          <v-menu :location="location">
            <template v-slot:activator="{ props }">
              <h3 v-bind="props">Удалить</h3>
            </template>
            <v-list class="custom-list">
              <v-list-item v-for="(item, index) in deleteVariants" :key="index" @click="openDeleteModal(item)"
                class="custom-list-item">
                <v-list-item-title class="custom-list-item-title">
                  {{ item.title }}
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
      </div>
    </div>
    <hr />
    <div v-if="elements.length > 0" class="module-card">
      <InfoCard :wordsArray="elements" :height="'300px'" :width="'600px'" />
    </div>
    <div v-else-if="moduleInfo.userId === userId" class="module-nope">
      <img src="@/assets/images/magnifier.png" alt="" />
      <h2>
        В этом модуле пока нет элементов. Добавьте их, чтобы начать обучение!
      </h2>
    </div>
    <div v-else class="module-nope">
      <img src="@/assets/images/magnifier.png" alt="" />
      <h2>В этом модуле пока нет элементов.</h2>
    </div>
    <div class="module-choice-button">
      <button class="choice-button" @click="goToCardStudy">
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
    <div class="module-info-container">
      <div v-if="moduleInfo.userId === userId" class="module-table-header">
        <h2>Термины в модуле</h2>
        <button class="add-table-btn" @click="AddElement">
          Добавить элемент
        </button>
        <ElementModal v-model:dialog="isDialogOpen" :key-word="''" :value-word="''" @submit-form="addElement" />
      </div>
      <div v-else class="module-table-header">
        <h2>Термины в модуле</h2>
      </div>
      <hr />
      <div class="module-table">
        <Table v-if="headersData && elements" :headers="headersData" :elements="elements" @delete-item="deleteElement"
          @edit-item="editElement"></Table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';
import { moduleService } from '@/services/moduleService';
import { useElementService } from '@/components/composables/useElementService';
import { useRoute } from 'vue-router';

// Иконки для отображения в UI
import { mdiCards, mdiFountainPenTip, mdiSchool } from '@mdi/js';
import SvgIcon from '@jamescoyle/vue-icon';
import InfoCard from './InfoCard.vue';
import Table from '@/components/UI/Table.vue';
import ElementModal from '@/components/UI/module/ElementModal.vue';
import router from '@/router/router';
import Modal from '../UI/Modal.vue';
import BaseButton from '../UI/buttons/BaseButton.vue';
import { useAuthStore } from '@/stores/authStore';
import { usePermissionsStore } from '@/stores/permissionsStore';

const authStore = useAuthStore();
const permStore = usePermissionsStore();

const isAuth = authStore.isUserLogin;


const moduleInfo = ref('');

const props = defineProps({
  module: {
    type: Object,
    required: true,
  },
});

moduleInfo.value = props.module;

// Переменные для иконок
const pathMdiCards = ref(mdiCards);
const pathMdiFountainPenTip = ref(mdiFountainPenTip);
const pathMdiSchool = ref(mdiSchool);

// Модальное окно для удаления
const modalText = ref();
const isDialogOpen = ref(false);

// Переменные для работы с действиями
const deleteVariants = ref(null);
const userId = localStorage.getItem('userId');

// Логика обработки нажатий на элементы
const openDeleteModal = (item) => {
  switch (item.action) {
    case 'removeFromLibrary':
      removeFromLibrary();
      break;
    case 'deleteModule':
      deleteModule();
      break;
    default:
      break;
  }
};
// Функции удаления модулей
const modalType = ref('default');

const CheckUserCanEditModule = async () => {
  await permStore.getUserPermissions();
  if (userId == moduleInfo.value.userId) {
    return true;
  }
  if (permStore.checkPermissions("CanEditAnyModule")) {
    return true;
  }
  return false;
}

const removeFromLibrary = async () => {
  modalText.value =
    'Вы уверены, что хотите удалить объект из своей библиотеки?';
  modalType.value = 'removeFromLibrary';
  isDialogOpen.value = true;
};
const deleteModule = async () => {
  modalText.value = 'Вы уверены, что хотите удалить объект?';
  modalType.value = 'deleteModule';
  isDialogOpen.value = true;
};

// const userName = ref(localStorage.getItem('userName'));

const handleAnswer = async (answer, type) => {
  if (!answer) {
    isDialogOpen.value = false;
    return;
  }

  try {
    switch (type) {
      case 'removeFromLibrary':
        await moduleService.deleteModuleFromLibrary(moduleId);
        break;

      case 'deleteModule':
        await moduleService.deleteModule(moduleId);
        router.push(`$/{userName}`);
        break;

      default:
        console.warn(`Неизвестный тип действия: ${type}`);
    }
  } catch (error) {
    console.error('Ошибка при выполнении действия:', error);
  } finally {
    isDialogOpen.value = false;
  }
};

// Логика добавления элемента
const addElement = async (data) => {
  if (data) {
    const model = {
      key: data.key,
      value: data.value,
      moduleId,
    };
    await addElementToModule(model);
    await refreshTableData(moduleId);
  }
};

// Переход к обучению модуля
const goToCardStudy = () => {
  if (elements.value.length > 0) {
    router.push(`/module/${moduleId}/study`);
  } else {
    alert('Невозможно перейти в режим обучения с пустым модулем!');
  }
};

// Данные модуля и элементы для таблицы
const route = useRoute();
let moduleId = route.params.id;
const { deleteElementById, addElementToModule, editElementById, getByModuleId } =
  useElementService();
const elements = ref([]);
const headersData = ref(null);

const editElement = async (data) => {
  const model = {
    key: data.key,
    value: data.value,
    elementId: data.elementId,
    moduleId,
  };
  await editElementById(model);
  await refreshTableData(moduleId);
};

const deleteElement = async (id) => {
  await deleteElementById(id);
  await refreshTableData(moduleId);
};

// Обновление данных таблицы
const refreshTableData = async (moduleId) => {
  elements.value = await (await getByModuleId(moduleId)).data;
};

// Для первой загрузки модуля
const firstLoadModule = async () => 
{
  headersData.value = await (await moduleService.getHeaders()).data;
  moduleInfo.value = props.module;
  elements.value = moduleInfo.value.elements || [];
  deleteVariants.value = [
    { title: 'Убрать модуль из библиотеки', action: 'removeFromLibrary' },
  ];

  if (moduleInfo.value.creatorId == userId) {
    deleteVariants.value.push({
      title: 'Удалить модуль',
      action: 'deleteModule',
    });
  }
}

onMounted(async () => {
  await firstLoadModule();
});

watch(
  () => route.params.id,
  async (newId) => {
    moduleId = newId;
    moduleInfo.value = await (await moduleService.getModuleById(newId)).data;
    elements.value = moduleInfo.value.elements || [];
  }
);
</script>

<style scoped>
.custom-list {
  border-radius: 10px !important;
  background: transparent !important;
  min-width: 200px !important;
}

.custom-list-item {
  background-color: #272a2f;
  overflow: hidden !important;
}

.custom-list-item-title {
  background-color: #272a2f;
}

.module-table-header {
  display: flex;
  flex-direction: row;
  min-width: 100%;
  justify-content: space-between;
  align-items: center;
}

.add-table-btn {
  background-color: #272a2f;
  border: none;
  padding: 5px 10px;
  font-size: 16px;
  border-radius: 10px;
  cursor: pointer;
  transition:
    background-color 0.3s,
    transform 0.2s,
    box-shadow 0.3s;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.add-table-btn:hover {
  border: 1px solid #d459ff;
  background-color: #33363d;
  box-shadow: 0 6px 12px rgba(212, 89, 255, 0.2);
}

.add-table-btn:active {
  transform: scale(0.96);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.add-table-btn:focus {
  outline: 2px solid #d459ff;
  outline-offset: 2px;
}

.module-card,
.module-nope {
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
  max-width: 100%;
  min-height: 290px;
}

.module-nope img {
  max-width: 90%;
  max-height: 250px;
}

.module-table-content {
  width: 100%;
  height: auto;
  /* border: #ddd 1px solid; */
}

.header-cell {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px;
  cursor: pointer;
}

.header-element {
  display: flex;
  align-items: center;
  gap: 5px;
}

.table-header-elements {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 5px;
  align-items: center;
  width: 100%;
  background-color: #2b2c34;
}

.table-body {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 10px;
  /* align-items: center; */
  width: 100%;
  /* margin-top: 10px; */
  /* background-color: #2B2C34; */
}

.table-row {
  display: flex;
  justify-content: space-between;
  background-color: #2b2c34;
  gap: 5px;
  /* align-items: center; */
  width: 100%;
}

.module-table {
  margin-top: 10px;
}

.cell {
  flex: 1;
  padding: 10px;
  text-align: center;
  border: 1px solid #ddd;
}

.module-head,
.module-info {
  background-color: var(--module-bg-color, #202127);
  border-radius: 25px;
}

.module-info-container {
  padding: 10px 20px;
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

h2 {
  font-weight: 400;
  font-size: 28px;
}

.module-title h2 {
  font-size: 28px;
  font-weight: 400;
}

.module-button {
  display: flex;
  gap: 10px;
  align-items: center;
}

.delete-module {
  width: 110px;
  height: 50px;
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.delete-module h3 {
  cursor: pointer;
  font-size: 16px;
  font-weight: 700;
  color: #f84545;
}

.delete-module:hover h3 {
  transition: 0.3s ease;
  color: #f36b6b;
}

.delete-module:active {
  transition: 0.1s ease;
  transform: scale(0.96);
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
  background-color: #2b2c34;
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
</style>
