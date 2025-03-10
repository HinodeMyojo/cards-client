<template>
  <div class="login-container">
    <div class="login-left"></div>
    <div class="login-right">
      <LoginHelper
        class="login-helper"
        :class="{ visible: helperVisible }"
        :text="helperText"
      />
      <div class="close-menu">
        <div class="close-menu-icon" @click="closeMenu">
          <svg-icon
            :style="{ cursor: 'pointer' }"
            type="mdi"
            :path="mdiClose"
            :size="30"
          ></svg-icon>
        </div>
      </div>
      <div class="login-form-container" v-if="register">
        <!-- Отображение формы регистрации или входа в зависимости от маршрута -->
        <RegistrationForm />
      </div>
      <div class="login-form-container" v-else-if="login === true">
        <LoginForm @submit-login="loginUser" />
      </div>
      <div class="login-form-container" v-else-if="recovery === true">
        <!-- Шаг 1: Ввод email -->
        <div class="login-inner-container" v-if="recoveryStep === 1">
          <PasswordRecoverySendEmail
            @send-recovery-email="handleEmailSubmission"
          />
        </div>
        <!-- Шаг 2: Ввод кода -->
        <div class="login-inner-container" v-else-if="recoveryStep === 2">
          <div v-if="responseOkMessage" class="successfulMessage">
            <span>{{ responseOkMessage }}</span>
          </div>
          <div v-else-if="responseErrorMessage" class="unsuccessfulMessage">
            <span>{{ responseErrorMessage }}</span>
          </div>
          <div v-else class="unsuccessfulMessage" style="visibility: hidden">
            {{ responseErrorMessage }}
          </div>
          <PasswordRecoveryCheckCode @send-check-code="handleCodeSubmission" />
        </div>
        <!-- Шаг 3: Ввод нового пароля -->
        <div class="login-inner-container" v-else-if="recoveryStep === 3">
          <div v-if="responseOkMessage" class="successfulMessage">
            <span>{{ responseOkMessage }}</span>
          </div>
          <PasswordRecoveryResetPassword
            @submit-new-password="handlePasswordReset"
          />
        </div>
      </div>
      <div class="login-form-container" v-else>
        <h3>Билибоба</h3>
      </div>
    </div>
  </div>
</template>

<script setup>
  import axios from 'axios';
  import RegistrationForm from '@/components/auth/Registration.vue';
  import LoginForm from '@/components/auth/Login.vue';
  import PasswordRecoverySendEmail from '@/components/auth/passwordRecovery/SendEmail.vue';
  import PasswordRecoveryCheckCode from '@/components/auth/passwordRecovery/CheckCode.vue';
  import PasswordRecoveryResetPassword from '@/components/auth/passwordRecovery/ResetPassword.vue';
  import router from '@/router/router.js';
  import { useAuthStore } from '@/stores/authStore';
  import { ref, watch } from 'vue';
  import LoginHelper from '@/components/UI/LoginHelper.vue';
  import SvgIcon from '@jamescoyle/vue-icon';
  import { mdiClose } from '@mdi/js';
  //Props:
  const props = defineProps({
    register: Boolean,
    login: Boolean,
    recovery: Boolean,
  });

  const authStore = useAuthStore();

  let token = null;

  const recoveryStep = ref(1);

  let responseOkMessage = ref(null);
  let responseErrorMessage = ref(null);

  // Фунции регистрации
  const closeMenu = () => {
    router.push('/');
  };

  // Помогалка
  const helperVisible = ref(false);
  const helperText = ref('');

  watch(helperVisible, () => {
    setTimeout(() => {
      helperVisible.value = false;
    }, 2000);
  });

  // Функция логина
  const loginUser = async (data) => {
    try {
      const backendUrl = import.meta.env.VITE_APP_BACKEND_URL;
      const response = await axios.post(`${backendUrl}/auth/login`, data);

      if (response.status === 200) {
        // Обработка успешного ответа: установка access и refresh токенов
        authStore.setTokens({
          access: response.data.accessToken,
          refresh: response.data.refreshToken,
        });
        router.push('/'); // Перенаправление на главную страницу
      }
    } catch (error) {
      if (error.response) {
        // Если сервер вернул ошибку
        if (error.response.status === 400) {
          // Извлечение сообщения из ответа сервера
          helperText.value =
            error.response.data.message ||
            'Что-то пошло не так, попробуйте позже.';
        } else {
          helperText.value = 'Что-то пошло не так, попробуйте позже.';
        }
      } else {
        // Если ошибка произошла на стороне клиента (например, сеть недоступна)
        helperText.value =
          'Не удалось подключиться к серверу. Проверьте соединение.';
      }
      helperVisible.value = true;
    }
  };

  const handleEmailSubmission = async (data) => {
    window.localStorage.setItem(
      'recoveryEmail',
      JSON.stringify(data.value.email)
    );

    try {
      const backendUrl = import.meta.env.VITE_APP_BACKEND_URL;
      const response = await axios.get(
        `${backendUrl}/auth/send-recovery-code`,
        { params: { to: data.value.email } }
      );
      if (response.status === 200) {
        responseOkMessage.value = response.data;
      } else {
        responseErrorMessage.value = response.data;
      }
      recoveryStep.value = 2;
    } catch (error) {
      console.error(error);
    }
  };

  const handleCodeSubmission = async (data) => {
    let recoveryEmail = ref([]);
    if (window.localStorage.getItem('recoveryEmail') !== null) {
      recoveryEmail.value = JSON.parse(
        window.localStorage.getItem('recoveryEmail')
      );
    }
    if (recoveryEmail.value.length === 0) {
      alert('Что-то пошло не так. Попробуйте ещё раз.');
      recoveryStep.value = 1;
      return;
    }

    try {
      const backendUrl = import.meta.env.VITE_APP_BACKEND_URL;
      const response = await axios.get(
        `${backendUrl}/auth/check-recovery-code`,
        { params: { code: data.value.code, email: recoveryEmail.value } }
      );
      if (response.status === 200) {
        responseOkMessage.value = response.data;
        localStorage.setItem('code', data.value.code);
        recoveryStep.value = 3;
      } else {
        responseErrorMessage.value = response.data;
      }
    } catch (error) {
      if (error.response) {
        responseOkMessage.value = null;
        responseErrorMessage.value = error.response.data;
      } else {
        responseErrorMessage.value = 'Произошла ошибка при отправке запроса';
      }
    }
  };

  const handlePasswordReset = async (data) => {
    let recoveryEmail = ref([]);
    if (window.localStorage.getItem('recoveryEmail') !== null) {
      recoveryEmail.value = JSON.parse(
        window.localStorage.getItem('recoveryEmail')
      );
    }
    if (recoveryEmail.value.length === 0) {
      alert('Что-то пошло не так. Попробуйте ещё раз.');
      recoveryStep.value = 1;
      return;
    }

    try {
      const code = parseInt(localStorage.getItem('code'));
      const backendUrl = import.meta.env.VITE_APP_BACKEND_URL;
      const response = await axios.post(`${backendUrl}/auth/update-password`, {
        email: recoveryEmail.value,
        code: code,
        password: data.value.password,
        submitPassword: data.value.submitPassword,
      });
      if (response.status === 200) {
        router.push('/login');
      } else {
        responseErrorMessage.value = response.data;
      }
    } catch (error) {
      if (error.response) {
        responseOkMessage.value = null;
        responseErrorMessage.value = error.response.data;
      } else {
        responseErrorMessage.value = 'Произошла ошибка при отправке запроса';
      }
    }
  };
</script>

<style scoped>
  .login-container {
    display: flex;
    flex-direction: row;
    height: 100vh;
  } 

  .login-left,
  .login-right {
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
  }

  .login-left {
    background-color: transparent;
  }

  .login-right {
    background-color: #242429;
    box-shadow: -5px 0 15px rgba(0, 0, 0, 0.5);
    flex-direction: column;
  }


  .login-helper {
    position: absolute;
    top: 20px;
    opacity: 0;
    transition: opacity 0.5s ease-in-out;
  }

  .login-helper.visible {
    display: none;
    opacity: 1;
  }

  
  .close-menu-icon {
    background-color: transparent;
    display: flex;
    justify-content: flex-end;
  }

  .login-form-container {
    background-color: transparent;
    display: flex;
    flex-direction: column;
    padding: 20px;
    width: 90%;
    max-width: 680px;
  }

  .login-inner-container {
    background-color: transparent;
  }

  :deep(h3) {
    background-color: transparent;
    font-size: 45px;
    font-weight: 500;
    text-align: center;
    flex: 1;
    margin-bottom: 30px;
  }

  :deep(.login-form input) {
    width: 100%;
    font-size: 17px;
    height: 57px;
    border-color: transparent;
    background-color: #131316;
    border-radius: 10px;
    padding-left: 10px;
  }

  :deep(.error-form input) {
    border: 3px solid #f84545;
  }

  :deep(.error-form p) {
    font-size: small;
    color: #f84545;
  }

  :deep(.login-form label) {
    font-size: 17px;
    width: 100%;
    /* height: 300px; */
    background-color: transparent;
  }

  :deep(.login-form button, .social) {
    font-size: 20px;
    width: 100%;
    height: 55px;
    /* border: none; */
    cursor: pointer;
    border-radius: 15px;
  }

  :deep(.buttons) {
    background-color: transparent;
    display: flex;
    flex-direction: column;
    margin-top: 25px;
    gap: 15px;
  }

  :deep(.fill) {
    border: none;
    background-color: #811ba5;
    transition: background-color 0.3s ease;
  }

  :deep(.fill:hover) {
    border: none;
    background-color: #60147c;
  }

  :deep(.transparent) {
    background-color: transparent;
    border: 1px solid #7c7c7c;

    transition: background-color 0.3s ease;
  }

  :deep(.transparent:hover) {
    background-color: transparent;
    border: 1px solid #d459ff;
    transition: 0.3s ease;
  }

  .successfulMessage,
  .unsuccessfulMessage {
    background-color: transparent;
    display: flex;
    justify-content: center;
    border: 1px solid;
    border-radius: 15px;
    align-items: center;
    min-height: 50px;

    box-sizing: border-box;
    padding-left: 10px;
    padding-right: 10px;
    /* margin-bottom: 100px; */
    position: relative;
    bottom: 35px;
    z-index: 1;
    white-space: normal;
    word-wrap: break-word;
  }

  .successfulMessage span,
  .unsuccessfulMessage span {
    max-width: 80%;
    /* Дает тексту возможность расширяться */
    background-color: transparent;
    text-align: center;
  }

  .successfulMessage {
    border-color: #04de00;
  }

  .unsuccessfulMessage {
    border-color: #df0000;
  }
  .close-menu {
  background-color: transparent;
  padding: 20px;
  width: 90%;
  max-width: 680px;
  }

  :deep(.login-form, .buttons) {
    background-color: transparent;
    display: flex;
    gap: 10px;
    flex-direction: column;
  }

  @media screen and (min-width: 768px) {
    .close-menu {
    margin-bottom: 10px;
    gap: 15px;
    }
  }
  @media screen and (max-width: 768px) {
  .login-container {
    flex-direction: column;
  }

  .close-menu {
    padding-bottom: 0px;
  }

  .login-left,
  .login-right {
    flex: none;
  }

  .login-right {
    width: 100%;
    min-height: 100vh;
    box-shadow: none;
    background-color: #242429;
  }

  ::v-deep(.transparent) {
    background-color: transparent;
    border: 1px solid #7c7c7c;
    padding: 10px;
    transition: background-color 0.3s ease;

    &:hover {
      border: 1px solid #d459ff;
    }
  }

  .login-form-container {
    background-color: transparent;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 90%;
  }

  ::v-deep(.buttons) {
    background-color: transparent;
    display: flex;
    flex-direction: column;
    margin-top: 25px;
    gap: 15px;
  }

  ::v-deep(h3) {
    background-color: transparent;
    font-size: 45px;
    font-weight: 500;
    text-align: center;
    margin-bottom: 10px;
  }
}

</style>
