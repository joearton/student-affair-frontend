import { api_request } from '$lib/api.js';
import { stored_preference } from '$lib/stores/blog_preference';
import type { LayoutLoad } from './$types';


// use server-side rendering
export const ssr = true;


export const load: LayoutLoad = async ({ route }) => {
    const response = await api_request(`preferences/?route=${route.id}`);
    let preference = await response;
    if (! preference) {
        return { preference: stored_preference }
    } else {
        preference.live = true; 
        return { preference }
    }
}