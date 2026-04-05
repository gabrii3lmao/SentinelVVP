import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import AuthView from '@/views/AuthView.vue'
import DashbordLayout from '@/components/layout/DashbordLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: AuthView,
      meta: { requiresGuest: true },
    },
    {
      path: '/',
      component: DashbordLayout,
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          name: 'dashboard',
          component: () => import('@/views/DashboardView.vue'),
        },
      ],
    },
  ],
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return next({ name: 'login' })
  }

  if (to.meta.requiresGuest && authStore.isAuthenticated) {
    return next({ name: 'dashboard' })
  }

  next()
})

export default router
