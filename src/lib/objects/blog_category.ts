import { api_request } from '$lib/api';

export async function get_categories() {
    const response = await api_request('categories/')
    return response
}
