<template style="width: 100%">

  <el-card>
    <div class="d-flex align-center mb-2">
      <div class="me-2">
        <div v-if="props.store.imgUrl" class="rounded block">
          <el-image
            style="width: 100px; height: 100px"
            :src="props.store.imgUrl"
            fit="cover"
            class="rounded"
          />
        </div>
        <img v-else src="@/assets/imgs/ProductDetail/storeDefaultImg.png" class="rounded" />
      </div>

      <div>
        <h3>{{ props.store.name }}</h3>
        <AverageRate :averageScore="props.averageStoreInfo.averageScore"></AverageRate>
      </div>
    </div>

    <div class="text-grey mb-2">
      <p class="mb-1">
        <font-awesome-icon :icon="['fas', 'location-dot']" class="me-1" />{{ props.store.address }}
      </p>
      <p class="mb-1">
        <font-awesome-icon :icon="['fas', 'phone']" class="me-1" />{{ props.store.tel }}
      </p>
      <p class="mb-1">
        <font-awesome-icon :icon="['fas', 'clock']" class="me-1" />平均工時：
        {{ props.averageStoreInfo.averageHours }}
      </p>
      <p class="mb-1">
        <font-awesome-icon :icon="['fas', 'calendar-days']" class="me-1" />平均換宿日：
        {{ props.averageStoreInfo.averageDays }}
      </p>
    </div>
    <el-button
      type="primary"
      style="display: block; margin: auto"
      size="large"
      @click="openModal"
      >撰寫貼文</el-button
    >
  </el-card>
</template>

<script setup>
import AverageRate from './AverageRate.vue';

const emits = defineEmits(['openModal']);
const props = defineProps({
  store: {
    type: Object,
  },
  averageStoreInfo: {
    type: Object,
  },
});
const openModal = () => {
  emits('openModal', true);
};

</script>
