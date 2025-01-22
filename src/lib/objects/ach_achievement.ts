import { api_request } from "$lib/api";


export async function get_achievements({ search = '', scope = '', department = '', offset = 0, limit = 10, id = '' } = {}) {
    const params: { 
        search?    : string;
        scope?     : string;
        department?: string;
        offset?    : number;
        limit?     : number;
        id?        : string;
    } = {};
    
    if (search) params.search = search;
    if (scope) params.scope = scope;
    if (department) params.department = department;
    if (offset) params.offset = offset;
    if (limit) params.limit = limit;
    if (id) params.id = id;

    const query_string = new URLSearchParams(params as Record<string, string>).toString();
    const endpoint = `achievement/?${query_string}`;

    const response = await api_request(endpoint, 'GET');
    const achievements = response?.results || [];

    return {
        count: response?.count || 0,
        previous: response?.previous || "",
        next: response?.next || "",
        results: achievements,
        limit: limit,
        offset: offset
    };
}


export async function get_achievement({ id = '' } = {}) {
    if (!id) {
        throw new Error('ID must be provided to get an achievement.');
    }

    const achievements = await get_achievements({ id });
    return achievements.results.length > 0 ? achievements.results[0] : null;
}