<template>
  <section style="background: #f0f8f5" class="py-7">
    <WrapContainer>
      <h1 class="text-center mb-5">
        <font-awesome-icon :icon="['fas', 'store']" class="text-primary me-3" />精選換宿店家
      </h1>

      <el-row :gutter="20">
        <el-col :span="8">
          <el-card class="me-3 text-center" style="width: 100%">
            <div class="card-tag mb-4">
              <h5><font-awesome-icon :icon="['fas', 'star']" class="me-1" />評分最高</h5>
            </div>

            <h5 class="mb-1" v-for="(comment, index) in scoreComments" :key="comment.store.id">
              <span class="me-2 text-accent">{{ index + 1 }}</span>
              <router-link :to="`/storeDetail/${comment.store.id}`" class="router-link text-dark">
                <span class="text-left" style="width: 200px">{{ comment.store.name }}</span>
              </router-link>
            </h5>

            <img src="@/assets/imgs/home/comment.png" /> </el-card
        ></el-col>

        <el-col :span="8">
          <el-card class="me-3 text-center" style="width: 100%">
            <div class="card-tag mb-4">
              <h5><font-awesome-icon :icon="['fas', 'clock']" class="me-1" />工時最短</h5>
            </div>

            <h5 class="mb-1" v-for="(comment, index) in hourComments" :key="comment.store.id">
              <span class="me-2 text-accent">{{ index + 1 }}</span>
              <router-link :to="`/storeDetail/${comment.store.id}`" class="router-link text-dark">
                <span class="text-left" style="width: 200px">{{ comment.store.name }} </span>
              </router-link>
            </h5>

            <img src="@/assets/imgs/home/lessHour.png" /> </el-card
        ></el-col>

        <el-col :span="8">
          <el-card class="me-3 text-center" style="width: 100%">
            <div class="card-tag mb-4">
              <h5><font-awesome-icon :icon="['fas', 'heart']" class="me-1" />福利最多</h5>
            </div>

            <h5 class="mb-1" v-for="(comment, index) in advantageComments" :key="comment.store.id">
              <span class="me-2 text-accent">{{ index + 1 }}</span>
              <router-link :to="`/storeDetail/${comment.store.id}`" class="router-link text-dark">
                <span class="text-left" style="width: 200px">{{ comment.store.name }}</span>
              </router-link>
            </h5>

            <img src="@/assets/imgs/home/benefit.png" /> </el-card
        ></el-col>
      </el-row>
    </WrapContainer>
  </section>
</template>

<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';
import WrapContainer from '@/components/global/WrapContainer.vue';

const scoreComments = ref([]);
const getScoreComment = () => {
  axios.get('/comments?sort=score&_order=desc&_expand=store').then((res) => {
    scoreComments.value = res.data.splice(-3);
  });
};

const hourComments = ref([]);
const getHourComment = () => {
  axios.get('/comments?sort=workHours&_order=desc&_expand=store').then((res) => {
    hourComments.value = res.data.splice(-3);
  });
};

const advantageComments = ref([]);
const getAdvantageComment = () => {
  axios.get('/comments?sort=advantageTotal&_order=desc&_expand=store').then((res) => {
    advantageComments.value = res.data.splice(-3);
  });
};

onMounted(() => {
  getScoreComment();
  getHourComment();
  getAdvantageComment();
});
</script>
