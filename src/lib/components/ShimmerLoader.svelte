<script lang="ts">
    let {color, height, count} = $props();
</script>

<div class="shimmer-wrapper">
    {#each Array(count) as _, i}
        <div class="shimmer" style="--color: {color}; --height: {height};"></div>
    {/each}
</div>


<style>
    .shimmer-wrapper {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .shimmer {
        width: 100%;
        height: var(--height);
        background: linear-gradient(
            to right,
            var(--color) 0%,
            #e0e0e0 20%,
            var(--color) 40%,
            var(--color) 100%
        );
        background-size: 200% 100%;
        animation: shimmer 1.5s infinite;
    }

    @keyframes shimmer {
        0% {
            background-position: -200% 0;
        }
        100% {
            background-position: 200% 0;
        }
    }
</style>