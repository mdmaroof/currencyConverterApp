import { Alert } from 'react-native';
import { apiRequest } from "../helper/apiRequest";

const API_URL = 'https://www.floatrates.com/daily/usd.json';

export const fetchCurrencyRates = async () => {
    const res = await apiRequest(API_URL);
    if (res.data) {
        return res.data;
    }
    throw new Error(res.error)
}