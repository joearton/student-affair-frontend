<script lang="ts">
    import { page } from "$app/state";
    import { slugify } from "$lib/utils";

    let {user, menu_items } = $props();

</script>

<!-- Sidebar -->
<div class="bg-white sidebar d-none d-md-block shadow-sm">
    <h5 class="sidebar-header py-4 px-4 mb-0">Navigation</h5>
    <ul class="nav flex-column">
        {#each Object.keys(menu_items) as group}
            {#if user.groups.includes(group)}
                {#each menu_items[group] as item}
                    <li class="nav-item">
                        <a id={slugify(item.text)} class:active={page.url.pathname === item.href}
                           href={item.href} class="nav-link py-3 px-4 border-bottom"> 
                           <i class={`fas ${item.icon}`}></i> {item.text} <span></span>
                        </a>
                    </li>
                {/each}
            {/if}
        {/each}
    </ul>
</div>


<style>
    .fas {
        min-width: 25px;
    }

    .sidebar {
        width: 100%;
        border-radius: 9px;
        .nav-link {
            color: #333;
            font-size: 1rem;
            transition: all 0.3s ease-in-out;
            &:hover {
                background-color: #f1f1f1;
            }
        }
        .sidebar-header {
            border-bottom: 3px solid #f1f1f1;
        }
    }
</style>
