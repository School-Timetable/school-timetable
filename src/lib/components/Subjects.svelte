<script lang="ts">
	import { Cellphone } from "$model/professor/cellphone";
	import { Mail } from "$model/professor/mail";
	import { Name as ProfessonName } from "$model/professor/name";
	import { Professor } from "$model/professor/professor";
	import { Surname } from "$model/professor/surname";
	import { ClassNumber } from "$model/school-class/class-number";
	import { SchoolClass } from "$model/school-class/school-class";
	import { Section } from "$model/school-class/section";
	import { Abbreviation } from "$model/subject/abbreviation";
	import { hoursPerWeekSchema } from "../../model/subject/hours-per-week";
	import { Subject } from "../../model/subject/subject";
	import {
		Button,
		ButtonGroup,
		Form,
		Icon,
		Input,
		Label,
		Table,
	} from "sveltestrap";

	let professor = new Professor(
		new ProfessonName("Mario"),
		new Surname("Rossi"),
		new Mail("mario.rossi@gmail.com"),
		new Cellphone("3331234567")
	);

	let schoolClass = new SchoolClass.builder(
		69,
		new ClassNumber(5),
		new Section("A")
	).build();

	let subjects: Subject[] = [
		Subject.of(schoolClass, professor, "Math", "Math", 7, 13),
		Subject.of(schoolClass, professor, "English", "Eng", 5, 9),
		Subject.of(schoolClass, professor, "Science", "Sci", 5, 8),
	];

	let editingSubjectIndex: number | null = null;
	let editingSubject: Subject | null = null;

	function editSubject(subject: Subject) {
		editingSubjectIndex = subjects.indexOf(subject);
		editingSubject = new Subject(
			subject.schoolClass,
			subject.professor,
			subject.name,
			subject.abbreviation,
			subject.weight,
			subject.hoursPerWeek
		);
		subjects = subjects;
	}

	function saveSubject() {
		if (editingSubjectIndex !== null && editingSubject) {
			subjects[editingSubjectIndex] = editingSubject;
			editingSubjectIndex = null;
			editingSubject = null;
			subjects = subjects;
		}
	}

	function cancelEditSubject() {
		editingSubjectIndex = null;
		editingSubject = null;
		subjects = subjects;
	}

	function removeSubject(subject: Subject) {
		const index = subjects.indexOf(subject);
		if (editingSubjectIndex != null) {
			cancelEditSubject();
		}
		if (index !== -1) {
			subjects.splice(index, 1);
			subjects = subjects;
		}
	}
</script>

<h1>Subjects</h1>

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
			{#if editingSubjectIndex !== index}
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
							on:click={() => removeSubject(subject)}
						>
							Delete <Icon name="trash-fill" />
						</Button>
					</td>
				</tr>
			{:else if editingSubject}
				<tr>
					<td>
						<Label for="schoolClass">Class</Label>
						<Input
							type="select"
							label="schoolClass"
							name="schoolClass"
							id="schoolClass"
							bind:value={editingSubject.schoolClass}
						>
							<option value={schoolClass}>{schoolClass}</option>
						</Input>
					</td>
					<td>
						<Label for="professor">Professor</Label>
						<Input
							type="select"
							label="professor"
							name="professor"
							id="professor"
							bind:value={editingSubject.professor}
						>
							<option value={professor}>{professor}</option>
						</Input>
					</td>
					<td>
						<Label for="abbreviation">Abbreviation</Label>
						<Input
							type="text"
							label="abbreviation"
							name="abbreviation"
							id="abbreviation"
							value={editingSubject.abbreviation}
							on:input={(e) => {
								if (editingSubject)
									editingSubject.abbreviation =
										new Abbreviation(e.target?.value);
								editingSubject = editingSubject;
							}}
						/>
					</td>
					<td>
						<Label for="name">Name</Label>
						<Input
							type="text"
							label="name"
							name="name"
							id="name"
							bind:value={editingSubject.name}
						/>
					</td>
					<td>
						<Label for="weight">Weight</Label>
						<Input
							type="number"
							label="weight"
							name="weight"
							id="weight"
							bind:value={editingSubject.weight}
							min="0"
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
							bind:value={editingSubject.hoursPerWeek}
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
						<Button color="danger" on:click={cancelEditSubject}>
							Cancel <Icon name="x" />
						</Button>
					</td>
				</tr>
			{/if}
		{/each}
		<tr>
			<td colspan="7">
				<ButtonGroup>
					<Button
						color="primary"
						on:click={() => {
							subjects.push(
								Subject.of(
									schoolClass,
									professor,
									"NA",
									"NA",
									5,
									1
								)
							);
							subjects = subjects;
						}}
					>
						Add <Icon name="plus" />
					</Button>
				</ButtonGroup>
			</td>
		</tr>
	</tbody>
</table>
