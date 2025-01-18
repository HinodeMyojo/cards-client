<template>
    <div class="text-center">
        <v-menu :location="location">
            <template v-slot:activator="{ props }">
                <v-btn style="text-transform: none;" :color="buttonColor" :dark="isDark"
                    :style="{ fontSize: buttonSize + 'px', width: width }" ref="buttonRef" v-bind="props">
                    {{ nowTitle }}
                    <svg-icon :type="'mdi'" :path="path" :size="iconSize" />
                </v-btn>
            </template>

            <!-- Меню с динамической шириной -->
            <v-list :style="{ width: width }">
                <v-list-item v-for="(item, index) in items" :key="index" @click="dropDownAction(item)">
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>
    </div>
</template>

<script setup>
import { reactive, computed, ref, onMounted } from 'vue';
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiChevronDown } from '@mdi/js';

// SVG Icon Path
const path = ref(mdiChevronDown);

const props = defineProps({
    title: {
        type: String,
        default: 'Click Me', // Default button text
    },
    data: {
        type: Array,
        default: () => [
            { title: 'Default Action 1', action: () => alert('Default Action 1 executed') },
            { title: 'Default Action 2', action: () => alert('Default Action 2 executed') },
        ],
    },
    buttonColor: {
        type: String,
        default: 'primary', // Default color
    },
    buttonSize: {
        type: Number,
        default: 14, // Default font size in px
    },
    iconSize: {
        type: Number,
        default: 16, // Default icon size in px
    },
    isDark: {
        type: Boolean,
        default: true, // Default dark mode for button
    },
    width: {
        type: String,
        default: '140px', // Default width
    },
});

const nowTitle = ref(props.data[0].title);
const dropDownAction = (item) => {
    nowTitle.value = item.title;
    item.action;
}

const state = reactive({
    location: 'bottom',
});

// Items computed from props
const items = computed(() => props.data);

// Reference for the button to calculate its width
const buttonRef = ref(null);

onMounted(() => {
    // Дополнительная логика, если нужно динамически получить ширину кнопки
    if (buttonRef.value) {
        console.log('Button width:', buttonRef.value.offsetWidth);
    }
});
</script>

<style scoped>
.v-menu .v-list-item-title {
    text-transform: lowercase !important;
}

.v-list-item-title {
    font-size: medium !important;
}

button {
    background-color: #25262C !important;
    border-radius: 10px !important;
}
</style>