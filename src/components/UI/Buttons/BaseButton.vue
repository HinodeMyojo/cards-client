<template>
    <button :class="buttonClass" :style="buttonStyle" @click="handleClick" :disabled="disabled">
        <slot>{{ label }}</slot>
    </button>
</template>

<script setup>
import { computed } from 'vue';
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
    label: {
        type: String,
        default: 'Click me',
    },
    color: {
        type: String,
        default: 'primary',
    },
    size: {
        type: String,
        default: 'small',
    },
    disabled: {
        type: Boolean,
        default: false,
    },
});

const emit = defineEmits(['click']);

const buttonClass = computed(() => {
    return `btn ${props.color} ${props.size}`;
});

const buttonStyle = computed(() => {
    return {
        backgroundColor: props.color === 'primary' ? '#42b983' : props.color,
    };
});

const handleClick = (event) => {
    if (!props.disabled) {
        emit('click', event);
    }
};
</script>

<style scoped>
.btn {
    padding: 10px 20px;
    /* Добавлена обводка */
    border-radius: 15px;
    font-size: 16px;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
    /* box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); */
    border: 1px solid transparent;
}

/* Hover Effect */
.btn:hover {
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
    transform: translateY(-2px);
    border: 1px solid #D459FF;
}

/* Active Effect */
.btn:active {
    transform: scale(0.98);
    background-color: darken(#42b983, 10%);
}

/* Disabled Style */
.btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    box-shadow: none;
}

/* Ripple Effect */
.btn::after {
    content: '';
    position: absolute;
    border-radius: 50%;
    transform: scale(0);
    background-color: rgba(255, 255, 255, 0.5);
    transition: transform 0.5s, opacity 0.8s;
}

.btn:active::after {
    width: 200%;
    padding-top: 200%;
    transform: scale(1);
    opacity: 0;
    transition: transform 0s;
}

/* Color Variants */
.primary {
    background-color: #42b983;
    color: white;
}

.secondary {
    background-color: #ccc;
    color: black;
}

/* Size Variants */
.medium {
    font-size: 16px;
}

.large {
    font-size: 20px;
}

.small {
    font-size: 12px;
}
</style>
