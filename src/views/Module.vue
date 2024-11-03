<template>
    <div class="module-container">
        <div class="module-sidebar">
            <ProfileSideBar />
        </div>
        <div class="module-main">
            <div class="module-head">
                {{ moduleInfo ? moduleInfo.title : 'Loading...' }}
            </div>
            <div class="module-info">
                <p v-if="moduleInfo">{{ moduleInfo.description }}</p>
                <p v-else>Загрузка</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import ProfileSideBar from '@/components/Main/ProfileSideBar.vue';
import { onMounted, ref } from 'vue';
import { useModuleService } from '@/components/composables/useModuleService';
import { useRoute } from 'vue-router';

const route = useRoute(); // Получаем объект маршрута
const moduleId = route.params.id; // Извлекаем ID модуля из параметров маршрута
const { getModuleById, currentModule } = useModuleService(); // Получаем метод сервиса
const moduleInfo = ref(null); // Инициализируем реактивную переменную

onMounted(async () => {
    try {
        await getModuleById(moduleId); // Ожидаем результат
        moduleInfo.value = currentModule.value; // Получаем данные текущего модуля
    } catch (error) {
        console.error('Error fetching module:', error);
        // Можно добавить обработку ошибок, если нужно
    }
});
</script>

<style scoped>
.module-container {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;
    gap: 30px;
}

.module-sidebar {
    display: flex;
    flex: 0.45;
}

.module-main {
    display: flex;
    flex-direction: column;
    flex: 1;
    gap: 30px;
}

.module-head {
    width: 100%;
    height: 500px;
    background-color: #202127;
    border-radius: 25px;
}

.module-info {
    width: 100%;
    min-height: 100px;
    background-color: #202127;
    border-radius: 25px;
}
</style>