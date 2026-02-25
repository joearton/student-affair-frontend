<script lang="ts">
    import NoDataAvailable from "$lib/components/NoDataAvailable.svelte";
    import { create_excerpt } from "$lib/utils";
    import { _ } from 'svelte-i18n';

    const { sch_applications } = $props();
</script>

{#if sch_applications.length > 0}
    <div class="list-group">
        {#each sch_applications as application}
            <div class="list-group-item list-group-item-action p-3 mb-3 bg-white rounded">
                <div class="d-flex justify-content-between align-items-center mb-2">
                    <h5 class="mb-0 text-primary">
                        <a href={`/account/student/myscholarship/${application.code}`} class="text-decoration-none">
                            <i class="fas fa-graduation-cap me-2"></i> {application.scholarship.name}
                        </a>
                    </h5>
                    <span class="badge {application.status === 'ACCEPTED' ? 'bg-success' : application.status === 'REJECTED' ? 'bg-danger' : 'bg-info'}">
                        {application.status}
                    </span>                
                </div>
                <p class="text-muted mb-2">{create_excerpt(application.scholarship.description)}</p>
                <div class="d-flex justify-content-between text-muted small">
                    <span>
                        <i class="fas fa-calendar-alt me-2"></i> {application.application_date}
                    </span>
                    <span>
                        <i class="fas fa-info-circle me-2"></i>
                        {application.note && application.note.length > 5 ? $_('account.myscholarship.note_provided') : $_('account.myscholarship.no_note')}
                    </span>
                </div>
                <a class="btn btn-outline-primary mt-3 w-100" href={`/account/student/myscholarship/${application.code}`}>{$_('account.myscholarship.view_details')}</a>
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