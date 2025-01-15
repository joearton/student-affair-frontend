

import type { PageLoad } from './$types';
import { get_post } from '$lib/objects/blog_post';

export const load: PageLoad = async ({ params }) => {
    const post = await get_post({ slug: params.slug });
    return {
        title: post.title,
        post: post
    }
}