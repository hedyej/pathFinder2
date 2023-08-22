<template>
  <section style="background: #f0f8f5" class="pt-4 pt-xl-5">
    <WrapContainer>
      <el-row class="align-center">
        <el-col :xs="0" :md="2"></el-col>
        <el-col :md="10" class="hidden-sm-and-down">
          <img src="@/assets/imgs/Home/share-bg.png" />
        </el-col>
        <el-col :xs="24" :md="10" class="text-center">
          <h1 class="mb-3">搜尋換宿店家</h1>
          <el-button type="primary" size="large" @click="backSearch"
            ><font-awesome-icon
              :icon="['fas', 'magnifying-glass']"
              class="me-1"
            />搜尋店家</el-button
          >
        </el-col>
        <el-col :xs="24" class="hidden-md-and-up mt-3 mt-md-0">
          <img
            src="@/assets/imgs/Home/share-bg.png"
            style="display: block; margin: auto; width: 70%"
          />
        </el-col>
        <el-col :xs="0" :md="2"></el-col>
      </el-row>
    </WrapContainer>
  </section>
</template>

<script setup>
import WrapContainer from '@/components/global/WrapContainer.vue';
import 'element-plus/theme-chalk/display.css';

const backSearch = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};
</script>
