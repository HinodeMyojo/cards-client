<template>
    <div class="main-header">
        <div class="wrapper">
            <div class="container">
                <div class="logotype">
                    <a class="logo" @click="Home">
                        <UIIcon path="logo.svg" width="35px" height="35px" />
                        <span class="logo-text">pleiades</span>
                    </a>
                </div>
                <div class="content">
                    <div class="content-body">
                        <div class="main">
                            <a href="">Главная</a>
                            <a href="">Модули</a>
                        </div>                        
                        <div class="right">
                            <div class="language">
                                <a class="switch-lang">
                                    <UIIcon path="language.svg" />
                                    <UIIcon width="22px" height="22px" path="downArrowhead.svg" />
                                </a>

                            </div>
                            <div class="auth-header">
                                <a @click="loginUser" href="">Вход</a>
                                <button @click="registerUser" class="register">Регистрация</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import UIIcon from './UI/UIIcon.vue';
import router from '@/router/router';


const Home = () => {
    router.push('/');
}

const loginUser = () => {
    router.push('/login');
}
const registerUser = () => {
    router.push('/register');
};

</script>

<style scoped>
.main-header{
    /* display: flex; */
    text-decoration: none;
    width: 100%;
    height: 64px;
    
}
a, button{
    font-size: 16px;
    font-weight: 500;
}

button{
    background-color: #272A2F;
    border: 1px solid #3B4047;
    padding: 10px 20px;
    border-radius: 10px;
    cursor: pointer;
    transition: 0.4s ease;
    box-sizing: border-box;
}

button:hover{
    border: 1px solid #D459FF;
}

a:hover{
    color: white;
    transition: 0.3s ease;
}

.wrapper{
    padding-left: 20%;
    padding-right: 20%;
    width: 100%;
    height: 100%;
}
.container{
    display: flex;
    max-width: 100%;
    height: 64px;
    flex: 1;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 30px;
}

.right{
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 20px;
}

.logo{
    flex-shrink: 0;
    display: flex;
    align-items: center;
    gap: 10px;
}
.content{
    flex-grow: 1;
}

.content-body{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
}
.main, .auth-header{
    display: flex;
    align-items: center;
    gap: 30px;
}

.switch-lang{
    display: flex;
    align-items: center;
    gap: 5px;
    
}

.logo{
    cursor: pointer;
}

/* .switch-lang:hover{
    
} */

.logo-text{
    font-weight: 700;
}

</style>