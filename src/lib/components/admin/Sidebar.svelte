<script lang="ts">
    import { page } from "$app/state";
</script>

<!-- Sidebar -->
<div class="bg-light p-3 sidebar shadow d-none d-md-block">
    <h5 class="menu-title mt-4 fw-bold text-black">MENU</h5>
    <ul class="nav flex-column">
        <li class="nav-item">
            <a
                href="/admin/student"
                class="nav-link menu-link text-secondary fw-bold"
                class:active={page.url.pathname === "/admin/student"}
                class:custom-active={page.url.pathname === "/admin/student"}
            >
                <i class="fa-solid fa-chart-simple me-1"></i> Dashboard
            </a>
        </li>
        <li class="nav-item">
            <a
                href="/admin/student/personal-data"
                class="nav-link menu-link text-secondary fw-bold"
                class:active={page.url.pathname ===
                    "/admin/student/personal-data"}
                class:custom-active={page.url.pathname ===
                    "/admin/student/personal-data"}
            >
                <i class="fa-solid fa-user me-2"></i>Personal Data
            </a>
        </li>
        <li class="nav-item">
            <a
                href="/admin/student/scholarship"
                class="nav-link menu-link text-secondary fw-bold"
                class:active={page.url.pathname ===
                    "/admin/student/scholarship"}
                class:custom-active={page.url.pathname ===
                    "/admin/student/scholarship"}
            >
                <i class="fa-solid fa-award me-2"></i> Scholarship
            </a>
        </li>
        <li class="nav-item">
            <a
                href="/admin/student/my-scholarship"
                class="nav-link menu-link text-secondary fw-bold"
                class:active={page.url.pathname ===
                    "/admin/student/my-scholarship"}
                class:custom-active={page.url.pathname ===
                    "/admin/student/my-scholarship"}
            >
                <i class="fa-solid fa-scroll"></i> My Scholarship
            </a>
        </li>
        <li class="nav-item">
            <a
                href="/reviewer-data"
                class="nav-link menu-link text-secondary fw-bold"
                class:active={page.url.pathname === "/reviewer-data"}
                class:custom-active={page.url.pathname === "/reviewer-data"}
            >
                <i class="fa-solid fa-file-pen me-1"></i>Reviewer Data
            </a>
        </li>
        <li class="nav-item">
            <a
                href="/logout"
                class="nav-link menu-link text-secondary fw-bold"
                class:active={page.url.pathname === "/logout"}
                class:custom-active={page.url.pathname === "/logout"}
            >
                <i class="fa-solid fa-right-from-bracket me-1"></i> Logout
            </a>
        </li>
    </ul>
</div>

<style>
    i {
        font-size: 20px; /* Ukuran font untuk semua ikon */
        line-height: 1; /* Mengatur tinggi baris untuk meratakan ikon */
    }

    .sidebar {
        width: 250px;
        border-radius: 15px;
        height: 500px;
        transition: all 0.3s ease-in-out;
        z-index: -100;
    }

    @media (max-width: 576px) {
        .sidebar {
            display: none;
        }
    }

    .nav-link i {
        font-size: 20px; /* Ukuran font untuk ikon */
    }

    .menu-title {
        font-size: 1rem;
        margin-bottom: 1rem;
    }

    .menu-link {
        font-size: 0.9rem;
    }

    .menu-link.active {
        color: #002e5c;
        font-weight: bold;
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
    }

    .menu-link.custom-active {
        color: #002e5c !important; /* Force the custom color to apply */
        font-weight: bold;
    }

    .menu-link:hover {
        text-decoration: none;
        color: #002e5c;
    }
</style>
