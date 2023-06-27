import { defineStore } from 'pinia';
import { ElMessage } from 'element-plus';
import axios from 'axios';

export const useCommentDetailStore = defineStore('commentDetail', {
  state: () => ({
    isDetailOpen: false,
    commentDetail: {},
    replys: [],
    reply: {},
  }),
  actions: {
    async getReplies() {
      const data = await axios.get(`/comments/${this.commentDetail.id}?_embed=replys`);
      this.replys = data.data.replys;
    },

    async createReply() {
      this.reply.userId = 1;
      this.reply.createDate = Date.now();
      this.reply.commentId = this.commentDetail.id;

      try {
        await axios.post('/replys', this.reply);
        this.getReplies();
        ElMessage({
          message: '新增成功',
          type: 'success',
        });
        this.reply.content = '';
      } catch {
        ElMessage({
          message: '新增失敗',
          type: 'error',
        });
      }
    },

    async deleteReply(replyId) {
      try {
        await axios.delete(`/replys/${replyId}`);
        this.getReplies();
        ElMessage({
          message: '刪除成功',
          type: 'success',
        });
      } catch {
        ElMessage({
          message: '刪除失敗',
          type: 'error',
        });
      }
    },
  },
});
