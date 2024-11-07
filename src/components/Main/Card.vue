<template>
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
</template>

<script setup>
import { ref, toRefs } from 'vue'

const state = ref(true)

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
.active {
  transform: rotateY(180deg);
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
