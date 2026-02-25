<script lang="ts">
    let { height, count } = $props();
</script>

<div class="shimmer-wrapper">
    {#each Array.from({ length: count }, (_, i) => i) as i}
        <div class="shimmer" style="height: {height}px;"></div>
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
        background: linear-gradient(
            to right,
            #f6f7f8 0%,
            #e0e0e0 20%,
            #f6f7f8 40%,
            #f6f7f8 100%
        );
        background-size: 200% 100%;
        animation: shimmer 2.5s infinite;
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
