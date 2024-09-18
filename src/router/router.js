import vue from "vue";
import Router, { createRouter, createWebHistory } from "vue-router";
import Auth from "@/views/Auth.vue";
import PasswordRecovery from "@/components/Auth/PasswordRecovery.vue";

const routes = [
    {
        path: '/login',
        component: Auth,
        props: { 'login': true }
    },
    {
        path: '/register',
        component: Auth,
        props: { 'register': true }
    },
    {
        path: '/recovery-password',
        component: PasswordRecovery,
        props: { 'recovery': true }
    }
]

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
})

export default router;