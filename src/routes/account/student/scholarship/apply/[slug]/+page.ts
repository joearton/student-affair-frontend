

import type { PageLoad } from './$types';
import { api_request } from '$lib/api';
import { addMessage } from '$lib/stores/messages';
import { redirect } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';


export const load: PageLoad = async ({ params }) => {
    const scholarship_code = params.slug;
    const response = await api_request('scholarship_application/', 'POST', { code: scholarship_code });
    if (response.scholarship) {
        addMessage('success', 'Please fill out the form to apply for this scholarship.');
        redirect(301, `/account/student/myscholarship/${response.code}`);
    } else {
        addMessage('error', response.message);
        error(420, response.message);
    }
}
