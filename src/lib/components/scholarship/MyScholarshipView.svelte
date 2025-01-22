<script lang="ts">
    import MyScholarshipInfo from "./MyScholarshipInfo.svelte";
    const { sch_application } = $props();
</script>

<div class="pt-1 pb-3">
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
    </ul>
    <div class="tab-content px-3 py-5" id="myTabContent">
        <div class="tab-pane fade show active" id="information" role="tabpanel" aria-labelledby="information-tab">
            <MyScholarshipInfo {sch_application}></MyScholarshipInfo>
        </div>
        <div class="tab-pane fade" id="form" role="tabpanel" aria-labelledby="form-tab">
            <div class="list-unstyled">
                <div class="row mb-3">
                    <div class="col-md-6">
                        <div class="mb-3">
                            <div class="text-muted">Father's Occupation:</div>
                            <div><span class="badge bg-primary">{sch_application.father_occupation_display}</span>
                            </div>
                        </div>        
                    </div>
                    <div class="col-md-6">
                        <div class="mb-3">
                            <div class="text-muted">Father's Monthly Income:</div>
                            <div><span class="badge bg-success">{sch_application.father_income_display}</span></div>
                        </div>
                    </div>
                </div>
                <div class="row mb-3">
                    <div class="col-md-6">
                        <div class="mb-3">
                            <div class="text-muted">Mother's Monthly Income:</div>
                            <div><span class="badge bg-success">{sch_application.mother_income_display}</span></div>
                        </div>        
                    </div>
                    <div class="col-md-6">
                        <div class="mb-3">
                            <div class="text-muted">Mother's Occupation:</div>
                            <div><span class="badge bg-primary">{sch_application.mother_occupation_display}</span></div>
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
                <div class="bg-light py-4 px-3 mb-3 rounded shadow-sm">
                    <div class="d-flex justify-content-between align-items-center mb-1">
                        <span class="fw-bold text-info">{item.attachment.name}</span>
                    </div>
                    <div class="small text-muted mb-2">{item.attachment.description}</div>       

                    <a id="file-phd-{item.id}" href={item.file} target="_blank" title="{item.attachment.name}" class="btn file-phd btn-outline-success {item.file ? '' : 'd-none'}">
                        <i class="fa fa-download"></i> {item.attachment.name}
                    </a>
                </div>    
            {/each}
        </div>
</div>
</div>
