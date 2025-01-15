<script lang="ts">
    let { preference } = $props();
</script>


<div class="container">
    <a class="navbar-brand d-flex align-items-center" href="/">
        <img src={preference.site_logo} alt="Brand Logo" class="me-2" style="height: 45px;" />
    </a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
            {#each preference.navbars as navbar}
                {#if navbar.children.length}
                    <li class='nav-item dropdown'>
                        <a class='nav-link dropdown-toggle' href={navbar.link} id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <i class={`fa ${navbar.icon}`}></i> {navbar.title}
                        </a>
                        <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                            {#each navbar.children as child}
                                <li><a class="dropdown-item" href={child.link}>{child.title}</a></li>
                            {/each}
                        </ul>
                    </li>
                {:else if navbar.parent == null}
                    <li class='nav-item'>
                        <a class='nav-link' href={navbar.link}>
                            <i class={`fa ${navbar.icon}`}></i> {navbar.title}
                        </a>
                    </li>
                {/if}
            {/each}
        </ul>
    </div>
</div>