<script lang='ts'>
    import { onMount } from 'svelte';
    import NoDataAvailable from '$lib/components/NoDataAvailable.svelte';
    import { get_achievements } from '$lib/objects/ach_achievement';
    import type { Achievement, Student } from '$lib/types/ach_achivement';
    import SimplePreloader from '$lib/components/SimplePreloader.svelte';
    import type { Department } from '$lib/types/scholarship_university';
    import { api_request } from '$lib/api';


    let is_loading = $state(true);
    let filter_query = $state('');
    let filter_scope = $state('');
    let filter_department = $state('');

    let achievements: Achievement[] = $state([]);
    let departments:Department[] = $state([]);
    let response = $state({
        results: [],
        previous: '',
        next: '',
        count: 0,
        offset: 0,
        limit: 9,
    });


    // pagination variable
    let previous_offset: number = 0;
    let next_offset: number = 0;


    function get_student_names(students: Student[]) {
        if (students.length <= 1) {
            return students.map(student => student.name).join(', ');
        }
        const random_index = Math.floor(Math.random() * students.length);
        return `${students[random_index].name} (${students.length - 1} More)`;
    }


    function get_student_departments(students: Student[]) {
        if (students.length <= 1) {
            return students.map(student => student.department_name).join(', ');
        }
        const random_index = Math.floor(Math.random() * students.length);
        return `${students[random_index].department_name} (${students.length - 1} More)`;
    }


    async function update_achievement(offset: number = 0) {
        try {
            response = await get_achievements({
                search: filter_query,
                scope: filter_scope,
                department: filter_department,
                offset: offset,
                limit: 9,
            });
            achievements = response.results;
        } catch (error) {
            console.error('Error fetching posts:', error);
        } finally {
            is_loading = false;
        }
    }

    onMount(async () => {
        departments = await api_request('department/');
        await update_achievement();
    });

</script>



<div class="post-section py-5 my-3">
    <div class="container">
        {#if is_loading}
            <SimplePreloader></SimplePreloader>
        {:else if achievements.length === 0}
            <NoDataAvailable></NoDataAvailable>
        {:else}
            <div class="row mb-3">
                {#each achievements as achievement}
                    <div class="achievement-item col-md-4 mb-4">
                        <div class="card h-100 bg-white border-0 shadow-sm">
                            <a href="/achievement/{achievement.id}" class="card-img-top position-relative" style="height: 300px; position: relative;">
                                {#if achievement.photos && achievement.photos.length > 0}
                                    <div class="h-100 d-flex" style="background: url({achievement.photos[0].image}) center center; background-size: cover;">
                                        {#if achievement.photos.length > 1}
                                            {#each achievement.photos.slice(1, 3) as photo}
                                                <div class="h-100" style="background: url({photo.image}) center center; background-size: cover; width: {100/achievement.photos.length}%"></div>
                                            {/each}
                                        {/if}
                                    </div>
                                {:else}
                                    <div class="h-100" style="background: url(/media/no-thumbnail.png) center center; background-size: cover;"></div>
                                {/if}
                                <div class="achievement-title position-absolute bottom-0 p-3 w-100 text-white" style="background: rgba(0,0,0,.55);">
                                    <div class="small"><i class="far fa-calendar-alt"></i> {achievement.activity_date}</div>
                                    <h6>{achievement.activity_name}</h6>
                                </div>
                            </a>
                            <div class="card-body">
                                <ul class="list-group list-group-flush small">
                                    <li class="list-group-item">
                                        <i class="fas fa-users" style="width: 25px;"></i>
                                        {get_student_names(achievement.students)}
                                    </li>
                                    <li class="list-group-item">
                                        <i class="fas fa-building" style="width: 25px;"></i>
                                        {get_student_departments(achievement.students)}
                                    </li>
                                    <li class="list-group-item"><i class="fas fa-globe" style="width: 25px;"></i> {achievement.scope_display}</li>
                                    <li class="list-group-item"><i class="fas fa-trophy" style="width: 25px;"></i> {achievement.award}</li>
                                    <li class="list-group-item"><i class="fas fa-building" style="width: 25px;"></i> {achievement.organizer_name}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                {/each}
            </div>
            <div class="row">
                <div class="col-md-7">
                </div>
                <div class="col-md-5">
                    <nav>
                        <ul class="pagination">
                            {#if response.previous}
                                <li class="page-item">
                                    <button class="page-link" onclick={() => update_achievement(previous_offset)}>Previous</button>
                                </li>
                            {/if}
                            {#each Array(Math.ceil(response.count / response.limit)).fill(0) as _, pageIndex}
                                <li class="page-item {pageIndex * response.limit === response.offset ? 'active' : ''}">
                                    <button class="page-link" onclick={() => update_achievement(pageIndex * response.limit)}>{pageIndex + 1}</button>
                                </li>
                            {/each}
                            {#if response.next}
                                <li class="page-item">
                                    <button class="page-link" onclick={() => update_achievement(next_offset)}>Next</button>
                                </li>
                            {/if}
                        </ul>
                    </nav>        
                </div>
            </div>
        {/if}
    </div>
</div>


<div id="filter-box" class="position-fixed w-100 py-3 bg-primary border-warning bottom-0 start-0 shadow-sm">
    <div class="container">
        <div class="row">
            <div class="col-md-6">
                <div class="input-group">
                    <input type="text" class="form-control" placeholder="Enter keyword" bind:value={filter_query} onchange={() => update_achievement()}>
                    <button class="btn btn-success" type="button" onclick={() => update_achievement()} aria-label="Search">
                        <i class="fa fa-search"></i>
                    </button>
                </div>    
            </div>
            <div class="col-md-3">
                <select class="form-select" bind:value={filter_scope} onchange={() => update_achievement()}>
                    <option value="">Select Scope</option>
                    <option value="local">Local</option>
                    <option value="national">National</option>
                    <option value="international">International</option>
                </select>
            </div>
            <div class="col-md-3">
                <select class="form-select" bind:value={filter_department} onchange={() => update_achievement()}>
                    <option value="">Select Department</option>
                    {#each departments as department}
                        <option value={department.id}>{department.name}</option>
                    {/each}
                </select>
            </div>
        </div>
    </div>
</div>



<style>
    #filter-box {
        border-top-width: 7px;
        border-top-style: solid;
        z-index: 1055;
    }
    .achievement-item {
        transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .achievement-item:hover {
        transform: translateY(-10px) scale(1.05);
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    }


</style>