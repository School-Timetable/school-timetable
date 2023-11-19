<script lang="ts">
	import {
		Button,
		ButtonGroup,
		Col,
		Form,
		Icon,
		Input,
		Label,
		Row,
	} from "sveltestrap";
	import { createEventDispatcher } from "svelte";
	import { ZodError, z } from "zod";
	import type { SchoolClass } from "$model/school-class/school-class";
	import { Subject } from "$model/subject/subject";
	import type { Professor } from "$model/professor/professor";
	import { abbreviationSchema } from "$model/subject/abbreviation";
	import { nameSchema } from "$model/subject/name";
	import { weightSchema } from "$model/subject/weight";
	import { hoursPerWeekSchema } from "$model/subject/hours-per-week";
	import { allClassrooms, allProfessors } from "$lib/stores/global_store";
	import { get } from "svelte/store";

	const dispatch = createEventDispatcher<{
		save: { subject: Subject };
		cancel: void;
	}>();

	export let subject: Subject | null = null;
	export let schoolClasses: SchoolClass[] = get(allClassrooms);
	export let professors: Professor[] = get(allProfessors);

	type SubjectFormData = {
		_id: string | null;
		_schoolClass?: SchoolClass;
		_professor?: Professor;
		_name: { value: string };
		_abbreviation: { value: string };
		_weight: { value: number };
		_hoursPerWeek: { value: number };
	};

	type FormValidationResult = {
		valid: boolean;
		invalid: boolean;
		feedback: string;
	};

	let editingSubject: SubjectFormData;

	if (subject == null) {
		editingSubject = {
			_id: null,
			_name: { value: "" },
			_abbreviation: { value: "" },
			_weight: { value: 5 },
			_hoursPerWeek: { value: 1 },
		};
	} else {
		editingSubject = {
			_id: subject.id,
			_schoolClass: subject.schoolClass,
			_professor: subject.professor,
			_name: { value: subject.name.value },
			_abbreviation: { value: subject.abbreviation.value },
			_weight: { value: subject.weight.value },
			_hoursPerWeek: { value: subject.hoursPerWeek.value },
		};
	}

	let formValidationFeedback: FormValidationResult[] = new Array(4).fill({
		valid: false,
		invalid: false,
		feedback: "",
	});

	function save() {
		try {
			let savedSubject = Subject.of(
				editingSubject._id,
				editingSubject._schoolClass!,
				editingSubject._professor!,
				editingSubject._name.value,
				editingSubject._abbreviation.value,
				editingSubject._weight.value,
				editingSubject._hoursPerWeek.value
			);

			dispatch("save", { subject: savedSubject });
		} catch (e) {
			if (e instanceof ZodError)
				alert(e.issues.map((issue) => issue.message).join("\n"));
		}
	}

	function cancel(): void {
		dispatch("cancel");
	}

	function validateWithSchema(
		value: object | undefined,
		fieldIdx: number,
		schema: any
	) {
		try {
			schema.parse(value);
			formValidationFeedback[fieldIdx] = {
				valid: true,
				invalid: false,
				feedback: "",
			};
		} catch (e) {
			if (e instanceof ZodError) {
				formValidationFeedback[fieldIdx] = {
					valid: false,
					invalid: true,
					feedback: e.issues[0].message,
				};
			}
		}
	}
	function handleKeydown(event: KeyboardEvent) {
        if (event.key === 'Enter') {
			save();
        }
    }
</script>

<Row class="align-items-top g-1 mt-1">
	<Col sm={{ size: 2 }}>
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
				<option value={null}>No classes found</option>
			{/each}
		</Input>
	</Col>

	<Col sm={{ size: 2 }}>
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
				<option>no professors</option>
			{/each}
		</Input>
	</Col>

	<Col sm={{ size: 2 }}>
		<Label for="abbreviation">Abbreviation</Label>
		<Input
			type="text"
			label="abbreviation"
			name="abbreviation"
			id="abbreviation"
			placeholder="Abbreviation"
			bind:value={editingSubject._abbreviation.value}
			bind:valid={formValidationFeedback[0].valid}
			bind:invalid={formValidationFeedback[0].invalid}
			bind:feedback={formValidationFeedback[0].feedback}
			on:keydown={(e) => {handleKeydown(e)}}
			on:keyup={() =>
				validateWithSchema(
					editingSubject._abbreviation,
					0,
					abbreviationSchema
				)}
		/>
	</Col>

	<Col sm={{ size: 2 }}>
		<Label for="name">Name</Label>
		<Input
			type="text"
			label="name"
			name="name"
			id="name"
			placeholder="Name"
			bind:value={editingSubject._name.value}
			bind:valid={formValidationFeedback[1].valid}
			bind:invalid={formValidationFeedback[1].invalid}
			bind:feedback={formValidationFeedback[1].feedback}
			on:keydown={(e) => {handleKeydown(e)}}
			on:keyup={() =>
				validateWithSchema(editingSubject._name, 1, nameSchema)}
		/>
	</Col>

	<Col sm={{ size: 1 }}>
		<Label for="weight">Weight</Label>
		<Input
			type="number"
			label="weight"
			name="weight"
			id="weight"
			placeholder="Weight"
			bind:value={editingSubject._weight.value}
			bind:valid={formValidationFeedback[2].valid}
			bind:invalid={formValidationFeedback[2].invalid}
			bind:feedback={formValidationFeedback[2].feedback}
			on:keydown={(e) => {handleKeydown(e)}}
			on:keyup={() =>
				validateWithSchema(editingSubject._weight, 2, weightSchema)}
			min="1"
			max="10"
		/>
	</Col>

	<Col sm={{ size: 1 }}>
		<Label for="hoursPerWeek">Hours</Label>
		<Input
			type="number"
			label="hoursPerWeek"
			name="hoursPerWeek"
			id="hoursPerWeek"
			placeholder="Hours per week"
			bind:value={editingSubject._hoursPerWeek.value}
			bind:valid={formValidationFeedback[3].valid}
			bind:invalid={formValidationFeedback[3].invalid}
			bind:feedback={formValidationFeedback[3].feedback}
			on:keydown={(e) => {handleKeydown(e)}}
			on:keyup={() =>
				validateWithSchema(
					editingSubject._hoursPerWeek,
					3,
					hoursPerWeekSchema
				)}
			min="1"
			max="30"
		/>
	</Col>

	<Col>
		<ButtonGroup>
			<Button color="primary" on:click={save}>
				Save <Icon name="check" />
			</Button>
			<Button color="danger" on:click={cancel}>
				Cancel <Icon name="x" />
			</Button>
		</ButtonGroup>
	</Col>
</Row>
