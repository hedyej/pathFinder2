<template>
  <section style="background: #f0f8f5" class="pt-7">
    <WrapContainer>
      <el-row class="align-center">
        <el-col :span="2"></el-col>
        <el-col :span="10">
          <img src="@/assets/imgs/home/share-bg.png" />
        </el-col>
        <el-col :span="10" class="text-center">
          <h1 class="mb-4">一起交流分享</h1>
          <el-button type="primary" size="large" @click="backSearch"
            ><font-awesome-icon
              :icon="['fas', 'magnifying-glass']"
              class="me-1"
            />搜尋店家</el-button
          >
        </el-col>
        <el-col :span="2"></el-col>
      </el-row>
    </WrapContainer>
  </section>
</template>

<script setup>
import WrapContainer from '@/components/global/WrapContainer.vue';

const backSearch = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};
</script>
