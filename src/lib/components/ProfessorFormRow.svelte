<script lang="ts">
	import { Professor } from "$model/professor/professor";
	import {
		Button,
		Col,
		FormGroup,
		Icon,
		Input,
		Label,
		Row,
	} from "sveltestrap";
	import { createEventDispatcher } from "svelte";
	import { ZodError, ZodSchema } from "zod";
	import { Surname } from "$model/professor/surname";
	import { Mail } from "$model/professor/mail";
	import { Cellphone } from "$model/professor/cellphone";
	import { Name } from "$model/professor/name";

	const eventDispatcher = createEventDispatcher<{
		save: { professor: Professor };
		cancel: void;
	}>();

	export let professor: Professor | null = null;
	export let cloning: boolean = false;

	type validationFeedbackKey = keyof typeof validationFeedback;
	let validationFeedback = {
		name: { valid: false, invalid: false, errorMessage: "" },
		surname: { valid: false, invalid: false, errorMessage: "" },
		email: { valid: false, invalid: false, errorMessage: "" },
		cellPhone: { valid: false, invalid: false, errorMessage: "" },
	};

	const correctFeedback = "";

	type ProfessorFormData = {
		_id: string | null;
		_name: { value: string };
		_surname: { value: string };
		_email: { value: string };
		_cellPhone: { value: string };
	};

	let editingProfessor: ProfessorFormData;

	if (professor) {
		editingProfessor = {
			_id: professor.id,
			_name: { value: professor.name.value },
			_surname: { value: professor.surname.value },
			_email: { value: professor.email.value },
			_cellPhone: { value: professor.cellPhone.value },
		};

		if (cloning) {
			editingProfessor._id = null;
		}
	} else {
		editingProfessor = {
			_id: null,
			_name: { value: "" },
			_surname: { value: "" },
			_email: { value: "" },
			_cellPhone: { value: "" },
		};
	}

	function save() {
		try {
			validateAll();
			let savedProfessor: Professor = Professor.of(
				editingProfessor._id,
				editingProfessor._name.value,
				editingProfessor._surname.value,
				editingProfessor._email.value,
				editingProfessor._cellPhone.value,
			);
			eventDispatcher("save", { professor: savedProfessor });
		} catch (e) {
			console.error(e);
		}
	}

	function validateAll() {
		validateWithSchema(editingProfessor._name, "name", Name.schema);
		validateWithSchema(
			editingProfessor._surname,
			"surname",
			Surname.schema,
		);
		validateWithSchema(editingProfessor._email, "email", Mail.schema);
		validateWithSchema(
			editingProfessor._cellPhone,
			"cellPhone",
			Cellphone.schema,
		);
	}

	$: validateWithSchema(editingProfessor._name, "name", Name.schema);
	$: validateWithSchema(editingProfessor._surname, "surname", Surname.schema);
	$: validateWithSchema(editingProfessor._email, "email", Mail.schema);
	$: validateWithSchema(
		editingProfessor._cellPhone,
		"cellPhone",
		Cellphone.schema,
	);

	function validateWithSchema(
		editingField: { value: any },
		fieldName: validationFeedbackKey,
		schema: ZodSchema,
	) {
		if (validationFeedback)
			try {
				schema.parse(editingField);

				validationFeedback[fieldName].valid = true;
				validationFeedback[fieldName].invalid = false;
				validationFeedback[fieldName].errorMessage = correctFeedback;
			} catch (e) {
				if (e instanceof ZodError) {
					validationFeedback[fieldName].errorMessage =
						e.issues[0].message;
					validationFeedback[fieldName].valid = false;
					validationFeedback[fieldName].invalid = true;
				}
			}
	}
</script>

<form on:submit={save}>
	<Row class="align-items-top g-1 mt-1">
		<Col sm={{ size: 2 }}>
			<FormGroup floating label="Name" class="text-muted">
				<Input
					type="text"
					label="name"
					name="name"
					id="name"
					bind:value={editingProfessor._name.value}
					bind:feedback={validationFeedback.name.errorMessage}
					bind:valid={validationFeedback.name.valid}
					bind:invalid={validationFeedback.name.invalid}
				/>
			</FormGroup>
		</Col>
		<Col sm={{ size: 2 }}>
			<FormGroup floating label="Surname" class="text-muted">
				<Input
					type="text"
					label="surname"
					name="surname"
					id="surname"
					bind:value={editingProfessor._surname.value}
					bind:feedback={validationFeedback.surname.errorMessage}
					bind:valid={validationFeedback.surname.valid}
					bind:invalid={validationFeedback.surname.invalid}
				/>
			</FormGroup>
		</Col>
		<Col sm={{ size: 3 }}>
			<FormGroup floating label="Email" class="text-muted">
				<Input
					type="email"
					label="email"
					name="email"
					id="email"
					bind:value={editingProfessor._email.value}
					bind:feedback={validationFeedback.email.errorMessage}
					bind:valid={validationFeedback.email.valid}
					bind:invalid={validationFeedback.email.invalid}
				/>
			</FormGroup>
		</Col>
		<Col sm={{ size: 2 }}>
			<FormGroup floating label="Phone number" class="text-muted">
				<Input
					type="text"
					label="cellPhone"
					name="cellPhone"
					id="cellPhone"
					bind:value={editingProfessor._cellPhone.value}
					bind:feedback={validationFeedback.cellPhone.errorMessage}
					bind:valid={validationFeedback.cellPhone.valid}
					bind:invalid={validationFeedback.cellPhone.invalid}
				/>
			</FormGroup>
		</Col>
		<Col sm={{ size: 2 }} class="ms-auto ps-0">
			<Row class="g-1">
				<Col>
					<Button
						color="primary"
						class="w-100 text-nowrap"
						type="submit"
						on:click={save}
					>
						<Icon name="check" /> Save</Button
					>
				</Col>
				<Col>
					<Button
						color="danger"
						class="w-100 text-nowrap"
						on:click={() => eventDispatcher("cancel")}
					>
						<Icon name="x" /> Cancel</Button
					>
				</Col>
			</Row>
		</Col>
	</Row>
</form>
