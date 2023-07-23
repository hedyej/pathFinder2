<template>
  <section style="background: #f0f8f5" class="py-4 py-xl-7">
    <WrapContainer>
      <h1 class="text-center mb-4 mb-xl-5">
        <font-awesome-icon :icon="['fas', 'store']" class="text-primary me-3" />精選換宿店家
      </h1>

      <el-row :gutter="20">
        <el-col :xs="24" :sm="8">
          <el-card class="me-3 text-center mb-3 mb-md-0" style="width: 100%">
            <div class="card-tag mb-4">
              <h5><font-awesome-icon :icon="['fas', 'star']" class="me-1" />評分最高</h5>
            </div>

            <h5 class="mb-1" v-for="(item, index) in descScoreList" :key="item.store.id">
              <span class="me-2 text-accent">{{ index + 1 }}</span>
              <router-link :to="`/storeDetail/${item.store.id}`" class="router-link text-dark">
                <span class="text-left" style="width: 200px">{{ item.store.name }}</span>
              </router-link>
            </h5>

            <img src="@/assets/imgs/home/comment.png" /> </el-card
        ></el-col>

        <el-col :xs="24" :sm="8" >
          <el-card class="me-3 text-center mb-3 mb-md-0" style="width: 100%" >
            <div class="card-tag mb-4">
              <h5><font-awesome-icon :icon="['fas', 'clock']" class="me-1" />工時最短</h5>
            </div>

            <h5 class="mb-1" v-for="(item, index) in ascWorkList" :key="item.store.id">
              <span class="me-2 text-accent">{{ index + 1 }}</span>
              <router-link :to="`/storeDetail/${item.store.id}`" class="router-link text-dark">
                <span class="text-left" style="width: 200px">{{ item.store.name }} </span>
              </router-link>
            </h5>

            <img src="@/assets/imgs/home/lessHour.png" /> </el-card
        ></el-col>

        <el-col :xs="24" :sm="8">
          <el-card class="me-3 text-center mb-3 mb-md-0" style="width: 100%">
            <div class="card-tag mb-4">
              <h5><font-awesome-icon :icon="['fas', 'heart']" class="me-1" />福利最多</h5>
            </div>

            <h5 class="mb-1" v-for="(item, index) in desBenefitList" :key="item.store.id">
              <span class="me-2 text-accent">{{ index + 1 }}</span>
              <router-link :to="`/storeDetail/${item.store.id}`" class="router-link text-dark">
                <span class="text-left" style="width: 200px">{{ item.store.name }}</span>
              </router-link>
            </h5>

            <img src="@/assets/imgs/home/benefit.png" /> </el-card
        ></el-col>
      </el-row>
    </WrapContainer>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import WrapContainer from '@/components/global/WrapContainer.vue';
import { getStoresByComment } from '@/apis/store';

const descScoreList = ref([]);
const fetchDescScoreList = async () => {
  const { data } = await getStoresByComment({ sort: 'score', _order: 'dec', _expand: 'store' });
  descScoreList.value = data.splice(-3);
};

const ascWorkList = ref([]);
const fetchAscWorkList = async () => {
  const { data } = await getStoresByComment({ sort: 'workHours', _order: 'dec', _expand: 'store' });
  ascWorkList.value = data.splice(-3);
};

const desBenefitList = ref([]);
const fetchDesBenefitList = async () => {
  const { data } = await getStoresByComment({ sort: 'advantageTotal', _order: 'dec', _expand: 'store' });
  desBenefitList.value = data.splice(-3);
};

onMounted(() => {
  fetchDescScoreList();
  fetchAscWorkList();
  fetchDesBenefitList();
});
</script>
