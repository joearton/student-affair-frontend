<script lang='ts'>
    import { onMount } from 'svelte';
    import { get_posts } from '$lib/objects/blog_post';

    import NoDataAvailable from '$lib/components/NoDataAvailable.svelte';
    import ShimmerLoader from '$lib/components/ShimmerLoader.svelte';

    import type { Post } from '$lib/types/blog_post';
    import { get_categories } from '$lib/objects/blog_category';
    import { get_tags } from '$lib/objects/blog_tags';

    let response = $state({
        results: [],
        previous: '',
        next: '',
        count: 0,
        offset: 0,
        limit: 10,
    });

    let filter_query = $state('');
    let filter_cats  = $state([]);
    let filter_tags  = $state([]);
    let is_loading = $state(true);
    let posts: Post[] = $state([]);
    let categories: Category[] = $state([]);
    let tags: Tag[] = $state([]);

    // pagination variable
    let previous_offset: number = 0;
    let next_offset: number = 0;

    function update_offsets() {
        if (response.previous) {
            previous_offset = Number(new URL(response.previous).searchParams.get('offset')) || 0;
        }

        if (response.next) {
            next_offset = Number(new URL(response.next).searchParams.get('offset')) || 0;
        }
    }

    async function update_post(offset: number = 0) {
        try {
            response = await get_posts({
                search: filter_query,
                categories: filter_cats.join(','),
                tags: filter_tags.join(','),
                offset: offset,
            })
            posts = response.results;
        } catch (error) {
            console.error('Error fetching posts:', error);
        } finally {
            update_offsets();
            is_loading = false;
        }
    }

    function handle_post_filter() {
        update_post();
    }

    onMount(async () => {
        categories = await get_categories();
        tags = await get_tags();
        await update_post();
    });

</script>


<div class="post-section py-5">
    <div class="container">
        <div class="row">
            <div class="col-md-3">
                <div class="post-sidebar shadow-sm py-4 px-4 bg-white">
                    <!-- Search Bar -->
                    <div class="post-search mb-4">
                        <input oninput={handle_post_filter} bind:value={filter_query} type="text" class="form-control" placeholder="Search posts">
                    </div>

                    <!-- Categories Section -->
                    <div class="post-categories mb-4">
                        <h5 class="mb-3">Categories</h5>
                        {#if categories.length > 0}
                            {#each categories as category}
                                <div class="form-check mb-2">
                                    <input class="form-check-input" type="checkbox" value={category.id} id="cat-{category.id}" bind:group={filter_cats} onchange={handle_post_filter} />
                                    <label class="form-check-label" for="cat-{category.id}">
                                        {category.name}
                                    </label>
                                </div>
                            {/each}
                        {:else}
                            <ShimmerLoader height="25" count=5></ShimmerLoader>
                        {/if}
                    </div>

                    <!-- Tags Section -->
                    <div class="post-tags">
                        <h5 class="mb-3">Tags</h5>
                        {#if tags.length > 0}
                            {#each tags as tag}
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" value={tag.id} id="tag-{tag.id}" bind:group={filter_tags} onchange={handle_post_filter} />
                                    <label class="form-check-label" for="tag-{tag.id}">
                                        {tag.name}
                                    </label>
                                </div>
                            {/each}
                        {:else}
                            <ShimmerLoader height="25" count=5></ShimmerLoader>
                        {/if}
                    </div>
                </div>
            </div>
            <div class="col-md-9">
                {#if posts.length > 0}
                    {#each posts as post, index}
                        <div class="post-item bg-white mb-3">
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
                                <div class="post-list bg-white shadow-sm p-3">
                                    <div class="row">
                                        <div class="col-md-3">
                                            <a href={`/post/${post.slug}`} aria-label="{post.title}">
                                                <div class="post-thumbnail" style="background: url({post.featured_image}) center center no-repeat; background-size: cover;"></div>
                                            </a>
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
                            {#if response.previous}
                                <li class="page-item">
                                    <button class="page-link" onclick={() => update_post(previous_offset)}>Previous</button>
                                </li>
                            {/if}
                            {#each Array(Math.ceil(response.count / response.limit)).fill(0) as _, pageIndex}
                                <li class="page-item {pageIndex * response.limit === response.offset ? 'active' : ''}">
                                    <button class="page-link" onclick={() => update_post(pageIndex * response.limit)}>{pageIndex + 1}</button>
                                </li>
                            {/each}
                            {#if response.next}
                                <li class="page-item">
                                    <button class="page-link" onclick={() => update_post(next_offset)}>Next</button>
                                </li>
                            {/if}
                        </ul>
                    </nav>
                {:else}
                    {#if is_loading}
                        <ShimmerLoader height="75" count=5></ShimmerLoader>
                    {:else}
                        <NoDataAvailable></NoDataAvailable>
                    {/if}
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