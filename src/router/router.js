import vue from "vue";
import Router, { createRouter, createWebHistory } from "vue-router";
import Auth from "@/views/Auth.vue";

const routes = [
    {
        path: '/login',
        component: Auth,
        props: { 'register': false }
    },
    {
        path: '/register',
        component: Auth,
        props: { 'register': true }
    }
]

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
})

export default router;