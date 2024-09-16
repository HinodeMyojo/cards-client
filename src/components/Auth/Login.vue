<!-- <template>
  <form class="login-form" @submit.prevent="submitForm">
      <label for="Username">Username</label>
      <input 
        v-bind:value="username"
        @input="username = $event.target.value"
        type="Username" 
        id="Username" 
        placeholder="AlphaCentauri" 
        required
      >
      <label for="Password">Password</label>
      <input 
        v-bind:value="password"
        @input="password = $event.target.value"
        type="Password" 
        id="Password" 
        placeholder="•••••••••••••••••" 
        required
      >
      <button class="fill" @click="registerUser" type="submit">Войти</button>
    </form>
</template> -->
<template>
  <h3>Вход</h3>
  <form class="login-form" @submit.prevent="submitForm">
    <label for="Username">Username</label>
    <input 
      v-model="username"
      type="text"
      id="Username" 
      placeholder="AlphaCentauri" 
      required
    >
    <label for="Password">Password</label>
    <input 
      v-model="password"
      type="password" 
      id="Password" 
      placeholder="•••••••••••••••••" 
      required
    >
    <div class="buttons">
      <button class="fill" type="submit">Войти</button>
      <button class="transparent" type="login" @click="registerUser">Отсутствует учетная запись? Зарегистрироваться</button>
      <SocialButtons/>
    </div>
  </form>
</template>

<!-- <script>
export default {
  data() {
    return {
      username: '',
      password: ''
    };
  }
};
</script> -->

<script>
import SocialButtons from '@/components/Auth/SocialButtons.vue';

export default {
  data() {
    return {
      username: '',
      password: ''
    };
  },
  components: {
    SocialButtons
  },
  methods: {
    submitForm() {
      // Передача данных в родительский компонент через событие
      this.$emit('submit-login', { username: this.username, password: this.password });
    },
    registerUser() {
      this.$router.push('/register');
    },
  }
};
</script>