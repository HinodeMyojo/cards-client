<template>
    <div class="main">
        <div class="color-line" :style="{ backgroundColor: color }"></div>
        <div class="content">
            <p>{{ text }}</p>
        </div>
    </div>
</template>

<script setup>
const props =
    defineProps({
        text: {
            type: String,
            required: true,
            default: ''
        },
        color: {
            type: String,
            default: '#f84545'
        }
    })
</script>

<style scoped>
.main {
    width: 700px;
    height: 80px;
    display: flex;
    flex-direction: row;
    border-radius: 20px;
    overflow: hidden;
}

@media screen and (max-width: 768px) {
    .main{
        width: 100%;
        height: 50px;
        display: flex;
        flex-direction: row;
        border-radius: 20px;
        overflow: hidden;
    }
  }


.color-line {
    width: 1.5%;
    height: 100%;
    background-color: v-bind(color);
}

.content {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 98.5%;
    height: 100%;
    background-color: #131316;
}
</style>