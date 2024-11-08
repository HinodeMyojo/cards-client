<template>
  <div class="card-main">
    <div class="card-settings">
      <swiper :slidesPerView="1" :spaceBetween="30" :keyboard="{
        enabled: true
      }" :pagination="{
        clickable: true,
        type: 'fraction'
      }" :navigation="true" :modules="modules" class="mySwiper">
        <swiper-slide v-for="slide in props.wordsArray" :key="slide.key">
          <div class="card-container">
            <div class="card-inner">
              <div class="card-face-key" :style="{ backgroundColor: backgroundColor }" :class="{ active: !state }"
                @click="changeSide">
                {{ slide.key }}
                <p class="helper">Нажмите на карточку, чтобы перевернуть ее</p>
              </div>
              <div class="card-face-value" :style="{ backgroundColor: backgroundColor }" :class="{ active: state }"
                @click="changeSide">
                {{ slide.value }}
                <p class="helper">Нажмите на карточку, чтобы перевернуть ее</p>
              </div>
            </div>
          </div>
        </swiper-slide>
      </swiper>
    </div>
    <!-- <button class="card-icon-90" @click="prevElement">
      <svg-icon type="mdi" :path="path" :size="40"></svg-icon>
    </button>
    <button class="card-icon" @click="nextElement">
      <svg-icon type="mdi" :path="path" :size="40"></svg-icon>
    </button> -->
  </div>
</template>

<script setup>
import { ref, toRefs, watch } from 'vue'
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiArrowRightBoldCircleOutline } from '@mdi/js'
import { Swiper, SwiperSlide } from 'swiper/vue'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

// Import required modules
import { Keyboard, Pagination, Navigation } from 'swiper/modules'

// Declare the modules array to be used in the swiper
const modules = [Keyboard, Pagination, Navigation]
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

const { backgroundColor } = toRefs(props)

const changeSide = () => {
  state.value = !state.value
}
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

  /* Center slide text vertically */
  display: flex;
  justify-content: center;
  align-items: center;
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
  background-color: transparent;
}

.card-settings {
  display: flex;
  flex-direction: row;
  background-color: transparent;
  align-items: center;
  gap: 10px;
  height: 290px;
  width: 550px;
}

.card-container {
  background-color: #202127;
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
  font-size: 16px;
  color: #64656e;
  background-color: transparent;
  position: absolute;
  bottom: 50px;
}
</style>
