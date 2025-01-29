<template>
    <div class="search-autocomplete" style="border-radius: 10px;">
        <input v-model="inputText" type="text" placeholder="Поиск..." @input="inputItems"
            style="outline: none; background-color: #2b2c34;" />
    </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue';


const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const emit = defineEmits(['input']);

let debounceTimeout = null;

const inputItems = async (event) => {
    const currentValue = event.target.value;
    if (debounceTimeout) {
        clearTimeout(debounceTimeout);
    }

    debounceTimeout = setTimeout(() => {
        emit('input', currentValue); // Отправляем значение через emit
    }, 500); // 500 мс ожидания
};
</script>

<style scoped>
.search-autocomplete {
    position: relative;
    width: 100%;
    max-width: 100%;
}

input {
    width: 100%;
    padding: 8px;
    border-radius: 5px;
}

ul {
    position: absolute;
    width: 100%;
    max-height: 150px;
    overflow-y: auto;
    background: white;
    /* border: 1px solid #ccc; */
    border-top: none;
    /* border-radius: 0 0 4px 4px; */
    margin: 0;
    padding: 0;
    list-style: none;
}

li {
    padding: 8px;
    cursor: pointer;
}

li:hover {
    background-color: #f0f0f0;
}
</style>
