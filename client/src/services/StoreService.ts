import { API_URL, API_ENDPOINTS } from '../utils/constants';

export const getStores = () => fetch(`${API_URL}${API_ENDPOINTS.GET_STORES_DATA}`);
export const getChains = () => fetch(`${API_URL}${API_ENDPOINTS.GET_CHAINS_DATA}`);