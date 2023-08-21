<template>
  <el-main v-loading.fullscreen.lock="loadingStore.isLoading" class="px-0 app-style pagewrap pb-0">
    <NavBar class="top" />
    <RouterView class="main" />
    <FooterSection />
  </el-main>
</template>

<script setup>
import NavBar from '@/components/global/NavBar.vue';
import FooterSection from '@/components/global/FooterSection.vue';
import { useLoadingStore } from '@/stores/useLoadingStore';

const loadingStore = useLoadingStore();
</script>

<style scoped>
.pagewrap {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main {
  flex-grow: 1;
  margin-top: 80px;
  margin-bottom: 20px;
}

.top {
  position: fixed;
  top: 0px;
  width: 100%;
  z-index: 2000;
}
</style>
