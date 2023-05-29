<template>
  <WrapContainer>
    <el-card class="search-card mb-3">
      <h1 class="mb-3">搜尋</h1>

      <el-form :inline="true" size="large" style="margin-bottom: -24px">
        <el-form-item style="width: 100%; max-width: 400px">
          <el-input v-model="keyword" type="round" placeholder="搜尋換宿店家"
          @keyup.enter="searchWord(keyword)" />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="searchWord(keyword)"

            tabindex="0"
            >搜尋</el-button
          >
          <el-button type="secondary" @click="reset" v-if="isSearch">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <ResultCard :stores="storeList"></ResultCard>
  </WrapContainer>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import { storeToRefs } from 'pinia';
import { useStoreStore } from '@/stores/useStoreStore';
import WrapContainer from '../../global/WrapContainer.vue';
import ResultCard from '../../SearchStore/ResultCard.vue';

// common func & data
const storeList = ref([]);
const storeStore = useStoreStore();
const { getStores } = storeStore;
const { stores } = storeToRefs(storeStore);

// search
const keyword = ref('');
const isSearch = ref(false);
const searchWord = (word) => {
  axios
    .get(`http://localhost:3000/stores?q=${word}`)
    .then((res) => {
      storeList.value = res.data;
      isSearch.value = true;
    })
    .catch(() => {
      stores.value = [];
    });
};

// init
onMounted(async () => {
  const route = useRoute();
  if (route.query.keyword) {
    keyword.value = route.query.keyword;
    searchWord(keyword.value);
  } else {
    await getStores();
    storeList.value = stores.value;
  }
});

// reset
const reset = async () => {
  keyword.value = '';
  isSearch.value = false;
  await getStores();
  storeList.value = stores.value;
  console.log(stores.value, storeList.value);
};
</script>

<style scoped>
.search-card {
  text-align: center;
  background-image: url('../../../assets/imgs/SearchStore/searchBg.png');
  background-size: cover;
  width: 100%;
  padding: 20px 0;
}
</style>
