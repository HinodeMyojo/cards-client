<template>
  <div class="card">
    <p v-if="state" class="key" @click="increment">
        {{ keyWord }}
    </p>
    <p v-else class="value" @click="decrement">
        {{ valueWord }}
    </p>
  </div>
</template>

<script setup>
import { ref, toRefs } from 'vue';

const state = ref(0);

const props = defineProps({
    keyWord: {
        type: String,
        required: true
    },
    valueWord: {
        type: String,
        required: true
    },
})

const { keyWord, valueWord } = toRefs(props);


const increment = () => {
    state.value ++ 
}
const decrement = () => {
    state.value --
}

</script>

<style scoped>
.card{
    display: flex;
    align-self: center;
}
p{
    font-size: 28px;
}
</style>