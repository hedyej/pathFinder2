import { defineStore } from 'pinia';

export const useCommentDetailStore = defineStore('commentDetail', {
  state: () => ({
    isDetailOpen: false,
  }),
});
