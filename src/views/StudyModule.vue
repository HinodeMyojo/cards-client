<template>
  <div class="main">
    <div class="header">
      <div class="header-main">
        <h3>{{ module.title }}</h3>
        <BaseButton :label="`Параметры`" :color="`#272a2f`" :size="`medium`" />
      </div>
      <hr />
    </div>
    <div class="card">
      <StudyCard
        ref="studyCard"
        :class="{ active: !isActive }"
        :wordsArray="elements"
        :height="'400px'"
        :width="'700px'"
        @finish-study="sendStatistic"
      />
      <Result
        ref="result"
        :class="{ active: isActive }"
        :percentSuccess="percentSuccess"
        @restart-study="restartStudy"
        @finish-study="finishStudy"
      />
    </div>
    <div></div>
  </div>
</template>

<script setup>
  import { onMounted, ref } from 'vue';
  import { useRoute } from 'vue-router';
  import { useModuleService } from '@/components/composables/useModuleService';
  const { getModuleById, currentModule } = useModuleService();
  import BaseButton from '@/components/UI/buttons/BaseButton.vue';
  import StudyCard from '@/components/studyElements/StudyCard.vue';
  import router from '@/router/router';

  import { saveStatistic, getStatisticById } from '@/services/statisticService';
  import Result from '@/components/studyElements/Result.vue';

  const module = ref({});

  const elements = ref([]);

  const route = useRoute();
  let moduleId = route.params.id;

  const sendStatisticModel = ref({});

  const isActive = ref(true);

  const percentSuccess = ref(0);
  const getStatistic = async (id) => {
    var response = await getStatisticById(id);
    percentSuccess.value = response.data.percentSuccess;
  };

  const responseId = ref(0);

  const sendStatistic = async (elementsFromStudyCard) => {
    sendStatisticModel.value = {
      moduleId: moduleId,
      elementStatistics: elementsFromStudyCard,
    };
    var response = await saveStatistic(sendStatisticModel.value);
    responseId.value = response.data.id;
    isActive.value = false;
    getStatistic(responseId.value);
  };

  const getModule = async (id) => {
    await getModuleById(id);
    module.value = currentModule.value;
    elements.value = currentModule.value.elements;
  };

  const studyCard = ref(null); // Ссылка на компонент StudyCard
  const result = ref(null); // Ссылка на компонент Result
  const restartStudy = () => {
    isActive.value = true;
    studyCard.value.reset();
    result.value.reset();
  };
  const finishStudy = () => {
    router.push('/module/' + moduleId);
  };

  onMounted(() => {
    getModule(moduleId);
  });
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
    gap: 60px;
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
    background-color: #272a2f;
    border: none;
  }

  h3 {
    font-weight: 300;
  }

  /* Add styles here */
</style>
