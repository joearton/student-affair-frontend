<script lang="ts">
  import { api_request } from "$lib/api";
  import { onMount } from "svelte";
  import { page } from "$app/stores";

  let data: any = null; // Data untuk detail beasiswa
  let error: string | null = null;
  let isLoading: boolean = true;

  // Ambil ID dari URL
  const id: string = $page.params.id;

  // Fungsi untuk mengambil data detail berdasarkan ID
  const fetchDetail = async (id: string) => {
    try {
      isLoading = true;
      const result = await api_request(`scholarship/${id}/`);
      data = result;
    } catch (err) {
      console.error("Error fetching detail:", err);
      error = "Gagal memuat data. Silakan coba lagi.";
    } finally {
      isLoading = false;
    }
  };

  // Memuat data ketika komponen dimuat
  onMount(() => {
    fetchDetail(id);
  });
</script>

<!-- Vertikal -->
<div>
  {#if isLoading}
    <p>Memuat data...</p>
  {:else if error}
    <p class="error">{error}</p>
  {:else if data}
    <div class="card shadow border-0 rounded-3 mt-5">
      <div class="card-body mt-4 ms-3">
        <h5 class="card-title fw-bold mb-3">Detail Beasiswa</h5>
        <div class="d-flex flex-column gap-3">
          <div>
            <p class="mb-1 fw-bold">Nama Beasiswa</p>
            <p>{data.name}</p>
          </div>
          <div>
            <p class="mb-1 fw-bold">Status</p>
            {#if data.status === "on-going"}
              <p class="badge text-bg-success">On-going</p>
            {:else if data.status === "closed"}
              <p class="badge text-bg-danger">Closed</p>
            {:else if data.status === "coming-soon"}
              <p class="badge text-bg-primary">Coming Soon</p>
            {/if}
          </div>
          <div>
            <p class="mb-1 fw-bold">Persyaratan</p>
            <p>{@html data.requirement}</p>
          </div>
          <div>
            <p class="mb-1 fw-bold">Kuota</p>
            <p>{data.quota}</p>
          </div>
          <div>
            <p class="mb-1 fw-bold">Tanggal Mulai</p>
            <p>{new Date(data.start_date).toLocaleDateString()}</p>
          </div>
          <div>
            <p class="mb-1 fw-bold">Tanggal Selesai</p>
            <p>{new Date(data.end_date).toLocaleDateString()}</p>
          </div>
          <div>
            <p class="mb-1 fw-bold">Deskripsi</p>
            <p>{@html data.description}</p>
          </div>
          <div>
            <p class="mb-1 fw-bold">Fakultas</p>
            <p>{data.faculties.join(", ")}</p>
          </div>
          <div>
            <p class="mb-1 fw-bold">Jurusan</p>
            <p>{data.departments.join(", ")}</p>
          </div>
        </div>

        <div class="text-center mt-4 d-flex justify-content-center gap-4">
          {#if data.status === "on-going"}
            <a href="#" class="btn btn-outline-primary rounded-pill px-5">
              <i class="fa-solid fa-pen"></i> Apply
            </a>
          {/if}
          <a
            href="../scholarship"
            class="btn btn-outline-danger rounded-pill px-5"
          >
            <i class="fa-solid fa-arrow-left"></i> Back
          </a>
        </div>
      </div>
    </div>
  {/if}
</div>

<!-- Horizontal -->

<!-- <div>
  {#if isLoading}
    <p>Memuat data...</p>
  {:else if error}
    <p class="error">{error}</p>
  {:else if data}
    <div class="card shadow border-0 rounded-3 mt-5">
      <div class="card-body mt-4 ms-3">
        <h5 class="card-title fw-bold mb-3">Detail Beasiswa</h5>
        <div class="row">
          <div class="col-md-6 mb-2">
            <p class="mb-1 fw-bold">Nama Beasiswa</p>
            <p>{data.name}</p>
          </div>
          <div class="col-md-6 mb-2">
            <p class="mb-1 fw-bold">Status</p>
            {#if data.status === "on-going"}
              <p class="badge text-bg-success">On-going</p>
            {:else if data.status === "closed"}
              <p class="badge text-bg-danger">Closed</p>
            {:else if data.status === "coming-soon"}
              <p class="badge text-bg-primary">Coming Soon</p>
            {/if}
          </div>
          <div class="col-md-6 mb-2">
            <p class="mb-1 fw-bold">Persyaratan</p>
            <p>{data.requirement}</p>
          </div>
          <div class="col-md-6 mb-2">
            <p class="mb-1 fw-bold">Kuota</p>
            <p>{data.quota}</p>
          </div>
          <div class="col-md-6 mb-2">
            <p class="mb-1 fw-bold">Tanggal Mulai</p>
            <p>{new Date(data.start_date).toLocaleDateString()}</p>
          </div>
          <div class="col-md-6 mb-2">
            <p class="mb-1 fw-bold">Tanggal Selesai</p>
            <p>{new Date(data.end_date).toLocaleDateString()}</p>
          </div>
          <div class="col-md-12 mb-2">
            <p class="mb-1 fw-bold">Deskripsi</p>
            <p>{data.description}</p>
          </div>
          <div class="col-md-6 mb-2">
            <p class="mb-1 fw-bold">Fakultas</p>
            <p>{data.faculties.join(", ")}</p>
          </div>
          <div class="col-md-6 mb-2">
            <p class="mb-1 fw-bold">Jurusan</p>
            <p>{data.departments.join(", ")}</p>
          </div>
        </div>

        <div class="text-center mt-4 d-flex justify-content-center gap-4">
          {#if data.status === "on-going"}
            <a href="#" class="btn btn-outline-primary rounded-pill px-5">
              <i class="fa-solid fa-pen"></i> Apply
            </a>
          {/if}
          <a
            href="../scholarship"
            class="btn btn-outline-danger rounded-pill px-5"
          >
            <i class="fa-solid fa-arrow-left"></i> Back
          </a>
        </div>
      </div>
    </div>
  {/if}
</div> -->
