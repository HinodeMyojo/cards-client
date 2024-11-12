<template>
  <div class="module-create">
    <div class="module-create-container">
      <div class="module-create-header">
        <h2>Создание модуля</h2>
        <div class="module-create-header-buttons">
          <BaseButton label="Создать" color="#272A2F" size="medium" @click="onSubmit" />
          <button>Отмена</button>
        </div>
      </div>
      <hr />
      <div class="module-create-settings">
        <h3>Настройки</h3>
        <div class="module-create-setting-params">
          <div class="input">
            <p>Название:</p>
            <input v-model="inputName" placeholder="Модуль по изучению звёздных скоплений" />
          </div>
          <div class="input">
            <p>Описание:</p>
            <input v-model="inputDescription" placeholder="Звёздные скопления - это скопления из звёзд" />
          </div>
          <div class="switch">
            <p>Доступ:</p>
            <v-switch v-model="visibleStatus" :label="`${visibleStatus}`" color="red" false-value="Публичная"
              true-value="Приватная" hide-details></v-switch>
          </div>
          <div class="slider">
            <p>Количество элементов: </p>
            <v-slider v-model="slider" :max="30" :min="0" :step="1" class="align-center" hide-details>
              <template v-slot:append>
                <v-text-field v-model="slider" density="compact" style="width: 70px" type="number" hide-details
                  single-line></v-text-field>
              </template>
            </v-slider>
          </div>
        </div>
      </div>
      <hr />
      <div v-for="i in slider" :key="i" class="module-create-elements">
        <CreateElememtItem :Id="i" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import CreateElememtItem from '@/components/UI/Module/CreateElememtItem.vue';
import BaseButton from '@/components/UI/Buttons/BaseButton.vue';

const visibleStatus = ref("Публичная");
const slider = ref(0);

const inputName = ref('');
const inputDescription = ref('');

</script>

<style scoped>
.module-create {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: #202127;
  border-radius: 25px;
}

h2,
h3 {
  font-weight: 400;
}

.module-create-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 15px 20px;
  gap: 15px;
}

.module-create-header {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
}

.module-create-header-buttons {
  display: flex;
  gap: 30px;
}

.module-create-settings,
.module-create-setting-params {
  width: 100%;
}

.module-create-setting-params {
  display: flex;
  flex-direction: column;
}

.module-create-settings {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.input {
  width: 100%;
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
  align-items: center;
  gap: 15px;
}

.input input {
  width: 100%;
  background-color: #2b2c34;
  font-size: 14px;
  border-radius: 10px;
  /* Исправить увеличение элемента */
  padding: 5px;
}

.switch {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 15px;
}

.slider {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
  /* margin-bottom: 10px; */
}
</style>
