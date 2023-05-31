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
        <AverageRate :averageScore="averageStoreInfo.averageScore"></AverageRate>
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
        {{ averageStoreInfo.averageHours }}
      </p>
      <p class="mb-1">
        <font-awesome-icon :icon="['fas', 'calendar-days']" class="me-1" />平均換宿日：
        {{ averageStoreInfo.averageDays }}
      </p>
    </div>
    <el-button
      type="primary"
      style="display: block; margin: auto"
      size="large"
      @click="createComment"
      >撰寫貼文</el-button
    >
  </el-card>
</template>

<script setup>
import { useCommentModalStore } from '@/stores/useCommentModalStore';
import { storeToRefs } from 'pinia';
import AverageRate from './AverageRate.vue';

const CommentModalStore = useCommentModalStore();
const {
  form, type, isOpen, averageStoreInfo,
} = storeToRefs(CommentModalStore);

const props = defineProps({
  store: {
    type: Object,
  },
});

const createComment = () => {
  isOpen.value = true;
  type.value = 'create';
  form.value.storeId = props.store.id;
};
</script>
