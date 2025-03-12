import type { LayoutLoad } from './$types';
import { browser } from '$app/environment';
import { api_request } from '$lib/api.js';
import { preference } from '$lib/stores/blog_preference';
import { get } from 'svelte/store';
import '$lib/i18n';
import { locale, waitLocale } from 'svelte-i18n'


export const load: LayoutLoad = async () => {
    const preference_store = get(preference);

    if (preference_store && !preference_store.site) {
        const response = await api_request('preference/');
        preference.set(response);
    }

    if (browser) {
		locale.set('id')
	}
    await waitLocale()
    return { preference: get(preference) };
};