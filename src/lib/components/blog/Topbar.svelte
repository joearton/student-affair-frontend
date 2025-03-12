<script lang="ts">
    import { user } from "$lib/stores/user";
    import { _ } from 'svelte-i18n';

    let { preference } = $props();

    const email = preference.contact_email;
    const phone = preference.contact_phone;
    const social_link = preference.social_medias;
</script>
    

<div class='container px-4'>
    <div class='d-flex justify-content-between align-items-center'>
        <div class='d-flex social-icons'>
            <a href={social_link?.facebook_url} target='_blank' class='px-1' aria-label='Facebook URl'>
                <i class='fab fa-facebook-f'></i>
            </a>
            <a href={social_link?.twitter_url} target='_blank' class='px-1' aria-label='Twitter URl'>
                <i class='fab fa-twitter'></i>
            </a>
            <a href={social_link?.instagram_url} target='_blank' class='px-1' aria-label='Instagram URl'>
                <i class='fab fa-instagram'></i> 
            </a>
            <a href={social_link?.linkedin_url} target='_blank' class='px-1' aria-label='LinkedIn URl'>
                <i class='fab fa-linkedin-in'></i>
            </a>
            <a href={social_link?.youtube_url} target='_blank' class='px-1' aria-label='Youtube URl'>
                <i class='fab fa-youtube'></i>
            </a>
        </div>
    
        <div class='d-flex contact-info'>
            <a href="mailto:{email}" class='me-1' aria-label="Email">
                <i class='fas fa-envelope'></i>
            </a>
            <a href="tel:{phone}" class='me-1' aria-label="Phone">
                <i class='fas fa-phone-alt'></i>
            </a>
            <a href={$user.username ? "/auth/validate" : "/auth/signin"} rel="prefetch">
                {#if $user.username}
                    <i class='fa fa-user'></i> {$user.fullname}!
                {:else}
                    <i class='fa fa-user'></i> {$_('akun')}
                {/if}
            </a>
        </div>    
    </div>
</div>  
