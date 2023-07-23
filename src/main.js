import { createApp } from 'vue';
import '@/assets/styles/element/index.scss';
import ElementPlus from 'element-plus';
import '@/assets/styles/custiomized/all.scss';
import { createPinia } from 'pinia';
import vue3GoogleLogin from 'vue3-google-login';

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';

import App from './App.vue';
import router from './router';

router.afterEach(() => {
  window.scrollTo(0, 0);
});

/* add icons to the library */
library.add(fas);

const app = createApp(App);

app.component('font-awesome-icon', FontAwesomeIcon);
app.use(createPinia());
app.use(ElementPlus);
app.use(router);
app.use(vue3GoogleLogin, {
  clientId: '625274834135-ahhev6b8a6lq8gugn576fvosai27s6i5.apps.googleusercontent.com',
});

app.mount('#app');
