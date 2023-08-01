<template>
  <VueLoading
    v-model:active="loadingStore.isLoading"
    :can-cancel="true"
    :on-cancel="onCancel"
    :is-full-page="fullPage">
  </VueLoading>
  <div class="app-style pagewrap">
    <NavBar class="top" />
    <RouterView class="main" />
    <FooterSection />
  </div>
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
  margin-top: 100px;
  margin-bottom: 20px;
}

.top {
  position: fixed;
  top: 0px;
  width: 100%;
  z-index: 1500;
}
</style>
