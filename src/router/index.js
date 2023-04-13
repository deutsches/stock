import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: '',
      component: () => import('../views/FrontView.vue'),
      children: [
        {
          path: '/focus',
          name: 'focus',
          component: () => import('../views/FocusView.vue'),
        },
        {
          path: '/',
          name: 'home',
          component: HomeView,
        },
      ],
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      component: () => import('../views/ErrorView.vue'),
    },
  ],
});

export default router;
