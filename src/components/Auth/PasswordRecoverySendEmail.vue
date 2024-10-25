<template>
  <h3>Восстановление пароля</h3>
  <form class="login-form" @submit.prevent="submitForm">
    <label for="Email">Email</label>
    <input
      v-model="data.email"
      type="email"
      id="Email"
      placeholder="AlphaCentauri@mail.ru"
      required
    />
    <div class="buttons">
      <button class="fill" type="submit" @click="sendEmail">Отправить письмо</button>
      <button class="transparent" type="button" @click="loginUser">
        Вернуться на страницу входа
      </button>
    </div>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import router from '@/router/router'
const data = ref({
  email: ''
})

const emit = defineEmits(['send-recovery-email'])

const sendEmail = () => {
  emit('send-recovery-email', data)
}

const loginUser = () => {
  router.push('/login')
}
</script>

<style scoped></style>
