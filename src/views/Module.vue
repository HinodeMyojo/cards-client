<template>
    <div class="module-container">
        <div class="module-sidebar">
            <ProfileSideBar />
        </div>
        <div class="module-main">
            <div class="module-head">
                {{ moduleInfo ? moduleInfo.title : 'Loading...' }}
                <p v-if="moduleInfo">{{ moduleInfo.description }}</p>
                <p v-else>Загрузка</p>
            </div>
            <div class="module-info">
            </div>
        </div>
    </div>
</template>

<script setup>
import ProfileSideBar from '@/components/Main/ProfileSideBar.vue';
import { onMounted, ref, watch } from 'vue';
import { useModuleService } from '@/components/composables/useModuleService';
import { useRoute } from 'vue-router';

const route = useRoute(); // Получаем объект маршрута
let moduleId = route.params.id; // Извлекаем ID модуля из параметров маршрута
const { getModuleById, currentModule } = useModuleService(); // Получаем метод сервиса
const moduleInfo = ref(null); // Инициализируем реактивную переменную

onMounted(async () => {
    await getModuleById(moduleId); // Запрашиваем данные для текущего модуля
    moduleInfo.value = currentModule.value;
});

// Отслеживаем изменения параметров маршрута
watch(
    () => route.params.id,
    async (newId) => {
        moduleId = newId; // Обновляем ID модуля
        await getModuleById(newId); // Получаем новые данные модуля
        moduleInfo.value = currentModule.value;
    }
);
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