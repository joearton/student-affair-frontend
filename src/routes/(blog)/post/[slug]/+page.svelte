<script lang="ts">
    import { onMount } from 'svelte';
    import { get_posts } from '$lib/objects/blog_post';
    import type { LayoutData } from './$types';
    import type { BlogPost } from '$lib/objects/blog_post';
    import SocialMedia from '$lib/components/blog/SocialMedia.svelte';
    import { _ } from 'svelte-i18n';

    const { data }: { data: LayoutData } = $props();
    
    let related_posts = $state({
        results: [] as BlogPost[],
        previous: '',
        next: '',
        count: 0,
        offset: 0,
        limit: 3,
    });
 
    onMount(async () => {
        related_posts = await get_posts({
            categories: data.post.categories.map((category: { id: string }) => category.id).join(','),
            limit: 7
        })
    });

</script>


<div class="mb-3 post-thumbnail" style="background: url({data.post.featured_image}) center center no-repeat; background-size: cover;">
    <div class="overlay"></div>
    <div class="container px-3">
        <div class="position-absolute post-thumbnail-label">
            <h1 class="h4 bg-primary post-title fw-bold text-warning mb-0 p-3">{data.post.title}</h1>
            {#if data.post.subtitle}
                <p class="post-subtitle bg-warning post-subtitle p-3 m-0 d-none d-md-block">{data.post.post_excerpt}</p>
            {/if}
        </div>
    </div>
</div>


<div class="container bg-white my-3 py3 px-4">
    <article class="row border-bottom py-5 mb-3">
        <div class="col-md-3 order-md-1 order-2">
            <div class="mb-5">
                <h5 class='text-center mb-3 p-3 border-bottom'>{$_('blog.post.share_post')}</h5>
                <SocialMedia centered={true}></SocialMedia>
            </div>
            <div class="mb-5">
                <div class="text-center">
                    <h5 class='text-center mb-3 p-3 border-bottom'>{$_('blog.post.author')}</h5>
                    <img src="{data.preference.site_protocol}://{data.post.author?.user_picture}" alt={data.post.author?.username} class="rounded-circle" width="100" height="100" />
                    <h5>{data.post.author?.fullname}</h5>
                </div>
                <div class="p-3">
                    <div><span class="fa fa-calendar-alt"></span> {data.post.publication_date}</div>
                    <div class="fw-bold">{data.post.title}</div>
                </div>
                <div class="p-3">
                    <h6><i class="fa fa-list-alt"></i> {$_('blog.post.categories')}</h6>
                    <div class="my-1">
                        {#each data.post.categories as category}
                            <div>{category.name}</div>
                        {/each}
                    </div>
                </div>
                <div class="p-3">
                    <h6><i class="fa fa-tag"></i> {$_('blog.post.tags')}</h6>
                    <div class="my-1">
                        {#each data.post.tags as tag}
                            <span class="badge bg-info">{tag.name}</span>
                        {/each}
                        </div>
                </div>
            </div>
        </div>

        <div class="col-md-9 border-start order-md-2 order-1">            
            <div class="post-content">{@html data.post.content}</div>
        </div>
    </article>

    {#if data.post.id && related_posts.results.length > 0}
        <div class="related-posts py-5">
            <div class="row">
                {#each related_posts.results as related_post}
                    {#if related_post.id !== data.post.id}
                        <div class="col-md-4 mb-4">
                            <div class="card h-100 border-0 shadow-sm">
                                <img src="{related_post.featured_image}" class="card-img-top" alt="{related_post.title}">
                                <div class="card-body bg-white">
                                    <h5 class="card-title">{related_post.title}</h5>
                                    <p class="card-text">{related_post.post_excerpt}</p>
                                    <a href="/post/{related_post.slug}" class="btn btn-primary">Read More</a>
                                </div>
                            </div>
                        </div>
                    {/if}
                {/each}
            </div>
        </div>
    {/if}

</div>
  

<style>
    .overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.1); 
        border-radius: 0.25rem;
    }

    .post-thumbnail {
        position: relative;
        height: 75vh;
        clip-path: url(#path-15);
    }

    .post-thumbnail-label {
        width: 70%;
        bottom: 7%;        
    }

    .post-title, .post-subtitle {
        opacity: 0.95;
    }

    .post-content {
        font-size: 17px;
    }

    .related-posts .card {
        border: none;
        transition: transform 0.2s;
    }

    .related-posts .card:hover {
        transform: scale(1.05);
    }

    .related-posts .card-img-top {
        height: 200px;
        object-fit: cover;
    }

    @media (max-width: 768px) {
        .post-thumbnail {
            height: 300px;
        }
    }

</style>