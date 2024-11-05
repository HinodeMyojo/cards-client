<template>
  <div>
    <button @click="handleClick">
        {{ text }}
    </button>
  </div>
</template>

<script setup>
import { defineProps, toRefs } from 'vue';

const props = defineProps({
    text: {
        type: String,
        required: true
    },
    onClick: {
    type: Function,
    required: true,
  },
})

const { text, onClick } = toRefs(props);

const handleClick =  (event) => {
    onClick.value(event);
}

</script>

<style scoped>


button {
  font-size: 16px;
  font-weight: 500;
}

button {
  background-color: #272A2F;
  border: 1px solid #3B4047;
  padding: 10px 20px;
  border-radius: 10px;
  cursor: pointer;
  transition: 0.4s ease;
  box-sizing: border-box;
}

button:hover {
  border: 1px solid #D459FF;
}
</style>