<template>
  <v-icon v-if="isMdi" :size="size" :class="['icon', { disabled: props.disabled }]">
    {{ icon }}
  </v-icon>
  <inline-svg v-else :src="icon" :class="['icon inline-svg', { disabled: props.disabled }]"></inline-svg>
  <!-- <img v-else :src="icon" :alt="icon" :class="['icon', { disabled: props.disabled }]" /> -->

</template>

<script setup>
import InlineSvg from 'vue-inline-svg'
import { computed } from 'vue'

const props = defineProps({
  icon: {
    type: String,
    required: true
  },
  color: {
    type: String,
    default: 'white'
  },
  size: {
    type: Number,
    default: 35,
    validator: (v) => v > 0
  },
  disabled: {
    type: Boolean,
    default: false
  }
})
const isMdi = computed(() => {
  const MDI_FIRST_SIGN = 'M'
  return props.icon.slice(0, 1) === MDI_FIRST_SIGN
})

const isSvg = computed(() => {
  const SVG_EXTENSION = '.svg'
  const CHARS_LENGTH = SVG_EXTENSION.length
  return props.icon.substr(props.icon.length - CHARS_LENGTH) === SVG_EXTENSION
})

const sizeStyle = computed(() => props.size + 'px')

const color = computed(() => props.color)
</script>

<style lang="scss" scoped>
.icon {
  width: v-bind(sizeStyle);
  height: v-bind(sizeStyle);

  &:hover {
    cursor: pointer;
  }

  &.disabled {
    pointer-events: none;
  }

  &.inline-svg {
    fill: v-bind(color);

    &.disabled {
      fill: var(--color-icon-inactive);
    }
  }

  &:not(.inline-svg) {
    color: v-bind(color);

    &.disabled {
      color: var(--color-icon-inactive);
    }
  }
}
</style>
