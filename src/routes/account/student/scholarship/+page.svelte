<script lang='ts'>
    import { onMount } from 'svelte'; 
    import { get_scholarships } from '$lib/objects/sch_scholarship';

    import type { Scholarship } from '$lib/types/scholarship';

    import ShimmerLoader from '$lib/components/ShimmerLoader.svelte';
    import NoDataAvailable from '$lib/components/NoDataAvailable.svelte';
    import SimplePreloader from '$lib/components/SimplePreloader.svelte';
    import ScholarshipItem from '$lib/components/scholarship/ScholarshipItem.svelte';
    import { _ } from 'svelte-i18n';

    let response = $state({results: [], previous: '', next: '', count: 0, limit: 10, offset: 0});  
    let filter_query = $state('');
    let is_loading = $state(false);
    let scholarships: Scholarship[] = $state([]);
    const sch_referer = 'account';

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


    async function update_scholarship(offset: number = 0) {
        try {
            is_loading = true;
            response = await get_scholarships({
                search: filter_query,
                limit: 10,
                offset: offset,
            })
            scholarships = response.results;
            scholarships = scholarships.sort((a, b) => b.eligible.status);
        } catch (error) {
            console.error('Error fetching scholarship:', error);
        } finally {
            update_offsets();
            is_loading = false;
        }
    }

    onMount(async () => {
        await update_scholarship();
    });

</script>


<div class="pt-1 pb-3">
    <h5 class="fw-bold px-4 py-3 mb-3 border-bottom">
        {$_('scholarship.scholarship_list')}
        {#if is_loading}<SimplePreloader></SimplePreloader>{/if}
    </h5>
      
    <div class="px-4 my-3">
        <div class="input-group">
            <input type="text" class="form-control" placeholder="Enter keyword" bind:value={filter_query} onchange="{() => update_scholarship()}">
            <button class="btn btn-primary btn-lg" type="button" onclick={() => update_scholarship()} aria-label="Search">
                <i class="fa fa-search"></i>
            </button>
        </div>
    </div>    
    
    <div class="my-3">
        {#if scholarships.length === 0}
            {#if is_loading}
                <ShimmerLoader height="75" count=5></ShimmerLoader>
            {:else}
                <NoDataAvailable></NoDataAvailable>
            {/if}
        {/if}

        {#each scholarships as scholarship}
            <div class="border-bottom m-3">
                <ScholarshipItem {scholarship} {sch_referer}></ScholarshipItem>
            </div>
        {/each}

        <nav class='px-4 py-3'>
            <ul class="pagination">
                {#if response.previous}
                    <li class="page-item">
                        <button class="page-link" onclick={() => update_scholarship(previous_offset)}>Previous</button>
                    </li>
                {/if}
                {#each Array(Math.ceil(response.count / response.limit)).fill(0) as _, pageIndex}
                    <li class="page-item {pageIndex * response.limit === response.offset ? 'active' : ''}">
                        <button class="page-link" onclick={() => update_scholarship(pageIndex * response.limit)}>{pageIndex + 1}</button>
                    </li>
                {/each}
                {#if response.next}
                    <li class="page-item">
                        <button class="page-link" onclick={() => update_scholarship(next_offset)}>Next</button>
                    </li>
                {/if}
            </ul>
        </nav>
    </div>    
</div>