

import type { PageLoad } from './$types';
import { get_scholarship } from '$lib/objects/sch_scholarship';

export const load: PageLoad = async ({ params }) => {
    const slugParts = params.slug.split('---');
    const code = slugParts.length > 1 ? slugParts[1] : slugParts[0]; 
    const scholarship = await get_scholarship(code);
    return {
        title: scholarship.name,
        scholarship: scholarship
    }
}