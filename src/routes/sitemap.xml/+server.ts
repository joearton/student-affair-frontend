import * as sitemap from 'super-sitemap';
import type { RequestHandler } from '@sveltejs/kit';
import { get_posts } from '$lib/objects/blog_post';
import { get_scholarships } from '$lib/objects/sch_scholarship';
import { get_achievements } from '$lib/objects/ach_achievement';
import { slugify } from '$lib/utils';


// This function fetches dynamic paramValues.
// Replace the helper functions with your own logic to get the data dynamically.
async function getDynamicParamValues(): Promise<Record<string, string[]>> {
    const achievementIds = await fetchAchievementIds();
    const postSlugs = await fetchPostSlugs();
    const scholarshipSlugs = await fetchScholarshipSlugs();

    return {
        '/post/[slug]': postSlugs,
        '/scholarship/[slug]': scholarshipSlugs,
        '/achievement/[id]': achievementIds,
    };
}


async function fetchPostSlugs(): Promise<string[]> {
    const posts = await get_posts({limit: 30});
    return posts.results.map((post: any) => post.slug);
}


async function fetchScholarshipSlugs(): Promise<string[]> {
    const scholarships = await get_scholarships({limit: 30});
    return scholarships.results.map((scholarship: any) => `${slugify(scholarship.name)}---${scholarship.code}`);
}


async function fetchAchievementIds(): Promise<string[]> {
    const achievements = await get_achievements({limit: 30});
    return achievements.results.map((achievement: any) => achievement.id);
}


export const GET: RequestHandler = async () => {
    const dynamicParamValues = await getDynamicParamValues();
    return sitemap.response({
        origin: 'https://kemahasiswaan.umko.ac.id',
        excludeRoutePatterns: [
            '^/account.*',
            '^/mylab.*',
        ],
        paramValues: dynamicParamValues
    });
};