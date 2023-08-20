import { createRouter, createWebHashHistory } from 'vue-router';
import { useLoadingStore } from '@/stores/useLoadingStore';

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
      beforeEnter: (to) => to.name === 'searchStore',
    },

    {
      path: '/storeDetail/:id?',
      name: 'storeDetail',
      component: () => import('../components/views/StoreDetail/StoreDetail.vue'),
    },
    {
      path: '/404',
      name: '404',
      component: () => import('../components/views/NotFound.vue'),
    },
    {
      path: '/:pathMatch(.*)',
      redirect: '/404',
    },
  ],
});

router.beforeEach(() => {
  const loadingStore = useLoadingStore();
  loadingStore.setIsLoading();
});

router.afterEach((to, from) => {
  if (from.name !== 'storeDetail') {
    window.scrollTo(0, 0);
  }
  const loadingStore = useLoadingStore();
  loadingStore.setIsLoading();
});

export default router;
