import { apiRequest } from "../helper/apiRequest";

const API_URL = 'https://www.floatrates.com/daily/usd.json';

export const fetchCurrencyRates = async () => {
    const data = await apiRequest(API_URL);
    return data;

}