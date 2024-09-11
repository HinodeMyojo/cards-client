import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router';
import UIIcon from './components/UI/UIIcon.vue';

var app = createApp(App)

app
    .use(router)
    .mount('#app')
    .component(
        'UUIcon.vue', UIIcon
    )
