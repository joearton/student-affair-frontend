

import type { PageLoad } from './$types';
import { get_scholarship } from '$lib/objects/sch_scholarship';

export const load: PageLoad = async ({ params }) => {
    const code = params.slug.split('---')[1];
    const scholarship = await get_scholarship(code);
    return {
        title: scholarship.name,
        scholarship: scholarship
    }
}