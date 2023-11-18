<script lang="ts">
	import { Button, Col, Container, Form, Icon, Row } from "sveltestrap";
	import { fade, fly, slide } from "svelte/transition";
	import ProfessorFormRow from "./ProfessorFormRow.svelte";
	import { circIn, sineIn, sineOut } from "svelte/easing";
	import { flip } from "svelte/animate";
	import { get } from "svelte/store";
	import { allProfessors } from "$lib/stores/global_store";
	import { Professor } from "$model/professor/professor";

	let professors = get(allProfessors);
	professors = [
		...professors,
		Professor.of(null, "John", "Doe", "johndoe@gmail.com", "+391234567890"),
		Professor.of(null, "Jane", "Doe", "janedoe@gmail.com", "+391334567890"),
		Professor.of(null, "Will", "Spt", "willspt@gmail.com", "+391234367890"),
	];

	let options = { duration: 200, easing: circIn };

	let editingIndex: number | null = null;

	let sortByField: string | null = null;
	let sortAsc: boolean = true;

	function editProfessor(index: number) {
		editingIndex = index;
		professors = professors;
	}

	const saveProfessor = (event: { detail: any }, index: number) => {
		professors[index] = event.detail.professor;
		editingIndex = null;
		allProfessors.set(professors);
	};

	function addProfessor() {
		editingIndex = professors.length;
	}

	const createProfessor = (event: { detail: any }) => {
		professors = [...professors, event.detail.professor];
		editingIndex = null;
		allProfessors.set(professors);
	};

	function deleteProfessor(index: number) {
		professors.splice(index, 1);
		professors = professors;
		allProfessors.set(professors);
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

		professors.sort((a: Professor, b: Professor) => {
			// @ts-ignore
			let aField = a[fieldName].value;
			// @ts-ignore
			let bField = b[fieldName].value;

			if (aField < bField) return sortAsc ? -1 : 1;
			else if (aField > bField) return sortAsc ? 1 : -1;
			else return 0;
		});
		professors = professors;
	}

	let tableHeaderElements = [
		{ name: "name", label: "Name", size: 2 },
		{ name: "surname", label: "Surname", size: 2 },
		{ name: "email", label: "Email", size: 3 },
		{ name: "cellPhone", label: "Cellphone", size: 2 },
	];
</script>

<div class="px-3 py-2">
	<Row class="fw-bold mb-2">
		{#each tableHeaderElements as headerElement}
			<Col sm={{ size: headerElement.size }}>
				<Button
					color="link"
					class="text-decoration-none text-reset text-secondary"
					on:click={() => sortBy(headerElement.name)}
				>
					{headerElement.label}

					{#if sortByField == headerElement.name}
						{#if sortAsc}
							<Icon name="caret-down-fill" />
						{:else}
							<Icon name="caret-up-fill" />
						{/if}
					{/if}
				</Button>
			</Col>
		{/each}
		<Col class="text-end">Actions</Col>
	</Row>
	{#each professors as professor, index (professor.id)}
		<div
			class="px-2 rounded shadow-sm mb-2 {backgroundForIndex(index)}"
			animate:flip={{ duration: 400, easing: sineOut }}
		>
			<Row class="align-items-center">
				{#if editingIndex != professors.indexOf(professor)}
					<Col sm={{ size: 2 }}>{professor.name.value}</Col>
					<Col sm={{ size: 2 }}>{professor.surname.value}</Col>
					<Col sm={{ size: 3 }}>{professor.email.value}</Col>
					<Col sm={{ size: 2 }}>{professor.cellPhone.value}</Col>
					<Col class="text-end">
						<Button
							color="primary"
							on:click={() =>
								editProfessor(professors.indexOf(professor))}
						>
							<Icon name="pencil-square" /> Edit
						</Button>
						<Button
							color="danger"
							on:click={() => (deleteProfessor(index))}
						>
							<Icon name="trash-fill" /> Delete
						</Button>
					</Col>
				{:else}
					<ProfessorFormRow
						{professor}
						on:cancel={() => {
							editingIndex = null;
						}}
						on:save={(e) => {
							saveProfessor(e, professors.indexOf(professor));
						}}
					/>
				{/if}
			</Row>
		</div>
	{:else}
		<div class="px-3 py-2" in:fade>
			<Row>
				<div class="col-12 text-center">No professors found</div>
			</Row>
		</div>
	{/each}
	{#if editingIndex == professors.length}
		<div class="row" in:fade>
			<ProfessorFormRow
				on:cancel={() => {
					editingIndex = null;
				}}
				on:save={createProfessor}
			/>
		</div>
	{:else}
		<div class="px-3" in:fade>
			<Row>
				<div class="col-12 text-end p-2">
					<Button color="primary" on:click={() => addProfessor()}
						><Icon name="plus" />New professor</Button
					>
				</div>
			</Row>
		</div>
	{/if}
</div>
