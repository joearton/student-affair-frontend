<script lang="ts">
    import { calculate_reading_time } from '$lib/utils';
    import { api_request } from '$lib/api';
    import { onMount } from 'svelte';

    import type { LayoutData } from './$types';
    import type { Department, Faculty } from '$lib/types/scholarship_university';

    import ScholarshipDetail from '$lib/components/scholarship/ScholarshipDetail.svelte';

    const { data }: { data: LayoutData } = $props();
    const scholarship = data.scholarship;
    const mini_mode = false;

    let faculties:Faculty[] = $state([]);
    let departments:Department[] = $state([]);
    let reading_time = $state(0);

    onMount(async () => {
        faculties = await api_request('faculty/');
        departments = await api_request('department/');
        reading_time = calculate_reading_time('.scholarship-page');
    });

</script>

<div class="scholarship-page">
    <div class="scholarship-thumbnail position-relative p-5" style="background-image: url({scholarship.thumbnail}); background-size: cover;">
        <div class="container position-relative d-flex flex-column justify-content-end h-100">
            <div><h1 class="h2 bg-primary text-warning p-3 d-inline-block">{scholarship.name}</h1></div>
            <div><p class="bg-light opacity-75 p-3 d-inline-block">{scholarship.sch_excerpt}</p></div>  
        </div>
    </div>
    <div class="scholarship-content container bg-white py-5 mb-5 rounded position-relative shadow-sm" style="margin-top: -35px;">
        <ScholarshipDetail {scholarship} {faculties} {departments} {reading_time} {mini_mode}></ScholarshipDetail>
    </div>
</div>


<style>
    .scholarship-thumbnail {
        height: 500px;
    }
</style>