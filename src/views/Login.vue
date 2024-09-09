<template>
<div class="login-container">
    <div class="login-left"></div>
    <div class="login-right">
        <div class="login-form-container">
            <h3>Регистрация</h3>
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
                <div class="buttons">
                    <button class="fill" @click="registerUser" type="register">Зарегистрироваться</button>
                    <button class="transparent" type="login">Уже есть учетная запись? Войти</button>
                    <a type="button" class="social">
                        <inline-svg src="@/svg/google.svg"></inline-svg>
                        <span>Войти с помощью Google</span>
                    </a>
                </div>
            </form>
        </div>
    </div>
</div>


</template>

<script>
import axios from 'axios';
import InlineSvg from 'vue-inline-svg';

export default {
    data() {
        return {
            email: '',
            username: '',
            password: ''
        }
    },
    components:{ InlineSvg },
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

.login-form button{
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

.social {
    display: flex;
    flex-direction: row;
    /* background-color: #616161; */
    border: none;
}
</style>