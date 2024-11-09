import { createRouter, createWebHistory } from 'vue-router';
import Auth from "@/views/Auth.vue";
import Module from "@/views/Module.vue";
import Profile from "@/views/Profile.vue";
import HomePage from '@/views/HomePage.vue';

export const authRoutes = [
    {
        path: '/login',
        component: Auth,
        name: 'Login',
        props: { 'login': true },
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

export const moduleRoutes = [
    {
        path: '/module/create',
        component: Module,
        props: {'create': true}
    },
    {
        path: '/module/edit',
        component: Module,
        props: {'edit': true}
    },
    {
        path: '/module/study',
        component: Module,
        props: {'study': true}
    },
    {
        path: '/module/:id',
        component: Module
    }
]

export const profileRoutes = [
    {
        path: '/:username',
        component: Profile,
        name: 'Profile'
    }
]

const routes = [
    {
        path: '/',
        component: HomePage
    }
]


allRoutersToRoutes(authRoutes);
allRoutersToRoutes(moduleRoutes);
allRoutersToRoutes(profileRoutes);

const router = createRouter({
    history: createWebHistory(import.meta.env.VITE_BASE_URL || '/'), // Используем VITE_BASE_URL
    routes
});


function allRoutersToRoutes(routers) {
    routers.forEach((router) => {
        routes.push(router)
    })
}
// Создаем правила рефреша для ВСЕГО!


export default router;