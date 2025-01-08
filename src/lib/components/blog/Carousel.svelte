<script lang="ts">
    import ShimmerLoader from "$lib/components/ShimmerLoader.svelte";

    let { preference } = $props();
    let isLoading = $state(true);
    
    $effect(() => {
        if (preference) {
            isLoading = false;
        }
    });
</script>

{#if isLoading}
    <ShimmerLoader count=3 height=100></ShimmerLoader>
{:else}
    <div id="front-carousel" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-inner">
            {#each preference.page_setting.slideshows as slideshow, index}
                <div class="carousel-item {index === 0 ? 'active' : ''}">
                    <img src={preference.site + slideshow.image} class="d-block w-100" alt={slideshow.title}>
                    <div class="carousel-caption d-none d-md-block">
                        <h1 class="display-6 m-0 bg-primary text-light p-3">{slideshow.title}</h1>
                        <p class="opacity-75 lead bg-white m-0 text-dark p-3">{@html slideshow.description}</p>
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
