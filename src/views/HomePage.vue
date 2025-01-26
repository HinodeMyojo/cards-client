<template>
    <div class="main-homepage">
        <div v-if="isAuth" class="main-block">
            <div class="radius">
                <h3 class="gradient-border-mask-1">Ваша статистика ✨</h3>
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
                        <p>Пройденные модули:</p>
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
        <div v-else class="main-block">
            <h2>Изучайте, создавайте, улучшайте навыки!</h2>
            <HomepageSlider />
            <BaseButton @click="router.push('/register')" :border-color="'#D459FF'" :color="'#272A2F'"
                :label="'Зарегистрироваться'" :size="'medium'" />
        </div>
        <div class="main-block">
            <div class="radius">
                <h3 class="gradient-border-mask-1">Модули других пользователей 💫</h3>
            </div>
            <div class="homepage-modules">
                <div class="drop-down">
                    <DropDown :data="listOfvalueForDrowDown" />
                    <DropDown :data="listOfvalueForDrowDownExtension" />
                </div>
                <div class="modules">
                    <div v-for="item in listOfVisibleModules" :key="item.id">
                    <HomepageModule
                        :dislikeCount="item.dislikeCount"
                        :likeCount="item.likeCount"
                        :body="item.title"
                        :tags="['Пока мокаем', 'Vue', 'Frontend']"
                        :userId="item.creatorId"
                        :userName="item.creatorUserName"
                        :moduleId="item.id"
                        :title="item.title"
                        :commentCount="item.commentCount"
                        :avatar ="item.avatar"
                    />
                    </div>
                    <div v-if="isModulesExpanded" class="expanded-modules">
                        <div class="modules">
                            <div v-for="item in listOfShowMoreModules" :key="item">
                                <HomepageModule :dislikeCount="item.dislikeCount" :likeCount="item.likeCount"
                                    :body="item.description" :tags="['Vue', 'Frontend']" :userId="item.creatorId" :userName="item.creatorUserName"
                                    :moduleId="item.id" :title="item.title" :commentCount="item.commentCount" :avatar ="item.avatar" />
                            </div>
                        </div>
                        <BaseButton :style="{ width: '100%' }" :label="'Скрыть'" :size="'medium'" @click="isModulesExpanded = false" />
                    </div>
                </div>
                <div v-if="!isModulesExpanded && listOfShowMoreModules.length > 0" >
                        <BaseButton :label="'Показать ещё'" :size="'medium'" @click="isModulesExpanded = true" />
                </div>
            </div>
            <!-- <div class="main-block">
                <div class="radius">
                    <h3 class="gradient-border-mask-1">Новости 🛸</h3>
                </div>
            </div> -->
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import HomepageModule from '@/components/homepageElements/HomepageModule.vue'
import HomepageStatistic from '@/components/homepageElements/HomepageStatistic.vue'
import HomepageChart from '@/components/homepageElements/HomepageChart.vue'
import DropDown from '@/components/UI/buttons/DropDown.vue'
import BaseButton from '@/components/UI/buttons/BaseButton.vue';
import HomepageSlider from '@/components/homepageElements/HomepageSlider.vue';
import router from '@/router/router';
import { useAuthStore } from '@/stores/authStore';
import { moduleService } from '@/services/moduleService';

const authStore = useAuthStore();
const isAuth = authStore.isUserLogin;
console.log(isAuth);

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
const series = ref([4, 1, 6, 2])

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

const listOfvalueForDrowDownExtension = ref([
    { title: "За день", action: "zavtra" },
    { title: "За неделю", action: "segoda" },
    { title: "За месяц", action: "segoda" },
    { title: "За год", action: "segoda" },
    { title: "За все время", action: "segoda" },
])


// Для модулей
//#region 
const listOfModules = ref([]);

// Флаг для отображения всех модулей
const isModulesExpanded = ref(false);

const listOfVisibleModules = computed(() => {
  return listOfModules.value.slice(0, 4);
});

const listOfShowMoreModules = computed(() => {
  return listOfModules.value.slice(4);
});

const getListModules = async () => {
  try {
    const response = await moduleService.getModules(true, true, 5);
    listOfModules.value = response.data;
  } catch (error) {
    console.error('Ошибка при загрузке модулей:', error);
  }
};

const expandModules = () => {
  isModulesExpanded.value = true;
};


onMounted(async () => {
    await getListModules();
});

</script>

<style scoped>
p {
    font-weight: 500;
}

.modules {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 20px;
}

.expanded-modules {
    width: 100%;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    gap: 20px;
}

.main-homepage {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;
    scroll-behavior: smooth;
}

.main-block {
    display: flex;
    flex-direction: column;
    gap: 15px;
}


.main-homepage-separator {
    position: relative;
    border: 1px solid #D9D9D9;
    border-radius: 20px;
}

.homepage-modules {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.drop-down {
    display: flex;
    align-items: baseline;
    gap: 10px
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