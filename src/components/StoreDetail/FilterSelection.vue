<template>
  <el-select
    v-model="value"
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

const value = ref('');
const emits = defineEmits(['selectVal']);
const filterComment = () => {
  emits('selectVal', value.value);
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
