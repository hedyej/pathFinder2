import req from '@/apis/http';

// last comment
export const getLastComments = () => req('get', '/comments?_expand=store&_expand=user');
