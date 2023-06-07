import { ref } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';

export const useStoreStore = defineStore('store', () => {
  const stores = ref([]);
  async function getStores() {
    await axios.get('/stores').then((res) => { stores.value = res.data; });
  }
  return { stores, getStores };
});
