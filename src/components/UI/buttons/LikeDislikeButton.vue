<template>
    <div class="main-button">
        <button class="like" @click="score(1)" :style="{ backgroundColor: likeColor }">
            <div class="like-icon">
                <svg-icon type="mdi" :path="path"></svg-icon>
                <h3>{{ likeCount }}</h3>
            </div>
        </button>
        <button class="dislike" @click="score(-1)" :style="{ backgroundColor: dislikeColor }">
            <div class="dislike-icon">
                <svg-icon type="mdi" :path="path"></svg-icon>
                <h3>{{ dislikeCount }}</h3>
            </div>
        </button>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiRocketLaunchOutline } from '@mdi/js';

const path = ref(mdiRocketLaunchOutline);

const likeColor = ref('#2B2C34');
const dislikeColor = ref('#2B2C34');

const props = defineProps({
    userId: Number,
    entityId: Number,
    likeType: Number,
    likeCount: Number,
    dislikeCount: Number
})

const initScore = ref(0);

const score = async (value) => {
    initScore.value = initScore.value + value;



    if (initScore.value == 1) {
        dislikeColor.value = '#2B2C34';
        likeColor.value = '#53d351';
    }
    else if (initScore.value == -1) {
        likeColor.value = '#2B2C34';
        dislikeColor.value = '#FF4B4B';
    }
    else if (initScore.value == 0 && value == -1) {
        likeColor.value = '#2B2C34';
        dislikeColor.value = '#FF4B4B';
    }
    else if (initScore.value == 0 && value == 1) {
        dislikeColor.value = '#2B2C34';
        likeColor.value = '#53d351';
    }
    else {
        likeColor.value = '#2B2C34';
        dislikeColor.value = '#2B2C34';
        initScore.value = 0;
    }
    // TODO
}

</script>

<style scoped>
.main-button {
    width: 150px;
    height: 40px;
    display: flex;
    flex-direction: row;
    align-items: center;
    border-radius: 10px;
    overflow: hidden;

}

.like,
.dislike {
    display: flex;
    width: 75px;
    height: 100%;
    justify-content: center;
    align-items: center;
    transition: background-color 0.3s ease, transform 0.2s ease;
    cursor: pointer;
}

.like:hover {
    background-color: #04de008c;
    transform: scale(1.1);
}

.like:hover~.dislike {
    transform: scale(1);
}

.dislike:hover {
    background-color: #FF4B4B;
    transform: scale(1.1);
}

.dislike:hover~.like {
    transform: scale(1);
}

.like::after {
    transform: scaleX(0);
    transition: transform 0.3s ease-in-out;
}

.like:hover::after {
    transform: scaleX(1);
}

.like:active,
.dislike:active {
    transform: scale(0.95);
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}

.like-icon,
.dislike-icon {
    align-items: center;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 5px;
}

.dislike-icon svg {
    transform: rotate(180deg);
}
</style>