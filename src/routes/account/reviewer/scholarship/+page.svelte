<script lang="ts">
    import { api_request } from "$lib/api";
    import NoDataAvailable from "$lib/components/NoDataAvailable.svelte";
    import type { ScholarshipApplication } from "$lib/types/scholarship_application";
    import { onMount } from "svelte";

    let sch_applications: ScholarshipApplication[] = $state([]);

    let search_query = $state("");
    let selected_status = $state("");
    let selected_department = $state("");
    let departments: string[] = $state([]);

    onMount(async () => {
        try {
            const response = await api_request("scholarship_application/");
            sch_applications = response;

            departments = [...new Set(sch_applications.map(app => app.student.department_name))];
        } catch (error) {
            console.error("Error fetching scholarship applications:", error);
        }
    });
</script>


<div class="pt-1 pb-3">
    <h5 class="fw-bold px-4 py-3 mb-3 border-bottom">Daftar Review</h5>
    <div class="px-4 py-1">
        <div class="d-flex justify-content-between my-3">
            <input type="text" class="form-control me-2" placeholder="Search student..." bind:value={search_query} />
            <select class="form-select me-2" bind:value={selected_status}>
                <option value="">Filter by status</option>
                <option value="ACCEPTED">Accepted</option>
                <option value="REJECTED">Rejected</option>
                <option value="PENDING">Pending</option>
            </select>
            <select class="form-select" bind:value={selected_department}>
                <option value="">Filter by department</option>
                {#each departments as department}
                    <option value={department}>{department}</option>
                {/each}
            </select>
        </div>
    </div>
    <div class="px-4 py-3 account-content">
        {#if sch_applications.length > 0}
            <table class="table table-hover">
                <thead class="thead-dark">
                    <tr>
                        <th scope="col" class="text-center">#</th>
                        <th scope="col">Student</th>
                        <th scope="col">Scholarship</th>
                        <th scope="col">Status</th>
                        <th scope="col">Review</th>
                    </tr>
                </thead>
                <tbody>
                    {#each sch_applications as application, counter}
                        <tr>
                            <td class="text-center align-middle">{counter + 1}</td>
                            <td class="align-middle">
                                <div class="fw-bold">
                                    <a href="/account/reviewer/scholarship/{application.code}">{application.student.name} ({application.student.student_id})</a>
                                </div>
                                <div class="text-muted">{application.student.department_name}</div>
                            </td>
                            <td class="align-middle font-weight-bold">
                                <a target="_blank" href="/scholarship/{application.scholarship.code}">{application.scholarship.name}</a>
                            </td>
                            <td class="align-middle">
                                <div class="badge {application.review?.status === 'ACCEPTED' ? 'bg-success' : application.review?.status === 'REJECTED' ? 'bg-danger' : 'bg-info'}">
                                    {application.review?.status || "PENDING"}
                                </div>
                                <div class="text-muted small">{application.review?.expired_date}</div>
                            </td>
                            <td class="align-middle" >
                                <a href="/account/reviewer/scholarship/{application.code}" aria-label="Review" class="btn btn-sm btn-outline-primary">
                                    <i class="fas fa-pencil"></i>
                                </a>
                            </td>
                        </tr>
                    {/each}
                </tbody>
            </table>
        {:else}
            <NoDataAvailable></NoDataAvailable>
        {/if}
    
    </div>
</div>