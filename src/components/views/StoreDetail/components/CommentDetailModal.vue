<template>
  <el-dialog v-model="isDetailOpen"  style="width: 90%; max-width: 600px"
  :before-close="handleClose" >
  <div>
    <div class="d-flex mb-2" style="justify-content: space-between">
      <div class="d-flex" >
        <img v-if="commentDetail.user?.imgUrl"
        :src="commentDetail.user.imgUrl" class="me-2 profileImg" />
        <div class="text-grey">
          <h4 class="text-dark" v-if="commentDetail.user.name ">{{commentDetail.user.name }}</h4>
          <p>{{ moment(commentDetail.createDate).format('YYYY-MM-DD') }}</p>
        </div>
      </div>
      <div class="card-light-tag" style="align-self: flex-start">
        <h5 style="margin-bottom: 0px">
          <font-awesome-icon :icon="['fas', 'star']" class="me-1" />{{ commentDetail.score }} 分
        </h5>
      </div>
      </div>
      <div>
        <p class="text-grey">
          <span class="mb-1 me-1">
            <font-awesome-icon :icon="['fas', 'clock']" class="me-1" />日工時：
            {{ commentDetail.workHours }}
            <span>小時</span>
          </span>
          <span class="me-1">·</span>
          <span class="mb-1">
            <font-awesome-icon :icon="['fas', 'calendar-days']" class="me-1" />換宿：
            {{ commentDetail.workDays }}
            <span>周</span>
          </span>
        </p>
      </div>
      <p class="mb-2 text-dark">
        {{ commentDetail.description }}
      </p>

      <span v-for="tag in commentDetail.advantages" :key="tag">
        <span v-if="tag.status">
          <el-tag class="me-1" type="info">{{ tag.value }}</el-tag>
        </span>
      </span>

      <span v-for="tag in commentDetail.disAdvantages" :key="tag">
        <span v-if="tag.status">
          <el-tag class="me-1" type="info">{{ tag.value }}</el-tag>
        </span>
      </span>

      <ActionBar :comment="commentDetail"></ActionBar>
      <el-divider class="my-2" />

      <div class="d-flex mb-3 text-grey" v-for="reply in commentDetail.replys" :key="reply.id">
        <img :src="reply.imgUrl" class="me-2 profileImg" />
        <div style="flex-grow: 1" class="text-dark">
          <h4>{{ reply.name }}</h4>
          <p>{{ reply.content }}</p>
          <p class="text-grey">{{ moment(reply.createDate).format('YYYY-MM-DD') }}</p>
        </div>

        <div>
          <el-dropdown trigger="click" v-if="reply.userId===user.id && user.id!==0">
            <span>
              <div style="height: 22px; width: 29px" class="d-flex align-center">
                <font-awesome-icon :icon="['fas', 'ellipsis-vertical']" />
              </div>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="handleDeleteReply(reply.id)">刪除</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>

      <div class="d-flex mb-3">
        <img :src="user.imgUrl" class="me-2 profileImg mb-3" />
        <div style="flex-grow: 1">
          <h4 class="text-dark">{{ user.name }}</h4>
          <el-input
            v-model="reply.content"
            :rows="3"
            type="textarea"
            placeholder="輸入回覆..."
            class="mb-1"
          />
          <div>
            <el-checkbox v-model="isAnonymous" v-if="isLogin">匿名回覆</el-checkbox>
          </div>
          <el-button type="primary" @click="handleCreateReply">送出</el-button>
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<script setup>
import {
  onMounted, reactive, watch, ref, computed,
} from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import { storeToRefs } from 'pinia';
import moment from 'moment';
import { useCommentDetailStore } from '@/stores/useCommentDetailStore';
import { useCommentStore } from '@/stores/useCommentStore';
import { useUserStore } from '@/stores/useUserStore';
import ActionBar from '@/components/global/ActionBar.vue';
import { createReply, deleteReply } from '@/apis/reply';

// userStore
const userStore = useUserStore();
const { user } = storeToRefs(userStore);

// isLogin / Anonymous
const isLogin = computed(() => user.value.id !== 0);
const isAnonymous = ref(false);

// commentDetailStore
const commentDetailStore = useCommentDetailStore();
const { isDetailOpen, commentDetail, commentId } = storeToRefs(commentDetailStore);
const { fetchComment } = commentDetailStore;

// create reply
const reply = reactive({});
const handleCreateReply = async () => {
  if (isAnonymous.value) {
    reply.userId = 0;
  } else {
    reply.userId = user.value.id;
  }
  reply.createDate = Date.now();
  reply.commentId = Number(commentId.value);
  try {
    await createReply(reply);
    await fetchComment();
    ElMessage({ message: '新增成功', type: 'success' });
    reply.content = '';
  } catch {
    ElMessage({ message: '新增失敗', type: 'error' });
  }
};

// delete reply
const handleDeleteReply = async (replyId) => {
  try {
    await deleteReply(replyId);
    await fetchComment();
    ElMessage({ message: '刪除成功', type: 'success' });
  } catch {
    ElMessage({ message: '刪除失敗', type: 'error' });
  }
};

// close modal
const route = useRoute();
const router = useRouter();

const handleClose = async () => {
  isDetailOpen.value = false;
  const { storeId } = route.query;
  const commentStore = useCommentStore();
  const { pageSorter } = commentStore;
  const { sorterInfo } = storeToRefs(commentStore);
  await pageSorter(
    sorterInfo.value.nowType,
    sorterInfo.value.nowPage,
    sorterInfo.value.nowSorter,
  );
  router.push(`/storeDetail/${storeId}`);
};

// init/change comment
watch(
  () => route.query.commentId,
  async () => {
    if (route.query.commentId) {
      commentId.value = route.query.commentId;
      await fetchComment();
    }
  },
);

onMounted(async () => {
  if (route.query.commentId) {
    commentId.value = route.query.commentId;
    await fetchComment();
  }
});
</script>
