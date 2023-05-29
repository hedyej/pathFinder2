import { ref } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';

export const useStoreStore = defineStore('store', () => {
  const stores = ref([]);
  function getStores() {
    axios.get('/stores').then((res) => { stores.value = res.data; });
  }
  return { stores, getStores };
});
