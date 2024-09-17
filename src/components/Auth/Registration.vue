<!-- <template>
    <form class="login-form" @submit.prevent="submitForm">
      <label for="Email">Email</label>
      <input 
        v-bind:value="email"
        @input="email = $event.target.value"
        type="Email" 
        id="Email" 
        placeholder="AlphaCentauri@mail.ru" 
        required
      >
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
      <button class="fill" @click="registerUser" type="submit">Зарегистрироваться</button>
    </form>
  </template>
  
  <script>
  export default {
    data() {
      return {
        email: '',
        username: '',
        password: ''
      }
    },
    methods: {
      submitForm() {
        console.log('Registration form submitted');
      },
      async registerUser() {
        // Реализация регистрации
      }
    }
  }
  </script>
  -->
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
      <label for="Username">Username</label>
      <input 
        v-model="data.username"
        type="text" 
        id="Username" 
        placeholder="AlphaCentauri" 
        required
      >
      <label for="Password">Password</label>
      <input 
        v-model="data.password"
        type="password" 
        id="Password" 
        placeholder="•••••••••••••••••" 
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
import SocialButtons from '@/components/Auth/SocialButtons.vue';
import router from '@/router/router';
import { reactive } from 'vue';

const data = reactive({
  email: '',
  username: '',
  password: ''
});

const emit = defineEmits(['submit-registration']);

const submitForm = () => {
    emit('submit-registration', data);
}

const loginUser = () => {
  router.push('/login');
}
</script>

  
<!-- <script>
import SocialButtons from '@/components/Auth/SocialButtons.vue';
  export default {
    data() {
      return {
        email: '',
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
        this.$emit('submit-registration', { email: this.email, username: this.username, password: this.password });
      },
      async loginUser() {
        this.$router.push('/login');
      }
    }
  };
</script> -->