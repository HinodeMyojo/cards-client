<template>
  <h3>Восстановление пароля</h3>
  <form class="login-form" @submit.prevent="submitForm">
    <label for="Code">Код</label>
    <input 
      v-model="data.code"
      type="code" 
      id="Code" 
      placeholder="Введите код 6 цифр" 
      required
    >
    <div class="buttons">
      <button class="fill" type="submit" @click="sendCode">Отправить код</button>
      <button class="transparent" type="button" @click="sendEmail">Отправить письмо заного</button>
      <button class="transparent" type="button" @click="loginUser">Вернуться на страницу входа</button>
      <!-- <SocialButtons/> -->
    </div>
  </form>
</template>

<!-- Ниже нужно доработать -->

<script setup>
import { ref } from 'vue';
import router from '@/router/router';
const data = ref({
  code: '',
})

const emit = defineEmits(['send-recovery-email']);

const sendCode = () => {
  emit('send-check-code', data);
}

const sendEmail = () => {
  emit('send-recovery-email', data);
}

const loginUser = () => {
router.push('/login');
}
</script>

<style scoped>
</style>