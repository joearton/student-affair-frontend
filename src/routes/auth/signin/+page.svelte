<script lang="ts">
    import { signin } from '$lib/auth';  
    import { goto } from '$app/navigation';
    import type { LayoutData } from '../$types';
    import { api_request } from '$lib/api';
    import { onMount } from 'svelte';
    import { _ } from 'svelte-i18n';
    import { page } from '$app/state';
    import { check_authentication } from '$lib/auth';

    let { data }: { data: LayoutData } = $props();

    let username = $state('');
    let password = $state('');
    let loading = $state(false);
    let captcha = $state('');
    let captcha_key = $state('');
    let captcha_image = $state('');

    let next_scholarship = page.url.searchParams.get('scholarship') || "";
    let is_authenticated = $state(false);

    onMount(async () => {
        is_authenticated = await check_authentication();
    });

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
                if (next_scholarship) {
                    goto('/auth/validate?scholarship=' + next_scholarship);
                } else {
                    goto('/auth/validate');
                }
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
    <div class="card border-0 shadow-lg" style="max-width: 950px; width: 100%;">
        <div class="row g-0">
            <!-- Left Section with Illustration -->
            <div class="col-md-7 d-flex flex-column justify-content-center bg-info text-white px-4">
                <h1 class="h3 mb-1">{ data.preference.site_title }</h1>
                <p class="lead">{$_('auth.signin.description')}</p>
                <p class="py-3">{$_('auth.signin.instructions')}</p>
                <div class="mt-3">
                    <a href="/" class="btn btn-light">{$_('auth.signin.back_to_home')}</a>
                </div>
            </div>

            <!-- Right Section with Form -->
            <div class="col-md-5 bg-white">
                <div class="card-body px-4 py-4">
                    <h2 class="text-center mb-4">{$_('auth.signin.title')}</h2>
                    {#if is_authenticated}
                        <div class="alert alert-success" role="alert">
                            {$_('auth.signin.already_authenticated')}
                            <div class="my-1 text-center">
                                <a href="/account/" class="btn btn-success">{$_('auth.signin.title')}</a>
                            </div>
                        </div>
                    {/if}
                    <form onsubmit={handleLogin}>
                        <div class="mb-2 input-group">
                            <span class="input-group-text"><i class="fa fa-user"></i></span>
                            <input type="text" id="username" class="form-control" bind:value={username} placeholder="{$_('auth.signin.username')}" required />
                        </div>

                        <div class="mb-2 input-group">
                            <span class="input-group-text"><i class="fa fa-lock"></i></span>
                            <input type="password" id="password" class="form-control" bind:value={password} placeholder="{$_('auth.signin.password')}" required />
                        </div>

                        <div class="mb-2">
                            <img class="border my-2" src={captcha_image} alt="Captcha" />
                            <input type="text" id="captcha" bind:value={captcha} class="form-control" placeholder="{$_('auth.signin.captcha')}" required />
                        </div>
                        
                        <div class="mb-2 text-center">
                            <a href="/auth/reset-password" class="text-info">{$_('auth.signin.forgot_password')}</a>
                        </div>

                        <div class="d-grid mb-3">
                            <button type="submit" class="btn btn-info" disabled={loading}>
                                {#if loading}
                                    <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                    {$_('auth.signin.loading')}
                                {:else}
                                    {$_('auth.signin.signin_button')}
                                {/if}
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    </div>
</div>

<style>
    @media (max-width: 768px) {
        .shadow-lg {
            box-shadow: none !important;
        }
        .col-md-7 {
            padding-top: 21px !important;
            padding-bottom: 21px !important;
            margin-top: 15px !important;
            margin-bottom: 15px !important;
        }
    }
</style>
