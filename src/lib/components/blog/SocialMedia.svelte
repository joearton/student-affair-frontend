<script>
    import { page } from '$app/state';
    let url = page.url;
    let text = "Check this out!"; 

    const { centered } = $props();

</script>


<style>
    .social-icon {
        font-size: 2rem;
    }
    .facebook-icon {
        color: #3b5998;
    }
    .facebook-icon:hover {
        color: #2d4373;
    }
    .twitter-icon {
        color: #1da1f2;
    }
    .twitter-icon:hover {
        color: #0d95e8;
    }
    .telegram-icon {
        color: #0088cc;
    }
    .telegram-icon:hover {
        color: #007ab8;
    }
    .whatsapp-icon {
        color: #25d366;
    }
    .whatsapp-icon:hover {
        color: #1ebe57;
    }
    .email-icon {
        color: #ea4335;
    }
    .email-icon:hover {
        color: #d93025;
    }
</style>


<div id="social-share" class="d-flex gap-3 {centered ? 'justify-content-center' : ''}">
    <a href={`https://www.facebook.com/sharer/sharer.php?u=${url}`} target="_blank" rel="noopener noreferrer" aria-label="Share on Facebook" class="text-decoration-none text-reset">
        <i class="fab fa-facebook social-icon facebook-icon"></i>
    </a>
    <a href={`https://twitter.com/intent/tweet?url=${url}&text=${text}`} target="_blank" rel="noopener noreferrer" aria-label="Share on Twitter" class="text-decoration-none text-reset">
        <i class="fab fa-twitter social-icon twitter-icon"></i>
    </a>
    <a href={`https://t.me/share/url?url=${url}&text=${text}`} target="_blank" rel="noopener noreferrer" aria-label="Share on Telegram" class="text-decoration-none text-reset">
        <i class="fab fa-telegram social-icon telegram-icon"></i>
    </a>
    <a href={`https://api.whatsapp.com/send?text=${text} ${url}`} target="_blank" rel="noopener noreferrer" aria-label="Share on WhatsApp" class="text-decoration-none text-reset">
        <i class="fab fa-whatsapp social-icon whatsapp-icon"></i>
    </a>
    <a href={`mailto:?subject=${text}&body=${url}`} target="_blank" rel="noopener noreferrer" aria-label="Share via Email" class="text-decoration-none text-reset">
        <i class="fas fa-envelope social-icon email-icon"></i>
    </a>
</div>    
