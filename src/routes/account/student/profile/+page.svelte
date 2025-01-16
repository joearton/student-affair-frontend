<script lang="ts">
    import { api_request } from "$lib/api";
    import { check_authentication } from "$lib/auth";
    import { addMessage } from "$lib/stores/messages";
    import type { LayoutData } from "./$types";

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

<div class="py-1">
    <!-- Profile -->
    <div class="text-center mb-3 border-bottom px-3 py-4">
        <div class="position-relative d-flex flex-column align-items-center">
            {#if user_picture_url }
                <img src={data.preference.site + user_picture_url} class="user-picture" alt="User Profile" />
            {:else}
                <img src='/media/user.png' class="user-picture" alt="User Profile" />
            {/if}
            <div class="mt-2 d-flex justify-content-center">
                <label class="btn btn-outline-primary btn-sm">
                    {#if user_picture_url}
                        <i class="fa fa-upload"></i> Change Picture
                    {:else}
                        <i class="fa fa-upload"></i> Upload Picture
                    {/if}
                    <input type="file" accept="image/*" onchange="{handleFileUpload}" class="d-none" />
                </label>
            </div>            
        </div>
    </div>

    <!-- Bio -->
    <div class="px-4 py-3">        
        <!-- Student Details -->
        <h5 class="card-title fw-bold mb-3">Student Detail</h5>
        <div class="row">
            <div class="col-md-6 mb-2">
                <p class="mb-1 fw-bold">Fullname</p>
                <p>{data.user.fullname}</p>
            </div>
            <div class="col-md-6 mb-2">
                <p class="mb-1 fw-bold">Student ID</p>
                <p>{data.user.student.student_id}</p>
            </div>
            <div class="col-md-6 mb-2">
                <p class="mb-1 fw-bold">Department</p>
                <p>{data.user.student.department_name}</p>
            </div>
            <div class="col-md-6 mb-2">
                <p class="mb-1 fw-bold">Status</p>
                <p>{data.user.student.status_display}</p>
            </div>
            <div class="col-md-6 mb-2">
                <p class="mb-1 fw-bold">Period</p>
                <p>{data.user.student.reg_period}</p>
            </div>
            <div class="col-md-6 mb-2">
                <p class="mb-1 fw-bold">Religion</p>
                <p>{data.user.student.religion_display}</p>
            </div>
            <div class="col-md-6 mb-2">
                <p class="mb-1 fw-bold">Place of Birth</p>
                <p>{data.user.student.place_birth}</p>
            </div>
            <div class="col-md-6 mb-2">
                <p class="mb-1 fw-bold">Date of Birth</p>
                <p>{data.user.student.date_birth}</p>
            </div>
            <div class="col-md-6 mb-2">
                <p class="mb-1 fw-bold">Address</p>
                <p>{data.user.student.address}</p>
            </div>
            <div class="col-md-6 mb-2">
                <p class="mb-1 fw-bold">Postal Code</p>
                <p>{data.user.student.postal_code}</p>
            </div>
            <div class="col-md-6 mb-2">
                <p class="mb-1 fw-bold">Mobile Number</p>
                <p>{data.user.student.mobile_number}</p>
            </div>
            <div class="col-md-6 mb-2">
                <p class="mb-1 fw-bold">Faculty</p>
                <p>{data.user.student.faculty_name}</p>
            </div>
        </div>
        <div class="text-center my-3">
            <button class="btn btn-outline-primary" onclick="{update_from_siakad}">
                <i class="fa fa-refresh"></i> Update From Siakad
            </button>
        </div>
    </div>
</div>

<style>
    .user-picture {
        border-radius: 11px;
        width: 125px;
        height: 135px;
    }
</style>
