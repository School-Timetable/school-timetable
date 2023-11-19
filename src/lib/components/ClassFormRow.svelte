<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import { SchoolClass } from "$model/school-class/school-class";
	import { ZodError } from "zod";
	import { yearSchema } from "$model/school-class/year.js";
	import { sectionSchema } from "$model/school-class/section";
	import { Track, trackSchema } from "$model/school-class/track";
	import { Button, Col, FormGroup, Icon, Input, Row } from "sveltestrap";

	const eventDispatcher = createEventDispatcher<{
		save: { schoolClass: SchoolClass };
		cancel: void;
	}>();

	const sections = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"];
	const years = [1, 2, 3, 4, 5];

	export let schoolClass: SchoolClass | null = null;

	let yearValidation = { errorMessage: "", valid: false, invalid: false };
	let sectionValidation = { errorMessage: "", valid: false, invalid: false };
	let trackValidation = { errorMessage: "", valid: false, invalid: false };

	const correctFeedback = "";

	let tmpSchoolClass: SchoolClassFormData;

	type SchoolClassFormData = {
		_id: { value: string | null };
		_year: { value: number };
		_section: { value: string };
		_track: { value: string };
	};

	{
		if (schoolClass) {
			tmpSchoolClass = {
				_id: { value: schoolClass.id },
				_year: { value: schoolClass.year.value },
				_section: { value: schoolClass.section.value },
				_track: { value: schoolClass.track?.value || "" },
			};
		} else {
			tmpSchoolClass = {
				_id: { value: null },
				_year: { value: 1 },
				_section: { value: "A" },
				_track: { value: "" },
			};
		}
	}

	function save() {
		validateYear();
		validateSection();
		validateTrack();
		try {
			let track =
				tmpSchoolClass!._track.value == ""
					? undefined
					: new Track(tmpSchoolClass!._track.value);
			let savedSchoolClass: SchoolClass = SchoolClass.of(
				tmpSchoolClass._id.value,
				tmpSchoolClass._year.value,
				tmpSchoolClass._section.value,
				track?.value
			);
			eventDispatcher("save", { schoolClass: savedSchoolClass });
		} catch (e) {
			if (e instanceof ZodError) {
				// TODO: ???
			}
		}
	}

	function validateYear() {
		try {
			yearSchema.parse(tmpSchoolClass._year);
			yearValidation.valid = true;
			yearValidation.invalid = false;
			yearValidation.errorMessage = correctFeedback;
		} catch (e) {
			if (e instanceof ZodError) {
				yearValidation.errorMessage = e.issues[0].message;
				yearValidation.valid = false;
				yearValidation.invalid = true;
			}
		}
	}

	function validateSection() {
		try {
			sectionSchema.parse(tmpSchoolClass._section);
			sectionValidation.valid = true;
			sectionValidation.invalid = false;
			sectionValidation.errorMessage = correctFeedback;
		} catch (e) {
			if (e instanceof ZodError) {
				sectionValidation.errorMessage = e.issues[0].message;
				sectionValidation.valid = false;
				sectionValidation.invalid = true;
			}
		}
	}

	function validateTrack() {
		if (tmpSchoolClass._track.value === "") {
			trackValidation.valid = true;
			trackValidation.invalid = false;
		} else {
			try {
				trackSchema.parse(tmpSchoolClass._track);
				trackValidation.valid = true;
				trackValidation.invalid = false;
			} catch (e) {
				if (e instanceof ZodError) {
					trackValidation.errorMessage = e.issues[0].message;
					trackValidation.valid = false;
					trackValidation.invalid = true;
				}
			}
		}

		if (trackValidation.valid) {
			trackValidation.errorMessage = correctFeedback;
		}
	}
</script>

<Row class="align-items-top g-1 mt-1">
	<Col sm={{ size: 3 }}>
		<FormGroup floating label="Year" class="text-body">
			<Input
				type="select"
				name="year"
				id="year"
				on:change={validateYear}
				bind:value={tmpSchoolClass._year.value}
				bind:feedback={yearValidation.errorMessage}
				bind:valid={yearValidation.valid}
				bind:invalid={yearValidation.invalid}
			>
				{#each years as year}
					<option>{year}</option>
				{/each}
			</Input>
		</FormGroup>
	</Col>
	<Col sm={{ size: 3 }}>
		<FormGroup floating inline label="Section" class="text-body">
			<Input
				type="select"
				name="section"
				id="section"
				on:change={validateSection}
				bind:value={tmpSchoolClass._section.value}
				bind:feedback={sectionValidation.errorMessage}
				bind:valid={sectionValidation.valid}
				bind:invalid={sectionValidation.invalid}
			>
				{#each sections as section}
					<option>{section}</option>
				{/each}
			</Input>
		</FormGroup>
	</Col>
	<Col sm={{ size: 3 }}>
		<FormGroup floating label="Track" class="text-body">
			<Input
				type="text"
				label="email"
				placeholder="Enter a value"
				name="email"
				id="email"
				bind:value={tmpSchoolClass._track.value}
				on:keyup={validateTrack}
				bind:feedback={trackValidation.errorMessage}
				bind:valid={trackValidation.valid}
				bind:invalid={trackValidation.invalid}
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
