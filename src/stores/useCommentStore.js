import axios from 'axios';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useCommentStore = defineStore('comment', () => {
  // 所有評論
  const allComments = ref([]);
  const getAllComments = () => {
    axios.get('/comments').then((res) => { allComments.value = res.data; });
  };

  // 特定評論
  const comments = ref([]);
  const store = ref({});

  const getComments = (storeId) => {
    axios.get(`/stores/${storeId}?_embed=comments`).then((res) => { comments.value = res.data.comments; store.value = res.data; console.log('商店資料', store.value); });
  };
  const postComment = (storeId, comment) => {
    axios.post('/comments/', comment).then(() => { getComments(storeId); });
  };
  const putComment = (storeId, commentId) => {
    axios.put(`/comments/${commentId}`).then(() => { getComments(storeId); });
  };
  const deleteComment = (storeId, commentId) => {
    axios.delete(`/comments/${commentId}`).then(() => { getComments(storeId); });
  };

  return {
    comments, getComments, postComment, putComment, deleteComment, allComments, getAllComments,
  };
});
