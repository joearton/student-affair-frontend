<script lang='ts'>
    import { onMount } from 'svelte'; 
    import { get_scholarships } from '$lib/objects/sch_scholarship';

    import type { Scholarship } from '$lib/types/scholarship';

    import ShimmerLoader from '$lib/components/ShimmerLoader.svelte';
    import NoDataAvailable from '$lib/components/NoDataAvailable.svelte';
    import { slugify } from '$lib/utils';
    import SimplePreloader from '$lib/components/SimplePreloader.svelte';

    let response = $state({results: [], previous: '', next: '', count: 0, limit: 10, offset: 0});  
    let filter_query = $state('');
    let is_loading = $state(false);
    let scholarships: Scholarship[] = $state([]);

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


<div class="px-3">
    <div class="my-1">
        <h5 class="py-3 border-bottom position-relative">
            Daftar Beasiswa {#if is_loading}<SimplePreloader></SimplePreloader>{/if}
        </h5>
    </div>
      
    <div class="my-3">
        <div class="my-3">
            <div class="input-group">
                <input type="text" class="form-control" placeholder="Enter keyword" bind:value={filter_query} onchange="{() => update_scholarship()}">
                <button class="btn btn-primary" type="button" onclick={() => update_scholarship()} aria-label="Search"><i class="fa fa-search"></i></button>
            </div>
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
            <a href="{`/scholarship/${slugify(scholarship.name)}---${scholarship.code}`}" class="sch-item py-3 border-bottom">
                <div class="row g-0">
                    <div class="col-md-3">
                        <div class="h-100" style="background-image: url('{scholarship.thumbnail}'); background-size: cover;"></div>
                    </div>
                    <div class="col-md-9">
                        <div class="position-relative">
                            <h5>{scholarship.name}</h5>
                            <span class="position-absolute top-0 end-0 badge rounded-pill m-3"
                                class:bg-success={scholarship.status == 'on-going'}
                                class:bg-info={scholarship.status == 'coming-soon'}
                                class:bg-danger={scholarship.status == 'closed'}> {scholarship.status_display}
                            </span>
                            <p class="card-text">{scholarship.sch_excerpt}</p>
                            <div class="row small">
                                <div class="col-md-6">
                                    <div class="row">
                                        <div class="col-md-3"><strong>Source</strong></div>
                                        <div class="col-md-9">: {scholarship.source_display}</div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-3"><strong>Destination</strong></div>
                                        <div class="col-md-9">: {scholarship.destination_display}</div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-3"><strong>Target</strong></div>
                                        <div class="col-md-9">: {scholarship.target_names.map(target => target[0]).join(', ')}</div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-3"><strong>Kuota</strong></div>
                                        <div class="col-md-9">: {scholarship.quota}</div>
                                    </div>        
                                </div>
                                <div class="col-md-6">
                                    <div class="row">
                                        <div class="col-md-3"><strong>Start Date</strong></div>
                                        <div class="col-md-9">: {scholarship.sch_start_date}</div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-3"><strong>End Date</strong></div>
                                        <div class="col-md-9">: {scholarship.sch_end_date}</div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-3"><strong>Level</strong></div>
                                        <div class="col-md-9">: {scholarship.level_display}</div>
                                    </div>        
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </a>
        {/each}
        <nav>
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