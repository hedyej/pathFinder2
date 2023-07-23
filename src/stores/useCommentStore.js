import { defineStore, storeToRefs } from 'pinia';
import { ElMessage, ElMessageBox } from 'element-plus';
import { useCommentDetailStore } from '@/stores/useCommentDetailStore';
import {
  getAllComments, createComment, updateComment,
  deleteComment, getNowComments,
} from '@/apis/comment';

export const useCommentStore = defineStore('comment', {
  state: () => ({
    // store card
    sorterInfo: {
      nowPage: 1,
      nowSorter: 'createDate',
      nowType: 'desc',
    },

    // comment
    comments: {},
    allComments: {},

    // modal
    isOpen: false,
    modalPage: 1,
    storeId: 0,
    type: '',
    form: {
      id: 0,
      storeId: 0,
      userId: 0,
      anonymous: true,
      createDate: 0,
      workHours: 0,
      hoildayYear: 2023,
      workDays: 0,
      otherworkDays: 0,
      advantages: [
        { value: '店家環境佳', status: false },
        { value: '交通位置佳', status: false },
        { value: '職員友善', status: false },
        { value: '換宿制度完整', status: false },
        { value: '居住環境佳', status: false },
        { value: '免費供餐', status: false },
        { value: '補助餐費 / 零用金', status: false },
        { value: '考取證照', status: false },
        { value: '體驗課程', status: false },
      ],
      disAdvantages: [
        { value: '店家環境差', status: false },
        { value: '交通位置不便', status: false },
        { value: '職員不友善', status: false },
        { value: '換宿制度不完整', status: false },
        { value: '居住環境差', status: false },
        { value: '換宿狀況與描述不符', status: false },
        { value: '工時過長', status: false },
        { value: '性騷擾', status: false },
      ],
      score: 0,
      description: '',
      like: [],
      dislike: [],
      advantageTotal: 0,
    },
  }),

  getters: {
    averageWorkDays() {
      if (this.allComments.length) {
        let total = 0;
        this.allComments.forEach((comment) => {
          const key = 'workDays';
          total += comment[key];
        });
        return Math.floor(total / this.allComments.length);
      }
      return 0;
    },
    averageWorkHours() {
      if (this.allComments.length) {
        let total = 0;
        this.allComments.forEach((comment) => {
          const key = 'workHours';
          total += comment[key];
        });
        return Math.floor(total / this.allComments.length);
      }
      return 0;
    },
    averageScore() {
      if (this.allComments.length) {
        let total = 0;
        this.allComments.forEach((comment) => {
          const key = 'score';
          total += comment[key];
        });
        return Math.floor(total / this.allComments.length);
      }
      return 0;
    },
  },

  actions: {
    async fetchAllComments() {
      const { data } = await getAllComments(this.storeId);
      this.allComments = data.comments;
    },

    async pageSorter(type, page, sorter) {
      this.sorterInfo.nowType = type;
      this.sorterInfo.nowPage = page;
      this.sorterInfo.nowSorter = sorter;
      const { data } = await getNowComments(this.storeId, page, type, sorter);
      this.comments = data;
    },

    // close modal
    closeModal() {
      this.modalPage = 1;
      this.form = {
        id: 0,
        storeId: 0,
        userId: 0,
        anonymous: true,
        createDate: 0,
        workHours: 0,
        hoildayYear: 2023,
        workDays: 0,
        otherworkDays: 0,
        advantages: [
          { value: '店家環境佳', status: false },
          { value: '交通位置佳', status: false },
          { value: '職員友善', status: false },
          { value: '換宿制度完整', status: false },
          { value: '居住環境佳', status: false },
          { value: '免費供餐', status: false },
          { value: '補助餐費 / 零用金', status: false },
          { value: '考取證照', status: false },
          { value: '體驗課程', status: false },
        ],
        disAdvantages: [
          { value: '店家環境差', status: false },
          { value: '交通位置不便', status: false },
          { value: '職員不友善', status: false },
          { value: '換宿制度不完整', status: false },
          { value: '居住環境差', status: false },
          { value: '換宿狀況與描述不符', status: false },
          { value: '工時過長', status: false },
          { value: '性騷擾', status: false },
        ],
        score: 0,
        description: '',
        like: [],
        dislike: [],
        advantageTotal: 0,
      };
      this.isOpen = false;
    },

    async handleCreateComment() {
      this.form.createDate = new Date().getTime();
      this.form.storeId = parseInt(this.form.storeId, 10);
      try {
        createComment(this.form);
        ElMessage({
          message: '新增成功',
          type: 'success',
        });
      } catch {
        ElMessage({
          message: '新增失敗',
          type: 'error',
        });
      }
      await this.pageSorter('createDate', 1, 'desc');
      await this.fetchAllComments();
      await this.closeModal();
    },

    async handleUpdateComment() {
      try {
        await updateComment(this.form.storeId, this.form);
        ElMessage({
          message: '編輯成功',
          type: 'success',
        });
      } catch {
        ElMessage({
          message: '編輯失敗',
          type: 'error',
        });
      }

      await this.pageSorter(
        this.sorterInfo.nowType,
        this.sorterInfo.nowPage,
        this.sorterInfo.nowSorter,
      );
      const commentDetailStore = useCommentDetailStore();
      await commentDetailStore.fetchComment();
      await this.fetchAllComments();
      await this.closeModal();
    },

    submitComment() {
      if (this.type === 'edit') {
        this.handleUpdateComment();
      } else {
        this.handleCreateComment();
      }
    },

    async handleDeleteComment(commentId) {
      ElMessageBox.alert('確定要刪除評論嗎', '刪除評論', {
        confirmButtonText: '刪除',
        callback: async () => {
          try {
            deleteComment(commentId);
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

          await this.pageSorter(
            this.sorterInfo.nowType,
            this.sorterInfo.nowPage,
            this.sorterInfo.nowSorter,
          );

          await this.fetchAllComments();

          const commentDetailStore = useCommentDetailStore();
          const { isDetailOpen } = storeToRefs(commentDetailStore);

          isDetailOpen.value = false;
        },
      });
    },
  },
});
