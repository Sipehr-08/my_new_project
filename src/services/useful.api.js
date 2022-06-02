import { apiClient } from '~/services/apiClient';

/**
 * Method to get websites list from api
 * @param params
 * @returns {Promise<AxiosResponse<any>>}
 */
const getWebsitesRequest = params => apiClient.get('/websites', { params });

/**
 * Method to get services list from api
 * @param params
 * @returns {Promise<AxiosResponse<any>>}
 */
const getProductsRequest = params => apiClient.get('/products', { params });

/**
 * Method to get telegram bots list
 * @param params
 * @returns {Promise<AxiosResponse<any>>}
 */
const getBotsRequest = params => apiClient.get('/bots', { params });

/**
 * Method to get telegram groups list
 * @param params
 * @returns {Promise<AxiosResponse<any>>}
 */
const getGroupsRequest = params => apiClient.get('/groups', { params });

export { getWebsitesRequest, getProductsRequest, getBotsRequest, getGroupsRequest };
