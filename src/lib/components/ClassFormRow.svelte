<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import { SchoolClass } from "$model/school-class/school-class";
	import { ZodError, ZodSchema } from "zod";
	import { Year, yearSchema } from "$model/school-class/year.js";
	import { Section, sectionSchema } from "$model/school-class/section";
	import { Track, trackSchema } from "$model/school-class/track";
	import { Button, Col, FormGroup, Icon, Input, Row } from "sveltestrap";

	const eventDispatcher = createEventDispatcher<{
		save: { schoolClass: SchoolClass };
		cancel: void;
	}>();

	const sections = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"];
	const years = [1, 2, 3, 4, 5];

	export let schoolClass: SchoolClass | null = null;
	export let cloning: boolean = false;

	const correctFeedback = "";

	let tmpSchoolClass: SchoolClassFormData;

	type SchoolClassFormData = {
		_id: string | null;
		_year: { value: number };
		_section: { value: string };
		_track: { value: string };
	};

	type validationFeedbackKey = keyof typeof validationFeedback;
	let validationFeedback = {
		year: { valid: false, invalid: false, errorMessage: "" },
		section: { valid: false, invalid: false, errorMessage: "" },
		track: { valid: false, invalid: false, errorMessage: "" },
	};

	{
		if (schoolClass) {
			tmpSchoolClass = {
				_id: schoolClass.id,
				_year: { value: schoolClass.year.value },
				_section: { value: schoolClass.section.value },
				_track: { value: schoolClass.track?.value || "" },
			};
			if (cloning) {
				tmpSchoolClass._id = null;
			}
			validateAll();
		} else {
			tmpSchoolClass = {
				_id: null,
				_year: { value: 1 },
				_section: { value: "A" },
				_track: { value: "" },
			};
		}
	}

	function save() {
		try {
			validateAll();
			let track =
				tmpSchoolClass._track.value == ""
					? undefined
					: tmpSchoolClass._track.value;
			let savedSchoolClass: SchoolClass = SchoolClass.of(
				tmpSchoolClass._id,
				tmpSchoolClass._year.value,
				tmpSchoolClass._section.value,
				track,
			);
			eventDispatcher("save", { schoolClass: savedSchoolClass });
		} catch (e) {
			console.error(e);
		}
	}

	function validateAll() {
		validate(tmpSchoolClass._year, "year", Year.schema);
		validate(tmpSchoolClass._section, "section", Section.schema);
		validate(tmpSchoolClass._track, "track", Track.schema);
	}

	function validate(
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

	$: validate(tmpSchoolClass._year, "year", Year.schema);
	$: validate(tmpSchoolClass._section, "section", Section.schema);
	$: {
		if (tmpSchoolClass._track.value != "")
			validate(tmpSchoolClass._track, "track", Track.schema);
		else {
			validationFeedback.track.valid = true;
			validationFeedback.track.invalid = false;
			validationFeedback.track.errorMessage = correctFeedback;
		}
	}
</script>

<form on:submit|preventDefault={save}>
	<Row class="align-items-top g-1 mt-1">
		<Col sm={{ size: 3 }}>
			<FormGroup floating label="Year" class="text-muted">
				<Input
					type="select"
					name="year"
					id="year"
					bind:value={tmpSchoolClass._year.value}
					bind:feedback={validationFeedback.year.errorMessage}
					bind:valid={validationFeedback.year.valid}
					bind:invalid={validationFeedback.year.invalid}
				>
					{#each years as year}
						<option>{year}</option>
					{/each}
				</Input>
			</FormGroup>
		</Col>
		<Col sm={{ size: 3 }}>
			<FormGroup floating inline label="Section" class="text-muted">
				<Input
					type="select"
					name="section"
					id="section"
					bind:value={tmpSchoolClass._section.value}
					bind:feedback={validationFeedback.section.errorMessage}
					bind:valid={validationFeedback.section.valid}
					bind:invalid={validationFeedback.section.invalid}
				>
					{#each sections as section}
						<option>{section}</option>
					{/each}
				</Input>
			</FormGroup>
		</Col>
		<Col sm={{ size: 3 }}>
			<FormGroup floating label="Track" class="text-muted">
				<Input
					type="text"
					label="track"
					placeholder="Enter a value"
					name="track"
					id="track"
					bind:value={tmpSchoolClass._track.value}
					bind:feedback={validationFeedback.track.errorMessage}
					bind:valid={validationFeedback.track.valid}
					bind:invalid={validationFeedback.track.invalid}
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
