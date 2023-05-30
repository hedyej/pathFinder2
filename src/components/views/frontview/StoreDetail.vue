<template>
    <CommentModal :modalVisible="modalVisible" @closeModal="showModal"></CommentModal>
  <WrapContainer>
    <router-link :to="{ name: 'searchStore' }" class="text-primary bold router-link mb-1"
      ><font-awesome-icon :icon="['fas', 'arrow-left']" class="me-1" />返回</router-link
    >

    <el-row :gutter="20" class="mt-2">
      <el-col :xs="24" :md="8">
        <StoreCard :averageStoreInfo="averageStoreInfo" :store="store"
        @openModal="showModal"></StoreCard
      ></el-col>

      <el-col :xs="24" :md="16">
        <div class="d-flex align-center" style="justify-content: space-between">
          <p class="text-grey bold" style="margin: 0">{{ allComments.length}} 則評論</p>
          <FilterSelection @selectVal="getNowComments"></FilterSelection>
        </div>

        <CommentCard :comments="comments" @deleteModal="showModal"
         @editModal="showModal"> </CommentCard>

        <el-pagination background layout="prev, pager, next"
        :total="allComments.length"  v-model:current-page="nowPage"
        :hide-on-single-page="allComments.length===1"/>

      </el-col>
    </el-row>
  </WrapContainer>
</template>

<script setup>

import {
  ref, reactive, onMounted, watch,
} from 'vue';
import { useRoute } from 'vue-router';
import StoreCard from '@/components/StoreDetail/StoreCard.vue';

import axios from 'axios';
import WrapContainer from '../../global/WrapContainer.vue';
import CommentCard from '../../StoreDetail/CommentCard.vue';
import FilterSelection from '../../StoreDetail/FilterSelection.vue';
import CommentModal from '../../StoreDetail/CommentModal.vue';

// common data
const route = useRoute();
const storeId = route.params.id;

// comment sorter
const comments = ref([]);
const nowPage = ref(1);
const nowSorter = ref('createDate');
const nowType = ref('desc');

watch(nowPage, (newPage) => {
  axios.get(`stores/${storeId}/comments?_start=${newPage}&_end=${newPage + 10}&_sort=${nowType.value}&_order=${nowSorter.value.vlaue}`).then(
    (res) => {
      comments.value = res.data;
      console.log(newPage);
    },
  );
});

const pageSorter = (type, page, sorter) => {
  nowType.value = type;
  nowPage.value = page;
  nowSorter.value = sorter;
  axios.get(`stores/${storeId}/comments?_start=${page}&_end=${page + 10}&_sort=${type}&_order=${sorter}`).then(
    (res) => {
      comments.value = res.data;
    },
  );
};

const getNowComments = (sorter) => {
  if (sorter === 'scoreOrderAsc') {
    pageSorter('score', 1, 'asc');
  } else if (sorter === 'scoreOrderDesc') {
    pageSorter('score', 1, 'desc');
  } else if (sorter === 'DateOrderAsc') {
    pageSorter('createDate', 1, 'desc');
  } else if (sorter === 'DateOrderDesc') {
    pageSorter('createDate', 1, 'asc');
  }
};

// store info
const store = ref({});
const getStore = () => {
  axios.get(`/stores/${route.params.id}`).then((res) => { store.value = res.data; });
};

// store average info
const allComments = ref([]);
const averageStoreInfo = reactive({});

const getAverageInfo = (key) => {
  let total = 0;
  allComments.value.forEach((comment) => {
    total += comment[key];
  });
  return total === 0 ? '-' : Math.floor(total / allComments.value.length);
};

const getAllComments = () => {
  axios.get(`stores/${storeId}/comments`).then((res) => {
    allComments.value = res.data; averageStoreInfo.averageDays = getAverageInfo('workDays');
    averageStoreInfo.averageHours = getAverageInfo('workHours');
    averageStoreInfo.averageScore = getAverageInfo('score');
  });
};

const init = async () => {
  await getStore();
  await getAllComments();
  await getNowComments('DateOrderAsc');
  // averageStoreInfo.averageDays = getAverageInfo('workDays');
  //   averageStoreInfo.averageHours = getAverageInfo('workHours');
  //   averageStoreInfo.averageScore = getAverageInfo('score');
};

onMounted(() => { init(); });

// modal
const modalVisible = ref(false);
const showModal = (status) => {
  modalVisible.value = status;
};
watch(modalVisible, () => {
  init();
});
</script>
