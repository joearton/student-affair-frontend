import { api_request } from './api';
import { addMessage } from './stores/messages';
import { goto } from '$app/navigation';


export const check_authentication = async () => {
    try {
        const user = await api_request('me/');
        return user;
    } catch (error) {
        return false;
    }
};


export const login = async (username: string, password: string): Promise<{ errorMessage: string, successMessage: string }> => {
    let errorMessage = '';
    let successMessage = '';

    if (!username || !password) {
        errorMessage = 'Username dan password harus diisi.';
        return { errorMessage, successMessage };
    }

    try {
        const response = await api_request('token/', 'POST', { username, password });
        const { access, refresh } = response;

        // Simpan token ke sessionStorage
        sessionStorage.setItem('access_token', access);
        sessionStorage.setItem('refresh_token', refresh);

        successMessage = 'Login berhasil!';
        errorMessage = ''; 
    } catch (error) {
        if ((error as any).response && (error as any).response.status === 401) {
            errorMessage = 'Login gagal. Username atau password salah.';
        } else {
            errorMessage = 'Terjadi kesalahan saat mencoba login.';
        }
        successMessage = ''; // Clear previous success message
    }

  return { errorMessage, successMessage };
};


export const logout = () => {
    sessionStorage.removeItem('access_token');
    sessionStorage.removeItem('refresh_token');
    addMessage('success', 'Logout berhasil.');
    goto('/auth/signin');
};


export const is_authenticated = (): boolean => {
    return !!sessionStorage.getItem('access_token');
};


export const refresh_token = async (): Promise<boolean> => {
    const refresh_token = sessionStorage.getItem('refresh_token');
    if (!refresh_token) {
        return false;
    }

    try {
        const response = await api_request('token/refresh/', 'POST', { refresh: refresh_token });
        const { access } = response;

        // Simpan token ke sessionStorage
        sessionStorage.setItem('access_token', access);
        return true;
    } catch (error) {
        return false;
    }
};

