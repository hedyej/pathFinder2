import { defineStore } from 'pinia';
import axios from 'axios';

export const useCommentDetailStore = defineStore('commentDetail', {
  state: () => ({
    commentDetail: {},
    commentId: '',
    isDetailOpen: false,
  }),
  actions: {
    async getComment() {
      const { data } = await axios.get(`/comments/${this.commentId}?_expand=user&_embed=replys`);
      this.commentDetail = data;
    },
  },
});
