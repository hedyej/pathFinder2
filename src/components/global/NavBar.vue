<template>
  <div style="background-color: #fff; height: 80px" class="nav-shadow">
    <WrapContainer class="d-flex align-center" style="justify-content: space-between; height: 80px">
      <router-link :to="{ name: 'home' }">
        <img src="@/assets/imgs/logo.png" style="width: 200px" />
      </router-link>
      <el-button type="primary" round>登入</el-button>
    </WrapContainer>
  </div>
</template>

<script setup>
import WrapContainer from '@/components/global/WrapContainer.vue';
</script>

<style scoped>
.nav-shadow {
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
}
</style>
