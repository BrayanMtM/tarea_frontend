import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/pages/HomeView.vue'
import RegisPage from '@/pages/RegisPage.vue'

// Lazy loading para mejorar el rendimiento
// const UsersPage = () => import('@/pages/UsersPage.vue')

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView,
    },
    // {
    //   path: '/',
    //   name: 'Usuarios',
    //   component: UsersPage,
    // },
    {
      path: '/citas',
      name: 'Citas',
      component: RegisPage,
    },
  ],
})

export default router


