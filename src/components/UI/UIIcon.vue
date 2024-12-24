<template>
  <component
    v-if="isSvg"
    :is="icon"
    :class="['icon inline-svg', { disabled: props.disabled }]"
  />
  <img
    v-else
    :src="icon"
    :alt="icon"
    :class="['icon', { disabled: props.disabled }]"
  />
</template>

<script setup>
  import InlineSvg from 'vue-inline-svg';
  import { computed } from 'vue';

  const props = defineProps({
    icon: {
      type: String,
      required: true,
      default: 'boba',
    },
    color: {
      type: String,
      default: 'white',
    },
    size: {
      type: Number,
      default: 30,
      validator: (v) => v > 0,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  });
  console.log(props.icon);

  const isSvg = computed(() => {
    if (typeof props.icon === 'string') {
      return props.icon.endsWith('.svg');
    }

    // Если props.icon — это объект, предположим, что это SVG
    return props.icon && typeof props.icon === 'object';
  });

  const sizeStyle = computed(() => props.size + 'px');

  const color = computed(() => props.color);
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
