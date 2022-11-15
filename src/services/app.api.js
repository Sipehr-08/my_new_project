import { apiClient } from '~/services/apiClient';
/**
 * Get base data that used everywhere in app
 * @returns {Promise<AxiosResponse<any>>}
 */
const createApplicationRequest = params => apiClient.post('/reference', params);

/**
 * Get base data that used everywhere in app
 * @returns {Promise<AxiosResponse<any>>}
 */
const getApplicationsRequest = () => apiClient.get('/reference');

export { getApplicationsRequest, createApplicationRequest };
