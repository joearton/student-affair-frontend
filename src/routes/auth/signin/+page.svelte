<script lang="ts">
    import { login } from '$lib/auth';  
    import { goto } from '$app/navigation';
    import type { LayoutData } from '../$types';

    let { data }: { data: LayoutData } = $props();
    
    let username = $state('');
    let password = $state('');
    let errorMessage = $state('');
    let successMessage = $state('');
    let loading = $state(false);

    const handleLogin = async (event: Event) => {
        event.preventDefault();

        loading = true;

        const { errorMessage: err, successMessage: succ } = await login(username, password);
        
        errorMessage = err;
        successMessage = succ;

        if (succ) {
            goto('/auth/validate');
        }
    };

</script>

<div class="container d-flex justify-content-center align-items-center min-vh-100">
    <div class="card bg-white border-0 shadow-lg" style="max-width: 950px; width: 100%;">
        <div class="row g-0">
            <!-- Left Section with Illustration -->
            <div class="col-md-7 d-flex flex-column justify-content-center bg-info text-white px-4">
                <h1 class="h3 mb-1">{ data.preference.site_title }</h1>
                <p class="lead">Please sign in to continue.</p>
                <div class="mt-3">
                    <a href="/" class="btn btn-light">Back to Home</a>
                </div>
            </div>

            <!-- Right Section with Form -->
            <div class="col-md-5">
                <div class="card-body px-4 py-5">
                    <h2 class="text-center mb-4">Sign In</h2>
                    
                    {#if successMessage}
                        <div class="alert alert-success" role="alert">
                            {successMessage}
                        </div>
                    {/if}

                    {#if errorMessage}
                        <div class="alert alert-danger" role="alert">
                            {errorMessage}
                        </div>
                    {/if}

                    <form onsubmit={handleLogin}>
                        <div class="mb-3">
                            <label for="username" class="form-label">Username</label>
                            <input type="text" id="username" class="form-control" bind:value={username} placeholder="Enter your name" required>
                        </div>

                        <div class="mb-3">
                            <label for="password" class="form-label">Password</label>
                            <input type="password" id="password" class="form-control" bind:value={password} placeholder="Enter your password" required>
                        </div>

                        <div class="form-check mb-4">
                            <input type="checkbox" id="rememberMe" class="form-check-input">
                            <label for="rememberMe" class="form-check-label">Remember me</label>
                        </div>

                        <div class="d-grid mb-3">
                            <button type="submit" class="btn btn-info" disabled={loading}>
                                {#if loading}
                                    <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                    Loading...
                                {:else}
                                    Sign In
                                {/if}
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
