import type { PageLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import { check_authentication } from '$lib/auth';

export const load: PageLoad = async () => {
    const user = await check_authentication();

    if (! user) {
        redirect(307, '/auth/signin');
    } else {
        redirect(307, '/account');
    }

}
