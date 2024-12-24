<template>
  <h3>Вход</h3>
  <form class="login-form" @submit.prevent="submitForm">
    <label for="Username">Username</label>
    <input v-model="username" type="text" id="Username" placeholder="AlphaCentauri" required>
    <label for="Password">Password</label>
    <input v-model="password" type="password" id="Password" placeholder="•••••••••••••••••" required>
    <a class="lostPassword" @click="passwordRecovery">Забыли пароль?</a>
    <div class="buttons">
      <button class="fill" type="submit">Войти</button>
      <button class="transparent" type="button" @click="registerUser">Отсутствует учетная запись?
        Зарегистрироваться</button>
      <SocialButtons />
    </div>
  </form>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import SocialButtons from '@/components/Auth/SocialButtons.vue';

// Управление состоянием формы
const username = ref('');
const password = ref('');

// Используем Vue Router для навигации
const router = useRouter();

const emit = defineEmits(['submit-login']);

// Функция отправки формы
const submitForm = () => {
  var fingerPrint = getFingerPrint()
  // Передача данных в родительский компонент через событие
  emit('submit-login', { username: username.value, password: password.value, fingerPrint: fingerPrint });
};

// Переход на страницу восстановления пароля
const passwordRecovery = () => {
  router.push('/recovery-password');
}

// Получение инфы о пользаке
const getFingerPrint = () => {
  const userAgent = navigator.userAgent;
  return `${userAgent}`
}

// Переход на страницу регистрации
const registerUser = () => {
  router.push('/register');
};
</script>

<style scoped>
.lostPassword {
  background-color: transparent;
  text-decoration: none;
  cursor: pointer;
}

.lostPassword:hover {
  text-decoration: underline;
}
</style>