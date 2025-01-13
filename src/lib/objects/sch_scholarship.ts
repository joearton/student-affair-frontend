import { api_request } from '$lib/api';
import { create_excerpt, format_publication_date } from '$lib/utils';


export async function get_scholarships({search = '', status = '', source = '', destination = '',
    units = '', targets = '', limit = 10, offset = 0, id = ''} = {}) {
    const params: { 
        search? : string;
        status? : string;
        source? : string;
        destination? : string;
        units?  : string;
        targets?: string;
        limit?  : number;
        offset? : number;
        id?     : string;
    } = {};

    if (search) params.search = search;
    if (status) params.status = status;
    if (source) params.source = source;
    if (destination) params.destination = destination;
    if (units.length) params.units = units;
    if (targets.length) params.targets = targets;
    if (limit) params.limit = limit;
    if (offset) params.offset = offset;
    if (id) params.id = id;

    const queryString = new URLSearchParams(params as Record<string, string>).toString();
    const endpoint = `scholarship/?${queryString}`;

    const response = await api_request(endpoint, 'GET');
    const scholarships = response?.results || [];

    return {
        previous: response?.previous || "",
        next: response?.next || "",
        count: response?.count || 0, 
        limit: limit,
        results: scholarships.map((scholarship: { description: string; start_date: string, end_date: string}) => ({
            ...scholarship,
            sch_excerpt: create_excerpt(scholarship.description, 225),
            sch_start_date: format_publication_date(scholarship.start_date),
            sch_end_date: format_publication_date(scholarship.end_date),
        })),
    };
}



export async function get_scholarship(id: string) {
    if (!id) {
        throw new Error('Scholarship ID is required');
    }

    const { results } = await get_scholarships({ id: id });
    if (results.length === 0) {
        throw new Error('Scholarship not found');
    }

    return results[0];
}
