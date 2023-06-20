<template>
  <el-dialog v-model="isDetailOpen" width="30%" :before-close="handleClose">
    <div class="d-flex mb-2" style="justify-content: space-between">
      <div class="d-flex">
        <img
          src="@/assets/imgs/StoreDetail/avatarDefault.png"
          class="me-2 rounded"
          style="width: 56px; height: 56px"
        />
        <div>
          <h4>{{ commentDetail.user.name }}</h4>

          <p class="text-grey">{{ commentDetail.createDate }}</p>
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
        <span class="mb-1 me-2">
          <font-awesome-icon :icon="['fas', 'clock']" class="me-1" />日工時：
          {{ commentDetail.workHours }}
        </span>
        <span class="me-2">·</span>
        <span class="mb-1">
          <font-awesome-icon :icon="['fas', 'calendar-days']" class="me-1" />換宿日數：
          {{ commentDetail.workDays }}
        </span>
      </p>
    </div>
    <p class="mb-2">
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

    <div class="text-right text-grey">
      <span class="me-3">
        <font-awesome-icon :icon="['fas', 'thumbs-up']" class="me-1" />{{
          commentDetail.like.length > 0 ? commentDetail.like.length : ' '
        }}</span
      >
      <span class="me-3">
        <font-awesome-icon :icon="['fas', 'thumbs-down']" class="me-1" />{{
          commentDetail.dislike.length > 0 ? commentDetail.dislike.length : ' '
        }}</span
      >
      <span class="me-3">
        <font-awesome-icon :icon="['fas', 'comment-dots']" class="me-1" />{{
          commentDetail.replies.length > 0 ? commentDetail.dislike.length : ' '
        }}</span
      >

      <el-dropdown>
        <span>
          <div style="height: 22px; width: 29px" class="d-flex align-center">
            <font-awesome-icon :icon="['fas', 'ellipsis-vertical']" />
          </div>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="editComment(comment)">編輯</el-dropdown-item>
            <el-dropdown-item @click="deleteComment(commentDetail.id)">刪除</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </el-dialog>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useCommentDetailStore } from '@/stores/useCommentDetailStore';

// commentStore
const commentDetailStore = useCommentDetailStore();
const { isDetailOpen, commentDetail } = storeToRefs(commentDetailStore);

const handleClose = () => {
  isDetailOpen.value = false;
};
</script>
