<script lang="ts">
    import { calculate_reading_time, format_publication_date, slugify } from '$lib/utils';
    import { onMount } from 'svelte';
    import type { LayoutData } from './$types';
    import type { Department, Faculty } from '$lib/types/scholarship_university';
    import { api_request } from '$lib/api';

    const { data }: { data: LayoutData } = $props();
    const scholarship = data.scholarship;

    let faculties:Faculty[] = $state([]);
    let departments:Department[] = $state([]);
    let reading_time = $state(0);

    onMount(async () => {
        document.title = scholarship.name;
        faculties = await api_request('faculty/');
        departments = await api_request('department/');
        reading_time = calculate_reading_time('.scholarship-page');
    });

</script>

<div class="scholarship-page">
    <div class="scholarship-thumbnail position-relative p-5" style="background-image: url({scholarship.thumbnail}); background-size: cover;">
        <div class="container position-relative d-flex flex-column justify-content-end h-100">
            <div><h1 class="h2 bg-primary text-warning p-3 d-inline-block">{scholarship.name}</h1></div>
            <div><p class="bg-light opacity-75 p-3 d-inline-block">{scholarship.sch_excerpt}</p></div>  
        </div>
    </div>
    <div class="scholarship-content container bg-white py-5 mb-5 rounded position-relative shadow-sm" style="margin-top: -35px;">
        <div class="row">
            <div class="col-md-3 d-none d-md-block">     
                <div class="px-3 text-end sticky-top" style="top: 100px;">
                    <a class="py-3 border-bottom h4 d-block" href="#description">Description</a>
                    <a class="py-3 border-bottom h4 d-block" href="#requirements">Requirements</a>
                    <a class="py-3 border-bottom h4 d-block" href="#attachment">Attachments</a>
                    <a class="py-3 border-bottom h4 d-block" href="#schedule">Schedule</a>
                    <a class="py-3 border-bottom h4 d-block" href="#faculty">Faculty</a>
                    <a class="py-3 border-bottom h4 d-block" href="#department">Department</a>
                    <a class="py-3 h4 d-block" href="#apply">Appply</a>
                </div>
            </div>
            <div class="col-md-9 border-start">
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
                    <div class="lead">{@html scholarship.description}</div>
                </div>
                <div id="requirements" class="mb-5 pb-3 border-bottom lead">
                    <h3>Requirements</h3>
                    {@html scholarship.requirement}
                </div>
                <div id="attachment" class="mb-5 pb-3 border-bottom lead">
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
                                    <div class="small text-muted">{attachment.description}</div>
                                </div>
                            </div>
                        {/each}
                    </div>
                </div>
                <div id="schedule" class="mb-5 pb-3 border-bottom lead">
                    <h3>Schedule</h3>
                    <div class="row mb-3">
                        <div class="col-md-4">Start Date:</div>
                        <div class="col-md-8 fw-bold">{format_publication_date(scholarship.start_date, "MMMM dd, yyyy 'at' hh:mm a")}</div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-md-4">End Date:</div>
                        <div class="col-md-8 fw-bold">{format_publication_date(scholarship.end_date, "MMMM dd, yyyy 'at' hh:mm a")}</div>
                    </div>
                </div>
                <div id="faculty" class="mb-5 pb-3 border-bottom lead">
                    <h3>Faculty</h3>
                    <div class="my-3">
                        {#each faculties as faculty}
                            <div class="d-flex align-items-center mb-2 text-center">
                                <i class="fas {(scholarship.faculties.length === 0 || scholarship.faculties.map((f: Faculty) => f.id).includes(faculty.id)) ? 'fa-check text-white bg-success' : 'fa-times text-white bg-danger'} p-1 rounded me-2" style="min-width:30px;"></i> {faculty.name}
                            </div>
                        {/each}
                    </div>
                </div>
                <div id="department" class="mb-5 pb-3 border-bottom lead">
                    <h3>Department</h3>
                    <div class="my-3" style="max-height: 375px; overflow-y: auto;">
                        {#each departments as department}
                            <div class="d-flex align-items-center mb-2 text-center">
                                <i class="fas {(scholarship.departments.length === 0 || scholarship.departments.map((d: Department) => d.id).includes(department.id)) ? 'fa-check text-white bg-success' : 'fa-times text-white bg-danger'} p-1 rounded me-2" style="min-width:30px;"></i> {department.name}
                            </div>
                        {/each}
                    </div>
                </div>
                <div id="apply" class="mb-5 pb-3 border-bottom lead">
                    <h3>Scholarship Application</h3>
                    {#if scholarship.status === 'on-going'}
                        <div class="alert alert-success">Scholarship is currently active. You can apply here!</div>
                        <div class="d-flex justify-content-center py-3">
                            <a href="/scholarship/apply/{scholarship.code}" class="btn btn-success btn-lg">Apply Now</a>
                        </div>
                    {:else if scholarship.status === 'coming-soon'}
                        <div class="alert alert-warning">Scholarship is coming soon. Stay tuned!</div>
                        <div class="mt-3">
                            <p>Opens on: {format_publication_date(scholarship.start_date, "MMMM dd, yyyy 'at' hh:mm a")}</p>
                            <p>Ends on: {format_publication_date(scholarship.end_date, "MMMM dd, yyyy 'at' hh:mm a")}</p>
                        </div>
                    {:else if scholarship.status === 'closed'}
                        <div class="alert alert-danger">Scholarship is currently closed.</div>
                    {/if}
                </div>
            </div>
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

    .scholarship-thumbnail {
        height: 500px;
    }
</style>
