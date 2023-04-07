import { createApp } from 'vue';
import { createPinia } from 'pinia';
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

app.use(createPinia());
app.use(VueAxios, axios);
app.use(router);
app.component('VueLoading', Loading);
app.mount('#app');
