<script lang='ts'>
    import { onMount } from 'svelte';
    import { get_posts } from '$lib/objects/blog_post';
    import NoDataAvailable from '$lib/components/NoDataAvailable.svelte';

    import type { Post } from '$lib/types/blog_post';
    import { get_categories } from '$lib/objects/blog_category';
    import { get_tags } from '$lib/objects/blog_tags';

    let response: {
        results: Post[],
        previous: string,
        next: string,
        count: string,
        limit: number,
    }

    let searchQuery = $state('');
    let isLoading = $state(true);
    let posts: Post[] = $state([]);
    let categories: Category[] = $state([]);
    let tags: Tag[] = $state([]);

    async function updatePost(offset:number = 0) {
        try {
            response = await get_posts({
                search: query,
                offset: offset
            });
            posts = response.results;
        } catch (error) {
            console.error('Error fetching posts:', error);
        } finally {
            isLoading = false;
        }
    }

    onMount(async () => {
        categories = await get_categories();
        tags = await get_tags();
        await updatePost();
    });

    function handlePostFilter() {
        updatePost(searchQuery);
    }
</script>


<div class="post-section py-5">
    <div class="container">
        <div class="row">
            <div class="col-md-3">
                <div class="post-sidebar shadow-sm py-4 px-4 bg-light">
                    <!-- Search Bar -->
                    <div class="post-search mb-4">
                        <input oninput={handlePostFilter} bind:value={searchQuery} type="text" class="form-control" placeholder="Search posts">
                    </div>

                    <!-- Categories Section -->
                    <div class="post-categories mb-4">
                        <h5 class="mb-3">Categories</h5>
                        {#each categories as category}
                            <div class="form-check mb-2">
                                <input class="form-check-input" type="checkbox" value={category.id} id="cat-{category.id}" />
                                <label class="form-check-label" for="cat-{category.id}">
                                    {category.name}
                                </label>
                            </div>
                        {/each}
                    </div>

                    <!-- Tags Section -->
                    <div class="post-tags">
                        <h5 class="mb-3">Tags</h5>
                        {#each tags as tag}
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" value={tag.id} id="tag-{tag.id}" />
                                <label class="form-check-label" for="tag-{tag.id}">
                                    {tag.name}
                                </label>
                            </div>
                        {/each}
                    </div>
                </div>
            </div>
            <div class="col-md-9">
                {#if posts.length > 0}
                    {#each posts as post, index}
                        <div class="post-item bg-light mb-3">
                            {#if index === 0}
                                <div class="post-banner position-relative shadow" style="background: url({post.featured_image}) bottom center no-repeat; background-size: cover;">
                                    <div class="position-absolute bottom-0">
                                        <div class="bg-warning w-75 mx-3 p-3">
                                            <h5 class='fw-bold'><a href={`/post/${post.slug}`}>{post.title}</a></h5>
                                            <div class="post-date text-sm">
                                                <i class="fa fa-calendar-alt"></i> {post.publication_date}
                                            </div>
                                        </div>
                                        <div class="bg-primary text-white p-3 opacity-75">
                                            <p class="post-excerpt m-0">{post.post_excerpt}</p>
                                        </div>
                                    </div>
                                </div>
                            {:else}
                                <div class="post-list bg-light p-3">
                                    <div class="row">
                                        <div class="col-md-3">
                                            <div class="post-thumbnail" style="background: url({post.featured_image}) center center no-repeat; background-size: cover;"></div>
                                        </div>
                                        <div class="col-md-9">
                                            <h5 class='fw-bold'><a href={`/post/${post.slug}`}>{post.title}</a></h5>
                                            <div class="post-date text-sm">
                                                <i class="fa fa-calendar-alt"></i> {post.publication_date}
                                                {#if post.categories.length > 0}
                                                    |
                                                    {#each post.categories as category, i}
                                                        {#if i > 0}, {/if}
                                                        <i class="fa fa-folder"></i> {category.name}
                                                    {/each}
                                                {/if}
                                            </div>
                                            <p class="post-excerpt text-muted py-3">{post.post_excerpt}</p>
                                        </div>
                                    </div>
                                </div>
                            {/if}
                        </div>
                    {/each}
                    <nav>
                        <ul class="pagination">
                        </ul>
                    </nav>
                {:else}
                    <NoDataAvailable></NoDataAvailable>
                {/if}
            </div>
        </div>
    </div>
</div>

<style>
    .post-banner {
        height: 425px;
    }

    .post-thumbnail {
        position: relative;
        height: 150px;
    }
</style>