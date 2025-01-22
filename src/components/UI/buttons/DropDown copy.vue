<!-- <template>
    <div class="dropdown">
        <button :class="buttonClass" class="base" :style="buttonStyle" @click="handleClick" :disabled="disabled">
            <slot>{{ label }}</slot>
            <svg-icon type="mdi" :path="path"></svg-icon>
        </button>
        <div class="dropdown-content">
            <a href="#">Link 1</a>
            <a href="#">Link 2</a>
            <a href="#">Link 3</a>
        </div>
    </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiChevronDown } from '@mdi/js';

const path = ref(mdiChevronDown);

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
    width: {
        type: String,
        default: '120px',
    },
    height: {
        type: String,
        default: '30px',
    },
    borderColor: {
        type: String,
        default: 'none',
    },
    borderWidth: {
        type: String,
        default: '1px',
    },
    hoverColor: {
        type: String,
        default: 'transparent',
    },

});

const emit = defineEmits(['click']);

const buttonClass = computed(() => {
    return `btn ${props.color} ${props.size}`;
});

const buttonStyle = computed(() => {
    return {
        backgroundColor: props.color === 'primary' ? '#202127' : props.color,
        width: props.width,
        height: props.height,
        borderColor: props.borderColor,
        borderWidth: props.borderWidth,
        '--hover-border-color': props.hoverColor,
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
    border-radius: 10px;
    display: flex;
    align-items: center;
    position: relative;
    justify-content: space-around;
    font-size: 16px;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
    border: 1px solid transparent;
    transition: 0.3s ease;
}

/* The container <div> - needed to position the dropdown content */
.dropdown {
    position: relative;
    display: inline-block;
}

/* Dropdown Content (Hidden by Default) */
.dropdown-content {
    display: none;
    position: absolute;
    background-color: #f9f9f9;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    z-index: 1;
}

/* Links inside the dropdown */
.dropdown-content a {
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
}

/* Change color of dropdown links on hover */
.dropdown-content a:hover {
    background-color: #f1f1f1
}

/* Show the dropdown menu on hover */
.dropdown:hover .dropdown-content {
    display: block;
}

/* Hover Effect */
.btn:hover {
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
    border: 1px solid var(--hover-border-color);
    transition: 0.3s ease;
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
</style> -->
