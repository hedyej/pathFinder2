<template>
  <div style="background-color: #fff" class="py-4">
    <WrapContainer class="d-flex align-center" style="flex-direction: column">
      <router-link :to="{ name: 'home' }">
        <img src="@/assets/imgs/logo/logo.png" style="width: 200px" />
      </router-link>

      <p class="text-grey">© 2023 PathFinder, Inc</p>
    </WrapContainer>
  </div>
</template>

<script setup>
import WrapContainer from '@/components/global/WrapContainer.vue';
</script>
