<template>
  <el-dialog v-model="isDetailOpen" width="600" :before-close="handleClose">
    <div class="d-flex mb-2" style="justify-content: space-between">
      <div class="d-flex">
        <img src="@/assets/imgs/StoreDetail/avatarDefault.png" class="me-2 profileImg" />
        <div class="text-grey">
          <h4 class="text-dark">名稱</h4>
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
        <el-dropdown trigger="click">
          <span>
            <div style="height: 22px; width: 29px" class="d-flex align-center">
              <font-awesome-icon :icon="['fas', 'ellipsis-vertical']" />
            </div>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="deleteReply(reply.id)">刪除</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>

    <div class="d-flex mb-3">
      <img src="@/assets/imgs/StoreDetail/avatarDefault.png" class="me-2 profileImg mb-3" />
      <div style="flex-grow: 1">
        <el-input
          v-model="reply.content"
          :rows="3"
          type="textarea"
          placeholder="輸入回覆..."
          class="mb-1"
        />

        <el-button type="primary" @click="createReply">送出</el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script setup>
import axios from 'axios';
import {
  onMounted, reactive, watch, ref,
} from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import { storeToRefs } from 'pinia';
import moment from 'moment';
import { useCommentDetailStore } from '@/stores/useCommentDetailStore';
import ActionBar from './ActionBar.vue';

// commentDetailStore
const commentDetailStore = useCommentDetailStore();
const { isDetailOpen } = storeToRefs(commentDetailStore);

// get users
const users = ref();
const getUsers = async () => {
  const { data } = await axios.get('/users');
  users.value = data;
};

// getComment
const commentId = ref();
const commentDetail = ref([]);

const getNewReplys = () => {
  commentDetail.value.replys.forEach((replyItem, index) => {
    users.value.forEach((user) => {
      if (replyItem.userId === user.id) {
        commentDetail.value.replys[index].name = user.name;
        commentDetail.value.replys[index].imgUrl = user.imgUrl;
      }
    });
  });
};

const getComment = async () => {
  const { data } = await axios.get(`/comments/${commentId.value}?_expand=user&_embed=replys`);
  commentDetail.value = data;
  await getNewReplys();
};

// create reply
const reply = reactive({});
reply.userId = 0;
const createReply = async () => {
  reply.userId = 1;
  reply.createDate = Date.now();
  reply.commentId = Number(commentId.value);
  try {
    await axios.post('/replys', reply);
    await getComment();
    ElMessage({ message: '新增成功', type: 'success' });
    reply.content = '';
  } catch {
    ElMessage({ message: '新增失敗', type: 'error' });
  }
};

// delete reply
const deleteReply = async (replyId) => {
  try {
    await axios.delete(`/replys/${replyId}`);
    await getComment();
    ElMessage({ message: '刪除成功', type: 'success' });
  } catch {
    ElMessage({ message: '刪除失敗', type: 'error' });
  }
};

// close modal
const route = useRoute();
const router = useRouter();

const handleClose = () => {
  isDetailOpen.value = false;
  const { storeId } = route.query;
  router.push(`/storeDetail/${storeId}`);
};

// init/change comment
watch(
  () => route.query.commentId,
  async () => {
    if (route.query.commentId) {
      commentId.value = route.query.commentId;
      await getComment();
    }
  },
);

onMounted(async () => {
  if (route.query.commentId) {
    commentId.value = route.query.commentId;
    await getComment();
  }
  await getUsers();
  await getNewReplys();
});
</script>
