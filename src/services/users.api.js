import { apiClient } from '~/services/apiClient';

/**
 * Method to get all users list
 * @param params
 * @returns {Promise<AxiosResponse<any>>}
 */
const getAllUsersRequest = params => apiClient.get('/users', { params });

/**
 * Method to get user by id
 * @param userId
 * @returns {Promise<AxiosResponse<any>>}
 */
const getUserRequest = userId => apiClient.get(`/users/${userId}`);

export { getAllUsersRequest, getUserRequest };
