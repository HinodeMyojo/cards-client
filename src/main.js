import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router';
// import components from './components/UI';

var app = createApp(App)

app
    .use(router)
    .mount('#app')
