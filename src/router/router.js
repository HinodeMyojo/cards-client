import vue from "vue";
import Router, { createRouter, createWebHistory } from "vue-router";
import Auth from "@/views/Auth.vue";
import App from "@/App.vue";
import PasswordRecovery from "@/components/Auth/PasswordRecoverySendEmail.vue";

export const authRoutes = [
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

const routes = [
    {
        path: '/',
        component: App
    }
]

allRoutersToRoutes(authRoutes);

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
})

function allRoutersToRoutes(routers) {
    routers.forEach((router) => {
        routes.push(router)
    })
}



export default router;