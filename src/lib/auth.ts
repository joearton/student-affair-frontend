import { api_request } from './api';
import { addMessage } from '$lib/stores/messages';
import { goto } from '$app/navigation';
import { user as UserStore } from './stores/user';


export const check_authentication = async (update:boolean = false) => {
    try {
        const user = await api_request(`me/${update ? '?update=true' : ''}`);
        return user;
    } catch (error) {
        return false;
    }
};


export const signin = async (username: string, password: string, captcha: string, captcha_key: string): Promise<boolean> => {
    if (!username || !password || !captcha || !captcha_key) {
        addMessage('error', 'Username, password, and captcha are required.');
        return false;
    }

    try {
        const response = await api_request('auth/', 'POST', { username, password, captcha, captcha_key });

        if (response.error) {
            addMessage('error', response.error, 10000);
            return false;
        }
        
        const { user, access, refresh } = response;

        if (access === undefined || refresh === undefined) {
            addMessage('error', 'Unable to get access token. Please try again later.');
            return false;
        }

        sessionStorage.setItem('access_token', access);
        sessionStorage.setItem('refresh_token', refresh);

        return true;
    } catch (error) {
        if ((error as any).response && (error as any).response.status === 401) {
            addMessage('error', 'Login failed. Please check your username and password.');
        } else {
            addMessage('error', `Error while logging in. Please try again later.`);
        }
        return false;
    }
};


export const logout = () => {
    UserStore.set({
        authenticated: false,
        fullname: '',
        username: '',
        email: '',
        groups: [],
        applications: []
    });
    sessionStorage.removeItem('access_token');
    sessionStorage.removeItem('refresh_token');
    addMessage('success', 'Logged out successfully.');
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
        const response = await api_request('auth/token/refresh/', 'POST', { refresh: refresh_token });
        const { access } = response;

        // Simpan token ke sessionStorage
        sessionStorage.setItem('access_token', access);
        return true;
    } catch (error) {
        return false;
    }
};

