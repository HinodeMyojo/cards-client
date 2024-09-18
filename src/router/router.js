import vue from "vue";
import Router, { createRouter, createWebHistory } from "vue-router";
import Auth from "@/views/Auth.vue";
import PasswordRecovery from "@/components/Auth/PasswordRecoverySendEmail.vue";

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
        component: Auth,
        props: { 'recovery': true }
    }
]

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
})

export default router;