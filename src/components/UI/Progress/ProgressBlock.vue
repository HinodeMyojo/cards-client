<template>
    <div class="main">
        <div class="container">
            <table>
                <thead>
                    <td v-for="(month, index) in months" :key="index" :colspan="getColspan(month)">
                        {{ month }}
                    </td>
                </thead>
                <tbody>
                    <tr v-for="(row, rowIndex) in data" :key="rowIndex">
                        <td v-for="(cell, cellIndex) in row" :key="cellIndex" :style="getCellStyle(cell)">
                            {{ cell.value }}
                        </td>
                    </tr>
                </tbody>
            </table>z
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
        backgroundColor = 'lightgray'
    } else if (cell === 1) {
        backgroundColor = 'lightgreen'
    } else if (cell === 2) {
        backgroundColor = 'lightblue'
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
.main {
    display: flex;
    width: 100%;
    max-height: 100%;
    align-items: center;
    justify-content: center;
}

.container {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    min-width: 100%;
    justify-content: space-between;
    align-items: center;
}

table {
    width: 100%;
    border-collapse: collapse;
    text-align: center;
}

td {
    border: 1px solid #ccc;
    padding: 8px;
}
</style>
