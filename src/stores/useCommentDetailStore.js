import { defineStore } from 'pinia';
import { getUsers } from '@/apis/user';
import { getCommentAndReplys } from '@/apis/comment';

export const useCommentDetailStore = defineStore('commentDetail', {
  state: () => ({
    commentId: 0,
    commentDetail: { user: {} },
    isDetailOpen: false,
  }),
  actions: {
    async fetchComment() {
      // get users
      let users = [];
      const fetchUsers = async () => {
        const { data } = await getUsers();
        users = data;
      };

      // get comment and replys
      const fetchReplys = () => {
        this.commentDetail.replys.forEach((replyItem, index) => {
          users.forEach((item) => {
            if (replyItem.userId === item.id) {
              this.commentDetail.replys[index].name = item.name;
              this.commentDetail.replys[index].imgUrl = item.imgUrl;
            }
          });
        });
      };

      const { data } = await getCommentAndReplys(this.commentId);
      this.commentDetail = data;
      await fetchUsers();
      await fetchReplys();
    },
  },
});
