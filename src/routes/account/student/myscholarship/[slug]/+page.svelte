<script lang="ts">
    import { onMount } from "svelte";
    import { api_request } from "$lib/api";
    import { addMessage } from "$lib/stores/messages";
    import { format_publication_date, slugify } from "$lib/utils";

    import EasyMDE from "easymde";
    import "easymde/dist/easymde.min.css";

    import type { LayoutData } from "./$types";

    const { data }: { data: LayoutData } = $props();
    const sch_application = data.sch_application;

    let selfDescriptionEditor: EasyMDE;
    let motivationEditor: EasyMDE;

    const occupations = [
        { value: "unemployed", label: "Unemployed" },
        { value: "self_employed", label: "Self Employed" },
        { value: "government_employee", label: "Government Employee" },
        { value: "private_sector", label: "Private Sector" },
        { value: "retired", label: "Retired" },
        { value: "farmer", label: "Farmer" },
        { value: "teacher", label: "Teacher" },
        { value: "doctor", label: "Doctor" },
        { value: "engineer", label: "Engineer" },
        { value: "lawyer", label: "Lawyer" },
        { value: "nurse", label: "Nurse" },
        { value: "police_officer", label: "Police Officer" },
        { value: "military", label: "Military" },
        { value: "artist", label: "Artist" },
        { value: "scientist", label: "Scientist" },
        { value: "other", label: "Other" }
    ];
    const incomes = [
        { value: "below_1m", label: "Below 1,000,000 IDR" },
        { value: "1m_3m", label: "1,000,000 - 3,000,000 IDR" },
        { value: "3m_5m", label: "3,000,000 - 5,000,000 IDR" },
        { value: "5m_10m", label: "5,000,000 - 10,000,000 IDR" },
        { value: "above_10m", label: "Above 10,000,000 IDR" }
    ];


    let form_data = $state({
        status: sch_application.status,
        self_description: sch_application.self_description,
        father_income: sch_application.father_income,
        father_occupation: sch_application.father_occupation,
        mother_income: sch_application.mother_income,
        mother_occupation: sch_application.mother_occupation,
        motivation: sch_application.motivation,
    });


    const update_sch_application = async () => {
        await api_request(`scholarship_application/${sch_application.scholarship.code}/`, "PUT", form_data);
        addMessage("success", "Saving...");
    };


    async function uploadFile(event: Event, attachment_id: string) {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files.length > 0) {
            const file = input.files[0];
            const formData = new FormData();
            formData.append('file', file);

            const response = await api_request(`/application_attachment/${attachment_id}/`, 'PUT', formData);
            if (response.attachment) {
                const file_phd = document.getElementById(`file-phd-${attachment_id}`) as HTMLAnchorElement;
                file_phd.classList.remove("d-none");
                file_phd.href = response.file;
                addMessage("success", "File uploaded successfully");
            } else {
                addMessage("error", response.file);
            }
        }
    }


    onMount(() => {
        // Inisialisasi EasyMDE untuk Self Description
        selfDescriptionEditor = new EasyMDE({
            element: document.getElementById("self_description") as HTMLTextAreaElement,
            initialValue: form_data.self_description,
            placeholder: "Write your self description...",
            spellChecker: false,
            autoRefresh: true,
        });

        selfDescriptionEditor.codemirror.on("blur", () => {
            if (selfDescriptionEditor.value() === form_data.self_description) return;
            form_data.self_description = selfDescriptionEditor.value();
            update_sch_application();
        });


        // Inisialisasi EasyMDE untuk Motivation
        motivationEditor = new EasyMDE({
            element: document.getElementById("motivation") as HTMLTextAreaElement,
            initialValue: form_data.motivation,
            placeholder: "Write your motivation...",
            spellChecker: false,
            autoRefresh: true,
        });

        motivationEditor.codemirror.on("blur", () => {
            if (motivationEditor.value() === form_data.motivation) return;
            form_data.motivation = motivationEditor.value();
            update_sch_application();
        });
    });



</script>

<div class="pt-1 pb-3">
    <h5 class="fw-bold px-4 py-3 mb-3 border-bottom">Pendaftaran Beasiswa</h5>
    <div class="px-4 pb-5">
        {#if sch_application.note}
            <div class="my-5">
                <p class='lead'>Anda mendapatkan catatan dari panitia beasiswa:</p>
                <div class="alert alert-info" role="alert">
                    {sch_application.note}
                </div>    
            </div>
        {/if}
        <ul class="nav nav-tabs justify-content-center" id="myTab" role="tablist">
            <li class="nav-item" role="presentation">
                <button class="nav-link active" id="information-tab" data-bs-toggle="tab" data-bs-target="#information" type="button" role="tab" aria-controls="information" aria-selected="true">🎓 Informasi</button>
            </li>
            <li class="nav-item" role="presentation">
                <button class="nav-link" id="form-tab" data-bs-toggle="tab" data-bs-target="#form" type="button" role="tab" aria-controls="form" aria-selected="false">Formulir Beasiswa</button>
            </li>
            <li class="nav-item" role="presentation">
                <button class="nav-link" id="upload-tab" data-bs-toggle="tab" data-bs-target="#upload" type="button" role="tab" aria-controls="upload" aria-selected="false">Unggah Persyaratan</button>
            </li>
            <li class="nav-item" role="presentation">
                <button class="nav-link" id="submit-tab" data-bs-toggle="tab" data-bs-target="#submit" type="button" role="tab" aria-controls="submit" aria-selected="false">Ajukan</button>
            </li>
        </ul>
        <div class="tab-content px-3 py-5" id="myTabContent">
            <div class="tab-pane fade show active" id="information" role="tabpanel" aria-labelledby="information-tab">
                <div class="list-unstyled mb-0">
                    <div class="row mb-1">
                        <div class="col-md-3 text-muted">Scholarship Name:</div>
                        <div class="col-md-9">
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
                            <span class="badge {sch_application.status === 'accepted' ? 'bg-success' : sch_application.status === 'rejected' ? 'bg-danger' : 'bg-info'}">
                                {sch_application.status}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="tab-pane fade" id="form" role="tabpanel" aria-labelledby="form-tab">
                <form class='border p-4 rounded'>
                    <div class="row my-3">
                        <div class="col-md-6">
                            <label for="father_occupation" class="form-label">Father's Occupation:</label>
                            <select id="father_occupation" class="form-select" bind:value={form_data.father_occupation} onchange={update_sch_application}>
                                {#each occupations as occupation}
                                    <option value={occupation.value} selected={occupation.value === form_data.father_occupation}>{occupation.label}</option>
                                {/each}
                            </select>
                            <div class="form-text">Pilih pekerjaan ayah</div>
                        </div>
                        <div class="col-md-6">
                            <label for="mother_occupation" class="form-label">Mother's Occupation:</label>
                            <select id="mother_occupation" class="form-select" bind:value={form_data.mother_occupation} onchange={update_sch_application}>
                                {#each occupations as occupation}
                                    <option value={occupation.value} selected={occupation.value === form_data.mother_occupation}>{occupation.label}</option>
                                {/each}
                            </select>
                            <div class="form-text">Pilih pekerjaan ibu</div>
                        </div>
                    </div>
            
                    <div class="row my-3">
                        <div class="col-md-6">
                            <label for="father_income" class="form-label">Father's Monthly Income:</label>
                            <select id="father_income" class="form-select" bind:value={form_data.father_income} onchange={update_sch_application}>
                                {#each incomes as income}
                                    <option value={income.value} selected={income.value === form_data.father_income}>{income.label}</option>
                                {/each}
                            </select>
                            <div class="form-text">Tuliskan pendapatan bulanan ayah</div>
                        </div>
                        <div class="col-md-6">
                            <label for="mother_income" class="form-label">Mother's Monthly Income:</label>
                            <select id="mother_income" class="form-select" bind:value={form_data.mother_income} onchange={update_sch_application}>
                                {#each incomes as income}
                                    <option value={income.value} selected={income.value === form_data.mother_income}>{income.label}</option>
                                {/each}
                            </select>
                            <div class="form-text">Tuliskan pendapatan bulanan ibu</div>
                        </div>
                    </div>
                    <div class="mb-3">
                        <label for="self_description" class="form-label">Description:</label>
                        <textarea id="self_description" class="form-control"></textarea>
                    </div>
                    <div class="mb-3">
                        <label for="motivation" class="form-label">Motivation:</label>
                        <textarea id="motivation" class="form-control"></textarea>
                    </div>
                </form>
            </div>
            <div class="tab-pane fade" id="upload" role="tabpanel" aria-labelledby="upload-tab">
                {#each sch_application.attachments as item}
                    <div class="bg-light py-4 px-3 mb-3 rounded shadow-sm">
                        <div class="d-flex justify-content-between align-items-center mb-1">
                            <span class="fw-bold text-info">{item.attachment.name}</span>
                            <span class="badge bg-info small" style="font-size: 11px;">
                                {item.attachment.types_display} (Max: {item.attachment.max_size} KB)
                            </span>
                        </div>
                        <div class="small text-muted mb-2">{item.attachment.description}</div>       

                        <a id="file-phd-{item.id}" href={item.file} target="_blank" class="btn btn-success btn-sm {item.file ? '' : 'd-none'}">
                            <i class="fa fa-check"></i> View Uploaded File
                        </a>

                        <input type="file" class="form-control mt-2" accept={item.attachment.types} onchange={event => uploadFile(event, item.id)} />
                        <div class="mt-3">
                            <label for="attachment-url-{item.attachment.id}" class="form-label mb-0">or provide a URL:</label>
                            <input type="url" id="attachment-url-{item.attachment.id}" class="form-control" placeholder="https://drive.google.com/..." bind:value={item.attachment.url} />
                        </div>
                    </div>    
                {/each}
            </div>
            <div class="tab-pane fade" id="submit" role="tabpanel" aria-labelledby="submit-tab">
                <div class="alert alert-warning my-3" role="alert">
                    Pastikan semua informasi yang Anda berikan sudah benar sebelum mengajukan beasiswa.
                </div>
                <div class="text-center">
                    <button type="button" class="btn btn-primary" onclick="{update_sch_application}">Ajukan Beasiswa</button>
                </div>
            </div>
        </div>
    </div>
</div>