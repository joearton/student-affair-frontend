import { api_request } from "$lib/api";


export const get_testimonials = async (limit:number = 6) => {
    return await api_request(`testimonials/?limit=${limit}`);
}