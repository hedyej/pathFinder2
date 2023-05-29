<template>
  {{ store }}
  {{ averageStoreInfo }}
  <WrapContainer>
    <router-link :to="{ name: 'searchStore' }" class="text-primary bold router-link mb-1"
      ><font-awesome-icon :icon="['fas', 'arrow-left']" class="me-1" />返回</router-link
    >

    <el-row :gutter="20" class="mt-2">
      <el-col :xs="24" :md="8">
        <StoreCard :averageStoreInfo="averageStoreInfo" :store="store"></StoreCard
      ></el-col>

      <el-col :xs="24" :md="16">
        <div class="d-flex align-center" style="justify-content: space-between">
          <p class="text-grey bold" style="margin: 0">{{ comments.length }} 則評論</p>
          <FilterSelection @selectVal="sorterComment"></FilterSelection>
        </div>

        <CommentCard :comments="comments"> </CommentCard>
      </el-col>
    </el-row>
  </WrapContainer>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import StoreCard from '@/components/StoreDetail/StoreCard.vue';
import { storeToRefs } from 'pinia';
import WrapContainer from '../../global/WrapContainer.vue';
import CommentCard from '../../StoreDetail/CommentCard.vue';
import FilterSelection from '../../StoreDetail/FilterSelection.vue';
import { useCommentStore } from '../../../stores/useCommentStore';

// store info
const commentStore = useCommentStore();
const { comments, store } = storeToRefs(commentStore);
const {
  getComments,
} = commentStore;
const averageStoreInfo = ref({});

// comment sorter
const sorterComment = (sorter) => {
  if (sorter === 'scoreOrderAsc') {
    comments.value.sort((a, b) => (a.score > b.score ? 1 : -1));
  } else if (sorter === 'scoreOrderDesc') {
    comments.value.sort((a, b) => (a.score < b.score ? 1 : -1));
  } else if (sorter === 'DateOrderAsc') {
    comments.value.sort((a, b) => (a.createDate < b.createDate ? 1 : -1));
  } else if (sorter === 'DateOrderDesc') {
    comments.value.sort((a, b) => (a.createDate > b.createDate ? 1 : -1));
  }
};

// init
const getAverageInfo = (key) => {
  let total = 0;
  comments.value.forEach((comment) => {
    total += comment[key];
  });
  return total === 0 ? '-' : Math.floor(total / comments.value.length);
};
if (useCommentStore()) {
  onMounted(async () => {
    try {
      const route = useRoute();
      await getComments(route.params.id);
      averageStoreInfo.value.averageDays = getAverageInfo('workDays');
      averageStoreInfo.value.averageHours = getAverageInfo('workHours');
      averageStoreInfo.value.averageScore = getAverageInfo('score');
      console.log('商店', store, '評論', comments);
    } catch (error) {
      console.log(error);
    }
  });
}

</script>
