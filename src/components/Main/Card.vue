<template>
  <div class="card-main">
    <button class="card-icon-90" @click="prevElement">
      <svg-icon type="mdi" :path="path" :size="40"></svg-icon>
    </button>
    <div class="card-container">
      <div class="card-inner">
        <div
          class="card-face-key"
          :style="{ backgroundColor: backgroundColor }"
          :class="{ active: !state }"
          @click="changeSide"
        >
          {{ keyWord }}
          <p class="helper">Нажмите на карточку, чтобы перевернуть ее</p>
        </div>
        <div
          class="card-face-value"
          :style="{ backgroundColor: backgroundColor }"
          :class="{ active: state }"
          @click="changeSide"
        >
          {{ valueWord }}
          <p class="helper">Нажмите на карточку, чтобы перевернуть ее</p>
        </div>
      </div>
    </div>
    <button class="card-icon" @click="nextElement">
      <svg-icon type="mdi" :path="path" :size="40"></svg-icon>
    </button>
  </div>
</template>

<script setup>
import { ref, toRefs, watch } from 'vue'
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiArrowRightBoldCircleOutline } from '@mdi/js'

// Список ключ:значение

const props = defineProps({
  wordsArray: {
    type: Array,
    required: true
  },
  backgroundColor: {
    type: String,
    default: '#2B2C34'
  }
})

// Реактивные переменные
const state = ref(true)
const path = ref(mdiArrowRightBoldCircleOutline)

const keyWord = ref('')
const valueWord = ref('')

// Инициализация слов из переданного массива
watch(
  () => props.wordsArray,
  (newWordsArray) => {
    if (newWordsArray.length > 0) {
      keyWord.value = newWordsArray[0].key
      valueWord.value = newWordsArray[0].value
    }
  },
  { immediate: true }
)

const currentIndex = ref(0)

// Функция для перехода к следующему элементу
const nextElement = () => {
  if (currentIndex.value < props.wordsArray.length - 1) {
    currentIndex.value += 1 // Переходим к следующему элементу
  }
  keyWord.value = props.wordsArray[currentIndex.value].key
  valueWord.value = props.wordsArray[currentIndex.value].value
}

// Функция для перехода к предыдущему элементу
const prevElement = () => {
  if (currentIndex.value > 0) {
    currentIndex.value -= 1 // Переходим к предыдущему элементу
  }
  keyWord.value = props.wordsArray[currentIndex.value].key
  valueWord.value = props.wordsArray[currentIndex.value].value
}

const { backgroundColor } = toRefs(props)

const changeSide = () => {
  state.value = !state.value
}
</script>

<style scoped>
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
  flex-direction: row;
  background-color: transparent;
  align-items: center;
  gap: 10px;
}
.card-container {
  background-color: transparent;
  min-height: 290px;
  min-width: 550px;

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
  font-size: 13px;
  color: #44454c;
  background-color: transparent;
  position: absolute;
  bottom: 20px;
}
</style>
