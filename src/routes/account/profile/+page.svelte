<script lang="ts">
    import type { LayoutData } from "./$types";

    const { data }: { data: LayoutData} = $props();

    import { api_request } from '$lib/api';
    import { onMount } from 'svelte';
    import { addMessage } from "$lib/stores/messages";

    let email = $state('');
    let password = $state('');
    let password_confirm = $state('');


    async function updateProfile() {
        if (password && password !== password_confirm) {
            addMessage('error', 'Passwords do not match');
            return;
        }

        const payload: any = { email };
        if (password) {
            payload.password = password;
        }

        try {
            const response = await api_request('me/', 'PUT', payload);
            addMessage('success', 'Profile updated successfully');
        } catch (error) {
            addMessage('error', 'Failed to update profile');
        }
    }

    onMount(() => {
        email = data.user.email;
    });

</script>


<div class="pt-1 pb-3">
    <h5 class="fw-bold px-4 py-3 mb-3 border-bottom">Your Profile</h5>
    <form class="row px-4 py-3" onsubmit={updateProfile}>
        <div class="col-md-6 mb-3">
            <p class="mb-1 fw-bold">Username</p>
            <p>{data.user.username}</p>
        </div>
        <div class="col-md-6 mb-3">
            <label for="email" class="mb-1 fw-bold">E-mail</label>
            <input type="email" id="email" class="form-control" bind:value={email} />
        </div>
        <div class="col-md-6 mb-3">
            <p class="mb-1 fw-bold">First Name</p>
            <p>{data.user.first_name || '-'}</p>
        </div>
        <div class="col-md-6 mb-3">
            <p class="mb-1 fw-bold">Last Name</p>
            <p>{data.user.last_name || '-'}</p>
        </div>
        <div class="col-md-6 mb-3">
            <label for="password" class="mb-1 fw-bold">Password</label>
            <input type="password" id="password" class="form-control" bind:value={password} />
            <small class="form-text text-muted">Fill in only if you want to change the password</small>
        </div>
        <div class="col-md-6 mb-3">
            <label for="password-confirm" class="mb-1 fw-bold">Password Confirmation</label>
            <input type="password" id="password-confirm" class="form-control" bind:value={password_confirm} />
            <small class="form-text text-muted">Fill in only if you want to change the password</small>
        </div>
    </form>

    <div class="text-center my-3">
        <button class="btn btn-outline-primary" onclick="{updateProfile}">
            <i class="fa-solid fa-pen"></i> Update Profile
        </button>
    </div>
</div>


