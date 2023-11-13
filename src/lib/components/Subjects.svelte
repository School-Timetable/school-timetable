<script lang="ts">
	import { Cellphone } from "$model/professor/cellphone";
	import { Mail } from "$model/professor/mail";
	import { Name as ProfessorName } from "$model/professor/name";
	import { Professor } from "$model/professor/professor";
	import { Surname } from "$model/professor/surname";
	import { SchoolClass } from "$model/school-class/school-class";
	import { Section } from "$model/school-class/section";
	import { ZodError, z } from "zod";
	import { Subject } from "$model/subject/subject";
	import {
		Button,
		ButtonGroup,
		Form,
		Icon,
		Input,
		Label,
		Table,
	} from "sveltestrap";
	import SubjectFormRow from "./SubjectFormRow.svelte";

	let professors: Professor[] = [
		Professor.of(
			"Mario",
			"Alviano",
			"mario.alviano@unical.it",
			"+391234567890"
		),
		Professor.of(
			"Francesco",
			"Calimeri",
			"francesco.calimeri@unical.it",
			"+393335557890"
		),
		Professor.of(
			"Giovambattista",
			"Ianni",
			"giovambattista.ianni@unica.it",
			"+398889990101"
		),
		Professor.of(
			"Simona",
			"Perri",
			"simona.perri@unical.it",
			"+391002003004"
		),
	];

	let schoolClasses: SchoolClass[] = [
		SchoolClass.of(1, "A"),
		SchoolClass.of(2, "A"),
		SchoolClass.of(3, "A"),
		SchoolClass.of(4, "A"),
		SchoolClass.of(5, "A"),
		SchoolClass.of(1, "B"),
		SchoolClass.of(2, "B"),
		SchoolClass.of(3, "B"),
		SchoolClass.of(4, "B"),
		SchoolClass.of(5, "B"),
	];

	let subjects: Subject[] = [
		Subject.of(schoolClasses[1], professors[1], "Math", "Math", 7, 13),
		Subject.of(schoolClasses[0], professors[2], "English", "Eng", 5, 9),
		Subject.of(schoolClasses[3], professors[0], "Science", "Sci", 5, 8),
		Subject.of(
			schoolClasses[3],
			professors[0],
			"Artificial Intelligence",
			"AI",
			7,
			8
		),
	];

	let editingSubjectIndex: number | null = null;

	function editSubject(subject: Subject) {
		editingSubjectIndex = subjects.indexOf(subject);
	}

	function createNewSubject() {
		if (editingSubjectIndex !== null) {
			cancelEditSubject();
		}
		editingSubjectIndex = subjects.length;
	}

	function saveSubject(subject: Subject, index?: number) {
		if (index != undefined && isIndexValid(index)) {
			subjects[index] = subject;
		} else {
			subjects.push(subject);
		}
		editingSubjectIndex = null;
		subjects = subjects;
	}

	function cancelEditSubject() {
		editingSubjectIndex = null;
		subjects = subjects;
	}

	function removeSubject(index: number) {
		if (editingSubjectIndex != null) {
			cancelEditSubject();
		}

		if (isIndexValid(index)) {
			subjects.splice(index, 1);
			subjects = subjects;
		} else {
			console.error("Index out of bounds");
		}
	}

	function isIndexValid(index: number): boolean {
		return 0 <= index && index < subjects.length;
	}
</script>

<h1>Subjects</h1>

<Form>
	<table class="text-center">
		<thead>
			<tr>
				<th>Class</th>
				<th>Professor</th>
				<th>Abbreviation</th>
				<th>Name</th>
				<th>Weight</th>
				<th>Hours per week</th>
				<th>Actions</th>
			</tr>
		</thead>
		<tbody>
			{#each subjects as subject, index}
				{#if editingSubjectIndex != index}
					<tr>
						<td>{subject.schoolClass}</td>
						<td>{subject.professor}</td>
						<td>{subject.abbreviation}</td>
						<td>{subject.name}</td>
						<td>{subject.weight}/10</td>
						<td>{subject.hoursPerWeek}</td>
						<td>
							<Button
								color="primary"
								on:click={() => editSubject(subject)}
							>
								Edit <Icon name="pencil-square" />
							</Button>
							<!-- TODO: add confirmation dialog -->
							<Button
								color="danger"
								on:click={() => removeSubject(index)}
							>
								Delete <Icon name="trash-fill" />
							</Button>
						</td>
					</tr>
				{:else}
					<SubjectFormRow
						{subject}
						{professors}
						{schoolClasses}
						on:save={(e) => saveSubject(e.detail.subject, index)}
						on:cancel={cancelEditSubject}
					/>
					<tr />
				{/if}
			{/each}

			{#if editingSubjectIndex == subjects.length}
				<SubjectFormRow
					{professors}
					{schoolClasses}
					on:save={(e) => saveSubject(e.detail.subject)}
					on:cancel={cancelEditSubject}
				/>
			{/if}

			<tr>
				<td colspan="7">
					<ButtonGroup>
						<Button color="primary" on:click={createNewSubject}>
							Add <Icon name="plus" />
						</Button>
					</ButtonGroup>
				</td>
			</tr>
		</tbody>
	</table>
</Form>
