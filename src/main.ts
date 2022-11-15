import { createApp } from 'vue';
import App from '~/App.vue';
import router from '~/router';
import VueCookies from 'vue3-cookies';
import '@/assets/css/index.css';
import NProgress from 'nprogress';
const app = createApp(App);

// @ts-ignore
app.use(NProgress);
// app.use(Toaster);
app.use(VueCookies);
app.use(router);
app.mount('#app');
export default app;
