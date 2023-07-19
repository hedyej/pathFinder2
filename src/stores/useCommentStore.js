import axios from 'axios';
import { defineStore, storeToRefs } from 'pinia';
import { ElMessage, ElMessageBox } from 'element-plus';
import { useCommentDetailStore } from '@/stores/useCommentDetailStore';

export const useCommentStore = defineStore('comment', {
  state: () => ({
    // store card
    sorterInfo: {
      nowPage: 1,
      nowSorter: 'createDate',
      nowType: 'desc',
    },
    averageStoreInfo: {},
    defaultForm: {
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

  actions: {
    async getAllComments(id) {
      const { data } = await axios.get(`/stores/${id}?_embed=comments`);
      this.allComments = data.comments;
    },
    getAverageInfo(key) {
      let total = 0;
      this.comments.forEach((comment) => {
        total += comment[key];
      });
      return total === 0 ? '-' : Math.floor(total / this.comments.length);
    },

    getStoreInfo() {
      this.averageStoreInfo.averageDays = this.getAverageInfo('workDays');
      this.averageStoreInfo.averageHours = this.getAverageInfo('workHours');
      this.averageStoreInfo.averageScore = this.getAverageInfo('score');
    },

    async pageSorter(type, page, sorter) {
      this.sorterInfo.nowType = type;
      this.sorterInfo.nowPage = page;
      this.sorterInfo.nowSorter = sorter;
      await axios
        .get(
          `/stores/${this.storeId}/comments?_page=${page}&_sort=${type}&_order=${sorter}&_expand=user&_expand=store&_embed=replys`,
        )
        .then((res) => {
          this.comments = res.data;
        });
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

    async postComment() {
      this.form.createDate = new Date().getTime();
      this.form.storeId = parseInt(this.form.storeId, 10);
      try {
        await axios.post(`/stores/${this.form.storeId}/comments`, this.form);
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
      await this.getStoreInfo();
      await this.closeModal();
    },

    async putComment() {
      try {
        await axios.put(`/comments/${this.form.id}`, this.form);
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
      await this.getStoreInfo(this.storeId);

      const commentDetailStore = useCommentDetailStore();
      await commentDetailStore.getComment();

      await this.closeModal();
    },

    submitComment() {
      if (this.type === 'edit') {
        this.putComment();
      } else {
        this.postComment();
      }
    },

    async deleteComment(commentId) {
      ElMessageBox.alert('確定要刪除評論嗎', '刪除評論', {
        confirmButtonText: '刪除',
        callback: async () => {
          try {
            await axios.delete(`/comments/${commentId}`);
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
          await this.getStoreInfo();

          const commentDetailStore = useCommentDetailStore();
          const { isDetailOpen } = storeToRefs(commentDetailStore);

          isDetailOpen.value = false;
        },
      });
    },
  },
});
