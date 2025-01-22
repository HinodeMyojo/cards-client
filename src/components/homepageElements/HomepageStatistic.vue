<template>
    <div class="main">
        <button class="mainButton" @click="openModule">
            <h4 :style="timeStyles">{{ time }}</h4>
            <p>{{ localText }}</p>
        </button>
    </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue';
import router from '@/router/router';

// const text = ref("CLR VIA c# главныйоуопркопроро опалрпа");
// const time = ref("6 минут назад");
// const typeTime = ref(1);


const props = defineProps({
    idModule: {
        type: Number
    },
    time: {
        type: String
    },
    typeTime: {
        type: Number
    },
    text: {
        type: String
    }
})

const localText = ref(props.text.length > 15 ? props.text.slice(0, 15) + '...' : props.text);

const openModule = () => {
    router.push(`/module/${props.idModule}`);
}

const timeStyles = computed(() => {
    if (props.typeTime === 1) {
        return { color: '#F84545' };
    } else if (props.typeTime === 2) {
        return { color: '#FBB647' };
    } else if (props.typeTime === 3) {
        return { color: '#04DE00' };
    }
    else if (props.typeTime === 4) {
        return { color: '#45ADF8' };
    }
    else {
        return { color: '#D9D9D9' };
    }
});


</script>

<style scoped>
.mainButton {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 170px;
    height: 70px;
    border-radius: 20px;
    background-color: #25262c;
    transition: 0.3s ease-in-out;
    padding: 10px;
}

.mainButton:hover {
    background-color: #2c2d35;
    transition: 0.3s ease-in-out;
}

.mainButton:active {
    scale: 0.95;
    transition: all 0.2s ease;
}

.main p {
    font-size: 17px;
}

.main h4 {
    font-size: 14px;
    padding-bottom: 5px;
}
</style>