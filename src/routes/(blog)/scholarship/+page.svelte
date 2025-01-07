<script lang='ts'>
    import { onMount } from 'svelte'; 
    import { getScholarships } from '$lib/objects/scholarship';
    import type { Scholarship } from '$lib/types/scholarship';

    let scholarships: Scholarship[] = $state([]);
    let searchKeyword = $state('');

    onMount(async () => {
        try {
            const data = await getScholarships();
            scholarships = data.results;
        } catch (error) {
            console.error('Error fetching scholarships:', error);
        }        
    });
</script>



<div class="container">
    <div class="row row-cols-1 row-cols-md-3 g-4">
        {#each scholarships as scholarship}
            <div class="col">
                <div class="card">
                    <img src="{scholarship.thumbnail}" alt="{scholarship.name}" class="card-image"/>

                    <a href={`/scholarship/${scholarship.id}`} class="icon-link">
                        <i class="fa-solid fa-arrow-right"></i>
                    </a>                                    
                    <div class="status-on-going">

                    </div>
                    <h3 class="scholarship-name">{scholarship.name}</h3>                               
                    <p class="description">
                    </p>

                    <!-- Details-->
                    <div class="details-on-going">
                        <span>
                            <strong>Sumber:</strong>
                            {scholarship.source}
                        </span>
                        <span>
                            <strong>Tujuan:</strong>
                            {scholarship.destination}
                        </span>
                        <span>
                            <strong>Target:</strong>
                            {scholarship.target_audience}
                        </span>
                        <span>
                            <strong>Kuota:</strong>
                            {scholarship.quota}
                        </span>
                    </div>                                                
                </div>

            </div>
        {/each}
    </div>
</div>

    
<div class="scholarship-container">
    <div class="scholarship-header">
        <h2 class="title">Daftar Beasiswa Tersedia</h2>
        <span class="fe-separator"></span>
    </div>

    <!-- Search Section -->
    <div class="search-container">
        <div class="col col-12 px-0">
            <div class="d-flex mb-3 fe-shadow">
                <input 
                    type="text" 
                    placeholder="Keyword beasiswa" 
                    class="bg-white py-2 px-3 border-light-gray w-100 fs-subtitle-2 fw-600"
                    bind:value={searchKeyword}>
            </div>
        </div>
    </div>
</div>

<style>
    .search-container {
        display: flex; 
        flex-wrap: wrap; 
        justify-content: center; 
        padding: 20px;
        width: 100%;
        gap: 20px;
        align-items: center;
    }


    .card-image {
        width: 100%;
        height: auto;
        object-fit: cover;
        background-color: transparent;
    }
    
</style>