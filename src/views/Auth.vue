<template>
    <div class="login-container">
        <div class="login-left"></div>
        <div class="login-right">
            <div class="close-menu">
                <div class="close-menu-icon">
                    <UIIcon style="cursor: pointer;" path="close.svg" width="20px" height="20px" @click="closeMenu" />
                </div>
            </div>
            <div class="login-form-container" v-if="register">
                <!-- Отображение формы регистрации или входа в зависимости от маршрута -->
                <RegistrationForm @submit-registration="registerUser" />
            </div>
            <div class="login-form-container" v-else-if="login === true">
                <LoginForm @submit-login="loginUser" />
            </div>
            <div class="login-form-container" v-else-if="recovery === true">
                <!-- Шаг 1: Ввод email -->
                <div class="login-inner-container" v-if="recoveryStep === 1">
                    <PasswordRecoverySendEmail @send-recovery-email="handleEmailSubmission" />
                </div>
                <!-- Шаг 2: Ввод кода -->
                <div class="login-inner-container" v-else-if="recoveryStep === 2">
                    <div v-if="responseOkMessage" class="successfulMessage"><span>{{ responseOkMessage }}</span></div>
                    <div v-else-if="responseErrorMessage" class="unsuccessfulMessage"><span>{{ responseErrorMessage
                            }}</span></div>
                    <div v-else class="unsuccessfulMessage" style="visibility: hidden;">{{ responseErrorMessage }}</div>
                    <PasswordRecoveryCheckCode @send-check-code="handleCodeSubmission" />
                </div>
                <!-- Шаг 3: Ввод нового пароля -->
                <div class="login-inner-container" v-else-if="recoveryStep === 3">
                    <div v-if="responseOkMessage" class="successfulMessage"><span>{{ responseOkMessage }}</span></div>
                    <PasswordRecoveryResetPassword @submit-new-password="handlePasswordReset" />
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
import RegistrationForm from '@/components/Auth/Registration.vue';
import LoginForm from '@/components/Auth/Login.vue';
import PasswordRecoverySendEmail from '@/components/Auth/PasswordRecoverySendEmail.vue';
import PasswordRecoveryCheckCode from '@/components/Auth/PasswordRecoveryCheckCode.vue';
import PasswordRecoveryResetPassword from '@/components/Auth/PasswordRecoveryResetPassword.vue';
import UIIcon from '@/components/UI/UIIcon.vue';
import router from '@/router/router.js';
import { useAuthStore } from '@/stores/authStore';
import { ref } from 'vue';

//Props: 
const props = defineProps({
    register: Boolean,
    login: Boolean,
    recovery: Boolean,
})

const authStore = useAuthStore();

let token = null;

const recoveryStep = ref(1);


let responseOkMessage = ref(null);
let responseErrorMessage = ref(null);

// Фунции регистрации
const closeMenu = () => {
    router.push('/');
}

const registerUser = async (data) => {
    try {
        const backendUrl = import.meta.env.VITE_APP_BACKEND_URL;
        const response = await axios.post(`${backendUrl}/auth/register`, data);
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
};

// Функция логина
const loginUser = async (data) => {
    try {
        const backendUrl = import.meta.env.VITE_APP_BACKEND_URL;
        const response = await axios.post(`${backendUrl}/auth/login`, data);

        if (response.status === 200) {
            // Переделать. Нужно принимать access и refresh токены
            console.log(response.data);
            authStore.setTokens({
                access: response.data.accessToken,
                refresh: response.data.refreshToken
            });
            router.push('/');
            console.log(token);
        }

        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
};

const handleEmailSubmission = async (data) => {
    window.localStorage.setItem('recoveryEmail', JSON.stringify(data.value.email));

    try {
        const backendUrl = import.meta.env.VITE_APP_BACKEND_URL;
        const response = await axios.get(`${backendUrl}/auth/send-recovery-code`, { params: { to: data.value.email } });
        if (response.status === 200) {
            responseOkMessage.value = response.data;
        } else {
            responseErrorMessage.value = response.data;
        }
        console.log(response.data);
        recoveryStep.value = 2;
    } catch (error) {
        console.error(error);
    }
};

const handleCodeSubmission = async (data) => {
    let recoveryEmail = ref([])
    if (window.localStorage.getItem('recoveryEmail') !== null) {
        recoveryEmail.value = JSON.parse(window.localStorage.getItem('recoveryEmail'));
    }
    if (recoveryEmail.value.length === 0) {
        alert("Что-то пошло не так. Попробуйте ещё раз.");
        recoveryStep.value = 1;
        return;
    }

    try {
        const backendUrl = import.meta.env.VITE_APP_BACKEND_URL;
        const response = await axios.get(`${backendUrl}/auth/check-recovery-code`, { params: { code: data.value.code, email: recoveryEmail.value } });
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
            responseErrorMessage.value = "Произошла ошибка при отправке запроса";
        }
    }
}

const handlePasswordReset = async (data) => {
    let recoveryEmail = ref([])
    if (window.localStorage.getItem('recoveryEmail') !== null) {
        recoveryEmail.value = JSON.parse(window.localStorage.getItem('recoveryEmail'));
    }
    if (recoveryEmail.value.length === 0) {
        alert("Что-то пошло не так. Попробуйте ещё раз.");
        recoveryStep.value = 1;
        return;
    }

    try {
        const code = parseInt(localStorage.getItem('code'));
        const backendUrl = import.meta.env.VITE_APP_BACKEND_URL;
        const response = await axios.post(`${backendUrl}/auth/update-password`,
            {
                email: recoveryEmail.value,
                code: code,
                password: data.value.password,
                submitPassword: data.value.submitPassword
            });
        if (response.status === 200) {
            router.push('/login')
        } else {
            responseErrorMessage.value = response.data;
        }

    } catch (error) {
        if (error.response) {
            responseOkMessage.value = null;
            responseErrorMessage.value = error.response.data;
        } else {
            responseErrorMessage.value = "Произошла ошибка при отправке запроса";
        }
    }
}

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
    /* Небольшая тень для визуального отделения */
    flex-direction: column;
}

.close-menu {
    background-color: transparent;
    padding: 20px;
    width: 90%;
    max-width: 680px;
    padding-left: 20px;
    padding-right: 20px;
    margin-bottom: 10px;
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
    background-color: transparent
}

:deep(h3) {
    background-color: transparent;
    font-size: 45px;
    font-weight: 500;
    text-align: center;
    flex: 1;
    margin-bottom: 30px;
}

:deep(.login-form, .buttons) {
    background-color: transparent;
    display: flex;
    gap: 15px;
    flex-direction: column;
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
    background-color: #811BA5;
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
    border: 1px solid #D459FF;
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
    text-align: center
}

.successfulMessage {
    border-color: #04DE00;
}

.unsuccessfulMessage {
    border-color: #DF0000;
}
</style>