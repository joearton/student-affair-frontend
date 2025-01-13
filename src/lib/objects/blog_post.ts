import { api_request } from '$lib/api';
import { create_excerpt, format_publication_date } from '$lib/utils';


export async function get_posts({ search = '', categories = '', tags = '', slug = '', id = '', offset = 0, limit = 10} = {}) {
    const params: { 
        search?     : string;
        categories? : string;
        tags?       : string;
        slug?       : string;
        id?         : string;
        offset?     : number;
        limit?      : number;
    } = {};
    
    if (search) params.search = search;
    if (categories) params.categories = categories;
    if (tags) params.tags = tags;
    if (slug) params.slug = slug;
    if (id) params.id = id; 
    if (offset) params.offset = offset;
    if (limit) params.limit = limit;

    // Menyusun endpoint dengan query string
    const query_string = new URLSearchParams(params as Record<string, string>).toString();
    const endpoint = `posts/?${query_string}`;

    const response = await api_request(endpoint, 'GET');
    const posts = response?.results || [];

    return {
        count: response?.count || 0, 
        previous: response?.previous || "",
        next: response?.next || "",
        results: posts.map((post: { content: string; publication_date: string }) => ({
            ...post,
            post_excerpt: create_excerpt(post.content),
            publication_date: format_publication_date(post.publication_date),
        })),
        limit: limit,
        offset: offset
    };
}


export async function get_post({ slug = '', id = '' } = {}) {
    if (!slug && !id) {
        throw new Error('Either slug or id must be provided to get a post.');
    }

    // Memanggil fungsi get_posts dengan filter slug atau id
    const posts = await get_posts({ slug, id });

    // Mengembalikan post pertama jika ditemukan, atau null jika tidak ada
    return posts.results.length > 0 ? posts.results[0] : null;
}

