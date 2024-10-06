import { handleApiErrors } from "./apistatusCodeError";

export const apiRequest = async (api) => {
    try {
        const res = await fetch(api);
        if (res.status >= 200 && res.status < 300) {
            const data = await res.json();
            return { data, status: res.status, error: null };
        }
        return { data: null, null: res.status, error: handleApiErrors(res.status, res.error) };
    }
    catch (err) {
        console.log('hit', err)
        return { data: null, null: 500, error: 'Something went wrong' };
    }
}