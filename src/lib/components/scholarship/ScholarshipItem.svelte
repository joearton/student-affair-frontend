<script lang="ts">
    import { slugify } from "$lib/utils";
    const { scholarship, sch_referer } = $props();

    let sch_plink = $state("/scholarship");
    if (sch_referer == "account") {
        sch_plink = "/account/student/scholarship";
    }
</script>

<div class="p-3">
    <div class="border-0 d-flex justify-content-between align-items-center">
        <h5 class="mb-0">
            <a
                href="{sch_plink}/{slugify(scholarship.name)}---{scholarship.code}"
                class:text-success={scholarship.eligible.status === true}
                class:fw-bold={scholarship.eligible.status === true}
                class:text-primary={scholarship.status === "closed" || scholarship.eligible.status === false}
            >
                {scholarship.name}
            </a>
        </h5>
        <div>
            {#if sch_referer == "account"}
                <span
                    class="badge"
                    class:bg-success={scholarship.eligible.status === true}
                    class:bg-danger={scholarship.eligible.status === false}
                >
                    <i class={scholarship.eligible.status ? "fa fa-check" : "fa fa-remove"}></i>
                    {scholarship.eligible.status ? "Eligible" : "Not Eligible"}
                </span>
            {/if}
            <span
                class="badge ms-2"
                class:bg-success={scholarship.status === "on-going"}
                class:bg-info={scholarship.status === "coming-soon"}
                class:bg-danger={scholarship.status === "closed"}
            >
                {scholarship.status_display}
            </span>
        </div>
    </div>
    <div class="py-1">
        <p class="small text-muted">
            {scholarship.sch_excerpt}
        </p>
        <div class="row small text-muted">
            <div class="col-md-6">
                <div class="mb-1 d-flex">
                    <strong class="me-2"><i class="fas fa-map-marker-alt"></i> Source</strong> 
                    <span>{scholarship.source_display}</span>
                </div>
                <div class="mb-1 d-flex">
                    <strong class="me-2"><i class="fas fa-plane"></i> Destination</strong>
                    <span>{scholarship.destination_display}</span>
                </div>
                <div class="mb-1 d-flex">
                    <strong class="me-2"><i class="fas fa-bullseye"></i> Target</strong>
                    <span>{scholarship.target_names.map((t: any) => t[0]).join(", ")}</span>
                </div>
                <div class="mb-1 d-flex">
                    <strong class="me-2"><i class="fas fa-users"></i> Quota</strong>
                    <span>{scholarship.quota}</span>
                </div>
            </div>
            <div class="col-md-6">
                <div class="mb-1 d-flex">
                    <strong class="me-2"><i class="fas fa-calendar-alt"></i> Start Date</strong>
                    <span>{scholarship.sch_start_date}</span>
                </div>
                <div class="mb-1 d-flex">
                    <strong class="me-2"><i class="fas fa-calendar-check"></i> End Date</strong>
                    <span>{scholarship.sch_end_date}</span>
                </div>
                <div class="mb-1 d-flex">
                    <strong class="me-2"><i class="fas fa-graduation-cap"></i> Level</strong>
                    <span>{scholarship.level_display}</span>
                </div>
            </div>
        </div>
    </div>
</div>
