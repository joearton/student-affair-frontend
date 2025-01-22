<script lang="ts">
    import '../app.scss';

    import type { LayoutData } from './$types';
    import type { Snippet } from 'svelte';    

    import { page } from '$app/state';
    import Message from '$lib/components/Message.svelte';

    let { data, children }: { data: LayoutData, children: Snippet } = $props();
    let section_title = data.preference.page_setting?.page_title || page.data.title || "";
    if (section_title.length > 0) {
        section_title = section_title + " | ";
    }
    let page_title = section_title + data.preference.site_title;
</script>


<svelte:head>
    <title>{page_title}</title>
</svelte:head>


{@render children()}

<Message></Message>