<template>
  <div class="main">
    <swiper
      :spaceBetween="30"
      :centeredSlides="true"
      :autoplay="{
        delay: 4000,
        disableOnInteraction: true,
        pauseOnMouseEnter: true,
      }"
      :navigation="true"
      :modules="modules"
      class="mySwiper"
    >
      <swiper-slide>
        <div class="image-slider">
          <h3>Легко осваивайте новую информацию с помощью карточек</h3>
          <img src="@/assets/images/slider1.png" alt="" />
        </div>
      </swiper-slide>
      <swiper-slide>
        <div class="image-slider">
          <h3>Плеяды помогут вам подготовиться к сессии, к собеседованию</h3>
          <img src="@/assets/images/slider2.png" alt="" />
        </div>
      </swiper-slide>
      <swiper-slide>
        <div class="image-slider">
          <h3>Плеяды помогут вам подготовиться к сессии, к собеседованию</h3>
          <img src="@/assets/images/slider3.png" alt="" />
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>
<script setup>
  // Import Swiper Vue.js components
  import { Swiper, SwiperSlide } from 'swiper/vue';
  import { ref } from 'vue';

  // Import Swiper styles
  import 'swiper/css';

  import 'swiper/css/pagination';
  import 'swiper/css/navigation';

  // import required modules
  import { Autoplay, Pagination, Navigation } from 'swiper/modules';

  const modules = ref([Autoplay, Pagination, Navigation]);
</script>

<style scoped>
  .image-slider {
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    width: 100%;
    height: 400px;
    gap: 30px;
  }

  .image-slider h3 {
    width: 400px;
    font-size: 24px;
  }

  .image-slider img {
    object-fit: cover;
    /* width: 100%; */
    height: 100%;
  }
</style>
