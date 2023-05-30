import axios from 'axios';
import { defineStore } from 'pinia';

export const useCommentModalStore = defineStore('commentModal', {
  state: () => ({
    // storeId: '',
    // commentId: '',
    isOpen: 'false',
    type: 'create',
    nowPage: 0,
    form: {
      storeId: null,
      userId: null,
      anonymous: true,
      createDate: 0,
      workHours: 0,
      workDays: '',
      otherworkDays: 0,
      advantages: [],
      disadvantages: [],
      score: 0,
      description: '',
      like: [],
      dislike: [],
      replies: [],
    },
  }),

  actions: {
    openCommentModal() {
      this.isOpen = true;
    },
    closeCommentModal() {
      this.isOpen = false;
    },
    postComment() {
      axios.post(`/stores/${this.storeId}/comments`).then(() => {
        this.closeCommentModal();
        this.form = {
          storeId: null,
          userId: null,
          anonymous: true,
          createDate: 0,
          workHours: 0,
          workDays: '',
          otherworkDays: 0,
          advantages: [],
          disadvantages: [],
          score: 0,
          description: '',
          like: [],
          dislike: [],
          replies: [],
        };
      });
    },

  },
});
