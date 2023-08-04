import axios from 'axios';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';

const router = useRouter();
let errorMessageDisplayed = false;

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
    if (error.response && !errorMessageDisplayed) {
      switch (error.response.status) {
        case 404:
          router.push({ name: '404' });
          break;

        case 500:
          ElMessage({
            showClose: true,
            message: '程式發生問題',
            type: 'error',
          });
          errorMessageDisplayed = true;
          break;

        default:
          ElMessage({
            showClose: true,
            message: '程式發生問題',
            type: 'error',
          });
          errorMessageDisplayed = true;
      }
    }
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
