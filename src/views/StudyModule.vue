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
            <StudyCard :class="{ active: !isActive }" :wordsArray=elements :height="'400px'" :width="'700px'"
                @finish-study="sendStatistic" />
            <div :class="{ active: isActive }">
                Вы молодец!
                {{ percentSuccess }}
            </div>
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
import StudyCard from '@/components/StudyElements/StudyCard.vue';

import { saveStatistic, getStatisticById } from '@/services/statisticService';

const module = ref({})

const elements = ref([])

const route = useRoute()
let moduleId = route.params.id

const sendStatisticModel = ref({})

const isActive = ref(true)

const percentSuccess = ref(0)
const getStatistic = async (id) => {
    var response = await getStatisticById(id)
    percentSuccess.value = response.data.percentSuccess
    console.log(response)
    console.log(response.data)
}

const responseId = ref(0)

const sendStatistic = async (elementsFromStudyCard) => {
    sendStatisticModel.value = {
        moduleId: moduleId,
        elementStatistics: elementsFromStudyCard
    }
    var response = await saveStatistic(sendStatisticModel.value)
    responseId.value = response.data.id
    isActive.value = false
    getStatistic(responseId.value)
}

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
.active {
    display: none;
}

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