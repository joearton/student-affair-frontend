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

{#if sch_application.tests && sch_application.tests.length > 0}
    <div class="my-4 py-3 border-top">
        <h5 class="text-primary mb-3">Tests</h5>
        {#each sch_application.tests as test}
            <div class="card shadow-sm mb-3">
                <div class="card-body">
                    <h6 class="card-subtitle mb-2 text-muted">Test Date: {new Date(test.test_datetime).toLocaleString()}</h6>
                    <p class="mb-1"><strong>Test URL:</strong> <a href="{test.test_url}" target="_blank">{test.test_url}</a></p>
                    <p class="mb-1"><strong>Username:</strong> {test.test_username}</p>
                    <p class="mb-1"><strong>Password:</strong> {test.test_password}</p>
                    {#if test.test_score}
                        <p class="mb-1 text-success"><strong>Score:</strong> {test.test_score}</p>
                    {/if}
                </div>
            </div>
        {/each}
    </div>
{/if}

{#if sch_application.note && sch_application.note.length > 5}
    <div class="py-3 my-3 border-top">
        <div class="text-muted">Note from Committee:</div>
        <div class="alert alert-info" role="alert">
            {@html sch_application.note}
        </div>
    </div>
{/if}

