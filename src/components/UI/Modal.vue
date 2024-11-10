<template>
    <div class="main">
        <h2>{{ props.text }}</h2>
        <div class="buttons">
            <Button class="yes" @click="yes">Да</Button>
            <Button class="no" @click="no">Нет</Button>
        </div>
    </div>
</template>

<script setup>

const emit = defineEmits(['yes', 'no'])

const props = defineProps({
    text: {
        type: String,
        Required: true
    }
})

const yes = () => {
    emit('yes')
}
const no = () => {
    emit('no')
}

</script>

<style scoped>
.main {
    width: 400px;
    height: 180px;
    background-color: #2C2F3A;
    /* Более светлый оттенок для фона */
    border-radius: 20px;
    /* Увеличенный радиус для более мягких углов */
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 20px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    /* Легкая тень для глубины */
    padding: 20px;
    transition: all 0.3s ease-in-out;
    /* Плавные анимации для всех изменений */
}

h2 {
    font-weight: 400;
    font-size: 24px;
    /* Немного меньше для лучшего баланса */
    color: #FFFFFF;
    /* Белый цвет для заголовка */
    text-align: center;
}

.buttons {
    width: 100%;
    display: flex;
    justify-content: space-evenly;
}

Button {
    width: 140px;
    height: 50px;
    background-color: #3C434D;
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

/* Добавим адаптивность на мобильных устройствах */
@media (max-width: 480px) {
    .main {
        width: 90%;
        height: 200px;
    }

    Button {
        width: 120px;
        font-size: 14px;
    }
}
</style>