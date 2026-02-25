<script lang="ts">

    import type { LayoutData } from "./$types";
    import { format_publication_date, slugify } from "$lib/utils";

    const { data }: { data: LayoutData } = $props();
    const sch_application = data.sch_application;

    import { api_request } from "$lib/api";
    import { addMessage } from "$lib/stores/messages";
    import { onMount } from "svelte";
    import { redirect } from "@sveltejs/kit";
    import { goto } from "$app/navigation";


    async function change_validity(e: Event, item: any) {
        const select = e.currentTarget as HTMLSelectElement;
        const is_valid = select.value === "1";
        try {
            addMessage("success", "Validating attachment...");
            await api_request(`/application_attachment/${item.id}/`, "PUT", { valid: is_valid });
            item.valid = is_valid;
        } catch (err) {
            addMessage("error", "Error updating attachment validity...");
        }
    }

    
    let comment = $state("");
    let status  = $state("");

    async function submit_review(event: Event) {
        event.preventDefault();
        const form = event.currentTarget as HTMLFormElement;

        const response = await api_request(
            `/application_review/${sch_application.review.id}/`,
            'PATCH', {
                comment: comment,
                status: status
            }
        );
        addMessage("success", "Recommendation submitted.");
        goto("/account/reviewer/scholarship");
    }

    onMount(() => {
        if (sch_application.review) {
            comment = sch_application.review.comment;
            status = sch_application.review.status;
        }
    });

</script>


<div class="bg-white shadow-sm py-3">
    <ul class="nav nav-tabs justify-content-center" id="myTab" role="tablist">
        <li class="nav-item" role="presentation">
            <button class="nav-link active" id="information-tab" data-bs-toggle="tab" data-bs-target="#information" type="button" role="tab" aria-controls="information" aria-selected="true">🎓 Informasi</button>
        </li>
        <li class="nav-item" role="presentation">
            <button class="nav-link" id="form-tab" data-bs-toggle="tab" data-bs-target="#form" type="button" role="tab" aria-controls="form" aria-selected="false">Formulir Beasiswa</button>
        </li>
        <li class="nav-item" role="presentation">
            <button class="nav-link" id="upload-tab" data-bs-toggle="tab" data-bs-target="#upload" type="button" role="tab" aria-controls="upload" aria-selected="false">Lampiran</button>
        </li>
        <li class="nav-item" role="presentation">
            <button class="nav-link" id="recomendation-tab" data-bs-toggle="tab" data-bs-target="#recomendation" type="button" role="tab" aria-controls="upload" aria-selected="false">Rekomendasi</button>
        </li>
    </ul>
    <div class="tab-content px-4 py-5" id="myTabContent">
        <div class="tab-pane fade show active" id="information" role="tabpanel" aria-labelledby="information-tab">
            {#if sch_application.note.length > 5}
                <div class="py-1 my-1">
                    <div class="text-muted">Note from Committee:</div>
                    <div class="alert alert-info" role="alert">
                        {@html sch_application.note}
                    </div>
                </div>
            {/if}
            <div class="card border-0 shadow-sm mb-5">
                <div class="card-header bg-light"><h5 class="m-0 py-3">Scholarship Information</h5></div>
                <div class="card-body">
                    <div class="row g-3 mb-1">
                        <div class="col-md-3 text-secondary">Scholarship Name</div>
                        <div class="col-md-9 fw-bold">
                            <a href="/scholarship/{slugify(sch_application.scholarship.name)}---{sch_application.scholarship.code}">{sch_application.scholarship.name}</a>                            
                        </div>
                    </div>
                    <div class="row g-3 mb-1">
                        <div class="col-md-3 text-secondary">Targets</div>
                        <div class="col-md-9">{sch_application.scholarship.targets.map((target: { name: string }) => target.name).join(", ")}</div>
                    </div>
                    <div class="row g-3 mb-1">
                        <div class="col-md-3 text-secondary">Deadline</div>
                        <div class="col-md-9 text-danger">
                            {format_publication_date(sch_application.scholarship.end_date)}
                            <small class="ms-1">({sch_application.scholarship.days_remaining} days remaining)</small>
                        </div>
                    </div>
                    <div class="row g-3 mb-1">
                        <div class="col-md-3 text-secondary">Status</div>
                        <div class="col-md-9">
                            <span class="badge {sch_application.status === 'ACCEPTED' ? 'bg-success' : sch_application.status === 'REJECTED' ? 'bg-danger' : 'bg-info'}">
                                {sch_application.status}
                            </span>    
                        </div>
                    </div>
                </div>
            </div>

            <div class="card border-0 shadow-sm mb-5">
                <div class="card-header bg-light"><h5 class="m-0 py-3">Student</h5></div>
                <div class="card-body">
                    <div class="row g-3 mb-1">
                        <div class="col-md-3 text-secondary">Full Name</div>
                        <div class="col-md-9 fw-bold">{sch_application.student.name}</div>
                    </div>    
                    <div class="row g-3 mb-1">
                        <div class="col-md-3 text-secondary">Birth Info</div>
                        <div class="col-md-9">
                            {sch_application.student.place_birth},
                            {sch_application.student.date_birth}
                        </div>
                    </div>
                    <div class="row g-3 mb-1">
                        <div class="col-md-3 text-secondary">Student ID</div>
                        <div class="col-md-9">{sch_application.student.student_id}</div>
                    </div>
                    <div class="row g-3 mb-1">
                        <div class="col-md-3 text-secondary">Status</div>
                        <div class="col-md-9">{sch_application.student.status_display}</div>
                    </div>
                    <div class="row g-3 mb-1">
                        <div class="col-md-3 text-secondary">Periode Masuk</div>
                        <div class="col-md-9">{sch_application.student.reg_period}</div>
                    </div>
                    <div class="row g-3 mb-1">
                        <div class="col-md-3 text-secondary">Department</div>
                        <div class="col-md-9">{sch_application.student.department_name}</div>
                    </div>
                    <div class="row g-3">
                        <div class="col-md-3 text-secondary">Faculty</div>
                        <div class="col-md-9">{sch_application.student.faculty_name}</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="tab-pane fade" id="form" role="tabpanel" aria-labelledby="form-tab">
            <div class="list-unstyled">
                <div class="row mb-3">
                    <div class="col-md-6">
                        <div class="mb-3">
                            <div class="text-muted">Father's Occupation:</div>
                            <div class="fw-bold">{sch_application.father_occupation_display}</div>
                        </div>        
                    </div>
                    <div class="col-md-6">
                        <div class="mb-3">
                            <div class="text-muted">Father's Monthly Income:</div>
                            <div class="fw-bold">{sch_application.father_income_display}</div>
                        </div>
                    </div>
                </div>
                <div class="row mb-3">
                    <div class="col-md-6">
                        <div class="mb-3">
                            <div class="text-muted">Mother's Occupation:</div>
                            <div class="fw-bold">{sch_application.mother_occupation_display}</div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="mb-3">
                            <div class="text-muted">Mother's Monthly Income:</div>
                            <div class="fw-bold">{sch_application.mother_income_display}</div>
                        </div>
                    </div>
                </div>
                <div class="mb-3">
                    <div class="text-muted">Description:</div>
                    <div class="p-2 border" style="max-height: 500px; overflow: auto;">{@html sch_application.self_description || "-"}</div>
                </div>
                <div class="mb-3">
                    <div class="text-muted">Motivation:</div>
                    <div class="p-2 border" style="max-height: 500px; overflow: auto;">{@html sch_application.motivation || "-"}</div>
                </div>
            </div>
        </div>

        <div class="tab-pane fade" id="upload" role="tabpanel" aria-labelledby="upload-tab">
            {#each sch_application.attachments as item}
                <div class="card mb-3 border-0 shadow-sm">
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-center">
                            <div>
                                <h5 class="card-title mb-1">{item.attachment.name}</h5>
                                <p class="text-muted small mb-2">{item.attachment.description}</p>
                            </div>
                            <a id="file-phd-{item.id}" href={item.file} class="btn btn-primary btn-sm {item.file ? '' : 'd-none'}">
                                <i class="fa fa-eye me-2"></i>View
                            </a>
                        </div>
                        <hr />
                        <div class="mb-1">
                            <label for="validity-{item.id}" class="form-label me-2">Validity:</label>
                            <select id="validity-{item.id}" name="validity" class="form-select form-select-sm w-auto d-inline-block" onchange={(e) => change_validity(e, item)}>
                                <option value="1" selected={item.valid === true}>Valid</option>
                                <option value="0" selected={item.valid === false}>Invalid</option>
                            </select>
                        </div>
                    </div>
                </div>
            {/each}
        </div>
        <div class="tab-pane fade" id="recomendation" role="tabpanel" aria-labelledby="recomendation-tab">
            <form onsubmit={submit_review} class="p-3">
                <div class="mb-4">
                    <label for="comment" class="form-label fw-semibold">Your Thoughts</label>
                    <textarea id="comment" class="form-control shadow-sm rounded-3" rows="4" bind:value={comment} placeholder="Share your perspective..."></textarea>
                </div>
                <div class="mb-4">
                    <label for="status" class="form-label fw-semibold">Decision</label>
                    <select id="status" class="form-select shadow-sm rounded-3" bind:value={status}>
                        <option value="" disabled selected={status === ""}>-- Select Status --</option>
                        <option value="APPROVED" selected={status === "APPROVED"}>Approve</option>
                        <option value="REJECTED" selected={status === "REJECTED"}>Reject</option>
                    </select>
                </div>
                <div class="alert alert-info">
                    <strong>Last updated:</strong>
                    {format_publication_date(sch_application.review.date_modified, 'yyyy-MM-dd HH:mm:ss')}
                </div>
                <div class="text-end">
                    <button type="submit" class="btn btn-primary shadow-sm rounded-pill px-4">
                        Send
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>