<script lang="ts">
    import type { LayoutData } from './$types';
    import type { Snippet } from 'svelte';

    import Navbar from "$lib/components/account/Navbar.svelte";
    import Sidebar from "$lib/components/account/Sidebar.svelte";
    import Footer from "$lib/components/account/Footer.svelte";
    
    let { data, children }: { data: LayoutData, children: Snippet } = $props();
</script>


<nav class="navbar sticky-top navbar-expand-lg navbar-dark bg-primary {data.preference.live ? '' : 'offline'}">
    <Navbar menu_items = { data.menu_items } preference = { data.preference } user = { data.user }></Navbar>
</nav>

<div class="container my-5">
    <div class="row">
        <aside class="col-md-3">
            <Sidebar menu_items = { data.menu_items } user = { data.user }></Sidebar>
        </aside>
        <main class="col-md-9">
            <div class="bg-white shadow-sm rounded">
                {@render children()}
            </div>
        </main>
    </div>
</div>

<footer class="footer bg-primary text-white py-4">
    <Footer></Footer>
</footer>


