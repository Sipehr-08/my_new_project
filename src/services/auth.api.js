import { apiClient, clearCookie } from '~/services/apiClient';
import app from '../main';
import { objCheckType } from '~/utils/computeFunc';
import router from '~/router';

const END_POINT = '/auth';

/**
 * Set authentication setting after login
 * @param {Object} res
 * @param rememberMe
 * @returns {*}
 */
const setAuth = (res, rememberMe) => {
  const data = res?.data;
  const accessToken = data?.access_token;
  const tokenType = data?.token_type;
  const expiresIn = data?.expires_in ?? 1;
  const token = tokenType + ' ' + accessToken;

  if (objCheckType(accessToken, 'string') && objCheckType(tokenType, 'string')) {
    const $cookies = app.config.globalProperties?.$cookies;
    if ($cookies) {
      clearCookie().finally(() => {
        $cookies.set('auth', token, {
          expires: rememberMe ? `${expiresIn}m` : '1D',
        });
      });
      apiClient.defaults.headers['Authorization'] = token;
    } else app.config.globalProperties?.$toast.error('[FE] Ошибка, не можем получить доступ к куки');
  } else app.config.globalProperties?.$toast.error('[FE] Ошибка, сервис не передал нужные параметры');
  return res;
};

/**
 * @param {Object} params - Request params
 * @returns {Promise<*>}
 */
const login = params =>
  apiClient
    .post(`${END_POINT}/login`, { remember_me: true, ...params })
    .then(response => setAuth(response, params.remember_me));

const logout = () =>
  apiClient.post('/auth/logout').then(() => {
    clearCookie().finally(() => {
      delete apiClient.defaults.headers['Authorization'];
      router.push({ name: 'auth' }).finally(() => {});
    });
  });

/**
 * @param {Object} params - Request params
 * @returns {Promise<AxiosResponse<any>>}
 */
const changePassword = params => apiClient.patch(`${END_POINT}/password`, params);

export { login, logout, changePassword };
