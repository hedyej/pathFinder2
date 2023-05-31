import axios from 'axios';
import { defineStore } from 'pinia';

export const useCommentModalStore = defineStore('commentModal', {
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

    async pageSorter(type, page, sorter) {
      this.sorterInfo.nowType = type;
      this.sorterInfo.nowPage = page;
      this.sorterInfo.nowSorter = sorter;
      await axios.get(`/stores/${this.storeId}/comments?_start=${page}&_end=${page + 10}&_sort=${type}&_order=${sorter}`).then(
        (res) => {
          this.comments = res.data;
        },
      );
    },

    getNewComments(newPage) {
      if (newPage === 1) {
        axios.get(`/stores/${this.storeId}/comments?_start=${newPage}&_end=${newPage + 10}&_sort=${this.sorterInfo.nowType}&_order=${this.sorterInfo.nowSorter}`).then(
          (res) => {
            this.comments = res.data;
          },
        );
      } else {
        axios.get(`/stores/${this.storeId}/comments?_start=${(newPage - 1) * 10}&_end=${(newPage - 1) * 10 + 11}&_sort=${this.sorterInfo.nowType}&_order=${this.sorterInfo.nowSorter}`).then(
          (res) => {
            this.comments = res.data;
          },
        );
      }
    },

    getComments(sorter) {
      if (sorter === 'scoreOrderAsc') {
        this.pageSorter('score', 1, 'asc');
      } else if (sorter === 'scoreOrderDesc') {
        this.pageSorter('score', 1, 'desc');
      } else if (sorter === 'DateOrderAsc') {
        this.pageSorter('createDate', 1, 'desc');
      } else if (sorter === 'DateOrderDesc') {
        this.pageSorter('createDate', 1, 'asc');
      }
    },

    async postComment(form) {
      await axios.post(`/stores/${this.form.storeId}/comments`, form);
      await this.getAllComments();
      await this.getComments('DateOrderAsc');
    },

    async putComment(form, commentId) {
      await axios.put(`/comments/${commentId}`, form);
      // await this.pageSorter(
      //   this.sorterInfo.nowSorter,
      //   this.sorterInfo.nowPage,
      //   this.sorterInfo.nowType,
      // );
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
