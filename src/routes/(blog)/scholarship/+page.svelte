<script lang='ts'>
    import { onMount } from 'svelte'; 
    import { get_scholarships } from '$lib/objects/sch_scholarship';
    import type { Scholarship } from '$lib/types/scholarship';
    import NoDataAvailable from '$lib/components/NoDataAvailable.svelte';

    let response = $state({
        results: [],
        previous: '',
        next: '',
        count: 0,
        limit: 10,
    });
    
    let filter_query = $state('');
    let filter_target = $state('');
    let filter_destination = $state('');
    let filter_status = $state('');
    let filter_level = $state('');
    let filter_source = $state('');
    let is_loading = $state(false);

    let scholarships: Scholarship[] = $state([]);
    let ongoing_scholarship: Scholarship[] = $state([]);

    async function update_scholarship(offset: number = 0) {
        try {
            is_loading = true;
            response = await get_scholarships({
                search: filter_query,
                offset: offset,
                status: filter_status,
                source: filter_source,
                destination: filter_destination,
                targets: filter_target,
                units: filter_level,
                limit: 10,
            })
            scholarships = response.results;
        } catch (error) {
            console.error('Error fetching posts:', error);
        } finally {
            is_loading = false;
        }
    }

    onMount(async () => {
        response = await get_scholarships({limit: 3, status: 'on-going'})
        ongoing_scholarship = response.results;
        await update_scholarship();
    });
</script>



<div class="container mb-5">
    <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-5 my-3">
        {#each ongoing_scholarship as scholarship}
            <a class="sch-ongoing-item" href={`/scholarship/${scholarship.id}`}>
                <div class="col">
                    <div class="card bg-white border-0 shadow-sm h-100">
                        <div style="background-image: url('{scholarship.thumbnail}'); background-size: cover; background-position: center; height: 275px;"></div>
                        <div class="card-body d-flex flex-column">
                            <h4 class="py-3 card-title fw-bold">{scholarship.name}</h4>
                            <p class="small">{scholarship.sch_excerpt}</p>
                            <div class="row">
                                <div class="col-md-4"><strong>Source</strong></div>
                                <div class="col-md-8">: {scholarship.source_display}</div>
                            </div>
                            <div class="row">
                                <div class="col-md-4"><strong>Destination</strong></div>
                                <div class="col-md-8">: {scholarship.destination_display}</div>
                            </div>
                            <div class="row">
                                <div class="col-md-4"><strong>Target</strong></div>
                                <div class="col-md-8">: {scholarship.target_names.map(target => target[0]).join(', ')}</div>
                            </div>
                            <div class="row">
                                <div class="col-md-4"><strong>Quota</strong></div>
                                <div class="col-md-8">: {scholarship.quota}</div>
                            </div>
                            <div class="mt-3">
                                <div class="bg-success text-white border-0 p-3 text-center">
                                    Apply <i class="fas fa-link"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </a>
        {/each}
    </div>
</div>

    
<div class="container">
    <div class="bg-white mb-3 py-2 px-4 shadow-sm">
        <div class="my-1">
            <h3 class="py-3 border-bottom position-relative">
                Daftar Beasiswa
                {#if is_loading}
                    <div class="position-absolute end-0 top-0 my-3">
                        <div class="spinner-border text-primary" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    </div>
                {/if}
            </h3>
        </div>
    
        <div class="search-container my-3">
            <!-- Search bar -->
            <div class="my-4">
                <div class="input-group">
                    <input type="text" class="form-control form-control-lg" placeholder="Enter keyword" bind:value={filter_query} onchange="{() => update_scholarship()}">
                    <button class="btn btn-primary" type="button" onclick={() => update_scholarship()} aria-label="Search">
                        <i class="fa fa-search"></i>
                    </button>
                </div>
            </div>

            <!-- Filter Section -->
            <div class="filter-section">
                <div class="row py-3">
                    <!-- Status -->
                    <div class="col-md-3">
                        <h6>Status</h6>
                        <div class="form-check">
                            <input class="form-check-input" value="on-going" type="checkbox" id="status1" bind:group={filter_status} onchange={() => update_scholarship()}>
                            <label class="form-check-label" for="status1">On-Going</label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" value="coming-soon" type="checkbox" id="status2" bind:group={filter_status} onchange={() => update_scholarship()}>
                            <label class="form-check-label" for="status2">Coming Soon</label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" value="closed" type="checkbox" id="status3" bind:group={filter_status} onchange={() => update_scholarship()}>
                            <label class="form-check-label" for="status3">Closed</label>
                        </div>
                    </div>

                    <!-- Target -->
                    <div class="col-md-3">
                        <h6>Target</h6>
                        <div class="form-check">
                            <input class="form-check-input" value="new-student" type="checkbox" id="target1" bind:group={filter_target} onchange={() => update_scholarship()}>
                            <label class="form-check-label" for="target1">Mahasiswa Baru</label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" value="on-going-student" type="checkbox" id="target2" bind:group={filter_target} onchange={() => update_scholarship()}>
                            <label class="form-check-label" for="target2">Mahasiswa Aktif</label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" value="graduated-student" type="checkbox" id="target3" bind:group={filter_target} onchange={() => update_scholarship()}>
                            <label class="form-check-label" for="target3">Alumni</label>
                        </div>
                    </div>

                    <!-- Level -->
                    <div class="col-md-3">
                        <h6>Level</h6>
                        <div class="form-check">
                            <input class="form-check-input" value="vocational" type="checkbox" id="level1" bind:group={filter_level} onchange={() => update_scholarship()}>
                            <label class="form-check-label" for="level1">Vokasi</label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" value="bachelor" type="checkbox" id="level2" bind:group={filter_level} onchange={() => update_scholarship()}>
                            <label class="form-check-label" for="level2">Sarjana</label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" value="master" type="checkbox" id="level3" bind:group={filter_level} onchange={() => update_scholarship()}>
                            <label class="form-check-label" for="level3">Magister</label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" value="doctoral" type="checkbox" id="level4" bind:group={filter_level} onchange={() => update_scholarship()}>
                            <label class="form-check-label" for="level4">Doktoral</label>
                        </div>
                    </div>

                    <!-- Source -->
                    <div class="col-md-3">
                        <h6>Source</h6>
                        <div class="form-check">
                            <input class="form-check-input" value="internal" type="checkbox" id="source1" bind:group={filter_source} onchange={() => update_scholarship()}>
                            <label class="form-check-label" for="source1">Beasiswa Internal</label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" value="external" type="checkbox" id="source2" bind:group={filter_source} onchange={() => update_scholarship()}>
                            <label class="form-check-label" for="source2">Beasiswa Eksternal</label>
                        </div>
                    </div>

                    <!-- Destination -->
                    <div class="col-md-3 mt-4">
                        <h6>Destination</h6>
                        <div class="form-check">
                            <input class="form-check-input" value="internal" type="checkbox" id="destination1" bind:group={filter_destination} onchange={() => update_scholarship()}>
                            <label class="form-check-label" for="destination1">UMKO</label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" value="external" type="checkbox" id="destination2" bind:group={filter_destination} onchange={() => update_scholarship()}>
                            <label class="form-check-label" for="destination2">Perguruan Tinggi Lain</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>    

    </div>

    <div class="mb-3">
        {#if scholarships.length === 0}
            <NoDataAvailable></NoDataAvailable>
        {/if}
        {#each scholarships as scholarship}
            <a href="scholarship/{scholarship.id}" class="sch-item card bg-white border-0 shadow-sm my-5" style="border-radius: 0;">
                <div class="row g-0">
                    <div class="col-md-3">
                        <div class="h-100" style="background-image: url('{scholarship.thumbnail}'); background-size: cover;"></div>
                    </div>
                    <div class="col-md-9">
                        <div class="card-body position-relative">
                            <h5 class="card-title">{scholarship.name}</h5>
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
    </div>
</div>


<style>
    .sch-ongoing-item, .sch-item {
        transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .sch-ongoing-item:hover, .sch-item:hover {
        transform: translateY(-10px);
    }

    .form-check-label {
        font-size: 14.50px;
    }
</style>