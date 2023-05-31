<template>
  <el-select
    v-model="selectValue"
    class="m-2"
    placeholder="由新到舊"
    style="margin-right: -1px"
    @change="filterComment"

  >
    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
  </el-select>
</template>

<script setup>
import { ref } from 'vue';
import { useCommentModalStore } from '@/stores/useCommentModalStore';

// CommentModalStore
const commentModalStore = useCommentModalStore();
const { getComments } = commentModalStore;
const selectValue = ref('');
const filterComment = () => {
  getComments(selectValue.value);
};

const options = [
  {
    value: 'scoreOrderDesc',
    label: '評分高至低',
  },
  {
    value: 'scoreOrderAsc',
    label: '評分低至高',
  },
  {
    value: 'DateOrderAsc',
    label: '由新到舊',
  },
  {
    value: 'DateOrderDesc',
    label: '由舊到新',
  },
];

</script>
