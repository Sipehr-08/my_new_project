import { createApp } from 'vue';
import App from '~/App.vue';
import router from '~/router';
import VueCookies from 'vue3-cookies';
import Toast, { PluginOptions } from 'vue-toastification';
import '@/assets/css/index.css';
import 'vue-toastification/dist/index.css';
const app = createApp(App);

const options: PluginOptions = {};

app.use(Toast, options);
// app.use(Toaster);
app.use(VueCookies);
app.use(router);
app.mount('#app');
export default app;
