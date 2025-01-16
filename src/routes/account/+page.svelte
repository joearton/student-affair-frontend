<script lang="ts">
    import type { LayoutData } from './$types';

    let { data }: { data: LayoutData } = $props();
</script>


<div class="d-flex align-items-center mb-4 border-bottom px-4 py-3">
    <div class="profile-icon">
        {#if data.user.picture}
            <img src="{data.preference.site + data.user.picture}" alt="{ data.user.fullname }" class="user-picture" />
        {:else}
            <img src="/media/user.png" alt="{ data.user.fullname }" class="user-picture" />
        {/if}
    </div>
    <div class="ms-3">
        <div>Welcome</div>
        <h4 class="fw-bold text-primary">{ data.user.fullname || data.user.username }</h4>
    </div>
</div>

<div class="px-4 pt-1 pb-5">
    <div class="row text-center g-4 mb-5">
        <div class="col-md-4">
            <div class="card border-0 shadow-sm text-primary">
                <div class="d-flex align-items-center ms-4">
                    <i class="fa-solid fa-award fs-1"></i>
                    <div class="card-body">
                        <h5 class="fw-bold">Scholarship</h5>
                        <h6 class="fw-bold">1</h6>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="card border-0 shadow-sm text-success">
                <div class="d-flex align-items-center ms-4">
                    <i class="fa-solid fa-circle-check fs-1"></i>
                    <div class="card-body">
                        <h5 class="fw-bold">Approval</h5>
                        <h6 class="fw-bold">1</h6>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="card border-0 shadow-sm text-danger">
                <div class="d-flex align-items-center ms-4">
                    <i class="fa-solid fa-circle-xmark fs-1"></i>
                    <div class="card-body">
                        <h5 class="fw-bold">Rejected</h5>
                        <h6 class="fw-bold">1</h6>
                    </div>
                </div>
            </div>
        </div>
    </div>
    

    <h5 class="my-3">Recent Activities...</h5>
    <div class="card border-0 shadow-sm">
        <div class="card-body">
            <div class="border-bottom">
                <h5 class="fw-bold">UMKO Peduli Lindungi</h5>
                <p>Mahasiswa</p>
                <p class="text-muted mb-2">
                    9 November 2024 - 10 November 2024 | 50 Quota | On Going
                </p>
            </div>
    
            <div class="d-flex flex-wrap align-items-center mt-3">
                <!-- Badge Lulus Pelatihan -->
                <span
                    class="badge bg-success me-2 text-white text-center rounded-pill"
                >
                    Lulus Pelatihan - Nilai
                </span>
                <div class="ms-auto d-flex flex-wrap">
                    <!-- Detail -->
                    <button class="btn btn-outline-primary rounded-pill">
                        <i class="fa-solid fa-circle-info"></i> Detail
                    </button>
                </div>
            </div>
        </div>
    </div>    
</div>


<style>

    .user-picture {
        width: 90px;
        height: 90px;
        border-radius: 100%;
        border: 2px solid #f1f1f1;
    }

</style>