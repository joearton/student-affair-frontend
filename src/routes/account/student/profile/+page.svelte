<script lang="ts">
    const { user } = $props();
</script>


<div class="py-1">
    <!-- Profile -->
    <div class="text-center mb-3 border-bottom p-3">
        <img src="/media/user.png" class="rounded-circle user-picture" alt="User Profile" />
    </div>

    <!-- Bio -->
    <div class="px-4 py-3">
        <h5 class="card-title fw-bold mb-3">Your Profile</h5>
        <div class="row">
            <div class="col-md-6 mb-2">
                <p class="mb-1 fw-bold">Nama Depan</p>
                <p>FARIS</p>
            </div>
            <div class="col-md-6 mb-2">
                <p class="mb-1 fw-bold">Nama Belakang</p>
                <p>FARIS</p>
            </div>
            <div class="col-md-6 mb-2">
                <p class="mb-1 fw-bold">Email</p>
                <p>farisaja2***@gmail.com</p>
            </div>
            <div class="col-md-6 mb-2">
                <p class="mb-1 fw-bold">Username</p>
                <p>22592010</p>
            </div>
        </div>

        <!-- Tombol Ubah Personal Data -->
        <div class="text-center mt-4">
            <button class="btn btn-outline-primary rounded-pill px-4">
                <i class="fa-solid fa-pen"></i> Change Personal Data
            </button>
        </div>
    </div>
</div>


<style>
    .user-picture {
        width: 90px;
        height: 90px;
    }
</style>
