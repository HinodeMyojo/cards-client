<template>
    <div class="main-block">
        <div class="container-block">
            <table class="progress-table">
                <thead>
                    <td v-for="(month, index) in months" :key="index" :colspan="getColspan(index)">
                        {{ month }}
                    </td>
                </thead>
                <tbody>
                    <tr v-for="(row, rowIndex) in data" :key="rowIndex">
                        <td v-for="(cell, cellIndex) in row" :key="cellIndex" :style="getCellStyle(cell.value)"
                            class="tooltip">
                            <span class="tooltip-text">{{ new Date(cell.date).toLocaleDateString() }}</span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';
// import ProgressItem from './ProgressItem.vue';

const props = defineProps({
    data: Array,
    colspanData: Array
});

const getColspan = (index) => {
    // Проверим, что colspanData доступна и является массивом
    if (props.colspanData && Array.isArray(props.colspanData)) {
        return props.colspanData[index] || 1;  // Возвращаем значение для месяца, если доступно, иначе по умолчанию 1
    }
    return 1;  // Если данных нет, возвращаем 1
};


const getCellStyle = (cell) => {
    let backgroundColor = ''
    switch (cell) {
    case 0:
        backgroundColor = '#161B22';
        break;
    case 1:
        backgroundColor = '#0E4429';
        break;
    case 2:
        backgroundColor = '#1e9258';
        break;
    case 3:
        backgroundColor = '#26b66e';
        break;
    case 4:
        backgroundColor = '#5ee1a0';
        break;
    case 5:
        backgroundColor = '#c6ffe3'; 
        break;
    case 6:
    backgroundColor = '#8af1be'; 
    break;
    default:
        backgroundColor = '#161B22';
}

    return {
        backgroundColor: backgroundColor
    }
}

const months = [
    'Янв',
    'Фев',
    'Март',
    'Апр',
    'Май',
    'Июнь',
    'Июль',
    'Авг',
    'Сент',
    'Окт',
    'Ноя',
    'Дек'
]

</script>

<style scoped>
.tooltip {
    position: relative;
    cursor: pointer;
}

.tooltip-text {
    visibility: hidden;
    width: auto;
    background-color: #18181b;
    text-align: center;
    padding: 5px;
    border-radius: 10px;
    position: absolute;
    z-index: 1;
    bottom: 120%;
    left: 50%;
    transform: translateX(-50%);
    opacity: 0;
    transition: opacity 0.3s;
}

.tooltip:hover .tooltip-text {
    visibility: visible;
    opacity: 1;
}

.main-block {
    display: flex;
    align-items: center;
    justify-content: center;
}

.container-block {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}

.progress-table {
    width: 100%;
    border-collapse: collapse;
    text-align: center;
    table-layout: fixed;
    border-radius: 8px;
}

td {
    border: 2px solid #202127;
    height: 13.81px;
    border-radius: 8px;
}
</style>
