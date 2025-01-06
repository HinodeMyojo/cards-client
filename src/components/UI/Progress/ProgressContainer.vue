<template>
    <div class="main-progress">
        <div class="container">
            <div class="info">
                <div class="text">
                    <h3>{{ countOfSubmissions }}</h3>
                    <p>действий в текущем году</p>
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
                    <div class="year-selector">
                        <v-menu open-on-hover>
                            <template v-slot:activator="{ props }">
                                <v-btn color="primary" v-bind="props">
                                    {{ selectedYear }}
                                </v-btn>
                            </template>
                            <v-list>
                                <v-list-item v-for="(year, index) in availableYears.value" :key="index"
                                    @click="updateYear(year)">
                                    <v-list-item-title>{{ year }}</v-list-item-title>
                                </v-list-item>
                            </v-list>
                        </v-menu>
                    </div>
                </div>
            </div>
            <div class="container-info">
                <div v-if="!isLoading" class="data">
                    <ProgressBlock :data="progressData.data" :colspanData="progressData.colspan" />
                </div>
                <div v-else class="loading-indicator">
                    <v-progress-circular color="green" indeterminate></v-progress-circular>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { getYearStatistic, getAvailableYears } from '@/services/statisticService';
import ProgressBlock from '@/components/UI/progress/ProgressBlock.vue';

// Статистика
const countOfSubmissions = ref(123);
const totalActiveDays = ref(104);
const maxStreak = ref(16);

// Прогресс и доступные года
const progressData = ref([]);
const availableYears = ref([]);
const selectedYear = ref(new Date().getFullYear());
const isLoading = ref(true);

// Загрузка данных
const loadYearStatistic = async (year) => {
    try {
        isLoading.value = true;
        const response = await getYearStatistic(year);
        progressData.value = response.data;
        isLoading.value = false;
    } catch (error) {
        console.error('Ошибка загрузки статистики:', error);
    }
};

const loadAvailableYears = async () => {
    try {
        const response = await getAvailableYears();
        availableYears.value = response.data;
        if (!selectedYear.value && availableYears.value.length > 0) {
            selectedYear.value = availableYears.value.at(-1);
        }
    } catch (error) {
        console.error('Ошибка загрузки списка годов:', error);
    }
};


const updateYear = (year) => {
    selectedYear.value = year;
    loadYearStatistic(year);
};

// Инициализация при монтировании
onMounted(async () => {
    await loadAvailableYears();
    await loadYearStatistic(selectedYear.value);
});
</script>

<style scoped>
.main-progress {
    display: flex;
    border-radius: 25px;
    width: 100%;
    height: 220px;
    background-color: #202127;
}

.container {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 15px;
    gap: 15px;
}

.info {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
}

.bg-primary {
    background-color: #2B2C34 !important;
}

.container-info {
    display: flex;
    width: 100%;
    gap: 10px;
    flex-direction: row;
}

.year-selector {
    display: flex;
    align-items: center;
    justify-content: center;
}

.data {
    width: 100%;
    display: flex;
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

.loading-indicator {
    width: 100%;
    height: 125px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.small-text {
    font-size: 15px;
}

.digit {
    font-weight: 500;
}
</style>
