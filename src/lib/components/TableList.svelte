<script lang="ts">
	import { Button, Col, Icon, Row } from "sveltestrap";
	import { fade } from "svelte/transition";
	import { sineOut } from "svelte/easing";
	import { flip } from "svelte/animate";
	import type { Professor } from "$model/professor/professor";
	import type { SchoolClass } from "$model/school-class/school-class";
	import type { Subject } from "$model/subject/subject";
	import { createEventDispatcher } from "svelte";
	import type { FieldInfo } from "$model/model-generics";
	import { editingId } from "$lib/stores/global_store";

	const eventDispatcher = createEventDispatcher<{
		delete: { value: AcceptedTypes };
		editStart: { value: AcceptedTypes };
	}>();

	type AcceptedTypes = Professor | SchoolClass | Subject;
	export let items: AcceptedTypes[] = [];

	// let editingId: string | null = null;

	export let fieldsInfo: FieldInfo[] = [];

	let sortByField: string | null = null;
	let sortAsc: boolean = true;

	function editItem(item: AcceptedTypes) {
		editingId.set(item.id);
		eventDispatcher("editStart", { value: item });
	}

	function removeItem(item: AcceptedTypes): void {
		items = items.filter((i) => i.id != item.id);
		eventDispatcher("delete", { value: item });
	}

	function createNew() {
		editingId.set("");
	}

	function backgroundForIndex(index: number) {
		return index % 2 ? "bg-body-tertiary" : "bg-body-secondary";
	}

	function sortBy(fieldName: string) {
		if (fieldName == sortByField) sortAsc = !sortAsc;
		else {
			sortByField = fieldName;
			sortAsc = true;
		}

		items.sort((a: any, b: any) => {
			// @ts-ignore
			let aField = a[fieldName].value;
			// @ts-ignore
			let bField = b[fieldName].value;

			if (aField < bField) return sortAsc ? -1 : 1;
			else if (aField > bField) return sortAsc ? 1 : -1;
			else return 0;
		});
		items = items;
	}
</script>

<div class="px-3 py-2">
	<Row class="fw-bold mb-2 text-body h5">
		{#each fieldsInfo as headerElement}
			<Col sm={{ size: headerElement.columns }}>
				<button
					class=""
					on:click={() => sortBy(headerElement.fieldName)}
				>
					<span class="text-hover-light">
						{#if sortByField == headerElement.fieldName}
							{headerElement.label}
							{#if sortAsc}
								<Icon name="caret-down-fill" />
							{:else}
								<Icon name="caret-up-fill" />
							{/if}
						{:else}
							{headerElement.label}
						{/if}
					</span>
				</button>
			</Col>
		{/each}
		<Col class="text-end">Actions</Col>
	</Row>

	{#each items as item, index (item.id)}
		<div
			class="px-2 mb-2 rounded shadow-sm {backgroundForIndex(index)}"
			animate:flip={{ duration: 400, easing: sineOut }}
		>
			{#if $editingId != item.id}
				<Row class="align-items-center">
					{#each fieldsInfo as fieldInfo}
						<Col sm={{ size: fieldInfo.columns }}>
							{item[fieldInfo.fieldName].value}
						</Col>
					{/each}

					<Col>
						<Row noGutters>
							<Col class="me-2">
								<Button
									color="primary"
									class="w-100"
									on:click={() => editItem(item)}
								>
									<Icon name="pencil-square" /> Edit
								</Button>
							</Col>
							<Col>
								<Button
									color="danger"
									class="w-100"
									on:click={() => removeItem(item)}
								>
									<Icon name="trash-fill" /> Delete
								</Button>
							</Col>
						</Row>
					</Col>
				</Row>
			{:else}
				<slot name="edit" {item} {index} />
			{/if}
		</div>
	{:else}
		<div class="px-3 py-2" in:fade>
			<slot name="empty">
				<div class="col-12 text-center">No items found</div>
			</slot>
		</div>
	{/each}
	{#if $editingId === ""}
		<div in:fade>
			<slot name="create" />
		</div>
	{:else}
		<div class="px-2" in:fade>
			<Row>
				<div class="col" />
				<div class="col-3">
					<Button
						color="primary"
						class="w-100"
						on:click={() => createNew()}
						><Icon name="plus" />New professor</Button
					>
				</div>
			</Row>
		</div>
	{/if}
</div>

<style>
	button {
		background: none;
		border: none;
		color: inherit;
		padding: 0;
		font: inherit;
		cursor: pointer;
		outline: inherit;
	}

	.text-hover-underline:hover {
		text-decoration: underline;
	}

	.text-hover-bold:hover {
		font-weight: bold;
	}

	.text-hover-light:hover {
		color: #ffffff;
	}
</style>
