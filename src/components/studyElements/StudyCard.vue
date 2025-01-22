<template>
  <div class="card-main">
    <div class="card-settings" :style="{ height, width }">
      <div
        class="card-container"
        v-for="slide in props.wordsArray"
        :key="slide.key"
        :style="{ transform: `translateX(-${currentIndex * 105}%)` }"
      >
        <div class="card-inner">
          <div
            class="card-face-key"
            tabindex="0"
            :style="{ backgroundColor }"
            :class="{ active: !state }"
            @click="changeSide"
            aria-label="Card front"
          >
            {{ slide.key }}
            <p class="helper">Нажмите на карточку, чтобы перевернуть ее</p>
          </div>
          <div
            class="card-face-value"
            tabindex="0"
            :style="{ backgroundColor }"
            :class="{ active: state }"
            @click="changeSide"
            aria-label="Card back"
          >
            {{ slide.value }}
            <p class="helper">Нажмите на карточку, чтобы перевернуть ее</p>
          </div>
        </div>
      </div>
    </div>
    <div class="custom-buttons">
      <BaseButton
        @click="addAnswer(false)"
        :label="`Нет`"
        :size="`medium`"
        :color="`#272A2F`"
        :border-color="`#f94144`"
        :width="`100px`"
      />
      <BaseButton
        @click="addAnswer(true)"
        :label="`Да`"
        :size="`medium`"
        :color="`#272A2F`"
        :border-color="`#90be6d`"
        :width="`100px`"
      />
    </div>
  </div>
</template>

<script setup>
  import { ref, toRefs, defineExpose } from 'vue';
  import BaseButton from '../UI/buttons/BaseButton.vue';

  const emit = defineEmits(['finish-study']);

  const props = defineProps({
    wordsArray: {
      type: Array,
      required: true,
    },
    backgroundColor: {
      type: String,
      default: '#2B2C34',
    },
    height: {
      type: String,
      default: '290px',
    },
    width: {
      type: String,
      default: '570px',
    },
  });

  const state = ref(true);

  const currentIndex = ref(0);

  const elementAnswerData = ref([]);

  const addAnswer = (answer) => {
    const elementId = props.wordsArray[currentIndex.value].id;

    console.log('Ответ:', answer);
    console.log('ID элемента:', elementId);
    elementAnswerData.value.push({
      elementId,
      answer,
    });
    if (currentIndex.value !== props.wordsArray.length - 1) {
      currentIndex.value++;
    } else {
      emit('finish-study', elementAnswerData.value);
      return;
    }
  };

  const { backgroundColor } = toRefs(props);

  const changeSide = () => {
    state.value = !state.value;
  };

  const reset = () => {
    currentIndex.value = 0;
    elementAnswerData.value = [];
  };

  defineExpose({
    reset,
  });
</script>

<style scoped>
  .swiper {
    width: 100%;
    height: 100%;
    background-color: transparent;
  }

  .swiper-slide {
    text-align: center;
    font-size: 18px;
    background-color: transparent;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .card-settings {
    display: flex;
    overflow: hidden;
  }

  .pagination-wrapper {
    position: relative;
    bottom: 70px;
  }

  .swiper-button-custom-next {
    cursor: pointer;
    font-size: 16px;
    font-weight: bold;
    color: #fff;
    padding: 10px 30px;
    border-radius: 15px;
    transition:
      transform 0.3s ease,
      box-shadow 0.3s ease;
  }

  .swiper-button-custom-next:active {
    transform: scale(0.9);
  }

  .button-no .swiper-button-custom-next {
    background-color: #2b2c34;
    border: 2px solid #f84545;
  }

  .button-yes .swiper-button-custom-next {
    background-color: #2b2c34;
    border: 2px solid #3f8139;
  }

  .custom-buttons {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 450px;
    justify-content: space-around;
    gap: 15px;
  }

  .button-no,
  .button-yes {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100px;
    height: 50px;
  }

  .card-icon,
  .card-icon-90 {
    background-color: transparent;
  }

  .card-icon-90 {
    transform: rotate(180deg);
  }

  .active {
    transform: rotateY(180deg);
  }

  svg {
    background-color: transparent;
    cursor: pointer;
  }

  .card-main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 30px;
    background-color: transparent;
  }

  .card-settings {
    display: flex;
    flex-direction: row;
    background-color: transparent;
    align-items: center;
    gap: 5%;
  }

  .card-container {
    /* background-color: #202127; */
    transition: transform 0.3s ease;
    min-height: 100%;
    min-width: 100%;
    display: flex;
  }

  .card-inner {
    position: relative;
    flex: 1;
    cursor: pointer;
    user-select: none;
    background-color: transparent;
    transform-style: preserve-3d;
  }

  .card-face-key,
  .card-face-value {
    position: absolute;
    display: flex;
    font-size: 28px;
    align-items: center;
    justify-content: center;
    transition: transform 0.6s;
    width: 100%;
    border-radius: 40px;
    height: 100%;
    backface-visibility: hidden;
  }

  .helper {
    align-self: center;
    font-size: 16px;
    color: #64656e;
    background-color: transparent;
    position: absolute;
    bottom: 50px;
  }
</style>
