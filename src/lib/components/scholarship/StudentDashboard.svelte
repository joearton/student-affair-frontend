<script lang="ts">
    import { api_request } from "$lib/api";
    import { onMount } from "svelte";
    import type { ScholarshipApplication } from "$lib/types/scholarship_application";
    import MyScholarshipItem from "./MyScholarshipItem.svelte";

    const { user } = $props();

    let sch_applications: ScholarshipApplication[] = $state([]);

    onMount(async () => {
        const response = await api_request("scholarship_application/?limit=3");
        sch_applications = response;
    });
</script>


<div class="row text-center g-4 mb-5">
    <div class="col-md-4">
        <div class="card border-0 shadow-sm text-primary h-100">
            <div class="d-flex align-items-center p-4">
                <i class="fa-solid fa-award fs-1 me-3"></i>
                <div>
                    <h5 class="fw-bold">Scholarship</h5>
                    <h6 class="fw-bold">{ user.applications ? user.applications.length : 0 }</h6>
                </div>
            </div>
        </div>
    </div>
    <div class="col-md-4">
        <div class="card border-0 shadow-sm text-success h-100">
            <div class="d-flex align-items-center p-4">
                <i class="fa-solid fa-circle-check fs-1 me-3"></i>
                <div>
                    <h5 class="fw-bold">Accepted</h5>
                    <h6 class="fw-bold">{ user.applications ? user.applications.filter((app: ScholarshipApplication) => app.status === 'ACCEPTED').length : 0 }</h6>
                </div>
            </div>
        </div>
    </div>
    <div class="col-md-4">
        <div class="card border-0 shadow-sm text-danger h-100">
            <div class="d-flex align-items-center p-4">
                <i class="fa-solid fa-circle-xmark fs-1 me-3"></i>
                <div>
                    <h5 class="fw-bold">Rejected</h5>
                    <h6 class="fw-bold">{ user.applications ? user.applications.filter((app: ScholarshipApplication) => app.status === 'REJECTED').length : 0 }</h6>
                </div>
            </div>
        </div>
    </div>
</div>

<h5 class="mt-4 mb-3">Registered Scholarship...</h5>
{#if sch_applications.length === 0}
    <div class="alert alert-info">No scholarship application found.</div>
{:else}
    <MyScholarshipItem { sch_applications }></MyScholarshipItem>
{/if}

