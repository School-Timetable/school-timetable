<script lang="ts">
	import { Button, Col, Container, Form, Icon, Row } from "sveltestrap";
	import { fade, fly, slide } from "svelte/transition";
	import ProfessorFormRow from "./ProfessorFormRow.svelte";
	import { circIn } from "svelte/easing";
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

	type ProfessorFormData = {
		name: { value: string };
		surname: { value: string };
		email: { value: string };
		cellPhone: { value: string };
	};

	let options = { duration: 200, easing: circIn };

	let editingProfessor: ProfessorFormData | null = null;
	let editingIndex: number | null = null;

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
		editingProfessor = {
			name: { value: "" },
			surname: { value: "" },
			email: { value: "" },
			cellPhone: { value: "" },
		};
		editingIndex = professors.length;
	}

	const createProfessor = (event: { detail: any }) => {
		professors = [...professors, event.detail.professor];
		editingIndex = null;
		allProfessors.set(professors);
	};

	const backgroundForIndex = (index: number) => {
		return index % 2 ? "bg-body-tertiary" : "bg-body-secondary";
	};
</script>

<div class="px-3 py-2">
	<Row class="fw-bold mb-2">
		<Col sm={{ size: 2 }}>
			<Icon name="caret-{true ? 'down' : 'up'}-fill" /> Name
		</Col>
		<Col sm={{ size: 2 }}>
			<Icon name="caret-{true ? 'down' : 'up'}-fill" /> Surname
		</Col>
		<Col sm={{ size: 3 }}>
			<Icon name="caret-{true ? 'down' : 'up'}-fill" /> Mail
		</Col>
		<Col sm={{ size: 2 }}>
			<Icon name="caret-{true ? 'down' : 'up'}-fill" /> Cellphone
		</Col>
		<Col class="text-end">Actions</Col>
	</Row>
	{#each professors as professor, index (professor.id)}
		<div
			class="px-2 rounded shadow-sm mb-2 {backgroundForIndex(index)}"
			animate:flip
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
							on:click={() => {
								professors.splice(
									professors.indexOf(professor),
									1
								);
								professors = professors;
							}}
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
