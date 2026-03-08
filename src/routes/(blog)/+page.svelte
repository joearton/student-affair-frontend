<script lang="ts">
  import { onMount } from "svelte";
  import { get_posts } from "$lib/objects/blog_post";
  import { get_achievements } from "$lib/objects/ach_achievement";
  import { get_testimonials } from "$lib/objects/blog_testimonial";
  import { _ } from "svelte-i18n";

  import NoDataAvailable from "$lib/components/NoDataAvailable.svelte";

  import type { Post } from "$lib/types/blog_post";
  import type { Achievement } from "$lib/types/ach_achivement";

  let posts: Post[] = $state([]);
  let achievements: Achievement[] = $state([]);
  let testimonials: Testimonial[] = $state([]);

  // Count-up animation state
  const counterConfigs = [
    { target: 11, prefix: "+", suffix: "" },
    { target: 5000, prefix: "", suffix: "+" },
    { target: 50, prefix: "", suffix: "+" },
    { target: 100, prefix: "", suffix: "+" },
  ];
  let counterValues = $state([0, 0, 0, 0]);
  let counters = $derived(
    counterConfigs.map((c, i) => ({ ...c, current: counterValues[i] })),
  );
  let countersStarted = false;
  let featuresSection: HTMLElement;

  function animateCount(
    index: number,
    target: number,
    duration: number = 2000,
  ) {
    const start = performance.now();
    function step(timestamp: number) {
      const progress = Math.min((timestamp - start) / duration, 1);
      // easeOutExpo for smooth deceleration
      const eased = 1 - Math.pow(1 - progress, 3);
      counterValues[index] = Math.floor(eased * target);
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        counterValues[index] = target;
      }
    }
    requestAnimationFrame(step);
  }

  onMount(async () => {
    const response_post = await get_posts({ limit: 6 });
    posts = response_post.results || [];

    const response_achievement = await get_achievements({ limit: 3 });
    achievements = response_achievement.results;

    const response_testimonial = await get_testimonials(6);
    testimonials = response_testimonial.results;

    // Observe features section for count-up animation
    if (featuresSection) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !countersStarted) {
              countersStarted = true;
              counters.forEach((c, i) => {
                setTimeout(() => animateCount(i, c.target), i * 200);
              });
              observer.disconnect();
            }
          });
        },
        { threshold: 0.3 },
      );
      observer.observe(featuresSection);
    }
  });
</script>

<!-- Mahasiswa Baru -->
<div class="new-student-section py-5 position-relative bg-light">
  <div class="container text-center py-5">
    <h2 class="display-5 text-primary mb-1 fw-bold" data-aos="fade-up">
      {$_("blog.newstudent.heading")}
    </h2>
    <p class="lead mb-4" data-aos="fade-up" data-aos-delay="100">
      {$_("blog.newstudent.description")}
    </p>
    <a
      href="https://pmb.umko.ac.id"
      class="btn btn-primary btn-lg px-5 py-2 shadow-lg rounded-pill"
      data-aos="zoom-in"
      data-aos-delay="200"
    >
      <i class="fa fa-link"></i>
      {$_("blog.newstudent.button")}
    </a>
  </div>
</div>

<!-- Features Section -->
<div class="features-section py-5 bg-primary" bind:this={featuresSection}>
  <div class="container text-center">
    <h2 class="fw-bold mb-2 text-warning" data-aos="fade-down">
      {$_("blog.features.heading")}
    </h2>
    <p class="mb-5 text-white" data-aos="fade-down" data-aos-delay="100">
      {$_("blog.features.description")}
    </p>
    <div class="row gy-4">
      <div class="col-md-3" data-aos="fade-up" data-aos-delay="0">
        <div class="feature-card py-4 px-3 bg-white rounded">
          <div class="icon-container mb-3">
            <i class="fa fa-university"></i>
          </div>
          <h3 class="fw-bold counter-number">
            {counters[0].prefix}{counters[0].current}{counters[0].suffix}
          </h3>
          <p>{$_("blog.features.cards.programStudy")}</p>
        </div>
      </div>
      <div class="col-md-3" data-aos="fade-up" data-aos-delay="150">
        <div class="feature-card py-4 px-3 bg-white rounded">
          <div class="icon-container mb-3">
            <i class="fa fa-user-graduate"></i>
          </div>
          <h3 class="fw-bold counter-number">
            {counters[1].prefix}{counters[1].current}{counters[1].suffix}
          </h3>
          <p class="text-muted">{$_("blog.features.cards.alumni")}</p>
        </div>
      </div>
      <div class="col-md-3" data-aos="fade-up" data-aos-delay="300">
        <div class="feature-card py-4 px-3 bg-white rounded">
          <div class="icon-container mb-3">
            <i class="fa fa-users"></i>
          </div>
          <h3 class="fw-bold counter-number">
            {counters[2].prefix}{counters[2].current}{counters[2].suffix}
          </h3>
          <p class="text-muted">{$_("blog.features.cards.lecturers")}</p>
        </div>
      </div>
      <div class="col-md-3" data-aos="fade-up" data-aos-delay="450">
        <div class="feature-card py-4 px-3 bg-white rounded">
          <div class="icon-container mb-3">
            <i class="fa fa-trophy"></i>
          </div>
          <h3 class="fw-bold counter-number">
            {counters[3].prefix}{counters[3].current}{counters[3].suffix}
          </h3>
          <p class="text-muted">{$_("blog.features.cards.prestasi")}</p>
        </div>
      </div>
    </div>
  </div>
</div>

<div class="post-section py-5">
  <div class="container">
    {#if posts.length === 0}
      <NoDataAvailable></NoDataAvailable>
    {:else}
      <div class="row row-cols-1 row-cols-md-3 g-5">
        {#each posts as post, index}
          <div class="col mb-3" data-aos="fade-up" data-aos-delay={index * 150}>
            <div class="card post-item h-100 shadow-sm border-0">
              <a
                class="card-title mb-1"
                href={`/post/${post.slug}`}
                aria-label={post.title}
              >
                <div
                  class="post-thumbnail"
                  style="background: url({post.featured_image}) center center no-repeat; background-size: cover;"
                ></div>
              </a>
              <div class="card-body bg-white px-4">
                <div class="py-2 text-sm">
                  <i class="fa fa-calendar-alt"></i>
                  {post.publication_date}
                </div>
                <a class="card-title" href={`/post/${post.slug}`}>
                  <h5 class="fw-bold">{post.title}</h5>
                </a>
                <p class="card-text text-muted py-3">
                  {post.post_excerpt}
                </p>
              </div>
            </div>
          </div>
        {/each}
      </div>
    {/if}
  </div>
</div>

<div class="achievement-section py-5 bg-primary">
  <div class="container">
    <h1 class="display-6 text-center text-white my-5" data-aos="fade-down">
      <i class="fa fa-trophy"></i>
      {$_("blog.achievements.heading")}
    </h1>
    {#if achievements.length === 0}
      <NoDataAvailable></NoDataAvailable>
    {:else}
      <div class="achievement-grid row my-5 py-5">
        {#each achievements as achievement, index}
          <div
            class="achievement-item col-md-4 mb-4"
            data-aos="zoom-in"
            data-aos-delay={index * 150}
          >
            <div class="card h-100 bg-white border-0 shadow-sm">
              <a
                href="/achievement/{achievement.id}"
                class="card-img-top position-relative"
                style="height: 300px; position: relative;"
              >
                {#if achievement.photos && achievement.photos.length > 0}
                  <div
                    class="h-100 d-flex"
                    style="background: url({achievement.photos[0]
                      .image}) center center; background-size: cover;"
                  >
                    {#if achievement.photos.length > 1}
                      {#each achievement.photos.slice(1, 3) as photo}
                        <div
                          class="h-100"
                          style="background: url({photo.image}) center center; background-size: cover; width: {100 /
                            achievement.photos.length}%"
                        ></div>
                      {/each}
                    {/if}
                  </div>
                {:else}
                  <div
                    class="h-100"
                    style="background: url(/media/no-thumbnail.png) center center; background-size: cover;"
                  ></div>
                {/if}
                <div
                  class="achievement-title position-absolute bottom-0 p-3 w-100 text-white"
                  style="background: rgba(0,0,0,.55);"
                >
                  <div class="small">
                    <i class="far fa-calendar-alt"></i>
                    {achievement.activity_date}
                  </div>
                  <h6>{achievement.activity_name}</h6>
                </div>
              </a>
              <div class="card-body">
                <ul class="list-group list-group-flush small">
                  <li class="list-group-item">
                    <i class="fas fa-globe" style="width: 25px;"></i>
                    {achievement.scope_display}
                  </li>
                  <li class="list-group-item">
                    <i class="fas fa-trophy" style="width: 25px;"></i>
                    {achievement.award}
                  </li>
                  <li class="list-group-item">
                    <i class="fas fa-building" style="width: 25px;"></i>
                    {achievement.organizer_name}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        {/each}
      </div>
    {/if}
  </div>
</div>

<!-- Testimonials Section -->
<div class="testimonials-section py-5">
  <div class="testimonials-container container my-3">
    <h2
      class="display-5 fw-bold mb-4 text-primary text-center"
      data-aos="fade-up"
    >
      {$_("blog.testimonials.heading")}
    </h2>
    <div class="row gy-4 my-5">
      {#if testimonials.length === 0}
        <NoDataAvailable></NoDataAvailable>
      {:else}
        {#each testimonials as testimonial, index}
          <div
            class="col-md-6 col-lg-4 d-flex"
            data-aos="fade-up"
            data-aos-delay={index * 150}
          >
            <div
              class="testimonial-card p-4 bg-white rounded shadow-sm d-flex flex-column w-100"
            >
              <div class="testimonial-quote-icon mb-2">
                <i class="fas fa-quote-left"></i>
              </div>
              <div class="testimonial-content flex-grow-1 mb-3">
                <p class="text-muted testimonial-text">{testimonial.content}</p>
              </div>
              <div
                class="testimonial-author d-flex align-items-center mt-auto pt-3 border-top"
              >
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  class="rounded-circle me-3"
                  width="50"
                  height="50"
                  style="object-fit: cover;"
                />
                <div>
                  <h6 class="mb-0 fw-semibold">{testimonial.name}</h6>
                  <small class="text-muted"
                    >{testimonial.position} {testimonial.company}</small
                  >
                </div>
              </div>
            </div>
          </div>
        {/each}
      {/if}
    </div>
  </div>
</div>

<style>
  .testimonial-card {
    transition: transform 0.3s ease-in-out;
    border-left: 4px solid #007bff;
    overflow: hidden;
    word-break: break-word;
  }

  .testimonial-card:hover {
    transform: translateY(-10px);
  }

  .testimonial-quote-icon {
    font-size: 1.5rem;
    color: #007bff;
    opacity: 0.3;
  }

  .testimonial-text {
    display: -webkit-box;
    -webkit-line-clamp: 5;
    line-clamp: 5;
    -webkit-box-orient: vertical;
    overflow: hidden;
    line-height: 1.6;
    font-size: 0.95rem;
    word-break: break-word;
    overflow-wrap: break-word;
  }

  .testimonial-author img {
    border: 2px solid #007bff;
  }

  .counter-number {
    font-size: 2rem;
    color: rgba(var(--bs-primary-rgb));
  }

  .text-sm {
    font-size: 13px;
  }

  .new-student-section {
    background: #ffffff;
  }

  .new-student-section a:hover {
    transform: scale(1.25);
    transition: all 0.5s ease-in-out;
  }

  .features-section {
    clip-path: url(#path-3);
  }

  .feature-card:hover {
    transform: translateY(-7px);
    transition: all 0.5s ease-in-out;
  }

  .icon-container {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 90px;
    height: 90px;
    background-color: rgba(0, 123, 255, 0.1);
    border-radius: 50%;
    margin: 0 auto;
    font-size: 25px;
  }

  .post-thumbnail {
    position: relative;
    height: 215px;
  }

  @media only screen and (max-width: 768px) {
    .features-section {
      clip-path: none;
    }
    .achievement-section {
      padding-top: 37px !important;
      padding-bottom: 0px !important;
      .display-6 {
        margin: 0px !important;
      }
    }
    .achievement-grid {
      margin-top: 0px !important;
    }
    .testimonials-section {
      padding-top: 30px !important;
      padding-bottom: 0px !important;
    }
    .testimonials-container {
      margin-top: 7px !important;
    }
  }
</style>
