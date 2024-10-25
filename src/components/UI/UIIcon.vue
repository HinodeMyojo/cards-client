<template>
    <component :is="icon" :fill="fill" :width="width" :height="height" />
</template>

<script setup>
import { defineAsyncComponent } from 'vue';

const props = defineProps({
    path: {
        type: String,
        required: true,
        },
    width: {
        type: String,
        default: '40px',
        },
    height: {
        type: String,
        default: '40px',
        },
    fill: {
        type: String,
        default: '#D9D9D9',
        }
})

const icon = defineAsyncComponent(() =>
    import(`/src/assets/icons/${props.path}`)
);
</script>



<style scoped>
.item {
    background-color: transparent;
}

svg {
    background-color: transparent;
    fill: #D9D9D9; /* Значение по умолчанию для SVG */
}
</style>
