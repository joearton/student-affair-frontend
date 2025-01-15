import axios from 'axios';
import { refresh_token } from './auth';
import { redirect } from '@sveltejs/kit';
import { PUBLIC_BASE_URL } from '$env/static/public';

export const baseURL = PUBLIC_BASE_URL;
const api = axios.create({
    baseURL: baseURL,
});


// Menambahkan token ke header jika ada, aktifkan jika hanya client side
if (typeof window !== 'undefined') {
    api.interceptors.request.use((config) => {
        const token = sessionStorage.getItem('access_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    });
}


export const api_request = async (endpoint: string, method: string = 'GET', data: any = null) => {
    try {
        const response = await api({
            url: endpoint,
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            data: data,
        });
        return response.data;
    } catch (err) {
        if (axios.isAxiosError(err)) {
            if (err.response?.status === 401) {
                console.error('Unauthorized request. Attempting to refresh token.');
                return
                const token_refreshed = await refresh_token();
                if (token_refreshed) {
                    // Retry the original request
                    const retry_response = await api({
                        url: endpoint,
                        method: method,
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        data: data,
                    });
                    return retry_response.data;
                } else {
                    console.error('Token refresh failed. Please log in again.');
                    redirect(307, '/auth/signin');
                }
            } else {
                console.error(`Request failed with status code ${err.response?.status}`);
                return err.response?.data;
            }
        } else {
            console.error('An unexpected error occurred');
        }
    }
};


// Menyediakan export default untuk axios jika hanya butuh axios
export default api;
