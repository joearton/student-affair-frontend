<script lang="ts">
    import { format_publication_date, slugify } from "$lib/utils";
    import { _ } from "svelte-i18n";
    import { PUBLIC_BASE_URL } from "$env/static/public";
    const { sch_application } = $props();
</script>


<div class="list-unstyled mb-0">
    <div class="row mb-2">
        <div class="col-md-3 text-muted">{$_('account.myscholarship.scholarship_name')}:</div>
        <div class="col-md-9 fw-bold">
            <a href="/account/student/scholarship/{slugify(sch_application.scholarship.name)}---{sch_application.scholarship.code}">{sch_application.scholarship.name}</a>                            
        </div>
    </div>
    <div class="row mb-2">
        <div class="col-md-3 text-muted">{$_('account.myscholarship.targets')}:</div>
        <div class="col-md-9">{sch_application.scholarship.targets.map((target: { name: string }) => target.name).join(", ")}</div>
    </div>
    <div class="row mb-2">
        <div class="col-md-3 text-muted">{$_('account.myscholarship.deadline')}:</div>
        <div class="col-md-9">
            {format_publication_date(sch_application.scholarship.end_date)} ({sch_application.scholarship.days_remaining} {$_('account.myscholarship.days_remaining')})
        </div>
    </div>
    {#if sch_application.status !== 'DRAFT'}
        <div class="row mb-2">
            <div class="col-md-3 text-muted">{$_('account.myscholarship.card')}:</div>
            <div class="col-md-9">
                <a href="{PUBLIC_BASE_URL}download/application/{sch_application.code}/">
                    <i class="fa fa-download"></i> {$_('account.myscholarship.download')}
                </a>    
            </div>
        </div>
    {/if}

    <div class="row mb-2">
        <div class="col-md-3 text-muted">{$_('account.myscholarship.status')}:</div>
        <div class="col-md-9">
            <div class='mb-2'>
                <span class="badge {sch_application.status === 'ACCEPTED' ? 'bg-success' : sch_application.status === 'REJECTED' ? 'bg-danger' : 'bg-info'}">
                    {sch_application.status}
                </span>
            </div>
            {#if sch_application.status === 'ACCEPTED'}
                <div class="alert alert-success" role="alert">
                    <strong>{$_('account.myscholarship.congratulations')}</strong> {$_('account.myscholarship.accepted_message')}
                </div>
            {:else if sch_application.status === 'REJECTED'}
                <div class="alert alert-danger" role="alert">
                    <strong>{$_('account.myscholarship.sorry')}</strong> {$_('account.myscholarship.rejected_message')}
                </div>
            {/if}
        </div>
    </div>
</div>

{#if sch_application.tests && sch_application.tests.length > 0}
    <div class="my-4 py-3 border-top">
        {#each sch_application.tests as test}
            <div class="card mb-3">
                <div class="card-header bg-primary text-white">
                    <h6 class="mb-0">{$_('account.myscholarship.test_date')}: {new Date(test.test_datetime).toLocaleString()}</h6>
                </div>
                <div class="card-body">
                    <div class="row mb-1">
                        <div class="col-md-3"><strong>{$_('account.myscholarship.test_url')}:</strong></div>
                        <div class="col-md-9"><a href="{test.test_url}" target="_blank">{test.test_url}</a></div>
                    </div>
                    <div class="row mb-1">
                        <div class="col-md-3"><strong>{$_('account.myscholarship.username')}:</strong></div>
                        <div class="col-md-9">{test.test_username}</div>
                    </div>
                    <div class="row mb-1">
                        <div class="col-md-3"><strong>{$_('account.myscholarship.password')}:</strong></div>
                        <div class="col-md-9">{test.test_password}</div>
                    </div>
                    {#if test.test_score}
                        <div class="row mb-1">
                            <div class="col-md-3 text-success"><strong>{$_('account.myscholarship.score')}:</strong></div>
                            <div class="col-md-9 text-success">{test.test_score}</div>
                        </div>
                    {/if}
                </div>
            </div>
        {/each}
    </div>
{/if}

{#if sch_application.note && sch_application.note.length > 5}
    <div class="py-3 my-3 border-top">
        <p class="fw-bold mb-0">{$_('account.myscholarship.note_from_committee')}:</p>
        <div class="border p-3">
            {@html sch_application.note}
        </div>
    </div>
{/if}

