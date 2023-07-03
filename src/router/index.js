import { createRouter, createWebHashHistory } from 'vue-router';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../components/views/HomeView/HomeView.vue'),
    },
    {
      path: '/searchStore',
      name: 'searchStore',
      component: () => import('../components/views/SearchStore/SearchStore.vue'),
    },

    {
      path: '/storeDetail/:id?',
      name: 'storeDetail',
      component: () => import('../components/views/StoreDetail/StoreDetail.vue'),
    },

    {
      path: '/login',
      name: 'login',
      component: () => import('../components/views/LoginView.vue'),
    },
  ],
});

export default router;
