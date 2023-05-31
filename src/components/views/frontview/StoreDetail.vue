<template>
  <CommentModal ></CommentModal>
  <WrapContainer>
    <router-link :to="{ name: 'searchStore' }" class="text-primary bold router-link mb-1"
      ><font-awesome-icon :icon="['fas', 'arrow-left']" class="me-1" />返回</router-link
    >

    <el-row :gutter="20" class="mt-2">
      <el-col :xs="24" :md="8">
        <StoreCard :averageStoreInfo="averageStoreInfo" :store="store"
        ></StoreCard
      ></el-col>

      <el-col :xs="24" :md="16">
        <div class="d-flex align-center" style="justify-content: space-between">
          <p class="text-grey bold" style="margin: 0">{{ allComments.length}} 則評論</p>
          <FilterSelection></FilterSelection>
        </div>

        <CommentCard > </CommentCard>

        <!-- v-modal:current-page="sorterInfo.nowPage"      -->
        <el-pagination background layout="prev, pager, next"
        :total="allComments.length"    @current-change="handleCurrentChange"
        :hide-on-single-page="allComments.length===1"/>

      </el-col>
    </el-row>
  </WrapContainer>
</template>

<script setup>

import {
  ref, onMounted,
} from 'vue';
import { useRoute } from 'vue-router';
import { useCommentModalStore } from '@/stores/useCommentModalStore';

import axios from 'axios';
import StoreCard from '@/components/StoreDetail/StoreCard.vue';
import { storeToRefs } from 'pinia';
import WrapContainer from '../../global/WrapContainer.vue';
import CommentCard from '../../StoreDetail/CommentCard.vue';
import FilterSelection from '../../StoreDetail/FilterSelection.vue';
import CommentModal from '../../StoreDetail/CommentModal.vue';

// CommentModalStore
const commentModalStore = useCommentModalStore();
const {
  allComments, storeId, sorterInfo, averageStoreInfo,
} = storeToRefs(commentModalStore);
const { getAllComments, getComments, getNewComments } = commentModalStore;

// route
const route = useRoute();
storeId.value = route.params.id;

// watch change page
// const theNowPage = computed(() => sorterInfo.value.nowPage);
// watch(theNowPage, (newPage) => {
//   getNewComments(newPage);
// });
const handleCurrentChange = (page) => {
  sorterInfo.value.nowPage = page;
  getNewComments(page);
};

// store info
const store = ref({});
const getStore = () => {
  axios.get(`/stores/${storeId.value}`).then((res) => { store.value = res.data; });
};

// init
const init = async () => {
  await getStore();
  await getAllComments();
  await getComments('DateOrderAsc');
};

onMounted(() => { init(); });

</script>
