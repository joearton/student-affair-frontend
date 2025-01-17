<script lang="ts">
    import { onMount } from "svelte";
    import { api_request } from "$lib/api";
    import { addMessage } from "$lib/stores/messages";
    import type { LayoutData } from "./$types";
    import { format_publication_date } from "$lib/utils";

    import EasyMDE from "easymde";
    import "easymde/dist/easymde.min.css";

    const { data }: { data: LayoutData } = $props();
    const sch_application = data.sch_application;

    let selfDescriptionEditor: EasyMDE;
    let motivationEditor: EasyMDE;

    let form_data = $state({
        status: sch_application.status,
        self_description: sch_application.self_description,
        parent_income: sch_application.parent_income,
        parent_occupation: sch_application.parent_occupation,
        motivation: sch_application.motivation,
    });


    const update_sch_application = async () => {
        await api_request(`scholarship_application/${sch_application.scholarship.code}`, "PUT", form_data);
        addMessage("success", "Application updated successfully");
    };

    onMount(() => {
        // Inisialisasi EasyMDE untuk Self Description
        selfDescriptionEditor = new EasyMDE({
            element: document.getElementById("self_description") as HTMLTextAreaElement,
            initialValue: form_data.self_description,
            placeholder: "Write your self description...",
        });

        selfDescriptionEditor.codemirror.on("change", () => {
            form_data.self_description = selfDescriptionEditor.value();
        });

        // Inisialisasi EasyMDE untuk Motivation
        motivationEditor = new EasyMDE({
            element: document.getElementById("motivation") as HTMLTextAreaElement,
            initialValue: form_data.motivation,
            placeholder: "Write your motivation...",
        });

        motivationEditor.codemirror.on("change", () => {
            form_data.motivation = motivationEditor.value();
        });        
    });


</script>

<div class="pt-1 pb-3">
    <h5 class="fw-bold px-4 py-3 mb-3 border-bottom">Pendaftaran Beasiswa</h5>
    <div class="px-4 pb-5">
        <div class="py-3 mb-4 border-bottom">
            <div class="scholarship-info">
                <h5 class="fw-bold text-primary mb-3">🎓 {sch_application.scholarship.name}</h5>
                <div class="list-unstyled mb-0">
                    <div class="row mb-1">
                        <div class="col-md-3 text-muted">Scholarship Name:</div>
                        <div class="col-md-9">{sch_application.scholarship.name}</div>
                    </div>
                    <div class="row mb-1">
                        <div class="col-md-3 text-muted">Targets:</div>
                        <div class="col-md-9">
                            {sch_application.scholarship.targets.map((target: { name: string }) => target.name).join(", ")}
                        </div>
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
                            <span class="badge {sch_application.status === 'accepted' ? 'bg-success' : sch_application.status === 'rejected' ? 'bg-danger' : 'bg-info'}">
                                {sch_application.status}
                            </span>
                        </div>
                    </div>
                </div>
            </div>            
        </div>
        {#if sch_application.scholarship.note}
            <div class="alert alert-info" role="alert">
                {sch_application.scholarship.note}
            </div>
        {/if}
        <h5 class="mt-4 mb-3">Formulir Beasiswa</h5>
        <form onsubmit={update_sch_application} class='border p-4 rounded'>
            <div class="row mb-5">
                <div class="col-md-6">
                    <label for="parent_income" class="form-label">Parent Income:</label>
                    <input id="parent_income" type="number" class="form-control" bind:value={form_data.parent_income} step="0.01"/>
                    <div class="form-text">Please enter your parent's income in USD.</div>
                </div>
                <div class="col-md-6">
                    <label for="parent_occupation" class="form-label">Parent Occupation:</label>
                    <select id="parent_occupation" class="form-select" bind:value={form_data.parent_occupation}>
                        <option value="unemployed">Unemployed</option>
                        <option value="self_employed">Self Employed</option>
                        <option value="government_employee">Government Employee</option>
                        <option value="private_sector">Private Sector</option>
                        <option value="retired">Retired</option>
                        <option value="farmer">Farmer</option>
                        <option value="teacher">Teacher</option>
                        <option value="doctor">Doctor</option>
                        <option value="engineer">Engineer</option>
                        <option value="lawyer">Lawyer</option>
                        <option value="nurse">Nurse</option>
                        <option value="police_officer">Police Officer</option>
                        <option value="military">Military</option>
                        <option value="artist">Artist</option>
                        <option value="scientist">Scientist</option>
                        <option value="other">Other</option>
                    </select>
                    <div class="form-text">Please select your parent's occupation from the list.</div>
                </div>
            </div>
            <div class="mb-3">
                <label for="self_description" class="form-label">Description:</label>
                <textarea id="self_description" class="form-control" bind:value={form_data.self_description}></textarea>
            </div>
            <div class="mb-3">
                <label for="motivation" class="form-label">Motivation:</label>
                <textarea id="motivation" class="form-control" bind:value={form_data.motivation} ></textarea>
            </div>
        </form>
        <h5 class="mt-4 mb-3">Unggah Persyaratan</h5>
        <form action="">
            {#each sch_application.scholarship.attachments as attachment, index}
                <div class="bg-light py-4 px-3 mb-3">
                    <div>
                        <span class="fw-bold d-inline">{attachment.name}</span>
                        <span class="badge bg-success" style="font-size: 11px !important;">
                            {attachment.types} (Max: {attachment.max_size} KB)
                        </span>
                    </div>
                    <div class="small text-muted">{attachment.description}</div>
                    <input type="file" class="form-control mt-2" accept={attachment.types} />
                </div>
            {/each}
        </form>
        <div class="my-5 text-center">
            <button type="submit" class="btn btn-outline-primary">Submit Your Scholarship</button>
        </div>
    </div>
</div>