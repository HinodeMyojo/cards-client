<template>
  <h3 class="main-title">Регистрация</h3>
  <LoginHelper
    class="login-helper"
    :class="{ visible: helperVisible }"
    :text="helperText"
    :color="helperColor"
  />
  <form class="login-form" @submit.prevent="registerUser(data)">
    <div v-if="errorState != 1" class="email-true-label">
      <label for="Email">Email</label>
      <input
        v-model="data.email"
        type="email"
        id="Email"
        placeholder="AlphaCentauri@mail.ru"
        required
      />
    </div>
    <div class="error-form" v-if="errorState == 1">
      <label for="Email">Email</label>
      <p>{{ errorMessage }}</p>
      <input
        v-model="data.email"
        type="email"
        id="Email"
        placeholder="AlphaCentauri@mail.ru"
        required
      />
    </div>
    <div v-if="errorState != 2" class="email-true-label">
      <label for="Username">Username</label>
      <input
        v-model="data.username"
        type="text"
        id="Username"
        placeholder="AlphaCentauri"
        required
      />
    </div>
    <div class="error-form" v-if="errorState == 2">
      <label for="Username">Username</label>
      <p>{{ errorMessage }}</p>
      <input
        v-model="data.username"
        type="text"
        id="Username"
        placeholder="AlphaCentauri"
        required
      />
    </div>
    <div v-if="errorState != 1" class="email-true-label">
      <label for="Password">Password</label>
    <input
      v-model="data.password"
      type="password"
      id="Password"
      placeholder="•••••••••••••••••"
      required
    />
    </div>
    <div class="buttons">
      <button class="fill" type="submit">Зарегистрироваться</button>
      <button class="transparent" type="button" @click="loginUser">
        Войти
      </button>
      <SocialButtons />
    </div>
  </form>
</template>

<script setup>
  import SocialButtons from '@/components/auth/SocialButtons.vue';
  import router from '@/router/router';
  import axios from 'axios';
  import { reactive, ref, watch } from 'vue';
  import LoginHelper from '../UI/LoginHelper.vue';

  const data = reactive({
    email: '',
    username: '',
    password: '',
  });

  const errorState = ref(0);
  const errorMessage = ref('');
  const successMessage = ref('');

  // Помогалка
  const helperText = ref('');
  const helperColor = ref('');
  const helperVisible = ref(false);

  watch(helperVisible, () => {
    setTimeout(() => {
      helperVisible.value = false;
    }, 2000);
  });

  // const emit = defineEmits(['submit-registration']);

  // const submitForm = () => {
  //   emit('submit-registration', data);
  //   loginUser()
  // }

  const registerUser = async (data) => {
    try {
      const backendUrl = import.meta.env.VITE_APP_BACKEND_URL;
      const response = await axios.post(`${backendUrl}/auth/register`, data);
      if (response.status === 200) {
        helperText.value =
          'Вы успешно зарегистрировались! Вас перенаправят на страницу входа через 3 секунды!';
        helperColor.value = 'green';
        helperVisible.value = true;
        setTimeout(() => {
          loginUser();
        }, 2000);
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        switch (error.response.data.message) {
          case 'Пользователь с таким Email уже зарегистрирован!':
            errorMessage.value = error.response.data.message;
            errorState.value = 1;
            break;
          case 'Пользователь с таким Username уже зарегистрирован!':
            errorMessage.value = error.response.data.message;
            errorState.value = 2;
            break;
          default:
            helperText.value = error.response.data.errors.Password[0];
            helperColor.value = 'red';
            helperVisible.value = true;
        }
      } else {
        helperText.value = 'Неизвестная ошибка. Повторите позже.';
        helperColor.value = 'red';
        helperVisible.value = true;
      }
    }
  };

  const loginUser = () => {
    router.push('/login');
  };
</script>
<style scoped>
  
  .login-helper {
    position: absolute;
    top: 20px;
    right: 125px;
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
  }
  
  @media screen and (max-width: 768px) {
    .main-title{
      position: relative;
      width: 100%;
    }

    .login-helper {
      position: absolute;
      display: flex;
      top: 6%;
      right: 0px;
      opacity: 0;
      transition: opacity 0.3s ease-in-out;
    }
  }


  .login-helper.visible {
    opacity: 1;
  }

  .email-true-label, .error-form{
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
</style>
