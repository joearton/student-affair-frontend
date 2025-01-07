<script lang="ts">
    import { page } from "$app/state";

    let { preference } = $props();
</script>

<header class="container p-3 bg-primary">
    <div class="d-flex flex-wrap justify-content-between align-items-center">
        <!-- Logo -->
        <a class="logo d-flex align-items-center" href="/admin/student">
            <img
                src={preference.site_logo}
                alt="Brand Logo"
                class="me-0 img-fluid"
                style="height: 40px;"
            />
        </a>

        <!-- Search Bar -->
        <input
            type="text"
            class="form-control search d-none d-md-block rounded-5 ps-3 pe-3"
            placeholder="Pencarian beasiswa..."
        />

        <!-- Profile and Hamburger Section -->
        <div class="d-flex align-items-center mt-3 mt-md-0">
            <!-- Dropdown Container -->
            <div class="dropdown d-flex align-items-center">
                <!-- Dropdown Button that includes both the profile image and the arrow icon -->
                <button
                    class="btn text-white bg-transparent p-0 dropdown-toggle d-flex align-items-center"
                    type="button"
                    id="dropdownMenuButton"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                >
                    <!-- Profile Image -->
                    <div class="profile-icon me-0">
                        <img
                            src="https://via.placeholder.com/40"
                            alt="Profile"
                            class="rounded-circle"
                        />
                    </div>
                    <!-- Arrow Icon -->
                    <i class="bi bi-caret-down-fill"></i>
                </button>

                <!-- Dropdown Menu -->
                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <li>
                        <a
                            class="dropdown-item text-black"
                            href="/admin/student/personal-data">Profile</a
                        >
                    </li>
                    <li>
                        <a class="dropdown-item text-black" href="#logout"
                            >Logout</a
                        >
                    </li>
                </ul>
            </div>

            <!-- Hamburger Button for Mobile -->
            <button
                class="navbar-toggler d-block d-md-none ms-2 me-0"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
                style="border-color: transparent;"
            >
                <i class="fa-solid fa-bars ms-2 fs-1" style="color: #FFD43B;"
                ></i>
            </button>
        </div>
    </div>
</header>

<!-- Navbar Links -->
<nav class="navbar navbar-expand-sm bg-warning py-0">
    <!-- Navbar Items -->
    <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav mx-auto mt-1 d-flex justify-content-center">
            <li class="nav-item nav-item-mobile">
                <a
                    href="/admin/student"
                    class="nav-link menu-link text-black fw-bold fs-6"
                    class:active={page.url.pathname === "/admin/student"}
                    class:custom-active={page.url.pathname ===
                        "/admin/student"}
                >
                    Dashboard
                </a>
            </li>
            <li class="nav-item nav-item-mobile">
                <a
                    href="/admin/student/scholarship"
                    class="nav-link menu-link text-black fw-bold fs-6"
                    class:active={page.url.pathname ===
                        "/admin/student/scholarship"}
                    class:custom-active={page.url.pathname ===
                        "/admin/student/scholarship"}
                >
                    Scholarship
                </a>
            </li>
            <li class="nav-item nav-item-mobile">
                <a
                    href="/admin/student/my-scholarship"
                    class="nav-link menu-link text-black fw-bold fs-6"
                    class:active={page.url.pathname ===
                        "/admin/student/my-scholarship"}
                    class:custom-active={page.url.pathname ===
                        "/admin/student/my-scholarship"}
                >
                    My Scholarship
                </a>
            </li>
            <li class="nav-item nav-item-mobile">
                <a
                    href="/admin/student/personal-data"
                    class="nav-link menu-link text-black fw-bold fs-6"
                    class:active={page.url.pathname ===
                        "/admin/student/personal-data"}
                    class:custom-active={page.url.pathname ===
                        "/admin/student/personal-data"}
                >
                    Personal Data
                </a>
            </li>
            <li class="nav-item nav-item-mobile">
                <a
                    class="nav-link menu-link text-black fw-bold fs-6"
                    href="#kontak"
                >
                    Data reviewer
                </a>
            </li>
            <li class="nav-item nav-item-mobile">
                <a
                    class="nav-link menu-link text-black fw-bold fs-6"
                    href="#kontak"
                >
                    Logout
                </a>
            </li>
        </ul>
    </div>
</nav>

<style>
    .nav-item-mobile {
        display: none;
    }
    .profile-icon {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background-color: #ddd;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
    }

    .profile-icon img {
        width: 100%;
        height: auto;
    }

    .search {
        width: 100%;
        max-width: 550px;
    }

    .navbar-nav .nav-item .nav-link {
        font-size: 12px;
    }

    /* Mobile hover background */
    @media (max-width: 768px) {
        .nav-item-mobile {
            display: contents;
        }
        .logo img {
            margin-left: -10px;
            width: 150px;
            height: 30px !important;
        }
        .navbar-nav .nav-item:hover .nav-link {
            background-color: var(
                --bs-primary
            ); /* Change to the primary color */
            color: white !important;
        }
        .menu-link.active {
            background-color: #002e5c;
            font-weight: bold;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
        }

        .menu-link.custom-active {
            color: white !important;
            font-weight: bold;
        }

        .menu-link:hover {
            text-decoration: none;
            color: #002e5c;
        }
    }
</style>
