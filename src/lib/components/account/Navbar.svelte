<script lang="ts">
    import { page } from "$app/state";
    import { logout } from "$lib/auth";

    let { menu_items, user, preference } = $props();
</script>


<div class="container">
    <a class="navbar-brand" href="/account">
        <img src={preference.site_logo} alt="Brand Logo" style="height: 45px;" />
    </a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0 d-lg-none">
            {#each Object.keys(menu_items) as group}
                {#if user.groups.includes(group)}
                    {#each menu_items[group] as item}
                        <li class="nav-item">
                            <a class="nav-link" href={item.href} class:active={page.url.pathname === item.href}>
                                <i class={`fas ${item.icon}`}></i> {item.text}
                            </a>
                        </li>
                    {/each}
                {/if}
            {/each}
        </ul>
        <div class="d-flex ms-auto">
            <div class="dropdown">
            <button class="btn btn-transparent text-white dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                {user.fullname}
            </button>
            <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton">
                <li><a class="dropdown-item" href="/account/profile">Profile</a></li>
                <li><a class="dropdown-item" href="#logout" onclick={logout}>Logout</a></li>
            </ul>
            </div>
        </div>
    </div>
</div>
