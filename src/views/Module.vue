<template>
    <div class="module-container">
        <div class="module-sidebar">
            <ProfileSideBar />
        </div>
        <div class="module-main">
            <div class="module-head">
                <div class="module-title">
                    <p>{{ moduleInfo.title }}</p>
                    <div class="module-button">
                        <Button text="Редактировать" :onClick="editModule"></Button>
                        <Button text="Удалить" :onClick="deleteModule"></Button>
                    </div>
                </div>
                <hr />
                <div class="module-card">
                    <Card></Card>
                </div>
                <div class="module-buttons"></div>
                
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
import Button from '@/components/UI/Button.vue';
import Card from '@/components/Main/Card.vue';

const route = useRoute(); // Получаем объект маршрута
let moduleId = route.params.id; // Извлекаем ID модуля из параметров маршрута
const { getModuleById, currentModule } = useModuleService(); // Получаем метод сервиса
const moduleInfo = ref(""); // Инициализируем реактивную переменную

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
    /* height: 100%; */
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
    padding: 10px;
    padding-left: 20px;
    padding-right: 20px;
    display: flex;
    flex-direction: column;
}

.module-info {
    width: 100%;
    min-height: 100px;
    background-color: #202127;
    border-radius: 25px;
}
.module-title{
    height: 70px;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: #202127;
    justify-content: space-between;
}
.module-button{
    display: flex;
    background-color: #202127;
    flex-direction: row;
    gap: 10px;
}

.module-title p{
    background-color: #202127;
    font-size: 28px;
}

.module-card {
    /* background-color: #2B2C34; */
}

hr{
    height: 4px;
    background-color: #3F3F3F;
    border: none;
}

</style>