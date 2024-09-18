<template>
    <h3>Регистрация</h3>
    <form class="login-form" @submit.prevent="submitForm">
      <label for="Email">Email</label>
      <input 
        v-model="data.email"
        type="email" 
        id="Email" 
        placeholder="AlphaCentauri@mail.ru" 
        required
      >
      <div class="buttons">
        <button class="fill" type="submit">Зарегистрироваться</button>
        <button class="transparent" type="button" @click="loginUser">Уже есть учетная запись? Войти</button>
        <SocialButtons/>
      </div>
    </form>
</template>

<script setup>
import { ref } from 'vue';
import router from '@/router/router';
import SocialButtons from '@/components/Auth/SocialButtons.vue';
const data = ref({
    email: '',
})

const emit = defineEmits(['submit-registration']);

const submitForm = () => {
    emit('submit-registration', data);
}

const loginUser = () => {
  router.push('/login');
}
</script>

<style scoped>
</style>