<script lang="ts">
    import type { LayoutData } from './$types';
    import type { Snippet } from 'svelte';

    import Navbar from "$lib/components/account/Navbar.svelte";
    import Sidebar from "$lib/components/account/Sidebar.svelte";
    import Footer from "$lib/components/account/Footer.svelte";
    
    let { data, children }: { data: LayoutData, children: Snippet } = $props();
</script>


<nav class="navbar sticky-top navbar-expand-lg navbar-dark bg-primary">
    <Navbar menu_items = { data.menu_items } preference = { data.preference } user = { data.user }></Navbar>
</nav>

<div class="container my-5">
    <div class="d-flex flex-column flex-md-row">
        <aside class="flex-shrink-0 mb-3 mb-md-0 me-md-4" style="width: 250px;">
            <div class="sticky-top" style="top: 111px; z-index: 1000;">
                <Sidebar menu_items = { data.menu_items } user = { data.user }></Sidebar>
            </div>
        </aside>
        <main class="flex-grow-1">
            <div class="bg-white shadow-sm rounded">
                {@render children()}
            </div>
        </main>
    </div>
</div>

<footer class="footer bg-primary text-white py-4">
    <Footer></Footer>
</footer>


