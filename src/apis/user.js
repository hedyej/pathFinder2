import req from '@/apis/http';

export const getUsers = () => req('get', '/users');
export const createUser = (data) => req('post', '/users', data);
export const updateUser = (id, data) => req('put', `/users/${id}`, data);
