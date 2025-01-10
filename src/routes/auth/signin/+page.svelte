<script lang="ts">
    import { login } from '$lib/auth';  
    import type { LayoutData } from '../$types';

    let { data }: { data: LayoutData } = $props();
    
    let username = $state('');
    let password = $state('');
    let errorMessage = $state('');
    let successMessage = $state('');

    const handleLogin = async (event: Event) => {
        event.preventDefault();
        const { errorMessage: err, successMessage: succ } = await login(username, password);
        
        errorMessage = err;
        successMessage = succ;
    };
</script>

<div class="container d-flex justify-content-center align-items-center min-vh-100">
    <div class="card shadow-lg border-0 rounded-3 p-4" style="max-width: 400px; width: 100%;">
        <div class="card-body">
            <h2 class="text-center mb-4 text-primary">Sign In</h2>

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

            <ul class="nav nav-tabs" id="myTab" role="tablist">
                <li class="nav-item" role="presentation">
                    <button class="nav-link active" id="student-tab" data-bs-toggle="tab" data-bs-target="#student" type="button" role="tab" aria-controls="student" aria-selected="true">Student</button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link" id="general-tab" data-bs-toggle="tab" data-bs-target="#general" type="button" role="tab" aria-controls="general" aria-selected="false">General</button>
                </li>
            </ul>
            <div class="tab-content" id="myTabContent">
                <div class="tab-pane fade show active" id="student" role="tabpanel" aria-labelledby="student-tab">
                    <form onsubmit={handleLogin}>
                        <div class="mb-3">
                            <label for="username" class="form-label">Username (NIM)</label>
                            <input type="text" id="username" class="form-control" bind:value={username} placeholder="Enter NIM" required />
                            <div class="form-text">Gunakan 4 digit nomor handphone dan nomor hp di Siakad</div>
                        </div>

                        <div class="mb-3">
                            <label for="password" class="form-label">Password</label>
                            <input type="password" id="password" class="form-control" bind:value={password} placeholder="Enter password" required />
                        </div>

                        <div class="d-grid mb-3">
                            <button type="submit" class="btn btn-primary btn-lg">Sign In</button>
                        </div>
                    </form>
                </div>
                <div class="tab-pane fade" id="general" role="tabpanel" aria-labelledby="general-tab">
                    <form onsubmit={handleLogin}>
                        <div class="mb-3">
                            <label for="username" class="form-label">Username</label>
                            <input type="text" id="username" class="form-control" bind:value={username} placeholder="Enter username" required />
                        </div>

                        <div class="mb-3">
                            <label for="password" class="form-label">Password</label>
                            <input type="password" id="password" class="form-control" bind:value={password} placeholder="Enter password" required />
                        </div>

                        <div class="d-grid mb-3">
                            <button type="submit" class="btn btn-primary btn-lg">Sign In</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>

<style>
    .card {
        background: #ffffff;
        border-radius: 15px;
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    }

    h2 {
        font-weight: bold;
    }

    .form-control {
        border-radius: 10px;
    }

    .btn-primary {
        background: #007bff;
        border: none;
        border-radius: 10px;
    }

    .btn-primary:hover {
        background: #0056b3;
    }
</style>