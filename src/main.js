import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import VueCookies from 'vue3-cookies';
import AlifUi from './plugins/aliftech-ui';
import '@/assets/css/main.css';
import NProgress from 'nprogress';

const app = createApp(App);

app.use(NProgress);
app.use(AlifUi);
app.use(VueCookies);
app.use(store);
app.use(router);
app.mount('#app');
export default app;
