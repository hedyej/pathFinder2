import { createRouter, createWebHashHistory } from 'vue-router';
import { useUserStore } from '@/stores/useUserStore';
import Cookies from 'js-cookie';

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
  ],
});

router.beforeEach(() => {
  const userStore = useUserStore();
  if (Cookies.get('login')) {
    const userInCookie = Cookies.get('login');
    userStore.user = JSON.parse(userInCookie);
  } else {
    userStore.user = {
      id: 0,
      name: '匿名',
      imgUrl: 'https://i.ibb.co/jwKW7LP/default-Avatar.png',
      email: 'hedy@gmail.com',
    };
  }
});

export default router;
