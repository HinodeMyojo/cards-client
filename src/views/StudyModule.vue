<template>
    <div class="main">
        <div class="header">
            <div class="header-main">
                <h3>{{ module.title }}</h3>
                <BaseButton :label="`Параметры`" :color="`#272a2f`" :size="`medium`" />
            </div>
            <hr>
        </div>
        <div class="card">
            <StudyCard :wordsArray=elements :height="'400px'" :width="'700px'" />
        </div>
        <div></div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useModuleService } from '@/components/composables/useModuleService'
const { getModuleById, currentModule } = useModuleService()
import BaseButton from '@/components/UI/Buttons/BaseButton.vue';
import StudyCard from '@/components/ModuleElements/StudyCard.vue';

const module = ref({})

const elements = ref([])

const route = useRoute()
let moduleId = route.params.id

const getModule = async (id) => {
    await getModuleById(id)
    module.value = currentModule.value
    elements.value = currentModule.value.elements
}

onMounted(() => {
    getModule(moduleId)
})

</script>

<style scoped>
.main {
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;
    gap: 30px;
}

.header-main {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}

.header {
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;
}

hr {
    height: 2px;
    background-color: #272A2F;
    border: none;
}

h3 {
    font-weight: 300;
}

/* Add styles here */
</style>