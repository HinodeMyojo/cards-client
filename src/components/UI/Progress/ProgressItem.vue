<template>
    <div v-for="day in data" :key="day" class="day">
        <div v-if="day.data.length === 0" class="block-simple"></div>
        <div v-else-if="day.data.length >= 1 && day.data.length <= 4" class="block-light-green"></div>
        <div v-else class="block-green"></div>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    data: {
        type: Array,
        required: true,
        default: () => []
    }
});
</script>

<style scoped>
.day {
    display: flex;
    flex-direction: row;

}

.block-simple,
.block-light-green,
.block-green {
    width: 8px;
    height: 8px;
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
</style>
