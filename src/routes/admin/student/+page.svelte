<div class="container my-5">
  <!-- Profile -->
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

  <!-- Summary -->
  <div class="row text-center my-lg-5 g-4">
    <div class="col-md-4">
      <div class="card shadow-sm text-primary">
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
      <div class="card shadow-sm text-success">
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
      <div class="card shadow-sm text-danger">
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

  <!-- Activity -->
  <h4 class="mb-4 mt-4">Activity</h4>
  <div class="card shadow-sm">
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
        <span class="badge bg-success me-2 text-white text-center rounded-pill">
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
