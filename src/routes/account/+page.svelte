<script lang="ts">
    import StudentDashboard from '$lib/components/scholarship/StudentDashboard.svelte';
    import type { LayoutData } from './$types';

    let { data }: { data: LayoutData } = $props();


</script>


<div class="d-flex align-items-center mb-4 border-bottom px-4 py-3">
    <div class="profile-icon">
        {#if data.user.picture}
            <img src="{data.preference.site + data.user.picture}" alt="{ data.user.fullname }" class="user-picture" />
        {:else}
            <img src="/media/user.png" alt="{ data.user.fullname }" class="user-picture" />
        {/if}
    </div>
    <div class="ms-3">
        <div>Welcome</div>
        <h4 class="fw-bold text-primary">{ data.user.fullname || data.user.username }</h4>
    </div>
</div>

<div class="px-4 pt-1 pb-5">
    <StudentDashboard user = {data.user}></StudentDashboard> 
</div>


<style>

    .user-picture {
        width: 90px;
        height: 90px;
        border-radius: 100%;
        border: 2px solid #f1f1f1;
    }

</style>