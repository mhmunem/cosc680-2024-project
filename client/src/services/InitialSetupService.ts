import axios from 'axios';
import { API_URL, API_ENDPOINTS } from '../utils/constants';


async function request(method: 'get' | 'post' | 'put' | 'delete', url: string, data?: null) {
    try {
        return (await axios({ method, url, data })).data
    } catch (error) {
        console.error(`${method.toUpperCase()} request error:`, error);
        throw error;
    }
}

export function getInitialSetupMessage(): Promise<string> {
    return (request('get', `${API_URL}${API_ENDPOINTS.WELCOME_API}`)) as Promise<string>
}

export function getInitialSetup() {
    return request('get', `${API_URL}${API_ENDPOINTS.GET_DATA}`);
}

export function postInitialSetup() {
    return request('post', `${API_URL}${API_ENDPOINTS.POST_DATA}`);
}

export function putInitialSetup(id: string) {
    return request('put', `${API_URL}${API_ENDPOINTS.PUT_DATA.replace(':id', id)}`);
}

export function deleteInitialSetup(id: string) {
    return request('delete', `${API_URL}${API_ENDPOINTS.DELETE_DATA.replace(':id', id)}`
    );
}

export function getSearch(name: string, sort_by: string, sort_direction: string) {
    return request(
        'get', `${API_URL}${API_ENDPOINTS.GET_SEARCH_PRODUCT}?name=${name}&sort_by=${sort_by}&sort_direction=${sort_direction}`
    );
}

export function getPriceHistory(product_id: number, store_ids: number[]) {
    const storeIdsParam = store_ids.join(',');
    return request(
        'get', `${API_URL}${API_ENDPOINTS.GET_PRICE_HISTORY}?product_id=${product_id}&store_ids=${storeIdsParam}`
    );
}

