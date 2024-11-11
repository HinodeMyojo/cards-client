<template>
    <v-dialog v-model="dialog" max-width="600px">
        <v-card class="main" :class="['main-element', { 'shifted': isPreview }]" prepend-icon="mdi-cards"
            title="Создание элемента">
            <v-card-text class="inputs-text">
                <v-row dense class="inputs">
                    <v-textarea v-model="key" :counter="128" label="Ключ" required auto-grow rows="1"></v-textarea>
                    <v-textarea v-model="value" :counter="128" label="Значение" auto-grow rows="1"></v-textarea>
                </v-row>
                <div class="checkboxes">
                    <v-checkbox v-model="isExtended" label="Расширенный элемент" class="checkbox"></v-checkbox>
                </div>
                <v-expand-transition>
                    <v-row v-if="isExtended" dense class="inputs">
                        <!-- TODO -->
                        <v-textarea label="<Место для кода>" auto-grow rows="6"></v-textarea>
                        <!-- <v-textarea label="Изображение" auto-grow rows="1"></v-textarea> -->
                    </v-row>
                </v-expand-transition>
            </v-card-text>
            <v-card-actions class="buttons">
                <v-btn class="green" @click="submitForm">Добавить</v-btn>
                <v-btn class="red" @click="dialog = false">Отмена</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>


<script setup>
import { ref, watch, defineProps, defineEmits } from 'vue'

const props = defineProps({
    dialog: Boolean
})

const key = ref('');
const value = ref('');

const isExtended = ref(false)

const submitForm = () => {
    emit('submit-form', { key: key.value, value: value.value });
    dialog.value = false;
}

const emit = defineEmits(['update:dialog'])

// Используем v-model для синхронизации состояния dialog
const dialog = ref(false)

// Следим за изменениями пропса dialog и синхронизируем с локальным состоянием
watch(() => props.dialog, (newVal) => {
    dialog.value = newVal
    key.value = '';
    value.value = '';
})

watch(dialog, (newVal) => {
    // Когда dialog закрывается, передаем новое состояние в родительский компонент
    emit('update:dialog', newVal)
})
</script>


<style scoped>
.inputs-text {
    width: 100%;
    height: 100%;
    margin-top: 30px;
}

.checkboxes {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 30px;
}

.inputs {
    display: flex;
    width: 100%;
    height: 100%;
    gap: 30px;
}

.checkbox {
    width: 100%;
    margin-left: -15px;
    margin-bottom: -20px;
}

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
    margin-bottom: 20px;
    display: flex;
    justify-content: space-evenly !important;
}

Button {
    width: 140px;
    height: 50px;
    border-radius: 12px;
    font-weight: 500;
    color: white;
    font-size: 16px;
    border: none;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

Button:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

Button:active {
    transform: scale(0.95);
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.red {
    border-radius: 12px;
    color: white;
    transition: all 0.3s ease;
}

.red:hover {
    color: #BF4242;
    border: 1px solid #BF4242;
    transform: scale(1.05);
}

.red:active {
    transform: scale(0.95);
    /* Уменьшение кнопки при нажатии */
    color: #BF4242;
    border: 1px solid #BF4242;
}

.green {
    border-radius: 12px;
    color: white;
    transition: all 0.3s ease;
}

.green:hover {
    transform: scale(1.05);
    /* Эффект увеличения кнопки при наведении */
    color: #45a049;
    border: 1px solid #45a049;
}

.green:active {
    transform: scale(0.95);
    /* Уменьшение кнопки при нажатии */
    color: #45a049;
    border: 1px solid #45a049;
}
</style>
