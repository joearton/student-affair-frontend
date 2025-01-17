

import { api_request } from '$lib/api';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
    const code = params.slug;
    const sch_application = await api_request(`scholarship_application/${code}`);
    return {
        title: sch_application.scholarship.name,
        sch_application: sch_application
    }
}