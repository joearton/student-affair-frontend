<script lang="ts">
    import MyScholarshipInfo from "./MyScholarshipInfo.svelte";
    import { _ } from "svelte-i18n";
    const { sch_application } = $props();
</script>

<div class="py-3 bg-light">
    <div class="container">
        <nav>
            <ul class="nav nav-pills nav-justified mb-4" id="myTab" role="tablist">
                <li class="nav-item" role="presentation">
                    <button class="nav-link active rounded-pill me-2" id="information-tab" data-bs-toggle="tab" data-bs-target="#information" type="button" role="tab" aria-controls="information" aria-selected="true">🎓 Informasi</button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link rounded-pill me-2" id="form-tab" data-bs-toggle="tab" data-bs-target="#form" type="button" role="tab" aria-controls="form" aria-selected="false">Formulir Beasiswa</button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link rounded-pill" id="upload-tab" data-bs-toggle="tab" data-bs-target="#upload" type="button" role="tab" aria-controls="upload" aria-selected="false">Lampiran</button>
                </li>
            </ul>
        </nav>

        <div class="tab-content p-4 mx-2 bg-white rounded" id="myTabContent">
            <div class="tab-pane fade show active" id="information" role="tabpanel" aria-labelledby="information-tab">
                <MyScholarshipInfo {sch_application}/>
            </div>

            <div class="tab-pane fade" id="form" role="tabpanel" aria-labelledby="form-tab">
                <div class="row g-3 mb-3">
                    <div class="col-md-6">
                        <div class="p-3 border rounded">
                            <small class="text-muted">{$_('account.myscholarship.father_occupation')}</small>
                            <div><span class="badge bg-primary">{sch_application.father_occupation_display}</span></div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="p-3 border rounded">
                            <small class="text-muted">{$_('account.myscholarship.father_income')}</small>
                            <div><span class="badge bg-success">{sch_application.father_income_display}</span></div>
                        </div>
                    </div>
                </div>

                <div class="row g-3 mb-3">
                    <div class="col-md-6">
                        <div class="p-3 border rounded">
                            <small class="text-muted">{$_('account.myscholarship.mother_occupation')}</small>
                            <div><span class="badge bg-primary">{sch_application.mother_occupation_display}</span></div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="p-3 border rounded">
                            <small class="text-muted">{$_('account.myscholarship.mother_income')}</small>
                            <div><span class="badge bg-success">{sch_application.mother_income_display}</span></div>
                        </div>
                    </div>
                </div>

                <div class="mb-3 p-3 border rounded">
                    <small class="text-muted">{$_('account.myscholarship.self_description')}</small>
                    <div class="mt-2" style="max-height: 300px; overflow-y: auto;">
                        {@html sch_application.self_description || "-"}
                    </div>
                </div>

                <div class="mb-3 p-3 border rounded">
                    <small class="text-muted">{$_('account.myscholarship.motivation')}</small>
                    <div class="mt-2" style="max-height: 300px; overflow-y: auto;">
                        {@html sch_application.motivation || "-"}
                    </div>
                </div>
            </div>

            <div class="tab-pane fade" id="upload" role="tabpanel" aria-labelledby="upload-tab">
                {#each sch_application.attachments as item}
                    <div class="bg-light py-3 px-3 mb-3 rounded shadow-sm">
                        <div class="d-flex justify-content-between align-items-center mb-1">
                            <span class="fw-bold text-info">{item.attachment.name}</span>
                            {#if item.valid}
                                <span class="text-success"><i class="fa fa-check-circle"></i></span>
                            {:else}
                                <span class="text-danger"><i class="fa fa-times-circle"></i></span>
                            {/if}
                        </div>
                        <div>
                            <a id="file-phd-{item.id}" href={item.file} target="_blank" class="btn btn-outline-success {item.file ? '' : 'd-none'}">
                                <i class="fa fa-download"></i> {item.attachment.name}
                            </a>    
                        </div>
                    </div>
                {/each}
            </div>
        </div>
    </div>
</div>
