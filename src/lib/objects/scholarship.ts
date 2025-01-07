import { apiRequest } from '$lib/api';

export async function getScholarships({
    search = '', status = '', source = '', destination = '',
    units = [], targets = [], limit = 10, page = 1, id = ''} = {}) {
    const params: { 
        search? : string;
        status? : string;
        source? : string;
        destination? : string;
        units?  : string[];
        targets?: string[];
        limit?  : number;
        page?   : number;
        id?     : string;
    } = {};

    const queryString = new URLSearchParams(params as Record<string, string>).toString();
    const endpoint = `scholarship/?${queryString}`;

    const response = await apiRequest(endpoint, 'GET');
    const scholarships = response.results;

    return {
        count: response.count, 
        results: scholarships,
        page_size: limit,
    };
}


export async function getScholarship(id: string) {
    if (!id) {
        throw new Error('Scholarship ID is required');
    }

    const { results } = await getScholarships({ id: id });
    if (results.length === 0) {
        throw new Error('Scholarship not found');
    }

    return results[0];
}
