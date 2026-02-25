

import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
    const code = params.slug;
    redirect(301, `/account/`);
}