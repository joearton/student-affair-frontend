<script lang="ts">
    import type { LayoutData } from "./$types";
    import MyScholarshipView from "$lib/components/scholarship/MyScholarshipView.svelte";
    import MyScholarshipUpdate from "$lib/components/scholarship/MyScholarshipUpdate.svelte";

    const { data }: { data: LayoutData } = $props();
    const sch_application = data.sch_application;
 
</script>

  
<div class="pt-1 pb-3">
    <h5 class="fw-bold px-4 py-3 mb-3 border-bottom">Pendaftaran Beasiswa</h5>
    <div class="px-4 pb-5">
        {#if sch_application.status == "DRAFT"}
            <MyScholarshipUpdate {sch_application}></MyScholarshipUpdate>
        {:else}
            <MyScholarshipView {sch_application}></MyScholarshipView>
        {/if}
    </div>
</div>