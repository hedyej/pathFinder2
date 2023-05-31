import axios from 'axios';
import { defineStore } from 'pinia';

export const useCommentModalStore = defineStore('commentModal', {
  state: () => ({
    isOpen: false,
    nowPage: 1,
    storeId: '',
    type: '',
    form: {
      storeId: 0,
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
    postComment(form) {
      axios.post(`/stores/${this.form.storeId}/comments`, form);
    },
    putComment(form, commentId) {
      axios.put(`/comments/${commentId}`, form);
    },
    submitComment(form, commentId) {
      if (this.type === 'edit') {
        this.putComment(form, commentId);
      } else {
        this.postComment(form);
      }
    },
    deleteComment(commentId) {
      axios.delete(`/comments/${commentId}`);
    },
  },

});
