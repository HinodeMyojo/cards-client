import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from '@/router/router.js'
import VueApexCharts from 'vue3-apexcharts';

import vuetify from './plugins/vuetify';

const app = createApp(App)

// Плагины
app.use(createPinia());
app.use(vuetify);
app.use(VueApexCharts);
app.use(router);


app.mount('#app');