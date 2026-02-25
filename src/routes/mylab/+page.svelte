<script lang="ts">
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
        font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
        background: #F2F4F8;
        color: #333;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100vh;
    }

    .container {
        background: #fff;
        padding: 2em;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        border-radius: 12px;
        text-align: center;
        width: 360px;
    }

    .spinner {
        border: 5px solid #eee;
        border-top: 5px solid #3498db;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        animation: spin 1s linear infinite;
        margin: 0 auto 1em;
    }

    @keyframes spin {
        to {
            transform: rotate(360deg);
        }
    }

    p {
        margin: 1em 0;
    }

    .draggable {
        width: 80px;
        height: 80px;
        background-color: #3498db;
        color: #fff;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        cursor: grab;
        transition: transform 0.5s ease-out, box-shadow 0.5s ease-out;
        margin: 1em auto;
        box-shadow: 0 2px 6px rgba(0,0,0,0.1);
    }

    .draggable:hover {
        transform: scale(1.05);
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    }

    .droppable {
        width: 100px;
        height: 100px;
        border: 2px dashed #bbb;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 8px;
        margin: 1em auto;
        transition: background 0.3s, border-color 0.3s;
    }

    .droppable:hover {
        background: #F9F9F9;
        border-color: #3498db;
    }
</style>

<div class="container">
    {#if showForm}
        <div>
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
        <div>
            <p>You will be redirected in 3 seconds...</p>
        </div>
    {/if}
</div>
