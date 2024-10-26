import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from '@/router/router.js'

import Vuetify from 'vuetify/lib';

const vuetify = new Vuetify({})

const app = createApp(App)

app.use(createPinia())

app
    .use(router)
    .use(vuetify)
    .mount('#app')
