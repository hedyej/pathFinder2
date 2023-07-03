<template>
  <section class="py-5">
    <WrapContainer>
      <h1 class="text-center mb-5">
        <font-awesome-icon :icon="['fas', 'comment-dots']" class="text-primary me-3" />最新評論
      </h1>

      <el-row :gutter="20">
        <el-col class="mb-2" :span="12" v-for="comment in lastComments" :key="comment.id">
          <el-card
            @click="commentEventHandler(comment.store.id, comment.id)"
            class="cursor-pointer"
          >
            <el-row :gutter="4" class="mb-2">
              <el-col :span="4">
                <img :src="comment.store.imgUrl" class="profileImg" />
              </el-col>

              <el-col :span="14">
                <h4 class="mb-1">{{ comment.store.name }}</h4>
                <p class="me-1 text-grey">
                  {{ comment.user.name }}
                  <span>·</span>
                  {{ moment(comment.createDate).format('YYYY-MM-DD') }}
                </p>
              </el-col>

              <el-col :span="6" class="text-right">
                <div class="card-light-tag">
                  <h5>
                    <font-awesome-icon :icon="['fas', 'star']" class="me-1" />{{ comment.score }} 分
                  </h5>
                </div>
              </el-col>
            </el-row>
            <p class="multiline-ellipsis">
              {{ comment.description }}
            </p>
          </el-card>
        </el-col>
      </el-row>
    </WrapContainer>
  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import axios from 'axios';
import moment from 'moment';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import WrapContainer from '@/components/global/WrapContainer.vue';
import { useCommentDetailStore } from '@/stores/useCommentDetailStore';

// last comments
const lastComments = ref([]);
const getComments = () => {
  axios.get('/comments?_expand=store&_expand=user').then((res) => {
    lastComments.value = res.data.splice(-4);
  });
};

// commentDetailStore
const commentDetailStore = useCommentDetailStore();
const { isDetailOpen } = storeToRefs(commentDetailStore);

// route to comment detail
const router = useRouter();
const commentEventHandler = (cardStoreId, cardCommentId) => {
  router.push(`/storeDetail?storeId=${cardStoreId}&commentId=${cardCommentId}`);
  isDetailOpen.value = true;
};

onMounted(() => {
  getComments();
});
</script>
