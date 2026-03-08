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

  let showScrollTop = $state(false);

  onMount(() => {
    if (typeof window !== "undefined" && (window as any).AOS) {
      (window as any).AOS.init({
        duration: 800,
        easing: "ease-in-out",
        once: true,
        offset: 100,
      });
    }

    // GSAP preloader dismiss animation
    const gsap = (window as any).gsap;
    const preloader = document.getElementById("preloader");
    if (gsap && preloader) {
      const tl = gsap.timeline({
        onComplete: () => {
          preloader.remove();
        },
      });
      tl.to("#preloader-spinner", {
        scale: 0,
        opacity: 0,
        duration: 0.4,
        ease: "back.in(2)",
      })
        .to(
          "#preloader-text",
          { y: -20, opacity: 0, duration: 0.3, ease: "power2.in" },
          "-=0.2",
        )
        .to(
          "#preloader-subtext",
          { y: -15, opacity: 0, duration: 0.3, ease: "power2.in" },
          "-=0.2",
        )
        .to(preloader, {
          yPercent: -100,
          duration: 0.6,
          ease: "power3.inOut",
        });
    }

    const handleScroll = () => {
      showScrollTop = window.scrollY > 300;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
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

{#if showScrollTop}
  <button
    class="scroll-to-top"
    onclick={scrollToTop}
    aria-label="Scroll to top"
  >
    <i class="fas fa-chevron-up"></i>
  </button>
{/if}

<style>
  :global(html) {
    scroll-behavior: smooth;
  }

  .scroll-to-top {
    position: fixed;
    bottom: 49px;
    right: 30px;
    z-index: 9999;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: none;
    background: var(--bs-primary, #007bff);
    color: white;
    font-size: 1.2rem;
    cursor: pointer;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
    display: flex;
    align-items: center;
    justify-content: center;
    animation: fadeInUp 0.3s ease-out;
    transition:
      background 0.3s ease,
      transform 0.3s ease;
  }

  .scroll-to-top:hover {
    background: var(--bs-primary, #0056b3);
    transform: translateY(-3px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.3);
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>
