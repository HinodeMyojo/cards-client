<template>
    <template v-if="isSvg">
        <InlineSvg :src="iconPath" class="item" :style="{ width: iconWidth, height: iconHeight }" />
    </template>
    <template v-else>
        <img :src="iconPath" class="item" :style="{ width: iconWidth, height: iconHeight }" />
    </template>
</template>

<script>
import InlineSvg from 'vue-inline-svg';

export default {
    components: {
        InlineSvg,
    },
    props: {
        path: {
        type: String,
        required: true,
        },
        width: {
        type: String,
        default: '40px',
        },
        height: {
        type: String,
        default: '40px',
        },
        fill: {
        type: String,
        default: '#D9D9D9',
        },
    },
    computed: {
        iconPath() {
        return require(`@/assets/icons/${this.path}`);
        },
        iconWidth() {
        return this.width;
        },
        iconHeight() {
        return this.height;
        },
        isSvg() {
        return this.path.endsWith('.svg'); // Проверка, является ли файл SVG
        }
    },
}


</script>

<style scoped>s
.item {
    background-color: transparent;
}

svg {
    background-color: transparent;
    fill: #D9D9D9; /* Значение по умолчанию для SVG */
}
</style>
