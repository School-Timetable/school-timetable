<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import { Button } from "sveltestrap";

	export let showCsvModal: boolean;

	let dialog: HTMLDialogElement;
	let fileInput: HTMLInputElement;
	let files: FileList | null = null;

	$: if (dialog && showCsvModal) dialog.showModal();

    const eventDispatcher = createEventDispatcher<{
        confirmCsvSubmission: File;
    }>();
	
	function close() {
		showCsvModal = false;
		files = null;
		if (fileInput) fileInput.value = '';
	}

    function confirm() {
		if (files == null) return;
		const file = files.item(0);
		if (file == null) return;
		eventDispatcher("confirmCsvSubmission", file)
		dialog.close();
    }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
	bind:this={dialog}
	on:close={() => (close())}
	on:click|self={() => {dialog.close();close();}}
>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div on:click|stopPropagation>
		<slot name="header" />
		<hr />
		<slot name="body" />
		<input type="file" accept=".csv" bind:this={fileInput} bind:files={files}/>
		<br />
		<Button color="danger" on:click={() => dialog.close() } style="margin-top: 10px;">Cancel</Button>
		{#if files != null}
        	<Button color="primary" on:click={confirm} style="margin-top: 10px;">Confirm</Button>
		{/if}
	</div>
</dialog>

<style>
	dialog {
		max-width: 32em;
		border-radius: 0.2em;
		border: none;
		padding: 0;
	}
	dialog::backdrop {
		background: rgba(0, 0, 0, 0.3);
	}
	dialog > div {
		padding: 1em;
	}
	dialog[open] {
		animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
	}
	@keyframes zoom {
		from {
			transform: scale(0.95);
		}
		to {
			transform: scale(1);
		}
	}
	dialog[open]::backdrop {
		animation: fade 0.2s ease-out;
	}
	@keyframes fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
</style>
