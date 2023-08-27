import axios from 'axios';
import { ElMessage } from 'element-plus';

let errorMessageDisplayed = false;

const instance = axios.create({
  baseURL: 'https://test-pathfinder.onrender.com/',
  headers: { 'Content-Type': 'application/json' },
});

instance.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error),
);

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!window.navigator.onLine && !errorMessageDisplayed) {
      ElMessage({
        showClose: true,
        message: '網路出了點問題，請重新連線後重整網頁',
        type: 'error',
      });
      errorMessageDisplayed = true;
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
