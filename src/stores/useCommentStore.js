import axios from 'axios';
import { defineStore } from 'pinia';

export const useCommentStore = defineStore('comment', {
  state: () => ({
    // store card
    sorterInfo: {
      nowPage: 1,
      nowSorter: 'createDate',
      nowType: 'desc',
    },
    averageStoreInfo: {},

    // comment
    comments: {},
    allComments: {},

    // modal
    isOpen: false,
    modalPage: 1,
    storeId: '',
    type: '',
    form: {
      id: 0,
      storeId: 0,
      userId: 1,
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
      replies: [],
      advantageTotal: 0,
    },
  }),

  actions: {
    getAverageInfo(key) {
      let total = 0;
      this.allComments.forEach((comment) => {
        total += comment[key];
      });
      return total === 0 ? '-' : Math.floor(total / this.allComments.length);
    },

    async getAllComments() {
      await axios.get(`/stores/${this.storeId}/comments`).then((res) => {
        this.allComments = res.data;
        this.averageStoreInfo.averageDays = this.getAverageInfo('workDays');
        this.averageStoreInfo.averageHours = this.getAverageInfo('workHours');
        this.averageStoreInfo.averageScore = this.getAverageInfo('score');
      });
    },

    pageSorter(type, page, sorter) {
      this.sorterInfo.nowType = type;
      this.sorterInfo.nowPage = page;
      this.sorterInfo.nowSorter = sorter;
      axios
        .get(
          `/stores/${this.storeId}/comments?_page=${page}&_sort=${type}&_order=${sorter}&_expand=user&_expand=store`,
        )
        .then((res) => {
          this.comments = res.data;
        });
    },

    // close modal
    closeModal() {
      this.modalPage = 1;
      this.form = {
        storeId: 1,
        userId: null,
        anonymous: true,
        createDate: 0,
        workHours: 0,
        workDays: '',
        otherworkDays: 0,
        advantages: [
          { value: '店家環境佳', status: false },
          { value: '交通位置佳', status: false },
          { value: '職員友善', status: false },
          { value: '換宿制度完整', status: false },
          { value: '居住環境佳', status: false },
          { value: '免費供餐', status: false },
          { value: '補助餐費 /零用金', status: false },
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
        replies: [],
        advantageTotal: 0,
      };
      this.isOpen = false;
    },

    async postComment() {
      console.log(`/stores/${this.form.storeId}/comments`, this.form);
      this.form.createDate = new Date().getTime();
      await axios.post(`/stores/${this.form.storeId}/comments`, this.form);
      await this.getAllComments();
      await this.pageSorter('createDate', 1, 'desc');
      await this.closeModal();
    },

    async putComment() {
      await axios.put(`/comments/${this.form.id}`, this.form);
      await this.getAllComments(this.storeId);
      await this.pageSorter(
        this.sorterInfo.nowType,
        this.sorterInfo.nowPage,
        this.sorterInfo.nowSorter,
      );
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
      await axios.delete(`/comments/${commentId}`);
    },
  },
});
