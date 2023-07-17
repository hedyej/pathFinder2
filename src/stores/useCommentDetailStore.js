import { defineStore } from 'pinia';
import axios from 'axios';

export const useCommentDetailStore = defineStore('commentDetail', {
  state: () => ({
    commentId: 0,
    commentDetail: {},
    isDetailOpen: false,
  }),
  actions: {
    async getComment() {
      // get users
      let users = [];
      const getUsers = async () => {
        const { data } = await axios.get('/users');
        users = data;
      };

      // get replys
      const getNewReplys = () => {
        this.commentDetail.replys.forEach((replyItem, index) => {
          users.forEach((item) => {
            if (replyItem.userId === item.id) {
              this.commentDetail.replys[index].name = item.name;
              this.commentDetail.replys[index].imgUrl = item.imgUrl;
            }
          });
        });
      };

      const { data } = await axios.get(`/comments/${this.commentId}?_expand=user&_embed=replys`);
      this.commentDetail = data;
      await getUsers();
      await getNewReplys();
    },
  },
});
