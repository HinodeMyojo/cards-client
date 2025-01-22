<template>
  <div class="social-buttons">
    <a type="button" class="social">
      <UIIcon :icon="googleIcon" />
      <span>Войти с помощью Google</span>
    </a>
    <a type="button" class="social">
      <UIIcon :icon="appleIcon" />
      <span>Войти с помощью Apple</span>
    </a>
    <a type="button" class="social">
      <UIIcon :icon="telegramIcon" />
      <span>Войти с помощью Telegram</span>
    </a>
  </div>
</template>

<script setup>
  import UIIcon from '@/components/UI/UIIcon.vue';
  import { telegramIcon, appleIcon, googleIcon } from '@/assets/icons';
</script>

<style scoped>
  .social-buttons {
    background-color: transparent;
    display: flex;
    flex-direction: column;
    gap: 15px;
    /* Увеличиваем расстояние между кнопками */
    align-items: center;
    justify-content: center;
    width: 100%;
    /* Растягиваем кнопки на всю ширину */
  }

  .social {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    /* Пространство между иконкой и текстом */
    width: 100%;
    /* Растягиваем кнопку на всю ширину контейнера */
    max-width: 100%;
    /* Ограничиваем максимальную ширину */
    padding: 10px 20px;
    /* Увеличиваем внутренний отступ */
    font-size: 18px;
    /* Увеличиваем размер текста */
    text-align: center;
    /* background-color: #616161; */
    background-color: #272a2f;
    border: 1px solid #3b4047;
    color: white;
    border-radius: 15px;
    /* Закругляем углы */
    /* border: none; */
    cursor: pointer;
    transition: background-color 0.3s ease;
    /* Анимация смены фона */
  }

  .social:hover {
    /* background-color: #424242;  */
    border: 1px solid #d459ff;
    transition: 0.5s ease;
  }

  span {
    font-weight: 500;
    background-color: transparent;
  }
</style>
