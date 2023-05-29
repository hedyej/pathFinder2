<template>
  <main style="background: #fff" class="pt-4 pb-7">
    <WrapContainer>
      <el-card class="search-card mb-3 text-center">
        <img src="@/assets/imgs/home/display-text.png" style="margin-top: -20px" />

        <h2 class="mb-3 text-grey">台灣打工換宿經驗分享平台</h2>

        <el-form :inline="true" size="large" style="margin-bottom: -24px">
          <el-form-item style="width: 100%; max-width: 400px">
            <el-input v-model="keyword" type="round" placeholder="搜尋換宿店家" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" tabindex="0" @click="searchWord(keyword)">搜尋</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </WrapContainer>
  </main>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import WrapContainer from '@/components/global/WrapContainer.vue';

const keyword = ref();
const router = useRouter();
const searchWord = (word) => {
  if (keyword.value) {
    router.push({ name: 'searchStore', query: { keyword: word } });
  }
};
</script>

<style scoped>
.search-card {
  text-align: center;
  background-image: url('@/assets/imgs/home/display-bg.png');
  background-size: cover;
  background-position: bottom;
  width: 100%;
  padding: 64px 0;
}
</style>
