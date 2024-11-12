<template>
  <div class="module-create">
    <div class="module-create-container">
      <div class="module-create-header">
        <h2>Создание карточки</h2>
        <div class="module-create-header-buttons">
          <button>Предпросмотр</button>
          <button>Создать</button>
          <button>Отмена</button>
        </div>
      </div>
      <hr />
      <div class="module-create-settings">
        <h3>Настройки</h3>
        <div class="module-create-setting-params">
          <div class="input">
            <p>Название:</p>
            <input v-model="message" placeholder="Модуль по изучение звёздных скоплений" />
          </div>
          <div class="input">
            <p>Описание:</p>
            <input v-model="message" placeholder="Звёздные скопления - это скопления из звёзд" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup></script>

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
  padding: 15px 20px;
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
.input {
  width: 100%;
  display: flex;
  flex-direction: row;
  margin-bottom: 15px;
  gap: 15px;
}
.input input {
  width: 100%;
  background-color: #2b2c34;
  font-size: 14px;
  border-radius: 5px;
  /* Исправить увеличение элемента */
  padding: 5px;
}
</style>
