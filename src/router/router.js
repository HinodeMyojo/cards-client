import vue from "vue";
import Router, { createRouter, createWebHistory } from "vue-router";
import Auth from "@/views/Auth.vue";

const routes = [
    {
        path: '/Login',
        component: Auth
    },
    {
        path: '/Register',
        component: Auth
    }
]

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
})

export default router;