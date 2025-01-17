import { api_request } from '$lib/api.js';
import type { LayoutLoad } from './$types';


// use server-side rendering
export const ssr = true;


export const load: LayoutLoad = async ({ route }) => {
    const page_setting = await api_request(`page_setting/?route=${route.id}`);

    return { page_setting };
};