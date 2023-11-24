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
	import { ZodError } from "zod";
	import { nameSchema } from "$model/professor/name";
	import { surnameSchema } from "$model/professor/surname";
	import { mailSchema } from "$model/professor/mail";
	import { cellPhoneSchema } from "$model/professor/cellphone";

	const eventDispatcher = createEventDispatcher<{
		save: { professor: Professor };
		cancel: void;
	}>();

	export let professor: Professor | null = null;

	let nameValidation = { errorMessage: "", valid: false, invalid: false };
	let surnameValidation = { errorMessage: "", valid: false, invalid: false };
	let emailValidation = { errorMessage: "", valid: false, invalid: false };
	let cellPhoneValidation = {
		errorMessage: "",
		valid: false,
		invalid: false,
	};

	const correctFeedback = "";

	type ProfessorFormData = {
		_id?: { value: string };
		_name: { value: string };
		_surname: { value: string };
		_email: { value: string };
		_cellPhone: { value: string };
	};

	let editingProfessor: ProfessorFormData;

	{
		if (professor) {
			editingProfessor = {
				_name: { value: professor.name.value },
				_surname: { value: professor.surname.value },
				_email: { value: professor.email.value },
				_cellPhone: { value: professor.cellPhone.value },
			};
			validateName();
			validateSurname();
			validateEmail();
			validateCellPhone();
		} else {
			editingProfessor = {
				_name: { value: "" },
				_surname: { value: "" },
				_email: { value: "" },
				_cellPhone: { value: "" },
			};
		}
	}

	function save() {
		validateName();
		validateSurname();
		validateEmail();
		validateCellPhone();
		try {
			let savedProfessor: Professor = Professor.of(
				null,
				editingProfessor._name.value,
				editingProfessor._surname.value,
				editingProfessor._email.value,
				editingProfessor._cellPhone.value
			);
			eventDispatcher("save", { professor: savedProfessor });
		} catch (e) {
			if (e instanceof ZodError) {
			}
		}
	}

	function validateName() {
		try {
			nameSchema.parse(editingProfessor._name);
			nameValidation.valid = true;
			nameValidation.invalid = false;
			nameValidation.errorMessage = correctFeedback;
		} catch (e) {
			if (e instanceof ZodError) {
				nameValidation.errorMessage = e.issues[0].message;
				nameValidation.valid = false;
				nameValidation.invalid = true;
			}
		}
	}

	function validateSurname() {
		try {
			surnameSchema.parse(editingProfessor._surname);
			surnameValidation.valid = true;
			surnameValidation.invalid = false;
			surnameValidation.errorMessage = correctFeedback;
		} catch (e) {
			if (e instanceof ZodError) {
				surnameValidation.errorMessage = e.issues[0].message;
				surnameValidation.valid = false;
				surnameValidation.invalid = true;
			}
		}
	}

	function validateEmail() {
		try {
			mailSchema.parse(editingProfessor._email);
			emailValidation.valid = true;
			emailValidation.invalid = false;
			emailValidation.errorMessage = correctFeedback;
		} catch (e) {
			if (e instanceof ZodError) {
				emailValidation.errorMessage = e.issues[0].message;
				emailValidation.valid = false;
				emailValidation.invalid = true;
			}
		}
	}

	function validateCellPhone() {
		try {
			cellPhoneSchema.parse(editingProfessor._cellPhone);
			cellPhoneValidation.valid = true;
			cellPhoneValidation.invalid = false;
			cellPhoneValidation.errorMessage = correctFeedback;
		} catch (e) {
			if (e instanceof ZodError) {
				cellPhoneValidation.errorMessage = e.issues[0].message;
				cellPhoneValidation.valid = false;
				cellPhoneValidation.invalid = true;
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
		<FormGroup floating label="Name" class="text-muted">
			<Input
				type="text"
				label="name"
				name="name"
				id="name"
				bind:value={editingProfessor._name.value}
				on:keydown={(e) => {handleKeydown(e)}}
				on:keyup={validateName}
				on:change={validateName}
				bind:feedback={nameValidation.errorMessage}
				bind:valid={nameValidation.valid}
				bind:invalid={nameValidation.invalid}
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
				on:keyup={validateSurname}
				on:keydown={(e) => {handleKeydown(e)}}
				on:change={validateSurname}
				bind:feedback={surnameValidation.errorMessage}
				bind:valid={surnameValidation.valid}
				bind:invalid={surnameValidation.invalid}
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
				on:keyup={validateEmail}
				on:keydown={(e) => {handleKeydown(e)}}
				on:change={validateEmail}
				bind:feedback={emailValidation.errorMessage}
				bind:valid={emailValidation.valid}
				bind:invalid={emailValidation.invalid}
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
				on:keyup={validateCellPhone}
				on:keydown={(e) => {handleKeydown(e)}}
				on:change={validateCellPhone}
				bind:feedback={cellPhoneValidation.errorMessage}
				bind:valid={cellPhoneValidation.valid}
				bind:invalid={cellPhoneValidation.invalid}
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
