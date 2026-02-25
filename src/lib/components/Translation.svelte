<script lang="ts">
    import { locale, _ } from 'svelte-i18n';

    const languages = [
        { code: 'en', name: 'English', flag_url: '/lang/en.png' },
        { code: 'id', name: 'Bahasa Indonesia', flag_url: '/lang/id.png' },
    ];

    function setLocale(newLocale: string) {
        locale.set(newLocale);
    }

</script>

<div style="position: fixed; bottom: 1%; right: 0; z-index: 1075;">
    <div class="bg-primary p-1 shadow-sm">
        {#each languages as language}
            <button type="button" onclick={() => setLocale(language.code)} class="p-0 border-0 bg-transparent mx-1" aria-label="{language.name} flag">
                <img src={language.flag_url} alt={`${language.name} flag`} class="flag-icon" style="height: 13px;" />
            </button>
        {/each}
    </div>
</div>
