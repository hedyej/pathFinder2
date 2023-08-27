<template>
  <div class="text-right text-grey">
    <span class="me-3" v-if="comment.comment.replys && comment.comment.replys.length">
      <font-awesome-icon :icon="['fas', 'comment-dots']" />
      {{
        comment.comment.replys && comment.comment.replys.length > 0
          ? comment.comment.replys.length
          : ' '
      }}
    </span>

    <el-dropdown class="dropdown" v-if="comment.comment.userId === user.id && user.id !== 0">
      <span>
        <div style="height: 22px; width: 29px" class="d-flex align-center">
          <font-awesome-icon :icon="['fas', 'ellipsis-vertical']" />
        </div>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="editComment(comment.comment)">編輯</el-dropdown-item>
          <el-dropdown-item @click="deleteAction(comment.comment.id)">刪除</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { defineProps } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useCommentStore } from '@/stores/useCommentStore';
import { useUserStore } from '@/stores/useUserStore';

// userStore
const userStore = useUserStore();
const { user } = storeToRefs(userStore);

// commentStore
const commentStore = useCommentStore();
const {
  form, type, isOpen, storeId,
} = storeToRefs(commentStore);
const { handleDeleteComment } = commentStore;

// props
const comment = defineProps({ comment: Object });

// edit
const editComment = (pastForm) => {
  type.value = 'edit';
  isOpen.value = true;
  form.value = JSON.parse(JSON.stringify(pastForm));
};

// delete
const router = useRouter();
const route = useRoute();
const deleteAction = async (id) => {
  await handleDeleteComment(id);
  if (Object.keys(route.query).length) router.push(`/storeDetail/${storeId.value}`);
};
</script>
