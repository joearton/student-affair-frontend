import { api_request } from '$lib/api.js';
import { preference } from '$lib/stores/blog_preference';
import { get } from 'svelte/store';
import type { LayoutLoad } from './$types';

export const ssr = true;

export const load: LayoutLoad = async () => {
    const preference_store = get(preference);

    if (preference_store && !preference_store.site) {
        const response = await api_request('preference/');
        preference.set(response);
    }

    return { preference: get(preference) };
};