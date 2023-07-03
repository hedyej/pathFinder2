<template>
  <el-select v-model="selectValue" class="m-2" style="margin-right: -1px" @change="filterComment">
    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
  </el-select>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useCommentStore } from '@/stores/useCommentStore';

// commentStore
const commentStore = useCommentStore();
const { pageSorter } = commentStore;
const selectValue = ref('');

// filter
const filterComment = () => {
  if (selectValue.value === 'scoreOrderAsc') {
    pageSorter('score', 1, 'asc');
  } else if (selectValue.value === 'scoreOrderDesc') {
    pageSorter('score', 1, 'desc');
  } else if (selectValue.value === 'DateOrderAsc') {
    pageSorter('createDate', 1, 'desc');
  } else if (selectValue.value === 'DateOrderDesc') {
    pageSorter('createDate', 1, 'asc');
  }
};

const options = [
  {
    value: 'scoreOrderDesc',
    label: '評分高到低',
  },
  {
    value: 'scoreOrderAsc',
    label: '評分低到高',
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

// onMounted
onMounted(() => {
  selectValue.value = 'DateOrderAsc';
});
</script>
