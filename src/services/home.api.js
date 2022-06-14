import { apiClient } from './apiClient';

/**
 * Method to get upcoming birthday
 * @param params
 * @returns {Promise<AxiosResponse<any>>}
 */
const getUpcomingBirthdaysRequest = params => apiClient.get('/users/upcoming-birthdays', { params });

/**
 * Method to get new employees list
 * @returns {Promise<AxiosResponse<any>>}
 */
const getNewEmployeesRequest = () => apiClient.get('/users/recently-joined-employees?per_page=10');

export { getUpcomingBirthdaysRequest, getNewEmployeesRequest };
