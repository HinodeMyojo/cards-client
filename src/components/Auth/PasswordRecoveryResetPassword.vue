<template>
  <h3>Восстановление пароля</h3>
  <form class="login-form" @submit.prevent="submitForm">
    <label for="password">Новый пароль</label>
    <input v-model="data.password" type="password" id="password" placeholder="Введите новый пароль" required>
    <label for="submitPassword">Повторите пароль</label>
    <input v-model="data.submitPassword" type="password" id="submitPassword" placeholder="Повторите пароль" required>
    <div class="buttons">
      <button class="fill" type="submit" @click="resetPassword">Сохранить пароль</button>
      <button class="transparent" type="button" @click="loginUser">Вернуться на страницу входа</button>
    </div>
  </form>
</template>

<script setup>
import { ref } from 'vue';
import router from '@/router/router';

const data = ref({
  password: '',
  submitPassword: ''
});

const emit = defineEmits(['submit-new-password']);

const resetPassword = () => {
  if (!checkPassword()) {
    alert('Пароли не совпадают');
    return;
  }
  emit('submit-new-password', data);
}

const checkPassword = () => {
  if (data.value.password === data.value.submitPassword) {
    return true;
  } else {
    return false;
  }
}

const loginUser = () => {
  router.push('/login');
}

</script>

<style scoped></style>