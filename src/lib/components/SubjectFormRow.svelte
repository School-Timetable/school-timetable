<script lang="ts">
	import { Button, Col, FormGroup, Icon, Input, Row } from "sveltestrap";
	import { createEventDispatcher } from "svelte";
	import { ZodError, ZodSchema } from "zod";
	import type { SchoolClass } from "$model/school-class/school-class";
	import { Subject } from "$model/subject/subject";
	import type { Professor } from "$model/professor/professor";
	import { Abbreviation } from "$model/subject/abbreviation";
	import { Name } from "$model/subject/name";
	import { Weight } from "$model/subject/weight";
	import { HoursPerWeek } from "$model/subject/hours-per-week";
	import { allClassrooms, allProfessors } from "$lib/stores/global_store";
	import { get } from "svelte/store";

	const dispatch = createEventDispatcher<{
		save: { subject: Subject };
		cancel: void;
	}>();

	export let subject: Subject | null = null;
	export let cloning: boolean = false;
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

	if (subject) {
		editingSubject = {
			_id: subject.id,
			_schoolClass: subject.schoolClass,
			_professor: subject.professor,
			_name: { value: subject.name.value },
			_abbreviation: { value: subject.abbreviation.value },
			_weight: { value: subject.weight.value },
			_hoursPerWeek: { value: subject.hoursPerWeek.value },
		};
		if (cloning) editingSubject._id = null;
	} else {
		editingSubject = {
			_id: null,
			_name: { value: "" },
			_abbreviation: { value: "" },
			_weight: { value: 5 },
			_hoursPerWeek: { value: 1 },
		};
	}

	let formValidationFeedback: FormValidationResult[] = new Array(4).fill({
		valid: false,
		invalid: false,
		feedback: "",
	});

	$: validateWithSchema(editingSubject._abbreviation, 0, Abbreviation.schema);
	$: validateWithSchema(editingSubject._name, 1, Name.schema);
	$: validateWithSchema(editingSubject._weight, 2, Weight.schema);
	$: validateWithSchema(editingSubject._hoursPerWeek, 3, HoursPerWeek.schema);

	function save() {
		try {
			let savedSubject = Subject.of(
				editingSubject._id,
				editingSubject._schoolClass!,
				editingSubject._professor!,
				editingSubject._name.value,
				editingSubject._abbreviation.value,
				editingSubject._weight.value,
				editingSubject._hoursPerWeek.value,
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

	function validateWithSchema(obj: any, fieldIdx: number, schema: ZodSchema) {
		try {
			schema.parse(obj);
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
</script>

<form on:submit|preventDefault={save}>
	<Row class="align-items-top g-1 mt-1">
		<Col sm={{ size: 2 }}>
			<FormGroup floating label="Class" class="text-muted">
				<Input
					type="select"
					name="schoolClass"
					id="schoolClass"
					required
					bind:value={editingSubject._schoolClass}
				>
					{#each schoolClasses as schoolClass}
						<option value={schoolClass}>{schoolClass}</option>
					{:else}
						<option value={null}>No classes found</option>
					{/each}
				</Input>
			</FormGroup>
		</Col>

		<Col sm={{ size: 2 }}>
			<FormGroup floating label="Professor" class="text-muted">
				<Input
					type="select"
					label="professor"
					name="professor"
					id="professor"
					required
					bind:value={editingSubject._professor}
				>
					{#each professors as professor}
						<option value={professor}>{professor}</option>
					{:else}
						<option>no professors</option>
					{/each}
				</Input>
			</FormGroup>
		</Col>

		<Col sm={{ size: 2 }}>
			<FormGroup floating label="Abbreviation" class="text-muted">
				<Input
					type="text"
					label="abbreviation"
					name="abbreviation"
					id="abbreviation"
					placeholder="Abbreviation"
					required
					bind:value={editingSubject._abbreviation.value}
					bind:valid={formValidationFeedback[0].valid}
					bind:invalid={formValidationFeedback[0].invalid}
					bind:feedback={formValidationFeedback[0].feedback}
				/>
			</FormGroup>
		</Col>

		<Col sm={{ size: 2 }}>
			<FormGroup floating label="Name" class="text-muted">
				<Input
					type="text"
					label="name"
					name="name"
					id="name"
					placeholder="Name"
					required
					bind:value={editingSubject._name.value}
					bind:valid={formValidationFeedback[1].valid}
					bind:invalid={formValidationFeedback[1].invalid}
					bind:feedback={formValidationFeedback[1].feedback}
				/>
			</FormGroup>
		</Col>

		<Col sm={{ size: 1 }}>
			<FormGroup floating label="Weight" class="text-muted">
				<Input
					type="number"
					label="weight"
					name="weight"
					id="weight"
					placeholder="Weight"
					required
					min="1"
					max="10"
					bind:value={editingSubject._weight.value}
					bind:valid={formValidationFeedback[2].valid}
					bind:invalid={formValidationFeedback[2].invalid}
					bind:feedback={formValidationFeedback[2].feedback}
				/>
			</FormGroup>
		</Col>

		<Col sm={{ size: 1 }}>
			<FormGroup floating label="Hrs/Week" class="text-muted">
				<Input
					type="number"
					label="hoursPerWeek"
					name="hoursPerWeek"
					id="hoursPerWeek"
					placeholder="Hours per week"
					required
					min="1"
					max="30"
					bind:value={editingSubject._hoursPerWeek.value}
					bind:valid={formValidationFeedback[3].valid}
					bind:invalid={formValidationFeedback[3].invalid}
					bind:feedback={formValidationFeedback[3].feedback}
				/>
			</FormGroup>
		</Col>

		<Col sm={{ size: 2 }} class="ms-auto ps-0">
			<Row class="g-1">
				<Col>
					<Button
						color="primary"
						class="w-100 text-nowrap"
						on:click={save}
						type="submit"
					>
						Save <Icon name="check" />
					</Button>
				</Col>
				<Col>
					<Button
						color="danger"
						class="w-100 text-nowrap"
						on:click={cancel}
					>
						Cancel <Icon name="x" />
					</Button>
				</Col>
			</Row>
		</Col>
	</Row>
</form>
