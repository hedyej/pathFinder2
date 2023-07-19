import req from '@/apis/http';

// store list
export const getDescScoreStore = () => req('get', '/comments?sort=score&_order=desc&_expand=store');
export const getAscWorkStore = () => req('get', '/comments?sort=workHours&_order=desc&_expand=store');
export const getDesBenefitStore = () => req('get', '/comments?sort=advantageTotal&_order=desc&_expand=store');

// search
export const getResultNum = (word) => req('get', `stores?q=${word}`);
export const getResultStore = (word, page) => req('get', `stores?q=${word}&_page=${page}`);
