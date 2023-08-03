<template>
  <div>
    <WrapContainer>
      <el-card class="search-card mb-3">
        <h1 class="mb-3">搜尋</h1>

        <el-form :inline="true" size="large" style="margin-bottom: -24px; ">
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
      <el-main v-loading="isSearchLoading" element-loading-background="rgba(255, 0, 0, 0)"
      class="px-0" v-if="isSearchLoading" style="height: 200px;"></el-main>
      <template v-else>
        <div v-if="storeList.length > 0">
          <router-link
          :to="`/storeDetail/${store.id}`"
          v-for="store in storeList"
          :key="store.id"
          class="router-link"
        >
          <el-card class="mb-3">
            <el-row gutter="16" class="align-center">
              <el-col :xs="0" :md="1"></el-col>
              <el-col :xs="24" :md="18">
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
        <div v-if="isSearch" class="text-center">
          <div class="text-center text-grey py-3">
            <font-awesome-icon :icon="['fas', 'face-sad-tear']"
            style="width: 80;height: 80" class="mb-1"/>
            <h5>查無相關結果</h5>
          </div>
        </div>
      </div>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="totalStores.length"
        @current-change="handleCurrentChange"
        :hide-on-single-page="totalStores.length === 10 || totalStores.length < 10"
      />
      </template>

    </WrapContainer>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { getStores } from '@/apis/store';
import WrapContainer from '../../global/WrapContainer.vue';

// search
const keyword = ref('');
const isSearch = ref(false);
const isSearchLoading = ref(false);
const storeList = ref([]);
const totalStores = ref(0);
const searchWord = async (word, page) => {
  isSearchLoading.value = true;
  const totalStoreNum = await getStores({ q: word });
  totalStores.value = totalStoreNum.data;
  const storeData = await getStores({ q: word, _page: page });
  isSearchLoading.value = false;
  storeList.value = storeData.data;
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
  background-image: url('../../../assets/imgs/SearchStore/search-bg-xs.png');
  background-size: cover;
  width: 100%;
  padding: 20px 0;
  @media (min-width: 768px) {
    background-image: url('../../../assets/imgs/SearchStore/searchBg.png');
  }
}
</style>
