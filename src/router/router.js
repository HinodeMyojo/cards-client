import vue from "vue";
import Router, { createRouter, createWebHistory } from "vue-router";
import Login from "@/views/Login.vue";

const routes = [
    {
        path: '/',
        component: Login
    }
]

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
})

export default router;