<script lang="ts">
  import { apiRequest } from "$lib/api";
  import { onMount } from "svelte";

  let data: Array<any> = [];
  let totalCount: number = 0;
  let next: string | null = null;
  let previous: string | null = null;

  // Fungsi untuk mengambil data
  const fetchData = async (url = "scholarship/") => {
    try {
      const result = await apiRequest(url);
      data = result.results;
      totalCount = result.count;
      next = result.next;
      previous = result.previous;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Fungsi untuk menangani pagination
  const handlePagination = async (url: string | null) => {
    if (url) {
      await fetchData(url);
    }
  };

  // Mengambil data ketika komponen dimuat
  onMount(() => {
    fetchData();
  });
</script>

<div class="container my-5">
  <!-- Profile Section -->
  <div class="d-flex align-items-center mb-4 border-bottom pb-4">
    <div class="profile-icon">
      <img src="/media/user.png" alt="User Image" class="rounded-circle" />
    </div>
    <div class="ms-3">
      <h5 class="mb-0">Welcome,</h5>
      <h4 class="fw-bold">FARIS</h4>
    </div>
    <div class="ms-auto">
      <a
        href="/admin/student/personal-data"
        class="btn btn-outline-primary rounded-pill"
        ><i class="fa-solid fa-pen"></i> Edit</a
      >
    </div>
  </div>

  <!-- Scholarship Section -->
  <h4 class="mb-4">Scholarship</h4>
  <div>
    {#each data as scholarship (scholarship.id)}
      <div class="card shadow-sm mb-4">
        <div class="card-body">
          <div class="border-bottom">
            <h5 class="fw-bold">{scholarship.name}</h5>
            <p>{@html scholarship.description}</p>
            <p class="text-muted mb-2">
              {scholarship.start_date.split("T")[0]} - {scholarship.end_date.split(
                "T"
              )[0]} | Quota: {scholarship.quota}
            </p>
          </div>

          <div class="d-flex flex-wrap align-items-center mt-3">
            <!-- Badge Status -->
            <span
              class="badge {scholarship.status === 'on-going'
                ? 'bg-success'
                : 'bg-secondary'} me-2 text-white text-center rounded-pill"
            >
              {scholarship.status}
            </span>
            <div class="ms-auto d-flex flex-wrap">
              <!-- Detail Button -->
              <a
                href={`/admin/student/scholarship/${scholarship.id}`}
                class="btn btn-outline-secondary rounded-pill"
              >
                <i class="fa-solid fa-circle-info"></i> Detail
              </a>
            </div>
          </div>
        </div>
      </div>
    {/each}
  </div>

  <!-- Pagination Section -->
  <div class="d-flex justify-content-between mt-4">
    <button
      class="btn btn-outline-primary"
      on:click={() => handlePagination(previous)}
      disabled={!previous}
    >
      Previous
    </button>
    <button
      class="btn btn-outline-primary"
      on:click={() => handlePagination(next)}
      disabled={!next}
    >
      Next
    </button>
  </div>
</div>

<style>
  .profile-icon {
    width: 80px;
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
  }

  .profile-icon img {
    width: 100%;
    height: auto;
  }
</style>
