<template>
    <div class="main">
        <div class="container">
            <div v-for="item in data" :key="item.id" class="months">
                <ProgressItem :data="item.data" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';
import ProgressItem from './ProgressItem.vue';

const props = defineProps({
    data: Array
});
</script>

<style scoped>
.main {
    display: flex;
    width: 100%;
    height: 100%;
    background-color: rgb(225, 58, 58);
    justify-content: center;
    align-items: flex-start;
}

.container {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
    max-width: 100%;
    justify-content: flex-start;
}

.months {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    gap: 3px;
    width: 50px;
    height: auto;
    /* padding: 5px; */
    box-sizing: border-box;
    /* border: 1px solid #ccc; */
    border-radius: 5px;
}
</style>
