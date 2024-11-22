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
                <div class="data">
                    <ProgressBlock :data="progressData.data" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { getYearStatistic } from '@/services/statisticService';
import ProgressBlock from './ProgressBlock.vue';
const countOfSubmissions = ref(123)
const totalActiveDays = ref(104)
const maxStreak = ref(16)
const daysOfWeek = ref(['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'])
const progressData = ref([]);

onMounted(() => {
    getYearStatistic().then((response) => {
        progressData.value = response.data
        console.log(response.data);
    })
    console.log("Билиблоада");
    console.log(progressData.value);
})




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
    height: 100%;
    width: 100%;
    gap: 10px;
    flex-direction: row;
}

.days-of-week {
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: space-between;
}

.data {
    width: 100%;
}
</style>