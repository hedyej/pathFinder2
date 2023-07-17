<template>
  <div>
    <WrapContainer>
      <el-card class="search-card mb-3">
        <h1 class="mb-3">搜尋</h1>

        <el-form :inline="true" size="large" style="margin-bottom: -24px">
          <el-form-item style="width: 100%; max-width: 400px">
            <el-input
              v-model="keyword"
              type="round"
              placeholder="搜尋換宿店家"
              @keyup.enter="searchWord(keyword)"
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="searchWord(keyword)" tabindex="0">搜尋</el-button>
            <el-button type="secondary" @click="reset" v-if="isSearch">重置</el-button>
          </el-form-item>
        </el-form>
      </el-card>

      <div v-if="storeList.length > 0">
        <router-link
          :to="`/storeDetail/${store.id}`"
          v-for="store in storeList"
          :key="store.id"
          class="router-link"
        >
          <el-card class="mb-3">
            <el-row gutter="16" class="align-center">
              <el-col :span="18" :offset="1">
                <div class="d-flex align-center">
                  <div class="rounded block me-3">
                    <el-image
                      style="width: 100px; height: 100px"
                      :src="store.imgUrl"
                      fit="cover"
                      class="rounded"
                    />
                  </div>

                  <div>
                    <h4 class="mb-1">{{ store.name }}</h4>
                    <p class="text-grey mb-1">{{ store.address }}</p>
                    <p class="text-grey mb-1">{{ store.tel }}</p>
                  </div>
                </div>
              </el-col>
            </el-row>
          </el-card>
        </router-link>
      </div>
      <div v-else>
        <div v-if="isSearch" class="text-center">查無相關結果</div>
      </div>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="totalStores.length"
        @current-change="handleCurrentChange"
        :hide-on-single-page="totalStores.length === 10 || totalStores.length < 10"
      />
    </WrapContainer>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import WrapContainer from '../../global/WrapContainer.vue';

// search
const keyword = ref('');
const isSearch = ref(false);
const storeList = ref([]);
const totalStores = ref(0);
const searchWord = async (word, page) => {
  await axios.get(`stores?q=${word}`).then((res) => {
    totalStores.value = res.data;
  });
  await axios.get(`stores?q=${word}&_page=${page}`).then((res) => {
    storeList.value = res.data;
    console.log('?');
  });
  isSearch.value = true;
};

// pagination
const handleCurrentChange = (page) => {
  if (isSearch.value === true) {
    searchWord(keyword.value, page);
  }
};

// onmounted
onMounted(async () => {
  const route = useRoute();
  if (route.query.keyword) {
    keyword.value = route.query.keyword;
    searchWord(keyword.value, 1);
    isSearch.value = true;
  } else {
    storeList.value = [];
  }
});

// reset
const reset = () => {
  keyword.value = '';
  isSearch.value = false;
  storeList.value = [];
  totalStores.value = 0;
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
