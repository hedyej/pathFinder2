<template>
  <el-card v-for="comment in comments" :key="comment.id" class="mb-2">
    <div class="d-flex mb-2" style="justify-content: space-between">
      <div class="d-flex">
        <img
          src="@/assets/imgs/StoreDetail/avatarDefault.png"
          class="me-2 rounded"
          style="width: 56px; height: 56px"
        />
        <div>
          <h4>{{ getUserName(comment.userId) }}</h4>

          <p class="text-grey">{{ comment.createDate }}</p>
        </div>
      </div>
      <div class="card-light-tag" style="align-self: flex-start">
        <h5 style="margin-bottom: 0px">
          <font-awesome-icon :icon="['fas', 'star']" class="me-1" />{{ comment.score }} 分
        </h5>
      </div>
    </div>
    <div>
      <p class="text-grey">
        <span class="mb-1 me-2">
          <font-awesome-icon :icon="['fas', 'clock']" class="me-1" />日工時：
          {{ comment.workHours }}
        </span>
        <span class="me-2">·</span>
        <span class="mb-1">
          <font-awesome-icon :icon="['fas', 'calendar-days']" class="me-1" />換宿日數：
          {{ comment.workDays }}
        </span>
      </p>
    </div>
    <p class="mb-2">
      {{ comment.description }}
    </p>

    <span>
      <el-tag v-for="tag in comment.advantages" :key="tag" class="me-1" type="info">{{
        tag
      }}</el-tag>
      <el-tag v-for="tag in comment.disadvantages" :key="tag" class="me-1" type="info">{{
        tag
      }}</el-tag>
    </span>

    <div class="text-right text-grey">
      <span class="me-3">
        <font-awesome-icon :icon="['fas', 'thumbs-up']" class="me-1" />{{
          comment.like.length > 0 ? comment.like.length : ' '
        }}</span
      >
      <span class="me-3">
        <font-awesome-icon :icon="['fas', 'thumbs-down']" class="me-1" />{{
          comment.dislike.length > 0 ? comment.dislike.length : ' '
        }}</span
      >
      <span class="me-3">
        <font-awesome-icon :icon="['fas', 'comment-dots']" class="me-1" />{{
          comment.replies.length > 0 ? comment.dislike.length : ' '
        }}</span
      >

      <el-dropdown>
        <span >
          <div style="height: 22px ;width: 29px;" class="d-flex align-center">
            <font-awesome-icon :icon="['fas', 'ellipsis-vertical']" />
          </div>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="editComment(comment)">編輯</el-dropdown-item>
            <el-dropdown-item @click="deleteAction(comment.id)">刪除</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>

    </div>
  </el-card>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue';
import axios from 'axios';
import { storeToRefs } from 'pinia';
import { ElMessage, ElMessageBox } from 'element-plus';
import { useCommentModalStore } from '../../stores/useCommentModalStore';

// CommentModalStore
const CommentModalStore = useCommentModalStore();
const {
  form, type, isOpen, comments,
} = storeToRefs(CommentModalStore);
const { deleteComment } = CommentModalStore;
const editComment = (pastForm) => {
  isOpen.value = true;
  type.value = 'edit';
  form.value = pastForm;
};

// delete modal
const deleteAction = async (commentId) => {
  ElMessageBox.alert('確定要刪除評論嗎', '刪除評論', {
    confirmButtonText: '刪除',
    callback: () => {
      deleteComment(commentId);
      ElMessage({
        type: 'danger',
        message: '刪除成功',
      });
    },
  });
};

// user info
const users = ref([]);
const getUser = () => {
  axios.get('http://localhost:3000/users').then((res) => {
    users.value = res.data;
  });
};

// user name
const getUserName = computed(() => (userId) => {
  let userName = '';
  users.value.forEach((user) => {
    if (user.id === userId) {
      userName = user.name;
    }
  });
  return userName;
});

onMounted(() => {
  getUser();
});
</script>
