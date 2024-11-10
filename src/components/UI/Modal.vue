<template>
    <v-dialog v-model="dialog" width="auto">
        <v-card max-width="400" class="main">
            <v-card-text>
                <h2>{{ text }}</h2>
            </v-card-text>
            <v-card-actions class="buttons">
                <v-btn class="yes" @click="$emit('answer', true)">Да</v-btn>
                <v-btn class="no" @click="$emit('answer', false)">Нет</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>


<script setup>
import { ref, watch, defineProps, defineEmits } from 'vue'

const props = defineProps({
    text: String,
    dialog: Boolean
})

const emit = defineEmits(['update:dialog'])

// Используем v-model для синхронизации состояния dialog
const dialog = ref(props.dialog)

// Следим за изменениями пропса dialog и синхронизируем с локальным состоянием
watch(() => props.dialog, (newVal) => {
    dialog.value = newVal
})

watch(dialog, (newVal) => {
    // Когда dialog закрывается, передаем новое состояние в родительский компонент
    emit('update:dialog', newVal)
})
</script>


<style scoped>
.main {
    border-radius: 20px !important;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    transition: all 0.3s ease-in-out;
}

h2 {
    font-weight: 400;
    font-size: 24px;
    text-align: center;
}

.buttons {
    width: 100%;
    display: flex;
    justify-content: space-evenly !important;
}

Button {
    width: 140px;
    height: 50px;
    /* background-color: #3C434D; */
    /* Более приятный оттенок серого */
    border-radius: 12px;
    /* Округление углов для более гладкого вида */
    font-weight: 500;
    color: white;
    font-size: 16px;
    border: none;
    cursor: pointer;
    transition: all 0.3s ease;
    /* Плавные переходы при наведении */
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    /* Легкая тень для кнопок */
}

Button:hover {
    transform: translateY(-4px);
    /* Эффект подъема кнопки */
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    /* Более выраженная тень при наведении */
}

Button:active {
    transform: scale(0.95);
    /* Уменьшение кнопки при нажатии */
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    /* Уменьшенная тень при нажатии */
}

.yes {
    border-radius: 12px;
    color: white;
    transition: all 0.3s ease;
}

.yes:hover {
    color: #BF4242;
    border: 1px solid #BF4242;
    transform: scale(1.05);
}

.yes:active {
    transform: scale(0.95);
    /* Уменьшение кнопки при нажатии */
    color: #BF4242;
    border: 1px solid #BF4242;
}

.no {
    border-radius: 12px;
    color: white;
    transition: all 0.3s ease;
}

.no:hover {
    transform: scale(1.05);
    /* Эффект увеличения кнопки при наведении */
    color: #45a049;
    border: 1px solid #45a049;
}

.no:active {
    transform: scale(0.95);
    /* Уменьшение кнопки при нажатии */
    color: #45a049;
    border: 1px solid #45a049;
}
</style>
