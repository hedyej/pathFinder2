import { createRouter, createWebHashHistory } from 'vue-router';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../components/views/frontview/HomeView.vue'),
    },
    {
      path: '/searchStore/:keyWord?',
      name: 'searchStore',
      component: () => import('../components/views/frontview/SearchStore.vue'),
    },

    {
      path: '/storeDetail/:id',
      name: 'storeDetail',
      component: () => import('../components/views/frontview/StoreDetail.vue'),
    },

    {
      path: '/login',
      name: 'login',
      component: () => import('../components/views/LoginView.vue'),
    },
  ],
});

export default router;
