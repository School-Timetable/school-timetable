<script lang="ts">
	import type { SchoolClass } from "$model/school-class/school-class";
	import { Button, Col, Container, Form, Icon, Row } from "sveltestrap";
	import { slide } from "svelte/transition";
	import { linear } from "svelte/easing";
	import ClassFormRow from "$lib/components/ClassFormRow.svelte";
	import FormSearch from "$lib/components/FormSearch.svelte";
	import { get } from "svelte/store";
	import { allClassrooms } from "$lib/stores/global_store";

	let options = { duration: 200, easing: linear };

	let schoolClasses = get(allClassrooms);

	let filteredList = schoolClasses;

	let editingId: string | null = null;
	function editSchoolClass(id: string) {
		editingId = id;
	}

	function addSchoolClass() {
		editingId = "";
	}
	const createSchoolClass = (event: { detail: any }) => {
		const newClass = event.detail.schoolClass;
		if (classAlreadyExists(newClass, schoolClasses)) {
			alert("Class already exists");
			return;
		}
		schoolClasses = [...schoolClasses, newClass];
		allClassrooms.set(schoolClasses);
		editingId = null;
	};

	const saveSchoolClass = (event: { detail: any }) => {
		const newClass = event.detail.schoolClass;
		if (classAlreadyExists(newClass, schoolClasses)) {
			alert("Class already exists");
			return;
		}
		const indexInFullList = schoolClasses.findIndex(
			(sc) => sc.id === newClass.id
		);
		schoolClasses.splice(indexInFullList, 1, newClass);
		schoolClasses = schoolClasses;
		allClassrooms.set(schoolClasses);
		editingId = null;
	};

	function classAlreadyExists(
		schoolClass: SchoolClass,
		schoolClasses: SchoolClass[]
	): boolean {
		let exists = false;
		schoolClasses.forEach((sc) => {
			if (
				sc.year.value === schoolClass.year.value &&
				sc.section.value === schoolClass.section.value &&
				sc.track?.value === schoolClass.track?.value
			) {
				exists = true;
			}
		});

		return exists;
	}

	const manageSearchResults = (event: { detail: any }) => {
		filteredList = event.detail.searchResults;
	};

	function removeClass(tmpId: string) {
		const index = getIndexById(tmpId);
		console.log(index);
		schoolClasses.splice(index, 1);
		schoolClasses = schoolClasses;
		allClassrooms.set(schoolClasses);
	}

	function getIndexById(id: string): number {
		return schoolClasses.findIndex((sc) => sc.id === id);
	}
</script>

<Form>
	<Container>
		<Row>
			<Col sm="12" md={{ size: 6, offset: 3 }}>
				<FormSearch
					bind:items={schoolClasses}
					on:search={(event) => manageSearchResults(event)}
				/>
			</Col>
		</Row>
		<Row>
			<Col sm={{ size: 2 }}>Year</Col>
			<Col sm={{ size: 2 }}><strong>Section</strong></Col>
			<Col sm={{ size: 8 }}><strong>Track</strong></Col>
		</Row>
		{#each filteredList as schoolClass}
			<div class="row" transition:slide|local={{ ...options }}>
				{#if editingId !== schoolClass.id}
					<Col sm={{ size: 2 }}>{schoolClass.year.value}</Col>
					<Col sm={{ size: 2 }}>{schoolClass.section.value}</Col>
					<Col sm={{ size: 5 }}>{schoolClass.track?.value || "-"}</Col
					>
					<Col sm={{ size: 3 }}>
						<Button
							color="primary"
							on:click={() => editSchoolClass(schoolClass.id)}
						>
							<Icon name="pencil-square" /> Edit
						</Button>
						<Button
							color="danger"
							on:click={() => {
								removeClass(schoolClass.id);
							}}
						>
							<Icon name="trash-fill" /> Delete
						</Button>
					</Col>
				{:else}
					<div class="row" transition:slide|local={{ ...options }}>
						<ClassFormRow
							{schoolClass}
							on:cancel={() => (editingId = null)}
							on:save={(e) => {
								saveSchoolClass(e);
							}}
						/>
					</div>
				{/if}
			</div>
		{/each}
		{#if editingId === ""}
			<div class="row" transition:slide|local={{ ...options }}>
				<ClassFormRow
					on:cancel={() => {
						editingId = null;
					}}
					on:save={createSchoolClass}
				/>
			</div>
		{/if}
		<Row>
			<div class="col-12 text-center">
				<Button color="primary" on:click={() => addSchoolClass()}
					><Icon name="plus" />Add</Button
				>
			</div>
		</Row>
	</Container>
</Form>
