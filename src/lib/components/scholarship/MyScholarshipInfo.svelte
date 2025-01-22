<script lang="ts">
    import { format_publication_date, slugify } from "$lib/utils";
    const { sch_application } = $props();
</script>


<div class="list-unstyled mb-0">
    <div class="row mb-1">
        <div class="col-md-3 text-muted">Scholarship Name:</div>
        <div class="col-md-9 fw-bold">
            <a href="/account/student/scholarship/{slugify(sch_application.scholarship.name)}---{sch_application.scholarship.code}">{sch_application.scholarship.name}</a>                            
        </div>
    </div>
    <div class="row mb-1">
        <div class="col-md-3 text-muted">Targets:</div>
        <div class="col-md-9">{sch_application.scholarship.targets.map((target: { name: string }) => target.name).join(", ")}</div>
    </div>
    <div class="row mb-1">
        <div class="col-md-3 text-muted">Deadline:</div>
        <div class="col-md-9 text-danger">
            {format_publication_date(sch_application.scholarship.end_date)} ({sch_application.scholarship.days_remaining} days remaining)
        </div>
    </div>
    <div class="row mb-1">
        <div class="col-md-3 text-muted">Status:</div>
        <div class="col-md-9">
            <div class='mb-2'>
                <span class="badge {sch_application.status === 'ACCEPTED' ? 'bg-success' : sch_application.status === 'REJECTED' ? 'bg-danger' : 'bg-info'}">
                    {sch_application.status}
                </span>    
            </div>
            {#if sch_application.status === 'ACCEPTED'}
                <div class="alert alert-success" role="alert">
                    <strong>Congratulations!</strong> Your scholarship application has been accepted.
                </div>
            {:else if sch_application.status === 'REJECTED'}
                <div class="alert alert-danger" role="alert">
                    <strong>We're sorry!</strong> Your scholarship application has been rejected.
                </div>
            {:else}
                <div class="alert alert-info" role="alert">
                    Your scholarship application is currently being reviewed.
                </div>
            {/if}
        </div>
    </div>
</div>

{#if sch_application.note.length > 5}
    <div class="py-3 my-3 border-top">
        <div class="text-muted">Note from Committee:</div>
        <div class="alert alert-info" role="alert">
            {@html sch_application.note}
        </div>
    </div>
{/if}

