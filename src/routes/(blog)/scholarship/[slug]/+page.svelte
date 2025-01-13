<script lang="ts">
    import { format_publication_date } from '$lib/utils';
    import type { LayoutData } from './$types';

    const { data }: { data: LayoutData } = $props();
    const scholarship = data.scholarship;

    let activeTab = $state('description');

    function setActiveTab(tab: string) {
        activeTab = tab;
    }
</script>

<div class="scholarship-page">
    <div class="scholarship-thumbnail position-relative p-5" style="background-image: url({scholarship.thumbnail}); background-size: cover;">
        <div class="container position-relative d-flex flex-column justify-content-end h-100">
            <div><h1 class="h2 bg-primary text-warning p-3 d-inline-block">{scholarship.name}</h1></div>
            <div><p class="bg-light opacity-75 p-3 d-inline-block">{scholarship.sch_excerpt}</p></div>  
        </div>
    </div>
    <div class="scholarship-content container bg-white py-5 mb-5 rounded position-relative shadow-sm" style="margin-top: -35px;">
        <div class="row">
            <div class="col-md-3 d-none d-md-block">
                <div class="px-3 text-end sticky-top" style="top: 100px;">
                    <a class="py-3 border-bottom h4 d-block" href="#description">Description</a>
                    <a class="py-3 border-bottom h4 d-block" href="#requirements">Requirements</a>
                    <a class="py-3 border-bottom h4 d-block" href="#deskripsi">Attachments</a>
                    <a class="py-3 border-bottom h4 d-block" href="#schedule">Schedule</a>
                    <a class="py-3 border-bottom h4 d-block" href="#deskripsi">Attachments</a>
                    <a class="py-3 border-bottom h4 d-block" href="#deskripsi">Faculty/Department</a>
                    <a class="py-3 h4 d-block" href="#deskripsi">Quota</a>
                </div>
            </div>
            <div class="col-md-9 lead border-start">
                <div id="description" class="mb-5 pb-3 border-bottom">{@html scholarship.description}</div>
                <div id="requirements" class="mb-5 pb-3 border-bottom">
                    <h3>Requirements</h3>
                    {@html scholarship.requirement}
                </div>
                <div id="attachment" class="mb-5 pb-3 border-bottom">
                    <h3>Attachments</h3>
                    <div class="py-3">
                        {#each scholarship.attachments as attachment}
                            <div class="attachment-item mb-2 bg-light p-3 d-block">
                                <p class="fw-bold">{attachment.name}</p>
                                <div>{attachment.description}</div>
                            </div>
                        {/each}
                    </div>
                </div>
                <div id="schedule" class="mb-5 pb-3 border-bottom">
                    <h3>Schedule</h3>
                    <div class="row">
                        <div class="col-md-4">Start Date</div>
                        <div class="col-md-8 fw-bold">{format_publication_date(scholarship.start_date, "yyyy-MM-dd hh:mm")}</div>
                    </div>
                    <div class="row">
                        <div class="col-md-4">End Date</div>
                        <div class="col-md-8 fw-bold">{format_publication_date(scholarship.end_date, "yyyy-MM-dd hh:mm")}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>


<style>
    .scholarship-thumbnail {
        height: 500px;
    }
</style>
