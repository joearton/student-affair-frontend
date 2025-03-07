<script lang="ts">
    import { fly } from 'svelte/transition';

    let info = "Drag the item into the matching box.";
    let showForm = true;

    function handleDragStart(event: DragEvent) {
        event.dataTransfer?.setData("text", "puzzle");
    }

    function allowDrop(event: DragEvent) {
        event.preventDefault();
    }

    function handleDrop(event: DragEvent) {
        event.preventDefault();
        const data = event.dataTransfer?.getData("text");
        if (data === "puzzle") {
            showForm = false;
            setTimeout(() => {
                window.location.href = "https://kemahasiswaan-api.umko.ac.id/laboratory/";
            }, 3000);
        } else {
            info = "Wrong answer, try again.";
        }
    }
</script>

<style>
    :global(body) {
        margin: 0;
        font-family: Arial, sans-serif;
        background: #f7f9fc;
        color: #333;
    }
    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100vh;
    }
    .spinner {
        border: 6px solid #ddd;
        border-top: 6px solid #3498db;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        animation: spin 1s linear infinite;
        margin-bottom: 1em;
    }
    @keyframes spin {
        to {
            transform: rotate(360deg);
        }
    }
    p {
        margin-bottom: 2em;
        text-align: center;
    }
    .draggable {
        width: 60px;
        height: 60px;
        background-color: #3498db;
        border-radius: 8px;
        cursor: grab;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        font-weight: bold;
        margin: 1em;
        transition: transform 0.2s;
    }
    .draggable:hover {
        transform: scale(1.1);
    }
    .droppable {
        width: 100px;
        height: 100px;
        border: 2px dashed #888;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 8px;
        transition: background 0.2s;
    }
    .droppable:hover {
        background: #f0f0f0;
    }
</style>

<div class="container">
    {#if showForm}
        <div transition:fly={{ x: 200, duration: 500 }}>
            <div class="spinner"></div>
            <p>{info}</p>
            <div
                class="draggable"
                role="button"
                tabindex="0"
                draggable="true"
                on:dragstart={handleDragStart}>
                Drag
            </div>
            <div
                class="droppable"
                role="button"
                tabindex="0"
                aria-label="Drop area"
                on:drop={handleDrop}
                on:dragover={allowDrop}>
                Drop here
            </div>
        </div>
    {:else}
        <div transition:fly={{ x: -200, duration: 500 }}>
            <p>You will be redirected in 3 seconds...</p>
        </div>
    {/if}
</div>
