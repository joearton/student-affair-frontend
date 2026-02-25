<script lang="ts">
    export let response: { previous: boolean, next: boolean, count: number, limit: number, offset: number };
    export let update_post: (offset: number) => void;
    export let previous_offset: number;
    export let next_offset: number;
</script>

<nav>
    <ul class="pagination">
        {#if response.previous}
            <li class="page-item">
                <button class="page-link" on:click={() => update_post(previous_offset)}>Previous</button>
            </li>
        {/if}
        {#each Array(Math.ceil(response.count / response.limit)).fill(0) as _, pageIndex}
            <li class="page-item {pageIndex * response.limit === response.offset ? 'active' : ''}">
                <button class="page-link" on:click={() => update_post(pageIndex * response.limit)}>{pageIndex + 1}</button>
            </li>
        {/each}
        {#if response.next}
            <li class="page-item">
                <button class="page-link" on:click={() => update_post(next_offset)}>Next</button>
            </li>
        {/if}
    </ul>
</nav>