<script lang="ts">
    import { api_request } from "$lib/api";
    import NoDataAvailable from "$lib/components/NoDataAvailable.svelte";
    import type { ScholarshipApplication } from "$lib/types/scholarship_application";
    import { onMount } from "svelte";

    let sch_applications: ScholarshipApplication[] = $state([]);

    onMount(async () => {
        try {
            const response = await api_request("scholarship_application/");
            sch_applications = response;
        } catch (error) {
            console.error("Error fetching scholarship applications:", error);
        }
    });
</script>

<div class="pt-1 pb-3">
    <h5 class="fw-bold px-4 py-3 mb-3 border-bottom">Pendaftaran Beasiswa</h5>
    <div class="px-4 py-3">
        {#if sch_applications.length > 0}
            <table class="table bg-white">
                <thead>
                    <tr>
                        <th>Nama Beasiswa</th>
                        <th>Tanggal Pendaftaran</th>
                        <th>Status</th>
                        <th>Note</th>
                    </tr>
                </thead>
                <tbody>
                    {#each sch_applications as application}
                        <tr>
                            <td>
                                <a class="fw-bold" href={`/scholarship/${application.scholarship.id}`}>{application.scholarship.name}</a>
                            </td>
                            <td>{application.application_date}</td>
                            <td>{application.status}</td>
                            <td>
                                <div class="note">{application.note || "-"}</div>
                            </td>
                        </tr>
                    {/each}
                </tbody>
            </table>
        {:else}
            <div class="py-5">
                <NoDataAvailable></NoDataAvailable>
            </div>
        {/if}
    </div>
</div>