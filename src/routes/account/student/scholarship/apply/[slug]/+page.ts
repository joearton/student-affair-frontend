

import type { PageLoad } from './$types';
import { api_request } from '$lib/api';

export const load: PageLoad = async ({ params }) => {
    const code = params.slug.split('---')[1];
    const application = await api_request('scholarship_application/', 'POST', { code: code });
    return {
        title: 'Scholarship Application',
    }
}