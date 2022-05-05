import { apiClient } from '~/services/apiClient';

/**
 * Get base data that used everywhere in app
 * @returns {Promise<AxiosResponse<any>>}
 */
const getApp = () => apiClient.get('/app');

export { getApp };
