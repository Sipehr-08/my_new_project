import axios from 'axios';
import { throttleAdapterEnhancer } from 'axios-extensions';
import router from '~/router';
import { parseErrorsFromResponse } from '~/utils/parsers';
import { objCheckType } from '~/utils/computeFunc';
import app from '~/main';
import { useCookies } from 'vue3-cookies';
import { useToast } from 'vue-toastification';
const toast = useToast();

const { cookies } = useCookies();

const throttleConfig = {
  threshold: 1000,
};

const apiClient = axios.create({
  baseURL: `${process.env.VUE_APP_BACKEND_API}api/`,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  adapter: throttleAdapterEnhancer(axios.defaults.adapter, throttleConfig),
});

const generateErrorToaster = errors => {
  if (errors && objCheckType(errors, 'string')) {
    toast.error(errors);
  } else if (errors && errors.length) {
    errors.forEach(error => {
      toast.error(error);
    });
  }
};

const clearCookie = () =>
  cookies
    ? new Promise((resolve, reject) => {
        try {
          cookies.remove('auth');
          resolve();
        } catch (e) {
          reject(e);
        }
      })
    : (() => {
        const error = '[FE]Ошибка, не можем получить доступ к `cookie` на вашем устройстве';
        generateErrorToaster(error);
        return Promise.reject(error);
      })();

const authInterceptor = config => {
  const authToken = cookies?.get('auth');
  if (authToken) {
    config.headers['Authorization'] = authToken;
  }
  return config;
};

const errorStatus = {
  400: function () {
    app.config.globalProperties?.$toast.warning('Данные не найдены');
  },
  401: function () {
    cookies.remove('auth');
    app.config.globalProperties?.$toast.warning('Время авторизации закончилось');
    router.push('/auth');
  },
  // 404: function () {
  //   router.push({ name: 'not-found' });
  // },
  419: function () {
    router.back() || router.push('/');
  },
  // 500: function () {
  //   router.push({ name: 'server-error' });
  // },
};

const errorInterceptor = error => {
  let errors = parseErrorsFromResponse(error);
  if (error.response.status in errorStatus) {
    errorStatus[error.response.status]();
  } else {
    generateErrorToaster(errors);
  }
  return Promise.reject(error);
};

const responseInterceptor = response => response;

apiClient.interceptors.response.use(responseInterceptor, errorInterceptor);
apiClient.interceptors.request.use(authInterceptor);

export { apiClient, clearCookie };
