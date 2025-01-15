<script lang="ts">
    import { page } from '$app/state';
</script>

<main class="error-page">
    <div class="error-container">
        <h1>{page.status}</h1>
        <p>{page.error?.message || "Something went wrong"}</p>
        <a href="/" class="btn-home">Go back to Home</a>
    </div>
</main>

<style>
    .error-page {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        background-color: #f4f4f9;
        font-family: 'Arial', sans-serif;
    }
    .error-container {
        text-align: center;
        background: white;
        padding: 2rem;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
    h1 {
        font-size: 4rem;
        color: #ff4757;
        margin-bottom: 1rem;
    }
    p {
        font-size: 1.25rem;
        color: #333;
        margin-bottom: 2rem;
    }
    .btn-home {
        display: inline-block;
        text-decoration: none;
        color: white;
        background-color: #007acc;
        padding: 0.75rem 1.5rem;
        border-radius: 4px;
        transition: background-color 0.3s ease;
    }
    .btn-home:hover {
        background-color: #005fa3;
    }
</style>