import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://test-pathfinder.onrender.com/',
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
          break;
        case 500:
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

export default function (method, url, data = null) {
  switch (method) {
    case 'post':
      return instance.post(url, data);
    case 'get':
      return instance.get(url, { params: data });
    case 'delete':
      return instance.delete(url);
    case 'put':
      return instance.put(url, data);
    case 'patch':
      return instance.patch(url, data);
    default:
      return false;
  }
}
