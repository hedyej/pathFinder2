import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3000',
  headers: { 'Content-Type': 'application/json' },
});

instance.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
  ,
);

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 404:

          // go to 404 page
          break;
        case 500:

          // go to 500 page
          break;
        default:
      }
    }
    if (!window.navigator.onLine) {
      alert('網路出了點問題，請重新連線後重整網頁');
      return;
    }
    Promise.reject(error);
  },
);

export default function (method, url, config, data = null) {
  switch (method) {
    case 'post':
      return instance.post(url, data, config);
    case 'get':
      return instance.get(url, { params: data });
    case 'delete':
      return instance.delete(url, { params: data });
    case 'put':
      return instance.put(url, data);
    case 'patch':
      return instance.patch(url, data);
    default:
      return false;
  }
}
