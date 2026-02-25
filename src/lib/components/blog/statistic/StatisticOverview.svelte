<script lang="ts">
    import { api_request } from "$lib/api";
    import { slugify } from "$lib/utils";
    import { onMount } from "svelte";

    // interface scholarship 
    interface ScholarshipPerYear {
        id: number;
        name: string;
        application_total: number;
        application_accepted: number;
    }

    interface ScholarshipType {
        year: number;
        total: number;
        scholarships: ScholarshipPerYear[] 
    }

    let statistics: ScholarshipType[] = $state([]);

    onMount(async () => {
        statistics = await api_request('statistics/?page=overview');
    });
</script>


<h1 class="h2 border-bottom py-3">Overview</h1>

<h4 class="mt-4 mb-3">Beasiswa</h4>
<div class="p-3 border" style="max-height: 900px; overflow-y: auto;">
    <table class="table">
        <thead>
            <tr>
                <th scope="col">Tahun</th>
                <th scope="col">Jumlah Beasiswa</th>
                <th scope="col">Daftar Beasiswa</th>
                <th scope="col">Pendaftar</th>
            </tr>
        </thead>
        <tbody>
            {#each statistics as statistic}
                <tr>
                    <td class="align-middle">{statistic.year}</td>
                    <td class="align-middle">{statistic.total}</td>
                    <td class="align-middle">
                        {#each statistic.scholarships as sch}
                            <a class='d-block my-1' href={`/scholarship/${slugify(sch.name)}---${sch.id}`}>{sch.name}</a>
                        {/each}
                    </td>
                    <td class="align-middle">
                        {#each statistic.scholarships as sch}
                            <div class='my-1'>{sch.application_total}</div>
                        {/each}
                    </td>
                </tr>
            {/each}
        </tbody>
    </table>
</div>
