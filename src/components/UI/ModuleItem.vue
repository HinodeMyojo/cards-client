<template>
    <div @click="$emit('click', id)" class="moduleItem">
        <slot>{{ title }}</slot>
    </div>
</template>

<script setup>
const title = defineProps({
    title: String,
    id: Number
})
</script>

<style scoped>
.moduleItem {
    background-color: transparent;
    cursor: pointer;
}

.moduleItem:hover {
    color: rgb(255, 255, 255);
    transition: 0.3s ease;
}
</style>