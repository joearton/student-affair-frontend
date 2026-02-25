<script>
    import { messages, removeMessage } from "$lib/stores/messages";
</script>

<div class="messages-container">
    {#each $messages as { id, type, text }}
        <button type="button" class="message {type} d-block" onclick={() => removeMessage(id)} onkeydown={(e) => e.key === 'Enter' && removeMessage(id)} aria-label="Close message">
            {text}
        </button>
    {/each}
</div>

<style>
    .messages-container {
        position: fixed;
        bottom: 50px;
        right: 30px;
        z-index: 9999;
    }
    .message {
        margin-bottom: 10px;
        padding: 10px 15px;
        border-radius: 5px;
        cursor: pointer;
        color: #fff;
        font-size: 15px;
        border: none;
    }
    .message.info {
        background-color: #007bff;
    }
    .message.success {
        background-color: #28a745;
    }
    .message.error {
        background-color: #dc3545;
    }
</style>
