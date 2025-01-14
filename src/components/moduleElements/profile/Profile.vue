<template>
    <div class="profile-container">
        <div v-if="canViewProfile" class="profile-inner">
            <div class="statistic-main">
                <ProgressContainer :user-id="userId" />
            </div>
            <div class="last-activity-main">
                <div class="last-activity">
                    <h3>Последние действия</h3>
                    <div class="last-activity-items">
                        <div v-for="module in lastActivityModules.activityList" :key="module"
                            @click="goToModule(module.id)" class="last-activity-modules">
                            <div class="last-activity-module">{{ module.name }}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="trend-main">
                Пока тут ничего нет. Но это пока!
            </div>
        </div>
        <div v-else class="profile-inner">
            <div class="lock-profile">
                <svg-icon type="mdi" :size="100" :path="path"></svg-icon>
                <h3>Пользователь закрыл профиль для общего доступа</h3>
            </div>
        </div>
    </div>
</template>

<script setup>
import ProgressContainer from '@/components/UI/progress/ProgressContainer.vue';
import { onMounted, ref } from 'vue';
import { getLastActivity } from '@/services/statisticService';
import router from '@/router/router.js';
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiLockOffOutline } from '@mdi/js';

const lastActivityModules = ref([]);

const path = ref(mdiLockOffOutline);

// Определяем пропсы для определения принадлежности профиля - зарегестрированному пользователю
const props = defineProps({
    isUserProfile: {
        type: Boolean,
        default: false
    },
    canViewProfile: {
        type: Boolean,
        default: false
    },
    userId: {
        type: Number
    },
    isEmailConfirmed: {
        type: Boolean,
        default: false
    }
})

onMounted(() => {
    getLastActivity().then((res) => {
        lastActivityModules.value = res.data;
    });
})

const goToModule = (moduleId) => {
    router.push(`/module/${moduleId}`)
}

</script>

<style scoped>
.profile-container,
.profile-inner {
    display: flex;
    flex-direction: column;
    gap: 30px;
}

.profile-main {
    display: flex;
    flex: 1;
}

.search-main,
.statistic-main,
.last-activity-main,
.trend-main,
.lock-profile {
    border-radius: 15px;
}

.lock-profile {
    width: 100%;
    height: 400px;
    background-color: #202127;
    display: flex;
    padding: 15px;
    gap: 15px;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}

.lock-profile h3 {
    font-weight: 700;
}

.search-main {
    width: 100%;
    height: 140px;
    background-color: #202127;
    padding: 15px;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.last-activity {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.last-activity-main {
    width: 100%;
    height: 140px;
    background-color: #202127;
    padding: 15px;
}

.last-activity-items {
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-between;
}

.last-activity-modules {
    cursor: pointer;
    background-color: #33353E;
    border-radius: 25px;
    width: 230px;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.last-activity-modules:hover {
    transition: all 0.3s ease-in-out;
    background-color: #585a69;
}


.search-main button {
    display: flex;
    justify-content: end;
}

.search-main button:hover {
    transition: all 0.3s ease-in-out;
    color: white;
}


.SearchAutocomplete input {

    width: 100%;
}

.trend-main {
    width: 100%;
    height: 280px;
    background-color: #202127;
    display: flex;
    align-items: center;
    justify-content: center;
}

h3 {
    font-weight: 300;
}
</style>