<script lang="ts">
	import { page } from '$app/state';
</script>
  
<main class="error-page">
    <h1>{page.status}</h1>
    <p>{page.error?.message || "Something went wrong"}</p>
    <a href="/" class="btn-home">Go back to Home</a>
</main>
  
<style>
    .error-page {
        text-align: center;
        padding: 2rem;
    }
    .btn-home {
        margin-top: 1rem;
        display: inline-block;
        text-decoration: none;
        color: white;
        background-color: #007acc;
        padding: 0.5rem 1rem;
        border-radius: 4px;
    }
</style>
  