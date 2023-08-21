<template>
  <section class="py-4 py-xl-7">
    <WrapContainer>
      <h1 class="text-center mb-3 mb-xl-5">
        <font-awesome-icon :icon="['fas', 'comment-dots']" class="text-primary me-3" />最新評論
      </h1>
      <el-main
        v-loading="isLoading"
        element-loading-background="rgba(255, 0, 0, 0)"
        class="px-0"
        v-if="isLoading"
        style="height: 200px"
      ></el-main>
      <el-row :gutter="20" v-else>
        <el-col class="mb-2" :xs="24" :md="12" v-for="comment in lastComments" :key="comment.id">
          <CommentCard
            :comment="comment"
            :isAction="false"
            type="storeComment"
            style="height: 100%"
          ></CommentCard>
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

const isLoading = ref(true);

// last comments
const lastComments = ref([]);
const getLastCommentList = async () => {
  const { data } = await getLastComments();
  lastComments.value = data.splice(-4);
};

onMounted(async () => {
  await getLastCommentList();
  isLoading.value = false;
});
</script>
