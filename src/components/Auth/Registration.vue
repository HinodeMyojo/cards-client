<template>
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
  