<template>
{{ stores }}
<button @click="getStores "></button>
</template>
<script setup >
import { storeToRefs } from 'pinia';
import { useStoreStore } from '@/stores/useStoreStore';
// 以解構的方式import storeToRefs這個方法
// 使用函式表達式給變數countStore賦值，這邊變數會習慣用import進來的檔案名稱並去除use命名，只要看到Store就是與pinia有關。
const storeStore = useStoreStore();
// 使用解構的方式取得useCounterStore()內的函式
const { getStores } = storeStore;
// 也可以使用 countStore.increment()來執行函式
// 使用useCounterStore()的變數，不能直接解構變數，會去除掉proxy也就是解包，會造成資料無法響應式，所以要用到storeToRefs這個方法把變數在塞回ref內
const { stores } = storeToRefs(storeStore);
</script>
