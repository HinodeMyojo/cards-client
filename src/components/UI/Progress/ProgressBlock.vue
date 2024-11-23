<template>
    <div class="main-block">
        <div class="container-block">
            <table class="progress-table">
                <thead>
                    <td v-for="(month, index) in months" :key="index" :colspan="getColspan(month)">
                        {{ month }}
                    </td>
                </thead>
                <tbody>
                    <tr v-for="(row, rowIndex) in data" :key="rowIndex">
                        <td v-for="(cell, cellIndex) in row" :key="cellIndex" :style="getCellStyle(cell.value)"
                            class="tooltip">
                            <span class="tooltip-text">{{ cell.value }}</span>
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
    data: Array
});

const getColspan = (month) => {
    if (month === 'Янв') {
        return 5
    } else if (month === 'Дек') {
        return 5
    } else {
        return 4
    }
}


const getCellStyle = (cell) => {
    let backgroundColor = ''
    if (cell === 0) {
        backgroundColor = '#161B22'
    } else if (cell === 1) {
        backgroundColor = '#0E4429'
    } else if (cell === 2) {
        backgroundColor = '#39D353'
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
    width: 50px;
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
    width: 740px;
    border-collapse: collapse;
    text-align: center;
    table-layout: fixed;
    border-radius: 8px;
    /* overflow: hidden; */
}

td {
    border: 2px solid #202127;
    padding: 8px;
    border-radius: 8px;
}
</style>
