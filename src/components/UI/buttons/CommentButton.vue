<template>
    <div class="main-comments-button">
        <button class="comments-button" @click="openComments">
            <svg-icon type="mdi" class="icon" :path="path"></svg-icon>
            <h3>{{ commentCount }}</h3>
        </button>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiCommentProcessingOutline } from '@mdi/js';
import router from '@/router/router';

const path = ref(mdiCommentProcessingOutline);

const openComments = () => {
    router.push(props.link);
}

const props = defineProps({
    commentCount: Number,
    link: String
})
</script>

<style scoped>
.comments-button {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 5px;
}

h3,
svg {
    color: #d9d9d9;
}

.comments-button:active {
    scale: 0.95;
    transition: all 0.2s ease;
}


/* Add styles here */
</style>