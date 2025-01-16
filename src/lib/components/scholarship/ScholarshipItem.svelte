<script lang="ts">
    import { slugify } from "$lib/utils";
    const { scholarship, sch_referer } = $props();

    let sch_plink = $state("/scholarship");
    if (sch_referer == "account") {
        sch_plink = "/account/student/scholarship";
    }
</script>

<div class="position-relative py-3 px-4">
    <h3>
        <a href="{sch_plink}/{slugify(scholarship.name)}---{scholarship.code}"
           class:text-success={scholarship.eligible.status === true}
           class:fw-bold={scholarship.eligible.status === true}
           class:text-muted={scholarship.status === "closed" || scholarship.eligible.status === false}>
            {scholarship.name}
        </a>
    </h3>

    <div class="position-absolute top-0 end-0 m-3">
        {#if sch_referer == "account"}
            <span class="badge"
                class:bg-success={scholarship.eligible.status === true}
                class:bg-danger={scholarship.eligible.status === false}>
                <i class={scholarship.eligible.status ? "fa fa-check" : "fa fa-remove"}></i>
                {scholarship.eligible.status ? "Eligible" : "Not Eligible"}
            </span>
        {/if}
        <span class="badge"
            class:bg-success={scholarship.status === "on-going"}
            class:bg-info={scholarship.status === "coming-soon"}
            class:bg-danger={scholarship.status === "closed"}>
            {scholarship.status_display}
        </span>
    </div>

    <p class='small'>{scholarship.sch_excerpt}</p>
    <div class="row small text-muted">
        <div class="col-md-6">
            <div class="row mb-1">
                <div class="col-md-4">
                    <strong><i class="fas fa-map-marker-alt"></i> Source</strong>
                </div>
                <div class="col-md-8">: {scholarship.source_display}</div>
            </div>
            <div class="row mb-1">
                <div class="col-md-4">
                    <strong><i class="fas fa-plane"></i> Destination</strong>
                </div>
                <div class="col-md-8">: {scholarship.destination_display}</div>
            </div>
            <div class="row mb-1">
                <div class="col-md-4">
                    <strong><i class="fas fa-bullseye"></i> Target</strong>
                </div>
                <div class="col-md-8">
                    : {scholarship.target_names.map((target: any) => target[0]).join(", ")}
                </div>
            </div>
            <div class="row mb-1">
                <div class="col-md-4">
                    <strong><i class="fas fa-users"></i> Quota</strong>
                </div>
                <div class="col-md-8">: {scholarship.quota}</div>
            </div>
        </div>
        <div class="col-md-6">
            <div class="row mb-1">
                <div class="col-md-4">
                    <strong><i class="fas fa-calendar-alt"></i> Start Date</strong>
                </div>
                <div class="col-md-8">: {scholarship.sch_start_date}</div>
            </div>
            <div class="row mb-1">
                <div class="col-md-4">
                    <strong><i class="fas fa-calendar-check"></i> End Date</strong>
                </div>
                <div class="col-md-8">: {scholarship.sch_end_date}</div>
            </div>
            <div class="row mb-1">
                <div class="col-md-4">
                    <strong><i class="fas fa-graduation-cap"></i> Level</strong>
                </div>
                <div class="col-md-8">: {scholarship.level_display}</div>
            </div>
        </div>
    </div>
</div>
