import { error } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ parent }) => {
    const { user } = await parent();
    if (! user.groups.includes('reviewer')) {
        throw error(403, 'Forbidden');
    }
    return {}
};