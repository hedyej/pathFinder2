import req from '@/apis/http';

// all last comments
export const getLastComments = () => req('get', '/comments?_expand=store&_expand=user');

// comment & replys
export const getCommentAndReplys = (id) => req('get', `/comments/${id}?_expand=user&_embed=replys`);

// comment by store
export const getAllComments = (id) => req('get', `/stores/${id}?_embed=comments`);
export const createComment = (form) => req('post', '/comments', form);
export const updateComment = (id, form) => req('put', `/comments/${id}`, form);
export const deleteComment = (id) => req('delete', `/comments/${id}`);
export const getNowComments = (storeId, page, type, sorter) => req('get', `/stores/${storeId}/comments?_page=${page}&_sort=${type}&_order=${sorter}&_expand=user&_expand=store&_embed=replys`);
