

import type { PageLoad } from './$types';
import { get_achievement } from '$lib/objects/ach_achievement';

export const load: PageLoad = async ({ params }) => {
    const achievement = await get_achievement({ id: params.id });
    return {
        title: achievement.activity_name,
        achievement: achievement
    }
}