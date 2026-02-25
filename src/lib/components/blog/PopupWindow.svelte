<script lang="ts">
    let { site_url, popup_image, popup_info } = $props();

    if (popup_image && !popup_image.startsWith('https')) {
        popup_image = site_url + popup_image;
    }

    function close() {
        popup_image = '';
    }
</script>


{#if popup_image}
    <div class="modal show d-block" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Popup</h5>
                    <button type="button" class="btn-close" aria-label="Close" onclick={close}></button>
                </div>
                <div class="modal-body">
                    <img src={popup_image} alt="popup" class="img-fluid" />
                    <p>{popup_info}</p>
                </div>
            </div>
        </div>
    </div>
{/if}

<style>
    .modal.show {
        display: block;
        background: rgba(0,0,0,0.6);
    }
</style>
