<template>
  <section class="py-5">
    <WrapContainer>
      <h1 class="text-center mb-5">
        <font-awesome-icon :icon="['fas', 'comment-dots']" class="text-primary me-3" />最新評論
      </h1>

      <el-row :gutter="20">
        <el-col class="mb-2" :span="12" v-for="comment in lastComments" :key="comment.id">
          <el-card>
            <el-row :gutter="4" class="mb-2">
              <el-col :span="4">
                <img
                  :src="comment.store.imgUrl"
                  style="width: 64px; height: 64px"
                  class="rounded"
                />
              </el-col>

              <el-col :span="14">
                <h4 class="mb-1">{{ comment.store.name }}</h4>
                <p>{{ comment.user.name }} • 2021-12-02</p>
              </el-col>

              <el-col :span="6" class="text-right">
                <div class="card-light-tag">
                  <h5>
                    <font-awesome-icon :icon="['fas', 'star']" class="me-1" />{{ comment.score }} 分
                  </h5>
                </div>
              </el-col>
            </el-row>
            <p>
              {{ comment.description }}
            </p>
          </el-card>
        </el-col>
      </el-row>
    </WrapContainer>
  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import axios from 'axios';
import WrapContainer from '@/components/global/WrapContainer.vue';

const lastComments = ref([]);
const getComments = () => {
  axios.get('http://localhost:3000/comments?_expand=store&_expand=user').then((res) => {
    lastComments.value = res.data.splice(-4);
  });
};
onMounted(() => {
  getComments();
});
</script>
