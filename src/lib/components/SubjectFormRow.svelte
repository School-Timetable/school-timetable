<script lang="ts">
	import { Button, Icon, Input, Label } from "sveltestrap";
	import { createEventDispatcher } from "svelte";
	import { ZodError } from "zod";
	import type { SchoolClass } from "$model/school-class/school-class";
	import { Subject } from "$model/subject/subject";
	import type { Professor } from "$model/professor/professor";
	import Professors from "./Professors.svelte";

	const eventDispatcher = createEventDispatcher();

	export let subject: Subject | null = null;
	export let professors: Professors[] = [];
	export let schoolClasses: SchoolClass[] = [];

	type SubjectFormData = {
		_schoolClass?: SchoolClass;
		_professor?: Professor;
		_name: { value: string };
		_abbreviation: { value: string };
		_weight: { value: number };
		_hoursPerWeek: { value: number };
	};

	let editingSubject: SubjectFormData = {
		_schoolClass: subject?.schoolClass ?? undefined,
		_professor: subject?.professor ?? undefined,
		_name: { value: subject?.name.value ?? "" },
		_abbreviation: { value: subject?.abbreviation.value ?? "" },
		_weight: { value: subject?.weight.value ?? 1 },
		_hoursPerWeek: { value: subject?.hoursPerWeek.value ?? 0 },
	};

	function save() {
		try {
			let savedSubject = Subject.of(
				editingSubject._schoolClass!,
				editingSubject._professor!,
				editingSubject._name.value,
				editingSubject._abbreviation.value,
				editingSubject._weight.value,
				editingSubject._hoursPerWeek.value
			);

			eventDispatcher("save", { subject: savedSubject });
		} catch (e) {
			if (e instanceof ZodError)
				alert(e.issues.map((issue) => issue.message).join("\n"));
		}
	}

	function cancel(): void {
		eventDispatcher("cancel");
	}
</script>

<td>
	<Label for="schoolClass">Class</Label>
	<Input
		type="select"
		label="schoolClass"
		name="schoolClass"
		id="schoolClass"
		bind:value={editingSubject._schoolClass}
	>
		{#each schoolClasses as schoolClass}
			<option value={schoolClass}>{schoolClass}</option>
		{:else}
			<option value={null}>no professors</option>
		{/each}
	</Input>
</td>
<td>
	<Label for="professor">Professor</Label>
	<Input
		type="select"
		label="professor"
		name="professor"
		id="professor"
		bind:value={editingSubject._professor}
	>
		{#each professors as professor}
			<option value={professor}>{professor}</option>
		{:else}
			<option value={null}>no professors</option>
		{/each}
	</Input>
</td>
<td>
	<Label for="abbreviation">Abbreviation</Label>
	<Input
		type="text"
		label="abbreviation"
		name="abbreviation"
		id="abbreviation"
		placeholder="Abbreviation"
		bind:value={editingSubject._abbreviation.value}
	/>
</td>
<td>
	<Label for="name">Name</Label>
	<Input
		type="text"
		label="name"
		name="name"
		id="name"
		bind:value={editingSubject._name.value}
	/>
</td>
<td>
	<Label for="weight">Weight</Label>
	<Input
		type="number"
		label="weight"
		name="weight"
		id="weight"
		placeholder="Weight"
		bind:value={editingSubject._weight.value}
		min="1"
		max="10"
	/>
</td>
<td>
	<Label for="hoursPerWeek">Hours per week</Label>
	<Input
		type="number"
		label="hoursPerWeek"
		name="hoursPerWeek"
		id="hoursPerWeek"
		placeholder="Hours per week"
		bind:value={editingSubject._hoursPerWeek.value}
		min="0"
		max="30"
	/>
</td>
<td>
	<!-- save button -->
	<Button color="primary" on:click={saveSubject}>
		Save <Icon name="check" />
	</Button>
	<!-- cancel button -->
	<Button color="danger" on:click={cancel}>
		Cancel <Icon name="x" />
	</Button>
</td>
