import req from '@/apis/http';

export const createReply = (reply) => req('post', '/replys', reply);
export const deleteReply = (id) => req('delete', `/replys/${id}`);
