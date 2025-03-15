<script lang="ts">
    import { api_request } from "$lib/api";
    import MyScholarshipItem from "$lib/components/scholarship/MyScholarshipItem.svelte";
    import type { ScholarshipApplication } from "$lib/types/scholarship_application";
    import { onMount } from "svelte";
    import { _ } from "svelte-i18n";

    let sch_applications: ScholarshipApplication[] = $state([]);

    onMount(async () => {
        try {
            const response = await api_request("scholarship_application/");
            sch_applications = response;
        } catch (error) {
            console.error("Error fetching scholarship applications:", error);
        }
    });
</script>

<div class="pt-1 pb-3">
    <h5 class="fw-bold px-4 py-3 mb-3 border-bottom">{$_('account.myscholarship.scholarship_registration')}</h5>
    <div class="px-4 account-content">
        <MyScholarshipItem {sch_applications}></MyScholarshipItem>
    </div>
</div>