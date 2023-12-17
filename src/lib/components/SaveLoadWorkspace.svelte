<script lang="ts">
    import { Button } from 'sveltestrap';
    import DownloadComponent from './DownloadComponent.svelte';
    import UploadComponent from './UploadComponent.svelte';
    import ModalWithCloseOnly from './ModalWithCloseOnly.svelte';
  
    let showModal: boolean = false

  </script>
  

<div style="display: flex; align-items: center; justify-content: center; height: 100%;"></div>
<Button class="navbarButton" on:click={() => {showModal = true}}>Save-Load workspace</Button>

<ModalWithCloseOnly bind:showModal on:confirm={() => { showModal = false }}>
    <h3 slot="header">Save-Load workspace data</h3>
    <div slot="body">
        <DownloadComponent/>
        <UploadComponent/>
    </div>
</ModalWithCloseOnly> 