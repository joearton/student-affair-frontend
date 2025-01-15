import type { PageLoad } from './$types';
import { api_request } from '$lib/api';
import { redirect } from '@sveltejs/kit';
import { addMessage } from '$lib/stores/messages';


export const load: PageLoad = async ({ params }) => {
    const activation = await api_request(`auth/activate/${params.token}`, 'POST');
    if (activation.status == true) {
        addMessage('success', 'Account activated successfully');
        redirect(307, '/auth/signin');
    } else {
        redirect(307, '/');
    }
}
