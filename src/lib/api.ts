import axios from 'axios';


const baseURL = import.meta.env.VITE_BASE_URL;
const api = axios.create({
    baseURL: baseURL,
});


// Menambahkan token ke header jika ada, aktifkan jika hanya client side
if (typeof window !== 'undefined') {
    api.interceptors.request.use((config) => {
        const token = localStorage.getItem('access_token'); // Ambil token dari localStorage
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    });
}


// Function untuk melakukan request dengan menggunakan Axios
export const apiRequest = async (endpoint:string, method:string = 'GET') => {
    try {
        const response = await api({
            url: endpoint,
            method: method,
            headers: {
                'Content-Type': 'application/json', 
            },
        });
        return response.data;
    } catch (err) {
        console.error(`Unable to request ${endpoint}`);
    }
};


// API fallback menggunakan fetch jika diperlukan
export const apiFetch = async (endpoint:string, options = {}) => {
    const token = localStorage.getItem('access_token');
    const headers = {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
    };

    const response = await fetch(`${baseURL}/${endpoint}`, {
        ...options,
        headers,
    });

    if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
    }

    return response.json();
};


// Menyediakan export default untuk axios jika hanya butuh axios
export default api;
