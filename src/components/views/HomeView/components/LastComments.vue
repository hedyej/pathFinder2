<template>
  <section class="py-4 pb-xl-7">
    <WrapContainer>
      <h1 class="text-center  mb-4 mb-xl-5">
        <font-awesome-icon :icon="['fas', 'comment-dots']" class="text-primary me-3" />最新評論
      </h1>
      <el-row :gutter="20">
        <el-col class="mb-2" :xs="24" :md="12" v-for="comment in lastComments" :key="comment.id">
          <CommentCard :comment="comment" :isAction="false"></CommentCard>
        </el-col>
      </el-row>
    </WrapContainer>
  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import WrapContainer from '@/components/global/WrapContainer.vue';
import { getLastComments } from '@/apis/comment';
import CommentCard from '@/components/global/CommentCard.vue';
// import { useLoadingStore } from '@/stores/useLoadingStore';

// last comments
const lastComments = ref([]);
const getLastCommentList = async () => {
  const { data } = await getLastComments();
  lastComments.value = data.splice(-4);
};

// const loadingStore = useLoadingStore();
onMounted(async () => {
  // loadingStore.setIsLoading();
  await getLastCommentList();
  // loadingStore.setIsLoading();
});
</script>
