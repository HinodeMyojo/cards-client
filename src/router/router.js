import { createRouter, createWebHistory } from 'vue-router'
import Auth from '@/views/Auth.vue'
import Module from '@/views/Module.vue'
import HomePage from '@/views/HomePage.vue'
import StudyModule from '@/views/StudyModule.vue'

export const authRoutes = [
  {
    path: '/login',
    component: Auth,
    name: 'Login',
    props: { login: true }
  },
  {
    path: '/register',
    component: Auth,
    props: { register: true }
  },
  {
    path: '/recovery-password',
    component: Auth,
    props: { recovery: true }
  }
]

export const moduleRoutes = [
  {
    path: '/module/create',
    component: Module,
    props: { typeOfModuleState: "createModule" }
  },
  {
    path: '/module/study',
    component: Module
  },
  {
    path: '/module/:id',
    component: Module,
    props: { typeOfModuleState: "concreteModule", }
  },
  {
    path: '/module/:id/study',
    component: StudyModule
  }
]

export const profileRoutes = [
  {
    path: '/user/:username',
    component: Module,
    props: { typeOfModuleState: 'profile'}, 
  }
];


export const errors = [
  {
    path: '/500',
    component: () => import('@/components/error/500.vue')
  }
]

const routes = [
  {
    path: '/',
    component: HomePage
  }
]

allRoutersToRoutes(authRoutes)
allRoutersToRoutes(moduleRoutes)
allRoutersToRoutes(profileRoutes)
allRoutersToRoutes(errors)

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL || '/'), // Используем VITE_BASE_URL
  routes
})

function allRoutersToRoutes(routers) {
  routers.forEach((router) => {
    routes.push(router)
  })
}

export default router
