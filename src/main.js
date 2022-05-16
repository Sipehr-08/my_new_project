import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import VueCookies from 'vue3-cookies';
import AlifUi from './plugins/aliftech-ui';
import AtToast from '~/plugins/aliftech-ui/toast';
import '@/assets/css/main.css';
import NProgress from 'nprogress';
import { readableDate, readableTime, readableDateMonth } from './utils/filters/dateFilters';
import { priceFormat } from './utils/filters/priceFilter';
import { numberFormat } from './utils/filters/numberFormat';
import { phoneNumberFilter } from './utils/filters/numberFilter';
import { displayQuantity } from '~/utils/parsers';

const app = createApp(App);

app.config.globalProperties.$filters = {
  readableDate,
  readableTime,
  readableDateMonth,
  phoneNumberFilter,
  numberFormat,
  priceFormat,
  displayQuantity,
};

app.config.globalProperties.$toast = AtToast;

app.use(NProgress);
app.use(AlifUi);
app.use(AtToast);
app.use(VueCookies);
app.use(store);
app.use(router);
app.mount('#app');
export default app;
