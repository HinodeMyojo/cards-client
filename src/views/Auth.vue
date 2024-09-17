<template>
    <div class="login-container">
        <div class="login-left"></div>
        <div class="login-right">
            <div class="login-form-container" v-if="register === true">
            <!-- Отображение формы регистрации или входа в зависимости от маршрута -->
                <RegistrationForm @submit-registration="registerUser" />
            </div>
            <div class="login-form-container" v-else>
                <LoginForm @submit-login="loginUser" />
            </div>
            
            </div>
        </div>
</template>

<script setup>
import {ref} from 'vue'
import axios from 'axios';
import RegistrationForm from '@/components/Auth/Registration.vue';
import LoginForm from '@/components/Auth/Login.vue';
import {useRouter} from 'vue-router';

//Props: 
const props = defineProps({
    register: Boolean
})

// Фунции регистрации
const registerUser = async (data) => {
  try {
    const backendUrl = process.env.VUE_APP_BACKEND_URL;
    const response = await axios.post(`${backendUrl}/register`, data);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};

// Функция логина
const loginUser = async (data) => {
  try {
    const backendUrl = process.env.VUE_APP_BACKEND_URL;
    const response = await axios.post(`${backendUrl}/login`, data);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};


</script>

<style scoped>
.login-container{
    display: flex;
    flex-direction: row;
    height: 100vh;
}
.login-left, .login-right{
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
}

.login-left{
    background-color: transparent;
}
.login-right{
    background-color: #242429;
    box-shadow: -5px 0 15px rgba(0, 0, 0, 0.5); /* Небольшая тень для визуального отделения */
}

.login-form-container{
    background-color: transparent;
    display: flex;
    flex-direction: column;
    padding: 20px;
    width: 90%;
    max-width: 680px;
}

:deep(h3){
    background-color: transparent;
    font-size: 45px;
    font-weight: 500;
    text-align: center;
    flex: 1;
    margin-bottom: 30px;
}

:deep(.login-form, .buttons){
    background-color: transparent;
    display: flex;
    gap: 15px;
    flex-direction: column;
}

:deep(.login-form input){
    width: 100%;
    font-size: 17px;
    height: 57px;
    border-color: transparent;
    background-color: #131316;
    border-radius: 10px;
    padding-left: 10px;
}

:deep(.login-form label){
    font-size: 17px;
    width: 100%;
    /* height: 300px; */
    background-color: transparent;
}

:deep(.login-form button, .social){
    font-size: 20px;
    width: 100%;
    height: 55px;
    /* border: none; */
    cursor: pointer;
    border-radius: 15px;
}

:deep(.buttons){
    background-color: transparent;
    display: flex;
    flex-direction: column;
    margin-top: 25px;
    gap: 15px;
}
:deep(.fill){
    border: none;
    background-color: #811BA5;
    transition: background-color 0.3s ease;
}
:deep(.fill:hover){
    border: none;
    background-color: #60147c;
}

:deep(.transparent) {
    background-color: transparent;
    border: 1px solid #DF82FF;
    transition: background-color 0.3s ease;
}

:deep(.transparent:hover){
    background-color: transparent;
    border: 1px solid #f2ccff;
}

</style>