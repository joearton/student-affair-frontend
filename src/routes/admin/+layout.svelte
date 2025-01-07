<script lang="ts">
    import type { LayoutData } from './$types';
    import type { Snippet } from 'svelte';

    import Topbar from "$lib/components/admin/Topbar.svelte";
    import Sidebar from "$lib/components/admin/Sidebar.svelte";
    import Footer from "$lib/components/admin/Footer.svelte";

    let { data, children }: { data: LayoutData, children: Snippet } = $props();
</script>

<header class="bg-primary">
    <Topbar preference={ data.preference }></Topbar>
</header>

<div class="container mt-3">
    <div class="row">
        <aside class="col-lg-3 col-md-4 col-12 mt-lg-5">
            <Sidebar></Sidebar>
        </aside>
        <main class="col-lg-9 col-md-8 col-12">
            <div class="content px-4 pb-4 rounded">
                {@render children()}
            </div>
        </main>
    </div>
</div>

<footer class="footer bg-primary text-white py-4">
    <Footer></Footer>
</footer>


<style>
    .row {
        margin-left: 60px;
    }
    .col-lg-3 {
        margin-right: -40px;
    }
    .content {
        min-height: calc(100vh - 150px); /* Sesuaikan tinggi konten */
        overflow-x: auto; /* Hindari tabel keluar dari container */
    }

    @media (max-width: 790px) {
        aside {
            margin-bottom: 1rem;
        }
        .row {
            margin: 0px; /* Hilangkan margin default pada row */
        }
        .col-lg-3 {
            margin-right: auto;
        }
    }
    @media (max-width: 1200px) {
        aside {
            margin-bottom: 1rem;
        }
        .row {
            margin: 0px; /* Hilangkan margin default pada row */
        }
        .col-lg-3 {
            margin-right: auto;
        }
    }
</style>
