<!-- <template>
    <div>
        <table>
            <thead>
                <td v-for="(month, index) in months" :key="index" :colspan="getColspan(month)">
                    {{ month }}
                </td>
            </thead>
            <tbody>
                <tr v-for="(row, rowIndex) in tableData" :key="rowIndex">
                    <td v-for="(cell, cellIndex) in row" :key="cellIndex" :style="getCellStyle(cell)">
                        {{ cell }}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';
import { ref } from 'vue';

const props = defineProps({
    data: {
        type: Array,
        required: true,
        default: () => []
    }
});


const months = [
    "Янв",
    "Фев",
    "Март",
    "Апр",
    "Май",
    "Июнь",
    "Июль",
    "Авг",
    "Сент",
    "Окт",
    "Ноя",
    "Дек"
];


</script>

<style scoped>
.day {
    display: flex;
    flex-direction: row;

}

.block-simple,
.block-light-green,
.block-green {
    width: 10px;
    height: 10px;
}

.block-simple {
    background-color: rgba(142, 142, 142, 0.475);
}

.block-light-green {
    background-color: rgba(127, 255, 212, 0.721);
}

.block-green {
    background-color: green;
}
</style> -->
