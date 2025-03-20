import { createApp } from 'vue';
import router from './router';
import { createPinia } from 'pinia';
import axios from 'axios';
node_modules/bootstrap/dist/css/bootstrap.min.css
axios.defaults.baseURL = 'http://127.0.0.1:8000/api';
const token = localStorage.getItem('token');
if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

import App from './App.vue';

const app = createApp(App);
app.use(router);
app.use(createPinia());
app.mount('#app');
