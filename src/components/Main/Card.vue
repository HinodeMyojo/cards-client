<template>
  <div class="card-main">
    <div class="card-icon-90">
      <svg-icon type="mdi" :path="path" :size="40"></svg-icon>
    </div>
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
    <div class="card-icon">
      <svg-icon type="mdi" :path="path" :size="40"></svg-icon>
    </div>
  </div>
</template>

<script setup>
import { ref, toRefs } from 'vue'
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiArrowRightBoldCircleOutline } from '@mdi/js'

const state = ref(true)

const path = ref(mdiArrowRightBoldCircleOutline)

const props = defineProps({
  keyWord: {
    type: String,
    required: true
  },
  valueWord: {
    type: String,
    required: true
  },
  backgroundColor: {
    type: String,
    default: '#2B2C34' // значение по умолчанию
  }
})

const changeSide = () => {
  state.value = !state.value
}

const { keyWord, valueWord, backgroundColor } = toRefs(props)
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
