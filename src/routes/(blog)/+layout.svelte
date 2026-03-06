<script lang="ts">
  import { onMount } from "svelte";
  import type { LayoutData } from "./$types";
  import type { Snippet } from "svelte";

  import Topbar from "$lib/components/blog/Topbar.svelte";
  import Navbar from "$lib/components/blog/Navbar.svelte";
  import Carousel from "$lib/components/blog/Carousel.svelte";
  import Footer from "$lib/components/blog/Footer.svelte";
  import ClipPath from "$lib/components/ClipPath.svelte";
  import PopupWindow from "$lib/components/blog/PopupWindow.svelte";

  let { data, children }: { data: LayoutData; children: Snippet } = $props();

  onMount(() => {
    if (typeof window !== "undefined" && (window as any).AOS) {
      (window as any).AOS.init({
        duration: 800,
        easing: "ease-in-out",
        once: true,
        offset: 100,
      });
    }
  });
</script>

<div class="topbar bg-primary py-2">
  <ClipPath></ClipPath>
  <Topbar preference={data.preference}></Topbar>
</div>

<nav class="navbar sticky-top navbar-expand-lg navbar-dark bg-primary">
  <Navbar preference={data.preference}></Navbar>
</nav>

<main>
  <Carousel preference={data.preference} page_setting={data.page_setting}
  ></Carousel>
  {@render children()}
  <PopupWindow
    site_url={data.preference.site}
    popup_image={data.page_setting.popup_image}
    popup_info={data.page_setting.popup_info}
  ></PopupWindow>
</main>

<footer class="footer bg-primary text-white pt-5 pb-3">
  <Footer></Footer>
</footer>

<style>
  :global(html) {
    scroll-behavior: smooth;
  }
</style>
