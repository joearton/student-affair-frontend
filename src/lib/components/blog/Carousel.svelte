<script lang="ts">
    import ShimmerLoader from "$lib/components/ShimmerLoader.svelte";

    const { preference, page_setting } = $props();

    let is_loading = $state(true);
    
    $effect(() => {
        if (page_setting) {
            is_loading = false;
        }
    });
</script>

{#if page_setting && page_setting.slideshows && page_setting.slideshows.length > 0}
    {#if is_loading}
        <ShimmerLoader count=3 height=100></ShimmerLoader>
    {:else}
        <div id="front-carousel" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-inner">
                {#each page_setting.slideshows as slideshow, index}
                    <div class="carousel-item {index === 0 ? 'active' : ''}" style="background-image: url({preference.site + slideshow.image}); background-size: cover; background-position: top center; height: {page_setting.slideshow_height};">
                        <div class="carousel-caption d-none d-md-block text-start">
                            <div><h1 class="slideshow-title display-6 bg-primary text-light p-3">{slideshow.title}</h1></div>
                            <div><p class="slideshow-desc opacity-75 lead bg-white text-dark p-3">{@html slideshow.description}</p></div>
                        </div>
                    </div>
                {/each}
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#front-carousel" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#front-carousel" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
        </div>
    {/if}
{/if}

<style>
    .slideshow-title {
        display: inline-block;
    }

    .slideshow-desc {
        display: inline-block;
    }
</style>