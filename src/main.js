import { createApp } from 'vue';
import { createPinia } from 'pinia';
import {
  Form, Field, ErrorMessage, defineRule, configure,
} from 'vee-validate';
import AllRules from '@vee-validate/rules';
import { localize, setLocale } from '@vee-validate/i18n';
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json';
import 'bootstrap/dist/css/bootstrap.css';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';
import axios from 'axios';
import VueAxios from 'vue-axios';
import 'bootstrap';
import App from './App.vue';
import router from './router';
import './assets/_all.scss';

import './assets/main.css';

const app = createApp(App);

// 設定vee-validate
Object.keys(AllRules).forEach((rule) => {
  defineRule(rule, AllRules[rule]);
});
configure({
  generateMessage: localize({ zh_TW: zhTW }), // 載入繁體中文語系
  validateOnInput: true, // 當輸入任何內容直接進行驗證
});
// 設定預設語系
setLocale('zh_TW');

app.use(createPinia());
app.use(VueAxios, axios);
app.use(router);
app.component('VueLoading', Loading);
app.component('VForm', Form);
app.component('VField', Field);
app.component('ErrorMessage', ErrorMessage);
app.mount('#app');
