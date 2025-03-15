<script lang="ts">
    import { api_request } from "$lib/api";
    import { check_authentication } from "$lib/auth";
    import { addMessage } from "$lib/stores/messages";
    import type { LayoutData } from "./$types";
    import { _ } from 'svelte-i18n';

    const { data }: { data: LayoutData} = $props();
    
    let user_picture_url = $state(data.user.picture);

    const update_from_siakad = async () => {
        addMessage('info', 'Updating student data from Siakad...');
        check_authentication(true);
        setTimeout(function() {
            window.location.reload();
        }, 5000);
    }

    const handleFileUpload = async (event: Event) => {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files.length > 0) {
            const file = input.files[0];
            const form_data = new FormData();
            form_data.append('picture', file);

            const response = await api_request('me/property', 'PUT', form_data, false);
            if (response.status == 200) {
                user_picture_url = response.data.picture;
                addMessage('success', 'File uploaded successfully');
            } else {
                addMessage('error', `File upload failed: ${response.picture}`);
            }
        }
    }

</script>

<div class="profile-container py-1">
    <!-- Profile -->
    <div class="profile-header text-center mb-3 border-bottom px-3 py-4">
        <div class="profile-picture-container position-relative d-flex flex-column align-items-center">
            {#if user_picture_url }
                <img src={data.preference.site + user_picture_url} class="user-picture" alt={$_('account.profile.change_picture')} />
            {:else}
                <img src='/media/user.png' class="user-picture" alt={$_('account.profile.change_picture')} />
            {/if}
            <div class="mt-2 d-flex justify-content-center">
                <label class="btn btn-light btn-sm">
                    {#if user_picture_url}
                        <i class="fa fa-upload"></i> {$_('account.profile.change_picture')}
                    {:else}
                        <i class="fa fa-upload"></i> {$_('account.profile.upload_picture')}
                    {/if}
                    <input type="file" accept="image/*" onchange="{handleFileUpload}" class="d-none" />
                </label>
            </div>            
        </div>
    </div>

    <!-- Bio -->
    <div class="profile-bio px-4 py-3">        
        <!-- Student Details -->
        <h5 class="card-title fw-bold mb-3">{$_('account.profile.student_details')}</h5>
        <div class="row">
            <div class="col-md-6 mb-2">
                <p class="mb-1 fw-bold">{$_('account.profile.fullname')}</p>
                <p>{data.user.fullname}</p>
            </div>
            <div class="col-md-6 mb-2">
                <p class="mb-1 fw-bold">{$_('account.profile.student_id')}</p>
                <p>{data.user.student.student_id}</p>
            </div>
            <div class="col-md-6 mb-2">
                <p class="mb-1 fw-bold">{$_('account.profile.department')}</p>
                <p>{data.user.student.department_name}</p>
            </div>
            <div class="col-md-6 mb-2">
                <p class="mb-1 fw-bold">{$_('account.profile.status')}</p>
                <p>{data.user.student.status_display}</p>
            </div>
            <div class="col-md-6 mb-2">
                <p class="mb-1 fw-bold">{$_('account.profile.period')}</p>
                <p>{data.user.student.reg_period}</p>
            </div>
            <div class="col-md-6 mb-2">
                <p class="mb-1 fw-bold">{$_('account.profile.religion')}</p>
                <p>{data.user.student.religion_display}</p>
            </div>
            <div class="col-md-6 mb-2">
                <p class="mb-1 fw-bold">{$_('account.profile.place_of_birth')}</p>
                <p>{data.user.student.place_birth}</p>
            </div>
            <div class="col-md-6 mb-2">
                <p class="mb-1 fw-bold">{$_('account.profile.date_of_birth')}</p>
                <p>{data.user.student.date_birth}</p>
            </div>
            <div class="col-md-6 mb-2">
                <p class="mb-1 fw-bold">{$_('account.profile.address')}</p>
                <p>{data.user.student.address}</p>
            </div>
            <div class="col-md-6 mb-2">
                <p class="mb-1 fw-bold">{$_('account.profile.postal_code')}</p>
                <p>{data.user.student.postal_code}</p>
            </div>
            <div class="col-md-6 mb-2">
                <p class="mb-1 fw-bold">{$_('account.profile.mobile_number')}</p>
                <p>{data.user.student.mobile_number}</p>
            </div>
            <div class="col-md-6 mb-2">
                <p class="mb-1 fw-bold">{$_('account.profile.faculty')}</p>
                <p>{data.user.student.faculty_name}</p>
            </div>
        </div>
        <div class="text-center my-5">
            <button class="btn btn-outline-primary" onclick="{update_from_siakad}">
                <i class="fa fa-refresh"></i> {$_('account.profile.update_from_siakad')}
            </button>
        </div>
    </div>
</div>

<style>
    .profile-container {
        background: #f9f9f9;
        border-radius: 15px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
    .profile-header {
        background: linear-gradient(135deg, #6e8efb, #a777e3);
        color: #fff;
        border-radius: 15px 15px 0 0;
    }
    .profile-picture-container {
        position: relative;
    }
    .user-picture {
        border-radius: 50%;
        width: 125px;
        height: 125px;
        object-fit: cover;
        border: 4px solid #fff;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
    .profile-bio {
        background: #fff;
        border-radius: 0 0 15px 15px;
    }
    .profile-bio h5 {
        color: #333;
    }
    .profile-bio p {
        color: #555;
    }
    .btn-outline-primary {
        border-color: #6e8efb;
        color: #6e8efb;
    }
    .btn-outline-primary:hover {
        background: #6e8efb;
        color: #fff;
    }
</style>
