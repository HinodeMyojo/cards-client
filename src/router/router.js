import { createRouter, createWebHistory } from 'vue-router';
import Auth from "@/views/Auth.vue";
import App from "@/App.vue";
import HomePage from '@/views/HomePage.vue';

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
        component: HomePage
    }
]

allRoutersToRoutes(authRoutes);

const router = createRouter({
    history: createWebHistory(import.meta.env.VITE_BASE_URL || '/'), // Используем VITE_BASE_URL
    routes
});


function allRoutersToRoutes(routers) {
    routers.forEach((router) => {
        routes.push(router)
    })
}


export default router;