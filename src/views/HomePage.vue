<template>
    <div class="main-homepage">
        <div v-if="isAuth" class="main-block">
            <div class="radius">
                <h3 class="gradient-border-mask-1">Ваша статистика</h3>
            </div>
            <div class="homepage-statistic">
                <div class="left-statistic-block">
                    <div class="block-items">
                        <p>Нужно пройти для закрепления:</p>
                        <div class="items">
                            <div v-for="item in currentStatisticContainer" :key="item">
                                <HomepageStatistic :idModule="item.idModule" :time="item.time" :typeTime="item.typeTime"
                                    :text="item.text" />
                            </div>
                        </div>
                    </div>
                    <div class="block-items">
                        <p>Успешно пройденные модули:</p>
                        <div class="items">
                            <div v-for="item in oldStatisticContainer" :key="item">
                                <HomepageStatistic :idModule="item.idModule" :time="item.time" :typeTime="item.typeTime"
                                    :text="item.text" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="right-statistic-block">
                    <div class="statistic-chart">
                        <p>График активности за сегодня:</p>
                        <div class="chart">
                            <HomepageChart :is-loaded="true" :series="series" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="main-block">
            <div class="radius">
                <h3 class="gradient-border-mask-1">Модули других пользователей</h3>
            </div>
            <div class="homepage-modules">
                <div class="drop-down">
                    <DropDown :data="listOfvalueForDrowDown" />
                </div>
            </div>
        </div>
        <div class="main-block">
            <div class="radius">
                <h3 class="gradient-border-mask-1">Новости</h3>
            </div>
        </div>

        <!-- <HomepageModule /> -->
        <!-- <HomepageNews /> -->
        <!-- <HomepageChart /> -->
        <!-- <DropDown /> -->
        <!-- <HomePage /> -->
    </div>
</template>

<script setup>
import { ref } from 'vue';
import HomepageModule from '@/components/homepageElements/HomepageModule.vue'
import HomepageStatistic from '@/components/homepageElements/HomepageStatistic.vue'
import HomepageChart from '@/components/homepageElements/HomepageChart.vue'
import DropDown from '@/components/UI/buttons/DropDown.vue'

const isAuth = ref(true);

// Для данных статистики (временно заполним)
const currentStatisticContainer = ref([
    {
        idModule: 1,
        time: "сейчас",
        typeTime: 1,
        text: "название модуля"
    },
    {
        idModule: 2,
        time: "через 3 часа",
        typeTime: 2,
        text: "название модуля"
    },
    {
        idModule: 3,
        time: "Завтра",
        typeTime: 3,
        text: "название модуля"
    }
]);

const oldStatisticContainer = ref([
    {
        idModule: 1,
        time: "6 минут назад",
        typeTime: 4,
        text: "название модуля"
    },
    {
        idModule: 1,
        time: "2 часа назад",
        typeTime: 4,
        text: "апкурикетприваркптами"
    },
    {
        idModule: 3,
        time: "20 часов назад",
        typeTime: 4,
        text: "Бпкаолппоалдпапаппакуап"
    }
]);


// Для графика активности: (TODO запрос)
const series = ref([0, 1, 0, 2])

// За два дня (пока последние три)
// [{
//  idModule: 1, 
//  time: "через 3 минуты", 
//  typeTime: 1, (1 - сейчас (просрочк), 2 - 3 часа, 3 - завтра, 4 - пройдено)
//  text: "название модуля" 
// }]

// Для дропдауна TODO фильтры сортировки
const listOfvalueForDrowDown = ref([
    { title: "Популярные", action: "zavtra" },
    { title: "Новые", action: "segoda" },
])


</script>

<style scoped>
p {
    font-weight: 500;
}

.main-homepage {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.main-block {
    display: flex;
    flex-direction: column;
    gap: 10px;
}


.main-homepage-separator {
    position: relative;
    border: 1px solid #D9D9D9;
    border-radius: 20px;
}

.drop-down {
    display: flex;
    align-items: baseline;
}

.homepage-statistic {
    display: flex;
    flex-direction: row;
    max-height: 300px;
}

.left-statistic-block {
    display: flex;
    flex-direction: column;
    flex: 2;
    gap: 15px;
}

.right-statistic-block {
    display: flex;
    flex: 1;
}

.block-items {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.items {
    display: flex;
    flex-direction: row;
    gap: 15px;
}

.statistic-chart {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
}

.chart {
    height: 100%;
}

.radius {
    border-radius: 15px;
    overflow: hidden;
}

.gradient-border-bg {
    border: 15px solid;
    border-image: linear-gradient(45deg, purple, orange) 1;
    padding: 0.5px;
}

.gradient-border-mask {
    display: flow-root;
    position: relative;
    padding: 0.5rem;
}

.gradient-border-mask::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 15px;
    border: 3px solid transparent;
    background: linear-gradient(45deg, purple, orange) border-box;
    -webkit-mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: destination-out;
    mask-composite: exclude;
}

.gradient-border-mask-1 {
    display: flow-root;
    position: relative;
    padding: 0.45rem;
}

.gradient-border-mask-1::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 15px;
    border: 2px solid transparent;
    background: linear-gradient(45deg, rgb(185, 185, 185), rgba(255, 166, 0, 0)) border-box;
    -webkit-mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: destination-out;
    mask-composite: exclude;
}


.main-homepage-separator-text {
    padding: 10px;
    font-size: 18px;
}
</style>