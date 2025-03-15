<script lang="ts">
    import { format_publication_date } from '$lib/utils';
    import { user } from "$lib/stores/user"
    import { goto } from '$app/navigation';
    import type { Department, Faculty } from '$lib/types/scholarship_university';
    
    const { scholarship, faculties, departments, reading_time, mini_mode } = $props();

    let nav_item_class = $state('h4');
    let nav_content_class = $state('lead');
    let nav_item_col = $state('col-md-3');
    let nav_content_col = $state('col-md-9');

    if (mini_mode) {
        nav_item_class = 'small';
        nav_content_class = '';
        nav_item_col = 'col-md-2';
        nav_content_col = 'col-md-10';
    }

    const handle_apply_now = function () {
        const modal = document.getElementById('applyModal');
        if (modal) {
            modal.classList.remove('show');
        }
        const backdrop = document.getElementsByClassName('modal-backdrop');
        if (backdrop) {
            if (backdrop.length > 0) {
                backdrop[0].remove();
            }
        }
        
        if ($user.authenticated) {
            goto(`/account/student/scholarship/apply/${scholarship.code}/`);
        } else {
            goto(`/auth/signin?scholarship=${scholarship.code}`);
        }
    }
</script>


<div class="row">
    <div id="page-nav" class="{nav_item_col} d-none d-md-block {mini_mode ? 'order-md-2' : 'order-md-1'}">
        <div class="px-2 sticky-top {mini_mode ? '' : 'text-end'}" style="top: 100px; z-index: 1000;">
            <a class="{mini_mode ? 'pb-3' : 'py-3'} border-bottom {nav_item_class} d-block" href="#description">Description</a>
            <a class="py-3 border-bottom {nav_item_class} d-block" href="#requirements">Requirements</a>
            <a class="py-3 border-bottom {nav_item_class} d-block" href="#attachment">Attachments</a>
            <a class="py-3 border-bottom {nav_item_class} d-block" href="#schedule">Schedule</a>
            <a class="py-3 border-bottom {nav_item_class} d-block" href="#targets">Targets</a>
            <a class="py-3 border-bottom {nav_item_class} d-block" href="#faculty">Faculty</a>
            <a class="py-3 border-bottom {nav_item_class} d-block" href="#department">Department</a>
            {#if mini_mode}
                <a class="{nav_item_class} {scholarship.eligible.status ? 'btn btn-success my-3 w-100' : 'py-3 d-block'}" href="#apply">Apply</a>
            {:else}
                <a class="py-3 border-bottom {nav_item_class} d-block" href="#apply">Apply</a>
            {/if}
        </div>
    </div>
    <div id="page-content" class="{nav_content_col} {mini_mode ? 'order-md-1 border-end' : 'order-md-2 border-start'}">
        <div id="description" class="mb-5 pb-3 border-bottom">
            <div class="row mb-4 pb-3 border-bottom">
                <div class="col-md-6">
                    <h1 class="h3">{scholarship.name}</h1>
                    <div>Max Quota: {scholarship.quota}</div>
                </div>
                <div class="col-md-6">
                    <div class="mb-1">
                        <i class="fas fa-calendar-alt me-2 text-primary"></i>
                        {format_publication_date(scholarship.date_created, "MMMM dd, yyyy 'at' hh:mm a")}
                    </div>
                    <div class="mb-1">
                        <i class="fas fa-edit me-2 text-primary"></i>
                        {format_publication_date(scholarship.date_modified, "MMMM dd, yyyy 'at' hh:mm a")}
                    </div>
                    <div class="mb-1">
                        <i class="fas fa-clock me-2 text-primary"></i>
                        {reading_time} minutes
                    </div>
                </div>
            </div>   
            <div class="{nav_content_class}">{@html scholarship.description}</div>
        </div>
        <div id="requirements" class="mb-5 pb-3 border-bottom {nav_content_class}">
            <h3>Requirements</h3>
            {@html scholarship.requirement}
        </div>
        <div id="attachment" class="mb-5 pb-3 border-bottom {nav_content_class}">
            <h3>Attachments</h3>
            <div class="py-3">
                {#each scholarship.attachments as attachment, index}
                    <div class="d-flex attachment-item mb-2 bg-light">
                        <div class="h5 m-0 d-flex align-items-center px-4 bg-primary text-warning">{index + 1}</div>
                        <div class="flex-grow-1 py-2 px-3">
                            <div>
                                <span class="fw-bold d-inline">{attachment.name}</span>
                                <span class="badge bg-success" style="font-size: 11px !important;">
                                    {attachment.types} (Max: {attachment.max_size} KB)
                                </span>
                            </div>
                            <div class="small text-muted">{@html attachment.description}</div>
                        </div>
                    </div>
                {/each}
            </div>
        </div>
        <div id="schedule" class="mb-5 pb-3 border-bottom {nav_content_class}">
            <h3>Schedule</h3>
            <div class="row mb-3">
                <div class="col-md-4">
                    <i class="fas fa-calendar-alt me-2 text-primary"></i> Start Date:
                </div>
                <div class="col-md-8 fw-bold">{format_publication_date(scholarship.start_date, "MMMM dd, yyyy 'at' hh:mm a")}</div>
            </div>
            <div class="row mb-3">
                <div class="col-md-4">
                    <i class="fas fa-calendar-alt me-2 text-primary"></i> End Date:
                </div>
                <div class="col-md-8 fw-bold">{format_publication_date(scholarship.end_date, "MMMM dd, yyyy 'at' hh:mm a")}</div>
            </div>
        </div>
        <div id="targets" class="mb-5 pb-3 border-bottom {nav_content_class}">
            <h3>Targets</h3>
            <div class="my-3">
                {#each scholarship.targets as target, index}
                    <div class="lead">
                        {#if scholarship.targets.length > 1}
                            {index+1}.
                        {/if}
                        {target.name}
                    </div>
                {/each}
            </div>
        </div>
        <div id="faculty" class="mb-5 pb-3 border-bottom {nav_content_class}">
            <h3>Faculty</h3>
            <div class="my-3">
                {#each faculties as faculty}
                    <div class="d-flex align-items-center mb-2 text-center">
                        <i class="fas {(scholarship.faculties.length === 0 || scholarship.faculties.map((f: Faculty) => f.id).includes(faculty.id)) ? 'fa-check text-white bg-success' : 'fa-times text-white bg-danger'} p-1 rounded me-2" style="min-width:30px;"></i> {faculty.name}
                    </div>
                {/each}
            </div>
        </div>
        <div id="department" class="mb-5 pb-3 border-bottom {nav_content_class}">
            <h3>Department</h3>
            <div class="my-3" style="max-height: 375px; overflow-y: auto;">
                {#each departments as department}
                    <div class="d-flex align-items-center mb-2 text-center">
                        <i class="fas {(scholarship.departments.length === 0 || scholarship.departments.map((d: Department) => d.id).includes(department.id)) ? 'fa-check text-white bg-success' : 'fa-times text-white bg-danger'} p-1 rounded me-2" style="min-width:30px;"></i> {department.name}
                    </div>
                {/each}
            </div>
        </div>

        <div id="apply" class="mb-5 pb-3 border-bottom {nav_content_class}">
            <div class="modal fade" id="applyModal" tabindex="-1" aria-labelledby="applyModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="applyModalLabel">Confirm Application</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            Are you sure you want to apply for this scholarship?
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button id="btn-apply" class="btn btn-success" onclick={handle_apply_now}>Apply Now</button>
                        </div>
                    </div>
                </div>
            </div>
            <h3>Scholarship Application</h3>
            {#if scholarship.status === 'on-going'}
                {#if $user.authenticated === true}
                    {#if scholarship.eligible.status === true}
                        {#if $user.applications && $user.applications.some((application: { scholarship_code: string }) => application.scholarship_code === scholarship.code)}
                            <div class="alert alert-info">
                                You have already applied for this scholarship.
                                Go to <a class="fw-bold" href="/account/student/myscholarship/">MyScholarship</a> to check the status.
                            </div>
                        {:else}
                            <div class="alert alert-success">Scholarship is eligible for you. You can apply here!</div>
                            <div class="d-flex justify-content-center py-3">
                                <button type="button" class="btn btn-success btn-lg" data-bs-toggle="modal" data-bs-target="#applyModal">Apply Now</button>
                            </div>
                        {/if}
                    {:else}
                        <div class="alert alert-danger">You are not eligible to apply for this scholarship.</div>
                        <table class="table table-bordered">
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Scope</th>
                                    <th>Reason</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {#each scholarship.eligible && Object.entries(scholarship.eligible.scopes) as [key, value]: [string, { reason: string }], index}
                                    <tr>
                                        <td>{index + 1}</td>
                                        <td>{key}</td>
                                        <td>{(value as { reason: string }).reason}</td>
                                        <td>
                                            <i class="fas {(value as { status: boolean }).status ? 'fa-check text-white bg-success' : 'fa-remove text-white bg-danger'} p-1 rounded"></i>
                                        </td>
                                    </tr>
                                {/each}
                            </tbody>
                        </table>
                    {/if}
                {:else}
                    <div class="alert alert-success">Scholarship is open now!</div>
                    <div class="d-flex justify-content-center py-3">
                        <button type="button" class="btn btn-success btn-lg" data-bs-toggle="modal" data-bs-target="#applyModal">Apply Now</button>
                    </div>
                {/if}
            {:else if scholarship.status === 'coming-soon'}
                <div class="alert alert-warning">
                    Scholarship is coming soon and will be open on <b>{format_publication_date(scholarship.start_date, "MMMM dd, yyyy 'at' HH:mm")}</b>. Stay tuned!
                </div>
            {:else if scholarship.status === 'closed'}
                <div class="alert alert-danger">Scholarship is currently closed.</div>
            {/if}
        </div>
    </div>
</div>


<style>
    #description::before,
    #requirements::before,
    #attachment::before,
    #schedule::before,
    #faculty::before,
    #department::before,
    #apply::before {
        content: "";
        display: block;
        height: 90px; /* Tinggi navbar */
        margin-top: -90px;
    }


</style>
