<template>
<img :src="iconPath" :style="{width: iconWidth, height: iconHeight}" class="item"/>
</template>

<script>
import InlineSvg from 'vue-inline-svg';
export default {
    components: {
        InlineSvg,
    },
    props:{
        path: {
            type: String,
            required: true
        },
        width:{
            type: String,
            default: '40px'
        },
        height:{
            type: String,
            default: '40px'
        }
    },
    computed: {
        iconPath: function () {
            return require(`@/assets/icons/${this.path}`);
        },
        // Переделать
        iconWidth() {
            return this.width;
        },
        // Переделать
        iconHeight() {
            return this.height;
        }
    }
}

</script>

<style scoped>
.item{
    background-color: transparent;
}
</style>
