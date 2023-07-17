import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    user: {
      id: 0,
      name: '匿名',
      imgUrl: 'https://i.ibb.co/jwKW7LP/default-Avatar.png',
      email: 'hedy@gmail.com',
    },
  }),
});
