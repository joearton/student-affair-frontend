<script lang="ts">
    import type { LayoutData } from "./$types";
    import MyScholarshipView from "$lib/components/scholarship/MyScholarshipView.svelte";

    const { data }: { data: LayoutData } = $props();
    const sch_application = data.sch_application;
 
</script>

<div class="bg-white shadow-sm">
    <h5 class="fw-bold p-3 mb-3 border-bottom">Daftar Review</h5>
    <MyScholarshipView {sch_application} />
</div>