

import type { PageLoad } from './$types';

export const load: PageLoad = async ({ parent }) => {
    const { page_setting } = await parent();
    return {
        title: 'Beranda',
        description: page_setting.page_description || "",
    }
}