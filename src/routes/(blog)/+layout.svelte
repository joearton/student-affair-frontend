<script lang="ts">
    import type { LayoutData } from './$types';
    import type { Snippet } from 'svelte';
    
    import Topbar from '$lib/components/blog/Topbar.svelte';
    import Navbar from '$lib/components/blog/Navbar.svelte';
    import Carousel from '$lib/components/blog/Carousel.svelte';
    import Footer from '$lib/components/blog/Footer.svelte';
    import ClipPath from '$lib/components/ClipPath.svelte';

    let { data, children }: { data: LayoutData, children: Snippet } = $props();
</script>


<div class="topbar bg-primary py-2">
    <ClipPath></ClipPath>
    <Topbar preference = {data.preference}></Topbar>
</div>

<nav class="navbar sticky-top navbar-expand-lg navbar-dark bg-primary {data.preference.live ? '' : 'offline'}">
    <Navbar preference = {data.preference}></Navbar>
</nav>

<main>
    <Carousel preference = {data.preference}></Carousel>
    {@render children() }
</main>

<footer class="footer bg-primary text-white py-4">
    <Footer></Footer>
</footer>