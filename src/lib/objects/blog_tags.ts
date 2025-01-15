import { api_request } from '$lib/api';

export async function get_tags() {
    const response = await api_request('tags/')
    return response
}
