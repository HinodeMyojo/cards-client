<template>
    <div class="main-link">
        <button class="link-button" @click="copyLinkToClipBoard"><svg-icon type="mdi" :path="path"></svg-icon></button>
    </div>
</template>

<script setup>
import { ref } from 'vue';

import SvgIcon from '@jamescoyle/vue-icon';
import { mdiLinkVariant } from '@mdi/js';

const path = ref(mdiLinkVariant);

const prefixLink = ref(window.location.origin);

const props = defineProps({
    link: String
})

const copyLinkToClipBoard = () => {
    navigator.clipboard.writeText(`${prefixLink.value}/${props.link}`);
}

</script>

<style scoped>
.link-button:active {
    scale: 0.95;
    transition: all 0.2s ease;
}
</style>