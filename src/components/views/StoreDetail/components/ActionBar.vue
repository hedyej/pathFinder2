<template>
  <div class="text-right text-grey">
    <span class="me-3">
      <font-awesome-icon :icon="['fas', 'thumbs-up']" />
      {{
        comment.comment.like && comment.comment.like.length > 0 ? comment.comment.like.length : ' '
      }}
    </span>
    <span class="me-3">
      <font-awesome-icon :icon="['fas', 'thumbs-down']" />
      {{
        comment.comment.like && comment.comment.dislike.length > 0
          ? comment.comment.dislike.length
          : ' '
      }}
    </span>
    <span class="me-3">
      <font-awesome-icon :icon="['fas', 'comment-dots']" />
      {{
        comment.comment.like && comment.comment.replys.length > 0
          ? comment.comment.replys.length
          : ' '
      }}
    </span>

    <el-dropdown class="dropdown">
      <span>
        <div style="height: 22px; width: 29px" class="d-flex align-center">
          <font-awesome-icon :icon="['fas', 'ellipsis-vertical']" />
        </div>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="editComment(comment.comment)">編輯</el-dropdown-item>
          <el-dropdown-item @click="deleteComment(comment.comment.id)">刪除</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { defineProps } from 'vue';
import { useCommentStore } from '@/stores/useCommentStore';

// commentStore
const commentStore = useCommentStore();
const { form, type, isOpen } = storeToRefs(commentStore);
const { deleteComment } = commentStore;

// props
const comment = defineProps({ comment: Object });

// edit
const editComment = (pastForm) => {
  type.value = 'edit';
  isOpen.value = true;
  form.value = JSON.parse(JSON.stringify(pastForm));
};
</script>
