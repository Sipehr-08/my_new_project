import { apiClient } from '~/services/apiClient';

/**
 * API method to get news
 * @param params
 * @returns {Promise<AxiosResponse<any>>}
 */
const getNewsRequest = params => apiClient.get('/news', { params });

/**
 * Method to get news by id
 * @param newsId
 * @returns {Promise<AxiosResponse<any>>}
 */
const getNewsByIdRequest = newsId => apiClient.get(`/news/${newsId}`);

export { getNewsRequest, getNewsByIdRequest };
