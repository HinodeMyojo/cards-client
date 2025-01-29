<template>
  <div class="main">
    <div class="extension">
      <div class="extension-element">
        <div class="move-element">
          <svg-icon type="mdi" :path="pathMdiMenu" :size="20"></svg-icon>
        </div>
        <div class="divider"></div>
        <div class="trash-element" @click="deleteElement">
          <svg-icon type="mdi" :path="pathMdiTrash" :size="20"></svg-icon>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="Id">
        <p>{{ Id }}</p>
      </div>
      <div class="divider-main"></div>
      <div class="Input">
        <div class="inner-input">
          <v-textarea
            v-model="model.key"
            variant="underlined"
            rows="1"
            maxlength="128"
            auto-grow
            counter
          ></v-textarea>
          <p>Термин</p>
        </div>
      </div>
      <div class="divider-main"></div>
      <div class="Input">
        <div class="inner-input">
          <v-textarea
            v-model="model.value"
            variant="underlined"
            rows="1"
            maxlength="128"
            auto-grow
            counter
          ></v-textarea>
          <p>Определение</p>
        </div>
      </div>
      <div class="divider-main"></div>
      <div class="file-uploader">
        <svg-icon type="mdi" :path="pathMdiPaperclip" size="35"></svg-icon>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiTrashCanOutline, mdiMenu, mdiPaperclip } from '@mdi/js'

const pathMdiTrash = ref(mdiTrashCanOutline)
const pathMdiMenu = ref(mdiMenu)
const pathMdiPaperclip = ref(mdiPaperclip)

const model = defineModel()

const props = defineProps({
  Id: Number
})

const emit = defineEmits(['update:modelValue', 'delete-element'])

const deleteElement = () => {
  emit('delete-element', props.Id)
}
</script>

<style scoped>
.main {
  width: 100%;
  height: auto;
  /* Автоматическая высота */
  min-height: 90px;
  /* Минимальная высота, чтобы обеспечить начальный размер */
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.extension {
  width: 100%;
  height: 20px;
  display: flex;
  justify-content: end;
}

.extension-element {
  width: 130px;
  height: 100%;
  background-color: #2b2c34;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
}

.container {
  width: 100%;
  min-height: 65px;
  background-color: #2b2c34;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  display: flex;
  flex-direction: row;
}

.Id {
  width: 30px;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: large;
}

.divider {
  width: 1px;
  min-height: 100%;
  background-color: #3b4047;
}

.divider-main {
  width: 1px;
  min-height: 65px;
  background-color: #3b4047;
}

.Input {
  width: 45%;
}

.Input p {
  font-size: small;
  margin-top: -17px;
}

.inner-input {
  margin-left: 5px;
  margin-right: 5px;
}

.file-uploader {
  display: flex;
  width: 40px;
  height: auto;
  align-items: center;
  justify-content: center;
}

.move-element,
.trash-element {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  width: 50%;
}

.trash-element :hover {
  transition: color 0.3s;
  color: red;
}
</style>
