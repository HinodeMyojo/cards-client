<template>
    <div class="card-main">
        <div class="pagination-wrapper">
            <div class="swiper-custom-pagination"></div>
        </div>
        <div class="card-settings" :style="{ height: height, width: width }">
            <swiper :slidesPerView="1" :spaceBetween="30" :keyboard="{
                enabled: true
            }" :pagination="{
                el: '.swiper-custom-pagination',
                type: 'fraction'
            }" :navigation="{
                nextEl: '.swiper-button-custom-next',
                // nextEl: '.swiper-button-custom-yes',
            }" :modules="modules" class="mySwiper">
                <swiper-slide v-for="slide in props.wordsArray" :key="slide.key">
                    <div class="card-container">
                        <div class="card-inner">
                            <div class="card-face-key" tabindex="0" :style="{ backgroundColor: backgroundColor }"
                                :class="{ active: !state }" @click="changeSide" @keydown.enter="changeSide">
                                {{ slide.key }}
                                <p class="helper">Нажмите на карточку, чтобы перевернуть ее</p>
                            </div>
                            <div class="card-face-value" tabindex="0" :style="{ backgroundColor: backgroundColor }"
                                :class="{ active: state }" @click="changeSide" @keydown.enter="changeSide">
                                {{ slide.value }}
                                <p class="helper">Нажмите на карточку, чтобы перевернуть ее</p>
                            </div>
                        </div>
                    </div>
                </swiper-slide>
            </swiper>
        </div>
        <div class="custom-buttons">
            <button class="swiper-button-custom-next" @click="addAnswer(0)">Нет</button>
            <button class="swiper-button-custom-next" @click="addAnswer(1)">Да</button>
        </div>
    </div>
</template>

<script setup>
import { ref, toRefs, watch } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

// Import required modules
import { Keyboard, Pagination, Navigation } from 'swiper/modules'

// Declare the modules array to be used in the swiper
const modules = [Keyboard, Pagination, Navigation]



const props = defineProps({
    wordsArray: {
        type: Array,
        required: true
    },
    backgroundColor: {
        type: String,
        default: '#2B2C34'
    },
    height: {
        type: String,
        default: '290px'
    },
    width: {
        type: String,
        default: '570px'
    }
})

// Реактивные переменные
const state = ref(true)

//Счетчик ответов
const wordsArrayAndEmptyElement = ref([])
const answerCounter = ref([])

// watch(
//     () => props.wordsArray,
//     (newVal) => {
//         wordsArrayAndEmptyElement.value = [
//             ...newVal,
//             {}
//         ];
//     },
//     { immediate: true }
// );

const addAnswer = (answer) => {
    console.log(wordsArrayAndEmptyElement.value)
    answerCounter.value.push(answer)
    console.log(answerCounter.value)
}

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

.pagination-wrapper {
    position: relative;
    bottom: 70px;
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

.custom-buttons {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 350px;
    justify-content: space-between;
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
    gap: 10px;
}

.card-container {
    /* background-color: #202127; */
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