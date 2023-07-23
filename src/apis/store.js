import req from '@/apis/http';

// search result
export const getStores = (queryParams) => req('get', 'stores', queryParams);

// store by comment
export const getStoresByComment = (queryParams) => req('get', 'comments', queryParams);

// store
export const getStore = (id) => req('get', `stores/${id}`);
