<template>
  <div class="main-result">
    <div class="container">
      <div class="text">
        <h3>{{ text }}</h3>
        <div :class="{ secret: !isActiveSecret }" class="secret-gif">
          <img src="@/assets/gifs/secret.gif" alt="" />
        </div>
        <div :class="{ secret100: !isActiveSecret100 }" class="secret-gif">
          <img src="@/assets/gifs/100.gif" alt="" />
        </div>
      </div>
      <div class="diagram">
        <div
          class="pie animate"
          :style="{
            '--p': percentSuccess,
            '--c': !props.percentSuccess == 0 ? 'lightgreen' : 'transparent',
          }"
        >
          {{ props.percentSuccess }}%*
        </div>
        <p class="add-info">*чистого успеха 😎</p>
      </div>
    </div>
    <div class="buttons">
      <BaseButton
        :label="`Начать заново`"
        :size="`medium`"
        :color="`#272A2F`"
        @click="$emit('restart-study')"
      />
      <BaseButton
        :label="`Закончить`"
        :size="`medium`"
        :color="`#7467B6`"
        @click="$emit('finish-study')"
        :border-color="`transparent`"
      />
    </div>
  </div>
</template>

<script setup>
  import { watch, ref } from 'vue';
  import BaseButton from '../UI/Buttons/BaseButton.vue';

  const props = defineProps({
    percentSuccess: {
      type: Number,
    },
  });
  const text = ref('');

  const isActiveSecret = ref(false);
  const isActiveSecret100 = ref(false);

  const textSwitch = () => {
    isActiveSecret100.value = false;
    isActiveSecret.value = false;
    switch (true) {
      case props.percentSuccess == 0:
        text.value = 'Есть к чему стремиться! 😼';
        break;
      case props.percentSuccess > 0 && props.percentSuccess < 20:
        text.value = 'Вот это потенциалище! 🙈';
        break;
      case props.percentSuccess > 20 && props.percentSuccess < 50:
        text.value = 'Мощь, сила, ум! Всё при тебе! 💪🏻';
        break;
      case props.percentSuccess == 50:
        text.value = 'Уже половина! 🤝🤝';
        break;
      case props.percentSuccess > 50 && props.percentSuccess < 60:
        text.value = 'Уже больше половины!!1 Давай поднажмём!! 🤩';
        break;
      case props.percentSuccess >= 60 && props.percentSuccess <= 70:
        text.value = '';
        isActiveSecret.value = true;
        break;
      case props.percentSuccess > 70 && props.percentSuccess < 95:
        text.value = 'Абалдеть.. Как ты это сделал? 😰';
        break;
      case props.percentSuccess == 100:
        text.value = '';
        isActiveSecret100.value = true;
        break;
      default:
        text.value = 'Чета ошибка';
        break;
    }
  };

  watch(() => props.percentSuccess, textSwitch, { immediate: true });

  const reset = () => {
    isActiveSecret100.value = false;
    isActiveSecret.value = false;
    text.value = '';
  };

  defineExpose({
    reset,
  });
</script>

<style scoped>
  .main-result {
    width: 700px;
    height: 600px;
    display: flex;
    flex-direction: column;
    gap: 30px;
  }

  .container {
    width: 100%;
    height: 400px;
    background-color: #2b2c34;
    border-radius: 50px;
    display: flex;
    flex-direction: row;
    padding: 30px;
  }

  .add-info {
    font-size: 15px;
    color: #6c6e7d;
  }

  .text {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 0.5;
  }

  .diagram {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    flex: 0.5;
    gap: 30px;
  }

  .buttons {
    width: 100%;
    display: flex;
    justify-content: space-around;
  }

  .secret {
    display: none;
  }

  .secret100 {
    display: none;
  }

  .secret-gif img {
    width: 360px;
    border-radius: 20px;
  }

  /* .diagram-container {
    width: 150px;
    height: 150px;
    background-color: #c8972f;
    border-radius: 100px;
} */
  @property --p {
    syntax: '<number>';
    inherits: true;
    initial-value: 0;
  }

  .pie {
    --p: 20;
    --b: 22px;
    --c: transparent;
    --w: 150px;

    width: var(--w);
    aspect-ratio: 1;
    position: relative;
    display: inline-grid;
    margin: 5px;
    place-content: center;
    font-size: 25px;
    font-weight: bold;
    font-family: sans-serif;
  }

  .pie:before,
  .pie:after {
    content: '';
    position: absolute;
    border-radius: 50%;
  }

  .pie:before {
    inset: 0;
    background:
      radial-gradient(farthest-side, var(--c) 98%, #0000) top/var(--b) var(--b)
        no-repeat,
      conic-gradient(var(--c) calc(var(--p) * 1%), #0000 0);
    -webkit-mask: radial-gradient(
      farthest-side,
      #0000 calc(99% - var(--b)),
      #000 calc(100% - var(--b))
    );
    mask: radial-gradient(
      farthest-side,
      #0000 calc(99% - var(--b)),
      #000 calc(100% - var(--b))
    );
  }

  .pie:after {
    inset: calc(50% - var(--b) / 2);
    background: var(--c);
    transform: rotate(calc(var(--p) * 3.6deg))
      translateY(calc(50% - var(--w) / 2));
  }

  .animate {
    animation: p 1s 0.5s both;
  }

  .no-round:before {
    background-size:
      0 0,
      auto;
  }

  .no-round:after {
    content: none;
  }

  @keyframes p {
    from {
      --p: 0;
    }
  }
</style>
