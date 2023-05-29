<template>
  <div class="d-flex align-center">
    <h2 class="me-2 text-accent">{{ scoreValue }}</h2>
    <el-rate
      v-model="scoreValue"
      disabled
      :colors="['#F48C2B', '#F48C2B', '#F48C2B']"
      size="large"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  averageScore: {
    type: Number,
    default: 0,
  },
});
const scoreValue = computed(() => props.averageScore);
</script>
