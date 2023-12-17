<script lang="ts">
	import { Button } from "sveltestrap";
	import DownloadComponent from "./DownloadComponent.svelte";
	import UploadComponent from "./UploadComponent.svelte";
	import ModalWithCloseOnly from "./ModalWithCloseOnly.svelte";

	let showModal: boolean = false;
</script>

<Button
	class="btn"
	color="light"
	outline
	on:click={() => {
		showModal = true;
	}}>Save-Load workspace</Button
>

<ModalWithCloseOnly
	bind:showModal
	on:confirm={() => {
		showModal = false;
	}}
>
	<h3 slot="header">Save-Load workspace data</h3>
	<div slot="body">
		<DownloadComponent />
		<UploadComponent />
	</div>
</ModalWithCloseOnly>
