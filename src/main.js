import { createApp } from 'vue';
import '@/assets/styles/element/index.scss';
import ElementPlus from 'element-plus';
import '@/assets/styles/custiomized/all.scss';
import axios from 'axios';
import VueAxios from 'vue-axios';
import { createPinia } from 'pinia';

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core';

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

/* import specific icons */
import { fas } from '@fortawesome/free-solid-svg-icons';
import App from './App.vue';
import router from './router';

/* add icons to the library */
library.add(fas);

axios.defaults.baseURL = 'http://localhost:3000';
const app = createApp(App);

app.use(VueAxios, axios);
app.provide('axios', app.config.globalProperties.axios);
app.component('font-awesome-icon', FontAwesomeIcon);
app.use(createPinia());
app.use(ElementPlus);
app.use(router);

app.mount('#app');
