<script lang="ts">
    import '../app.scss';

    import type { LayoutData } from './$types';
    import type { Snippet } from 'svelte';

    import { page } from '$app/state';
    import Message from '$lib/components/Message.svelte';
    import Translation from '$lib/components/Translation.svelte';

    let { data, children }: { data: LayoutData, children: Snippet } = $props();

    let section_desc = page.data.description || "";

</script>


<svelte:head>
    <title>{page.data.title ? `${page.data.title} | ${data.preference.site_title}` : data.preference.site_title}</title>
    <meta name="description" content="{page.data.description || ''}" />
</svelte:head>


{@render children()}

<Message></Message>
<Translation></Translation>