<script lang="ts">
	import { Button, Col, Icon, Row, Tooltip } from "sveltestrap";
	import { fade } from "svelte/transition";
	import { cubicOut, sineOut } from "svelte/easing";
	import { flip } from "svelte/animate";
	import type { Professor } from "$model/professor/professor";
	import type { SchoolClass } from "$model/school-class/school-class";
	import type { Subject } from "$model/subject/subject";
	import { createEventDispatcher } from "svelte";
	import type { FieldInfo } from "$model/model-generics";
	import { editingId } from "$lib/stores/global_store";
	import FormSearch from "./FormSearch.svelte";
    import MyModal from "./MyModal.svelte";

	const eventDispatcher = createEventDispatcher<{
		delete: { value: AcceptedTypes };
		editStart: { value: AcceptedTypes };
		deleteAll: void;
		importFromCsv: void;
	}>();

	type AcceptedTypes = Professor | SchoolClass | Subject;
	export let items: AcceptedTypes[] = [];
	let filteredItems: AcceptedTypes[] = items;
	let viewItems: AcceptedTypes[] = filteredItems;
	let removingItem: AcceptedTypes | null = null;
	let showDeleteModal: boolean = false;

	export let itemsType: string = "items";

	$: {
		if (sortByField != null) sortItems(filteredItems);
		viewItems = filteredItems;
	}

	export let fieldsInfo: FieldInfo[] = [];

	let sortByField: string | null = null;
	let sortAsc: boolean = true;
	let item: AcceptedTypes | null = null;
	let cloningItem: boolean = false;

	function editItem(item: AcceptedTypes) {
		editingId.set(item.id);
		eventDispatcher("editStart", { value: item });
	}

	function cloneItem(_item: AcceptedTypes): void {
		item = _item;
		cloningItem = true;
		editingId.set("");
	}

	async function removeItem() {
		
		items = items.filter((i) => i.id != removingItem!.id);
		eventDispatcher("delete", { value: removingItem! });

		removingItem = null;
	}

	function createNew() {
		cloningItem = false;
		item = null;
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
		sortItems(viewItems);
		viewItems = viewItems;
	}

	function sortItems(list: AcceptedTypes[]) {
		if (sortByField == null) {
			console.error("sortByField is null");
			return;
		}

		list.sort((a: AcceptedTypes, b: AcceptedTypes) => {
			let aField,
				bField = undefined;

			switch (sortByField) {
				case "professor":
				case "schoolClass":
					// @ts-ignore
					aField = a[sortByField]?.toString().toLowerCase();
					// @ts-ignore
					bField = b[sortByField]?.toString().toLowerCase();
					break;
				default:
					// @ts-ignore
					aField = a[sortByField]?.value;
					// @ts-ignore
					bField = b[sortByField]?.value;
					if (typeof aField === "string")
						aField = aField.toLowerCase() || "";
					if (typeof bField === "string")
						bField = bField.toLowerCase() || "";

					break;
			}

			if (aField == null) return sortAsc ? -1 : 1;
			else if (bField == null) return sortAsc ? 1 : -1;
			else if (aField < bField) return sortAsc ? -1 : 1;
			else if (aField > bField) return sortAsc ? 1 : -1;
			else return 0;
		});
	}

	function onSearch(searchResults: AcceptedTypes[]) {
		// sorting order doesn't change when the filtered items are a subset of the original list
		if (
			sortByField != null &&
			searchResults.length > filteredItems.length
		) {
			sortItems(searchResults);
		}
		filteredItems = searchResults;
	}

	function removeAllItems() {
		eventDispatcher("deleteAll");
	}

	function importFromCsv(){
		eventDispatcher("importFromCsv");
	}
</script>

<MyModal bind:showModal={showDeleteModal} on:confirm={removeItem}>
	<h5 slot="header">Delete {itemsType}</h5>
	<div slot="body">
		Are you sure you want to delete this {itemsType}?
		All associated subjects will be deleted too!
	</div>
</MyModal>
<div class="px-3 pb-3">
	<div class="pb-3 mx-auto" style="max-width: 500px;">
		<Row>
			<Col sm={{ size: 6 }}>
				<FormSearch
					{items}
					on:search={(e) => {
						onSearch(e.detail.searchResults);
					}}
				/>
			</Col>

			<Col sm={{ size: 6 }}>
				<Button color="danger" on:click={() => removeAllItems()}>
					<Icon name="trash-fill" />Delete all
				</Button>
				<Button color="primary" on:click={() => importFromCsv()}>
					<Icon name="file-earmark-arrow-up" />Import
				</Button>
			</Col>
		</Row>
	</div>

	<Row noGutters class="fw-bold mb-2 text-body h5">
		{#each fieldsInfo as headerElement}
			<Col sm={{ size: headerElement.columns }}>
				<button
					class=""
					on:click={() => sortBy(headerElement.fieldName)}
				>
					<span class="text-hover-highlight">
						{#if sortByField == headerElement.fieldName}
							{headerElement.label}
							{#if sortAsc}
								<Icon name="sort-down" />
							{:else}
								<Icon name="sort-up" />
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

	{#each viewItems as item, index (item.id)}
		<div
			class="px-2 mb-2 rounded shadow-sm {backgroundForIndex(index)}"
			animate:flip={{ duration: 400, easing: cubicOut }}
		>
			{#if $editingId != item.id}
				<Row noGutters class="align-items-center">
					{#each fieldsInfo as fieldInfo}
						<Col
							sm={{ size: fieldInfo.columns }}
							class="text-truncate pe-1"
							aria-label={fieldInfo.label}
							title={item[fieldInfo.fieldName]?.toString()}
						>
							{item[fieldInfo.fieldName]?.toString() || "-"}
						</Col>
					{/each}

					<Col>
						<Row class="g-1">
							<Col>
								<Button
									color="primary"
									id="btn-edit-{item.id}"
									class="w-100 px-1 my-1 text-nowrap"
									aria-label="Edit"
									on:click={() => editItem(item)}
								>
									<Icon name="pencil-square" />
								</Button>
								<Tooltip
									target="btn-edit-{item.id}"
									placement="top">Edit</Tooltip
								>
							</Col>
							<Col>
								<Button
									id="btn-clone-{item.id}"
									color="secondary"
									class="w-100 px-1 my-1 text-nowrap"
									aria-label="Clone"
									on:click={() => cloneItem(item)}
								>
									<Icon name="files" />
								</Button>
								<Tooltip
									target="btn-clone-{item.id}"
									placement="top">Clone</Tooltip
								>
							</Col>
							<Col>
								<Button
									id="btn-delete-{item.id}"
									color="danger"
									class="w-100 px-1 my-1 text-nowrap"
									aria-label="Delete"
									on:click={() => {
										removingItem = item;
										showDeleteModal = true;	
									}}
								>
									<Icon name="trash-fill" />
								</Button>
								<Tooltip
									target="btn-delete-{item.id}"
									placement="top">Delete</Tooltip
								>
							</Col>
						</Row>
					</Col>
				</Row>
			{:else}
				<div in:fade>
					<slot name="edit" {item} />
				</div>
			{/if}
		</div>
	{:else}
		<div class="px-3 py-2" in:fade>
			<slot name="empty">
				<div class="col-12 text-center h3 text-body">
					No {itemsType} found
				</div>
			</slot>
		</div>
	{/each}
	{#if $editingId === ""}
		<div
			class="px-2 rounded shadow {backgroundForIndex(viewItems.length)}"
			in:fade
		>
			<slot name="create" {item} cloning={cloningItem} />
		</div>
	{:else}
		<div class="px-2" in:fade>
			<Row noGutters>
				<div class="col text-muted">{viewItems.length} items</div>
				<div class="col-2">
					<Button
						color="primary"
						class="w-100"
						on:click={() => createNew()}
						><Icon name="plus" />New {itemsType}</Button
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

	.text-hover-highlight:hover {
		color: var(--bs-primary);
	}
</style>
