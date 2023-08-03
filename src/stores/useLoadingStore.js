import { defineStore } from 'pinia';

export const useLoadingStore = defineStore('loading', {
  state: () => ({
    isLoading: false,
  }),
  actions: {
    setIsLoading() {
      this.isLoading = !this.isLoading;
      console.log('?');
    },
  },
});
