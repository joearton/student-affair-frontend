<script lang="ts">
    import { calculate_reading_time } from "$lib/utils";
    import { api_request } from "$lib/api";
    import { onMount } from "svelte";

    import type { LayoutData } from "./$types";
    import type { Department, Faculty } from "$lib/types/scholarship_university";

    import ScholarshipDetail from "$lib/components/scholarship/ScholarshipDetail.svelte";

    const { data }: { data: LayoutData } = $props();
    const scholarship = data.scholarship;
    const mini_mode = true;
    const user = data.user;

    let faculties: Faculty[] = $state([]);
    let departments: Department[] = $state([]);
    let reading_time = $state(0);

    onMount(async () => {
        faculties = await api_request("faculty/");
        departments = await api_request("department/");
        reading_time = calculate_reading_time(".scholarship-page");
    });
</script>

<div class="scholarship-page py-5 px-4">
    <ScholarshipDetail {scholarship} {user} {faculties} {departments} {reading_time} {mini_mode}></ScholarshipDetail>
</div>
