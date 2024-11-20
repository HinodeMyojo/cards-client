<template>
    <div class="main">
        <div class="container">
            <div class="info">
                <div class="text">
                    <div class="text">
                        <h3>{{ countOfSubmissions }}</h3>
                        <p>действий в текущем году</p>
                    </div>
                </div>
                <div class="text-data">
                    <div class="small-text">
                        <p>Активных дней:</p>
                        <p class="digit">{{ totalActiveDays }}</p>
                    </div>
                    <div class="small-text">
                        <p>Максимальная серия:</p>
                        <p class="digit">{{ maxStreak }}</p>
                    </div>
                </div>
            </div>
            <div class="container-info">
                <div class="days-of-week">
                    <p v-for="day in daysOfWeek" :key="day">{{ day }}</p>
                </div>
                <div class="data"></div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
const countOfSubmissions = ref(123)
const totalActiveDays = ref(104)
const maxStreak = ref(16)
const daysOfWeek = ref(['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'])
const progressData = ref([]);

onMounted(() => {
    generateProgressData(2024, {
        months: 12, // Генерировать данные для всех месяцев
        daysInMonth: 30, // Допустим, фиксированное количество дней
        generateValue: (day, month) => day * month // Произвольная логика генерации значений
    });
    console.log("Билиблоада");
    console.log(progressData.value);
})

// Метод для автоматической генерации данных
function generateProgressData(year, options = {}) {
    const {
        months = 12, // Количество месяцев
        generateDaysInMonth = () => Math.random() < 0.5 ? 30 : 31, // Рандомно выбирает 30 или 31
        generateValue = () => Math.floor(Math.random() * 6), // Генерация значения от 0 до 5
        generateDataCount = () => Math.floor(Math.random() * 6) // Количество объектов от 0 до 5
    } = options;

    // Новый объект года
    const yearData = {
        year: year,
        data: []
    };

    for (let month = 1; month <= months; month++) {
        const daysInMonth = generateDaysInMonth();
        const monthData = {
            month: month,
            daysInMonth: daysInMonth,
            data: []
        };

        for (let day = 1; day <= daysInMonth; day++) {
            const dataCount = generateDataCount(); // Количество объектов в `data`
            const dayData = {
                day: day,
                data: Array.from({ length: dataCount }, () => ({ value: generateValue() })) // Генерация массива
            };

            monthData.data.push(dayData);
        }

        yearData.data.push(monthData);
    }

    // Добавляем сгенерированные данные в общий массив
    progressData.value.push(yearData);
}



</script>

<style scoped>
.main {
    display: flex;
    border-radius: 25px;
    width: 100%;
    height: 250px;
    background-color: #202127;
}

.container {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin: 15px;
    gap: 5px;
}

.text-data {
    display: flex;
    align-items: center;
    flex-direction: row;
    gap: 15px;
}

.small-text,
.text {
    display: flex;
    align-items: center;
    flex-direction: row;
    gap: 5px;
}

.small-text {
    font-size: 15px;
}

.digit {
    font-weight: 500;
}

.info {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
}

.other-info {
    display: flex;
    flex-direction: row;
}


.container-info {
    display: flex;
    flex-direction: row;
}
</style>