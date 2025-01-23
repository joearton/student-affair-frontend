<script lang="ts">
    import { api_request } from "$lib/api";
    import { onMount } from "svelte";
    import { page } from "$app/state";

    import type { Department } from "$lib/types/scholarship_university";
    import StatisticOverview from "$lib/components/blog/statistic/StatisticOverview.svelte";

    let departments:Department[] = $state([]);

    let current_page = page.url.searchParams.get('page');

    onMount(async () => {
        departments = await api_request('department/');
    });

</script>


<div class="container my-5 bg-white py-3 shadow-sm">
    <div class="row">
        <div class="col-md-3 border-end">
            <h3 class="border-bottom p-3"><i class="fa fa-pie-chart"></i> Statistics</h3>
            <nav class="nav flex-column">
                <a class="nav-link py-3 border-bottom fw-bold" aria-current="page" href="/statistic?page=overview">Overview</a>
                <a class="nav-link py-3 border-bottom fw-bold" href="/statistic?page=scholarship">Beasiswa</a>
                <div class="nav-item">
                    <a class="nav-link py-3 border-bottom fw-bold"  href="/statistic?page=achievement">Prestasi</a>
                    <div class="ms-3 small py-1" style="overflow-x: auto;">
                        {#each departments as department}
                            <a class="d-block py-2 border-bottom" href={`/department/${department.id}`}>{department.name}</a>
                        {/each}
                    </div>
                </div>
            </nav>
        </div>
        <div class="col-md-9">
            {#if current_page == 'scholarship'}
                <div class="text-center">
                    <h1 class="display-1">Scholarship</h1>
                    <p class="lead">Page not found</p>
                </div>
            {:else if current_page == 'achievement'}
                <div class="text-center">
                    <h1 class="display-1">Achievement</h1>
                    <p class="lead">Page not found</p>
                </div>
            {:else}
                <StatisticOverview></StatisticOverview>
            {/if}
        </div>
    </div>
</div>