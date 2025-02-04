<script lang="ts">
    import NoDataAvailable from "$lib/components/NoDataAvailable.svelte";
    import { create_excerpt } from "$lib/utils";

    const { sch_applications } = $props();
</script>

{#if sch_applications.length > 0}
    <div class="list-group">
        {#each sch_applications as application}
            <div class="list-group-item list-group-item-action bg-white border my-3 p-4">
                <div class="d-flex justify-content-between align-items-center mb-2">
                    <h4 class="mb-0"><i class="fas fa-graduation-cap me-2"></i>{application.scholarship.name}</h4>
                    <span class="badge {application.status === 'ACCEPTED' ? 'bg-success' : application.status === 'REJECTED' ? 'bg-danger' : 'bg-info'}">
                        {application.status}
                    </span>                
                </div>
                <p class="text-muted">{create_excerpt(application.scholarship.description)}</p>
                <p class="mb-2 text-muted">
                    <i class="fas fa-calendar-alt" style="min-width: 21px;"></i>
                    {application.application_date}
                </p>
                <p class="mb-2">
                    <i class="fas fa-info-circle" style="min-width: 21px;"></i>
                    {application.note && application.note.length > 5 ? "You have a note from the committee" : "No notes provided."}
                </p>
                <a class="btn btn-outline-primary mt-2" href={`/account/student/myscholarship/${application.code}`}>View Details</a>
            </div>
        {/each}
    </div>
{:else}
    <div class="py-3">
        <div class="alert alert-info">
            You have not applied for any scholarship yet. Search for scholarship in
            <a class="fw-bold" href="/account/student/scholarship/">Scholarship Page</a>
        </div>
        <NoDataAvailable></NoDataAvailable>
    </div>
{/if}