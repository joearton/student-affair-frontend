<script lang="ts">
    import { signin } from '$lib/auth';  
    import { goto } from '$app/navigation';
    import type { LayoutData } from '../$types';
    import { api_request } from '$lib/api';
    import { onMount } from 'svelte';

    let { data }: { data: LayoutData } = $props();

    let username = $state('');
    let password = $state('');
    let loading = $state(false);
    let captcha = $state('');
    let captcha_key = $state('');
    let captcha_image = $state('');

    const load_captcha = async () => {
        const response = await api_request('/captcha/image/');
        captcha_image = response.image_url;
        captcha_key = response.captcha_key;
    };


    const handleLogin = async (event: Event) => {
        event.preventDefault();

        loading = true;

        try {
            const state = await signin(username, password, captcha, captcha_key);
            if (state === true) {
                goto('/auth/validate');
            } else {
                load_captcha();
            }
        } catch (error) {
        } finally {
            loading = false;
        }
    };

    onMount(() => {
        load_captcha();
    });

</script>

<div class="container d-flex justify-content-center align-items-center min-vh-100">
    <div class="card bg-white border-0 shadow-lg" style="max-width: 950px; width: 100%;">
        <div class="row g-0">
            <!-- Left Section with Illustration -->
            <div class="col-md-7 d-flex flex-column justify-content-center bg-info text-white px-4">
                <h1 class="h3 mb-1">{ data.preference.site_title }</h1>
                <p class="lead">Please sign in to continue.</p>
                <p class="py-5">Mahasiswa baru/aktif, gunakan NIM sebagai username dan tanggal lahir (yyyymmdd) @ 4 digit terakhir nomor handphone di Siakad sebagai kata sandi. Pastikan semua data di Siakad telah lengkap. Contoh penulisan kata sandi 19901127@2904.</p>
                <div class="mt-3">
                    <a href="/" class="btn btn-light">Back to Home</a>
                </div>
            </div>

            <!-- Right Section with Form -->
            <div class="col-md-5">
                <div class="card-body px-4 py-5">
                    <h2 class="text-center mb-4">Sign In</h2>
                    
                    <form onsubmit={handleLogin}>
                        <div class="mb-3">
                            <label for="username" class="form-label">Username</label>
                            <input type="text" id="username" class="form-control" bind:value={username} placeholder="Enter your name" required>
                        </div>

                        <div class="mb-3">
                            <label for="password" class="form-label">Password</label>
                            <input type="password" id="password" class="form-control" bind:value={password} placeholder="Enter your password" required>
                        </div>

                        <div class="mb-3">
                            <img class="border my-2" src={captcha_image} alt="Captcha" />
                            <input type="text" id="captcha" bind:value={captcha} class="form-control" placeholder="Enter captcha" required />
                        </div>
                        
                        <div class="mb-3 text-center">
                            <a href="/auth/reset-password" class="text-info">Forgot your password?</a>
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
