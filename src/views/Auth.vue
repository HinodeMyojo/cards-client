<template>
<div class="login-container">
    <div class="login-left"></div>
    <div class="login-right">
        <div class="login-form-container">
            <h3>Регистрация</h3>
            <form class="login-form" @submit.prevent="submitForm">
                <div class="buttons">
                    <button class="fill" @click="registerUser" type="register">Зарегистрироваться</button>
                    <button class="transparent" type="login">Уже есть учетная запись? Войти</button>
                    <a type="button" class="social">
                        <UIIcon path="google.svg" />
                        <span>Войти с помощью Google</span>
                    </a>
                    <a type="button" class="social">
                        <UIIcon path="apple.svg"/>
                        <span>Войти с помощью Apple</span>
                    </a>
                    <a type="button" class="social">
                        <UIIcon path="telegram.svg"/>
                        <span>Войти с помощью Telegram</span>
                    </a>
                </div>
            </form>
        </div>
    </div>
</div>


</template>

<script>
import axios from 'axios';
import UIIcon from '@/components/UI/UIIcon.vue';
import RegistrationForm from '@/components/Auth/Registration.vue';
import LoginForm from '@/components/Auth/Login.vue';

export default {
    data() {
        return {
            email: '',
            username: '',
            password: ''
        }
    },
    components: {UIIcon, RegistrationForm, LoginForm},
    methods: {

        async RegisterUser()
        {
            try{
                const newUser = {
                    email: this.email,
                    username: this.username,
                    password: this.password
                };
                const backendUrl = process.env.BACKEND_URL;

                const response = await axios.post(backendUrl, newUser);
                console.log(response);
            }
            catch(error){
                console.log(error);
            }
        },
        submitForm() {
            console.log('submit');
        }
    }
}
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

h3{
    background-color: transparent;
    font-size: 45px;
    font-weight: 500;
    text-align: center;
    flex: 1;
    margin-bottom: 30px;
}

.login-form, .buttons{
    background-color: transparent;
    display: flex;
    gap: 15px;
    flex-direction: column;
}

.login-form input{
    width: 100%;
    font-size: 17px;
    height: 57px;
    border-color: transparent;
    background-color: #131316;
    border-radius: 10px;
    padding-left: 10px;
}

.login-form label{
    font-size: 17px;
    width: 100%;
    /* height: 300px; */
    background-color: transparent;
}

.login-form button, .social{
    font-size: 20px;
    width: 100%;
    height: 55px;
    /* border: none; */
    cursor: pointer;
    border-radius: 15px;
}

.buttons{
    margin-top: 25px;
}
.fill{
    border: none;
    background-color: #811BA5;
}

.transparent {
    background-color: transparent;
    border: 1px solid #DF82FF;
}

.transparent:hover{
    background-color: transparent;
    border: 1px solid #f2ccff;
}

.social, span, a{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 10px;
    background-color: #616161;
    border: none;
}

/* .social:hover{
    background-color: #757575;
}

span:hover{
    background-color: transparent;
} */

</style>