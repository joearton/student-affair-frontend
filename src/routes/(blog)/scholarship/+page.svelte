<script lang='ts'>
    import { onMount } from 'svelte'; 
    import { get_scholarships } from '$lib/objects/sch_scholarship';
    import { api_request } from '$lib/api';

    import type { Scholarship } from '$lib/types/scholarship';
    import type { Department, Faculty } from '$lib/types/scholarship_university';

    import ShimmerLoader from '$lib/components/ShimmerLoader.svelte';
    import NoDataAvailable from '$lib/components/NoDataAvailable.svelte';
    import { slugify } from '$lib/utils';
    import SimplePreloader from '$lib/components/SimplePreloader.svelte';
    import ScholarshipItem from '$lib/components/scholarship/ScholarshipItem.svelte';

    let response_all = $state({results: [], previous: '', next: '', count: 0, limit: 10, offset: 0});
    let response_ongoing = $state({results: [], previous: '', next: '', count: 0, limit: 10, offset: 0});
    
    let filter_query = $state('');
    let filter_target = $state('');
    let filter_destination = $state('');
    let filter_status = $state('');
    let filter_level = $state('');
    let filter_source = $state('');
    let filter_faculty = $state('');
    let filter_department = $state('');
    let is_loading = $state(false);

    let scholarships: Scholarship[] = $state([]);
    let ongoing_scholarship: Scholarship[] = $state([]);
    let faculties:Faculty[] = $state([]);
    let departments:Department[] = $state([]);
    const sch_referer = 'guest';


    // pagination variable
    let previous_offset: number = 0;
    let next_offset: number = 0;



    function update_offsets() {
        if (response_all.previous) {
            previous_offset = Number(new URL(response_all.previous).searchParams.get('offset')) || 0;
        }

        if (response_all.next) {
            next_offset = Number(new URL(response_all.next).searchParams.get('offset')) || 0;
        }
    }


    async function update_scholarship(offset: number = 0) {
        try {
            is_loading = true;
            response_all = await get_scholarships({
                search: filter_query,
                status: filter_status,
                source: filter_source,
                destination: filter_destination,
                targets: filter_target,
                faculties: filter_faculty,
                departments: filter_department,
                level: filter_level,
                limit: 10,
                offset: offset,
            })
            scholarships = response_all.results;
        } catch (error) {
            console.error('Error fetching scholarship:', error);
        } finally {
            update_offsets();
            is_loading = false;
        }
    }

    onMount(async () => {
        // on going scholarship
        response_ongoing = await get_scholarships({limit: 6, status: 'on-going'})
        ongoing_scholarship = response_ongoing.results;

        // faculties and departments
        faculties = await api_request('faculty', 'GET');
        departments = await api_request('department', 'GET');

        // all scholarships
        await update_scholarship();

});
</script>



<div class="container mb-5">
    <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-5 my-3">
        {#each ongoing_scholarship as scholarship}
            <a class="sch-ongoing-item" href={`/scholarship/${slugify(scholarship.name)}---${scholarship.code}`}>
                <div class="col">
                    <div class="card bg-white border-0 shadow-sm h-100">
                        <div style="background-image: url('{scholarship.thumbnail}'); background-size: cover; background-position: center; height: 275px;"></div>
                        <div class="card-body d-flex flex-column">
                            <h4 class="py-3 card-title fw-bold">{scholarship.name}</h4>
                            <p class="small">{scholarship.sch_excerpt}</p>
                            <div class="row small">
                                <div class="col-md-4"><strong>Start Date</strong></div>
                                <div class="col-md-8">{scholarship.sch_start_date}</div>
                            </div>
                            <div class="row small">
                                <div class="col-md-4"><strong>End Date</strong></div>
                                <div class="col-md-8">{scholarship.sch_end_date}</div>
                            </div>
                            <div class="row small">
                                <div class="col-md-4"><strong>Target</strong></div>
                                <div class="col-md-8">{scholarship.target_names.map(target => target[0]).join(', ')}</div>
                            </div>
                            <div class="row small">
                                <div class="col-md-4"><strong>Quota</strong></div>
                                <div class="col-md-8">{scholarship.quota}</div>
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
                Daftar Beasiswa {#if is_loading}<SimplePreloader></SimplePreloader>{/if}
            </h3>
        </div>
    
        <div class="search-container my-3">
            <!-- Search bar -->
            <div class="my-3">
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
                        <h6 class="mt-4">Target</h6>
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
                        
                        <h6 class="mt-4">Destination</h6>
                        <div class="form-check">
                            <input class="form-check-input" value="internal" type="checkbox" id="destination1" bind:group={filter_destination} onchange={() => update_scholarship()}>
                            <label class="form-check-label" for="destination1">UMKO</label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" value="external" type="checkbox" id="destination2" bind:group={filter_destination} onchange={() => update_scholarship()}>
                            <label class="form-check-label" for="destination2">Perguruan Tinggi Lain</label>
                        </div>
                    </div>

                    <div class="col-md-3">
                        <h6>Faculty</h6>
                        <select class="form-select form-select-sm" bind:value={filter_faculty} onchange={() => update_scholarship()}>
                            <option value="">---Show All---</option>
                            {#each faculties as faculty}
                                <option value={faculty.id}>{faculty.name}</option>
                            {/each}
                        </select>

                        <h6 class="mt-4">Department</h6>
                        <select class="form-select form-select-sm" bind:value={filter_department} onchange={() => update_scholarship()}>
                            <option value="">---Show All---</option>
                            {#each departments as department}
                                <option value={department.id}>{department.name}</option>
                            {/each}
                        </select>
                    </div>
                </div>
            </div>
        </div>    

    </div>

    <div class="mb-3">
        {#if scholarships.length === 0}
            {#if is_loading}
                <ShimmerLoader height="75" count=5></ShimmerLoader>
            {:else}
                <NoDataAvailable></NoDataAvailable>
            {/if}
        {/if}
        {#each scholarships as scholarship}
            <div class="sch-item d-block bg-white border-0 shadow-sm my-5" style="border-radius: 0;">
                <div class="row g-0">
                    <div class="col-md-3">
                        <div class="h-100" style="background-image: url('{scholarship.thumbnail}'); background-size: cover;"></div>
                    </div>
                    <div class="col-md-9">
                        <ScholarshipItem {scholarship} {sch_referer}></ScholarshipItem>
                    </div>
                </div>
            </div>
        {/each}
        <nav>
            <ul class="pagination">
                {#if response_all.previous}
                    <li class="page-item">
                        <button class="page-link" onclick={() => update_scholarship(previous_offset)}>Previous</button>
                    </li>
                {/if}
                {#each Array(Math.ceil(response_all.count / response_all.limit)).fill(0) as _, pageIndex}
                    <li class="page-item {pageIndex * response_all.limit === response_all.offset ? 'active' : ''}">
                        <button class="page-link" onclick={() => update_scholarship(pageIndex * response_all.limit)}>{pageIndex + 1}</button>
                    </li>
                {/each}
                {#if response_all.next}
                    <li class="page-item">
                        <button class="page-link" onclick={() => update_scholarship(next_offset)}>Next</button>
                    </li>
                {/if}
            </ul>
        </nav>
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