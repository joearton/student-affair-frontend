import type { PageLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import { check_authentication } from '$lib/auth';

export const load: PageLoad = async ({ url }) => {
    const user = await check_authentication();
    const scholarship = url.searchParams.get('scholarship');

    if (! user) {
        redirect(307, '/auth/signin');
    } else {
        if (scholarship) {
            redirect(307, `/account/student/scholarship/${scholarship}`);
        } else {
            redirect(307, '/account/');
        }
    }
}
