import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from '@/router/router.js'

import vuetify from './plugins/vuetify';

const app = createApp(App)

// Плагины
app.use(createPinia());
app.use(vuetify);

app.use(router).mount('#app');