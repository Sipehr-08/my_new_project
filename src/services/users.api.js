import { apiClient } from '~/services/apiClient';

/**
 * Method to get all users list
 * @param params
 * @returns {Promise<AxiosResponse<any>>}
 */
const getAllUsersRequest = params => apiClient.get('/users', { params });

export { getAllUsersRequest };
