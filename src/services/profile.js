import { apiClient } from '~/services/apiClient';

/**
 * API method to get contacts
 * @param params
 * @returns {Promise<AxiosResponse<any>>}
 */
const getMyContactsRequest = params => apiClient.get('/my/contacts', { params });

/**
 * Method to get user rewards
 * @param params
 * @returns {Promise<AxiosResponse<any>>}
 */
const getRewardsRequest = params => apiClient.get(`/rewards`, { params });
/**
 * Method to get user rewards
 * @param params
 * @returns {Promise<AxiosResponse<any>>}
 */
const getMyRewardsRequest = params => apiClient.get(`my/rewards`, { params });

/**
 * API method to get user documents
 * @param params
 * @returns {Promise<AxiosResponse<any>>}
 */
const getDocumentsRequest = params => apiClient.get(`/my/documents`, { params });

/**
 * Method to get user educations
 * @param params
 * @returns {Promise<AxiosResponse<any>>}
 */
const getEducationsRequest = params => apiClient.get(`/my/educations`, { params });

/**
 * Method to get user all lateness
 * @param params
 * @returns {Promise<AxiosResponse<any>>}
 */
const getLatenessRequest = params => apiClient.get(`/my/time-tracker-logs`, { params });

/**
 * Method to get employee all lateness
 * @param params
 * @returns {Promise<AxiosResponse<any>>}
 */
const getEmployeeLatenessRequest = params => apiClient.get(`/employee-time-tracker`, { params });

/**
 * Method to get user contract
 * @param params
 * @returns {Promise<AxiosResponse<any>>}
 */
const getContractRequest = params => apiClient.get(`/my/contract-supplements`, { params });

/**
 * Method to get user experiences
 * @param params
 * @returns {Promise<AxiosResponse<any>>}
 */
const getExperiencesRequest = params => apiClient.get('/my/experiences', { params });

/**
 * Method to get vacations schedules
 * @param params
 * @returns {Promise<AxiosResponse<any>>}
 */
const getVacationSchedulesRequest = params => apiClient.get('/my/vacation-schedules', { params });

/**
 * Method to create vacation
 * @param params
 * @returns {Promise<AxiosResponse<any>>}
 */
const createVacationScheduleRequest = params => apiClient.post('/my/vacation-schedules', params);

/**
 * Method to get vacation trackers
 * @param params
 * @returns {Promise<AxiosResponse<any>>}
 */
const getVacationTrackersRequest = params => apiClient.get('/my/vacation-tracker', { params });

/**
 * Method to update user password
 * @param password
 * @returns {Promise<AxiosResponse<any>>}
 */
const updatePasswordRequest = password => apiClient.put('/my/change-password', password);

/**
 * Method to get options
 * @param params
 * @returns {Promise<AxiosResponse<any>>}
 */
const getOptionsRequest = params => apiClient.get('/my/options', { params });

/**
 * Method to get stocks and options amount
 * @returns {Promise<AxiosResponse<any>>}
 */
const getStocksAndOptionsAmountRequest = () => apiClient.get('/my/options/stocks-and-options');

/**
 * Method to get stock price for options
 * @param params
 * @return {Promise<AxiosResponse<any>>}
 */
const getStockPriceRequest = params => apiClient.get('/stock-price', { params });

/**
 * Method to get referrals
 * @returns {Promise<AxiosResponse<any>>}
 */
const getReferralsRequest = params => apiClient.get('/users/referrals', { params });
/**
 * Method to get referrals
 * @returns {Promise<AxiosResponse<any>>}
 */
const getMyReferralsRequest = params => apiClient.get('/my/referrals', { params });

/**
 * Method to get sent feedbacks
 * @returns {Promise<AxiosResponse<any>>}
 */
const getSentFeedbacksRequest = params => apiClient.get('/my/feedbacks/given', { params });

/**
 * Method to get received feedbacks
 * @returns {Promise<AxiosResponse<any>>}
 */
const getReceivedFeedbacksRequest = params => apiClient.get('/my/feedbacks/received', { params });

/**
 * Method to get user dollar exchange offer
 * @param params
 * @returns {Promise<AxiosResponse<any>>}
 */
const getDollarExchangeOfferRequest = params => apiClient.get('/my/dollar-exchange-offers', { params });

/**
 * Method to dollar exchange
 * @param params
 * @returns {Promise<AxiosResponse<any>>}
 */
const createDollarExchangeOfferRequest = params => apiClient.post('/my/dollar-exchange-offers', params);

/**
 * Method to get advanced salary
 * @param params
 * @returns {Promise<AxiosResponse<any>>}
 */
const getAdvancedSalaryRequest = params => apiClient.get('/my/advances', { params });

/**
 * Method to create advanced salary
 * @param params
 * @returns {Promise<AxiosResponse<any>>}
 */
const createAdvancedSalaryRequest = params => apiClient.post('/my/advances', params);

export {
  getMyContactsRequest,
  getRewardsRequest,
  getMyRewardsRequest,
  getDocumentsRequest,
  getEducationsRequest,
  getLatenessRequest,
  getEmployeeLatenessRequest,
  getContractRequest,
  getExperiencesRequest,
  getVacationSchedulesRequest,
  createVacationScheduleRequest,
  getVacationTrackersRequest,
  updatePasswordRequest,
  getOptionsRequest,
  getStocksAndOptionsAmountRequest,
  getStockPriceRequest,
  getReferralsRequest,
  getDollarExchangeOfferRequest,
  createDollarExchangeOfferRequest,
  getAdvancedSalaryRequest,
  createAdvancedSalaryRequest,
  getSentFeedbacksRequest,
  getReceivedFeedbacksRequest,
  getMyReferralsRequest,
};
