<template>
    <div class="main">
        <h3>Проблемы с сервером, дружище! Зайди чуть позже, пожалуйста!</h3>
        <img src="@/assets/gifs/500.gif" alt="">
    </div>
</template>

<script setup>
</script>

<style scoped>
.main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    /* Центрирование по вертикали */
    gap: 50px;
    width: 100%;
    height: 80vh;
    /* Занять всю высоту окна */
}

img {
    border-radius: 20px;
}
</style>
