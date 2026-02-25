<script lang="ts">
    import { onMount } from "svelte";
    import { api_request } from "$lib/api";
    import { addMessage } from "$lib/stores/messages";
    import MyScholarshipInfo from "./MyScholarshipInfo.svelte";

    import EasyMDE from "easymde";
    import "easymde/dist/easymde.min.css";
    import { goto } from "$app/navigation";
    import { translate } from "$lib/translator";
    import { _ } from "svelte-i18n";

    const { sch_application } = $props();

    let selfDescriptionEditor: EasyMDE;
    let motivationEditor: EasyMDE;

    const occupations = [
        { value: "self_employed", label: translate("account.myscholarship.occupations.self_employed") },
        { value: "government_employee", label: translate("account.myscholarship.occupations.government_employee") },
        { value: "private_sector", label: translate("account.myscholarship.occupations.private_sector") },
        { value: "retired", label: translate("account.myscholarship.occupations.retired") },
        { value: "farmer", label: translate("account.myscholarship.occupations.farmer") },
        { value: "teacher", label: translate("account.myscholarship.occupations.teacher") },
        { value: "doctor", label: translate("account.myscholarship.occupations.doctor") },
        { value: "engineer", label: translate("account.myscholarship.occupations.engineer") },
        { value: "lawyer", label: translate("account.myscholarship.occupations.lawyer") },
        { value: "nurse", label: translate("account.myscholarship.occupations.nurse") },
        { value: "police_officer", label: translate("account.myscholarship.occupations.police_officer") },
        { value: "military", label: translate("account.myscholarship.occupations.military") },
        { value: "artist", label: translate("account.myscholarship.occupations.artist") },
        { value: "scientist", label: translate("account.myscholarship.occupations.scientist") },
        { value: "unemployed", label: translate("account.myscholarship.occupations.unemployed") },
        { value: "other", label: translate("account.myscholarship.occupations.other") }
    ];
    const incomes = [
        { value: "below_1m", label: translate("account.myscholarship.incomes.below_1m") },
        { value: "1m_3m", label: translate("account.myscholarship.incomes.1m_3m") },
        { value: "3m_5m", label: translate("account.myscholarship.incomes.3m_5m") },
        { value: "5m_10m", label: translate("account.myscholarship.incomes.5m_10m") },
        { value: "above_10m", label: translate("account.myscholarship.incomes.above_10m") }
    ];

    let sch_application_agreement = $state(sch_application.status !== "DRAFT");

    interface FormDataType {
        agree: boolean;
        status: string;
        self_description: string;
        father_income: string;
        father_occupation: string;
        mother_income: string;
        mother_occupation: string;
        motivation: string;
    }
    
    let form_data: FormDataType = $state({
        agree: false,
        status: sch_application.status,
        self_description: sch_application.self_description,
        father_income: sch_application.father_income,
        father_occupation: sch_application.father_occupation,
        mother_income: sch_application.mother_income,
        mother_occupation: sch_application.mother_occupation,
        motivation: sch_application.motivation,
    });


    const submit_sch_application = async () => {
        const requiredFields = [
            { field: 'self_description', label: 'Self Description' },
            { field: 'motivation', label: 'Motivation' },
            { field: 'father_income', label: "Father's Monthly Income" },
            { field: 'father_occupation', label: "Father's Occupation" },
            { field: 'mother_income', label: "Mother's Monthly Income" },
            { field: 'mother_occupation', label: "Mother's Occupation" }
        ];

        const missingFields = requiredFields.filter(({ field }) => !(form_data as any)[field]).map(({ label }) => label);

        if (missingFields.length > 0) {
            addMessage("error", `Please fill in the following fields: ${missingFields.join(", ")}.`);
            return;
        }

        // Ensure all files are uploaded
        const fileLinks = document.querySelectorAll("a.file-phd");
        const missingFiles = [];
        for (const link of fileLinks) {
            if (!(link as HTMLAnchorElement).href) {
                const field_name = link.getAttribute("title");
                missingFiles.push(field_name);
            }
        }
        if (missingFiles.length > 0) {
            addMessage("error", `Please upload the following files: ${missingFiles.join(", ")}.`);
            return;
        }

        const app_agreement_checkbox = document.getElementById("application-agreement") as HTMLInputElement;

        if (app_agreement_checkbox.classList.contains("d-none")) {
            app_agreement_checkbox.classList.remove("d-none");
            return;

        }
        if (!sch_application_agreement) {
            addMessage("error", "Please agree to the terms and conditions");
            return;
        }

        form_data.agree = sch_application_agreement;
        const response = await api_request(`scholarship_application/${sch_application.code}/`, "PUT", form_data);
        if (response.message) {
            addMessage("error", response.message);
        } else {
            addMessage("success", "Scholarship application submitted successfully");
            goto("/account/student/myscholarship");
        }
    };

    const update_sch_application = async () => {
        await api_request(`scholarship_application/${sch_application.code}/`, "PUT", form_data);
        addMessage("success", "Data is updated...");
    };


    async function uploadFile(event: Event, attachment_id: string) {
        addMessage("info", "Uploading file...");
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

  
<div class="bg-light rounded shadow-sm">
    <div class="px-4 py-4">
        <ul class="nav nav-pills nav-justified mb-4" id="myTab" role="tablist">
            <li class="nav-item" role="presentation">
                <button class="nav-link active fw-bold" id="information-tab" data-bs-toggle="tab" data-bs-target="#information" type="button" role="tab" aria-controls="information" aria-selected="true">Informasi</button>
            </li>
            <li class="nav-item" role="presentation">
                <button class="nav-link fw-bold" id="form-tab" data-bs-toggle="tab" data-bs-target="#form" type="button" role="tab" aria-controls="form" aria-selected="false">Formulir</button>
            </li>
            <li class="nav-item" role="presentation">
                <button class="nav-link fw-bold" id="upload-tab" data-bs-toggle="tab" data-bs-target="#upload" type="button" role="tab" aria-controls="upload" aria-selected="false">Lampiran</button>
            </li>
            <li class="nav-item" role="presentation">
                <button class="nav-link fw-bold" id="submit-tab" data-bs-toggle="tab" data-bs-target="#submit" type="button" role="tab" aria-controls="submit" aria-selected="false">Ajukan</button>
            </li>
        </ul>

        <div class="tab-content p-4 bg-white rounded shadow-sm" id="myTabContent">
            <div class="tab-pane fade show active" id="information" role="tabpanel" aria-labelledby="information-tab">
                <MyScholarshipInfo {sch_application}></MyScholarshipInfo>
            </div>

            <div class="tab-pane fade" id="form" role="tabpanel" aria-labelledby="form-tab">
                <form class="border p-4 rounded bg-light">
                    <div class="row mb-4">
                        <div class="col-md-6 mb-4 mb-md-0">
                            <label for="father_occupation" class="form-label fw-semibold">{$_('account.myscholarship.father_occupation')}:</label>
                            <select id="father_occupation" class="form-select" bind:value={form_data.father_occupation} onchange={update_sch_application}>
                                {#each occupations as occupation}
                                    <option value={occupation.value} selected={occupation.value === form_data.father_occupation}>{occupation.label}</option>
                                {/each}
                            </select>
                        </div>
                        <div class="col-md-6">
                            <label for="mother_occupation" class="form-label fw-semibold">{$_('account.myscholarship.mother_occupation')}:</label>
                            <select id="mother_occupation" class="form-select" bind:value={form_data.mother_occupation} onchange={update_sch_application}>
                                {#each occupations as occupation}
                                    <option value={occupation.value} selected={occupation.value === form_data.mother_occupation}>{occupation.label}</option>
                                {/each}
                            </select>
                        </div>
                    </div>

                    <div class="row mb-4">
                        <div class="col-md-6 mb-4 mb-md-0">
                            <label for="father_income" class="form-label fw-semibold">{$_('account.myscholarship.father_income')}:</label>
                            <select id="father_income" class="form-select" bind:value={form_data.father_income} onchange={update_sch_application}>
                                {#each incomes as income}
                                    <option value={income.value} selected={income.value === form_data.father_income}>{income.label}</option>
                                {/each}
                            </select>
                        </div>
                        <div class="col-md-6">
                            <label for="mother_income" class="form-label fw-semibold">{$_('account.myscholarship.mother_income')}:</label>
                            <select id="mother_income" class="form-select" bind:value={form_data.mother_income} onchange={update_sch_application}>
                                {#each incomes as income}
                                    <option value={income.value} selected={income.value === form_data.mother_income}>{income.label}</option>
                                {/each}
                            </select>
                        </div>
                    </div>

                    <div class="mb-4">
                        <label for="self_description" class="form-label fw-semibold">{$_('account.myscholarship.self_description')}:</label>
                        <textarea id="self_description" class="form-control" rows="4"></textarea>
                    </div>
                    <div class="mb-4">
                        <label for="motivation" class="form-label fw-semibold">{$_('account.myscholarship.motivation')}:</label>
                        <textarea id="motivation" class="form-control" rows="4"></textarea>
                    </div>
                </form>
            </div>

            <div class="tab-pane fade" id="upload" role="tabpanel" aria-labelledby="upload-tab">
                {#each sch_application.attachments as item}
                    <div class="bg-light py-4 px-3 mb-3 rounded shadow-sm">
                        <div class="d-flex justify-content-between align-items-center mb-1">
                            <span class="fw-bold text-dark">{item.attachment.name}</span>
                            <span class="badge bg-info small" style="font-size: 11px;">
                                {item.attachment.extensions} (Max: {item.attachment.max_size} KB)
                            </span>
                        </div>
                        <div class="small text-muted mb-2">{@html item.attachment.description}</div>

                        <a id="file-phd-{item.id}" href={item.file} target="_blank" title="{item.attachment.name}" class="btn file-phd btn-success btn-sm {item.file ? '' : 'd-none'}">
                            <i class="fa fa-check"></i> Lihat {item.attachment.name}
                        </a>

                        <input type="file" class="form-control mt-2" accept={item.attachment.extensions} onchange={event => uploadFile(event, item.id)} />
                        <div class="mt-3">
                            <label for="attachment-url-{item.attachment.id}" class="form-label mb-0 fw-semibold">{$_('account.myscholarship.or_url')}:</label>
                            <input type="url" id="attachment-url-{item.attachment.id}" class="form-control" placeholder="https://drive.google.com/..." />
                        </div>
                    </div>
                {/each}
            </div>

            <div class="tab-pane fade" id="submit" role="tabpanel" aria-labelledby="submit-tab">
                <div class="alert alert-warning my-3" role="alert">
                    {$_('account.myscholarship.submit_warning')}
                </div>
                <div id="application-agreement" class="form-check mb-3 d-none">
                    <input class="form-check-input" type="checkbox" id="agree" bind:checked={sch_application_agreement}>
                    <label class="form-check-label" for="agree">
                        {$_('account.myscholarship.agree_terms')}
                    </label>
                </div>
                <div class="my-5 text-center">
                    <button type="button" class="btn btn-outline-primary fw-semibold px-4" onclick="{submit_sch_application}">
                        <i class="fa fa-paper-plane"></i>
                        {$_('account.myscholarship.submit_button')}
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>