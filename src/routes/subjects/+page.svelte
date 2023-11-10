<script lang="ts">
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

	let subjects: Subject[] = [
		Subject.of("Math", "Math", 7, 10),
		Subject.of("English", "Eng", 5, 12),
		Subject.of("Science", "Sci", 5, 8),
	];

	let editingSubjectID: number | null = null;
	let editingSubject: Subject | null = null;

	editingSubject = subjects[0];

	function editSubject(subject: Subject) {
		editingSubjectID = subjects.indexOf(subject);
		editingSubject = new Subject(
			subject.schoolClass,
			subject.professor,
			subject.name,
			subject.abbreviation,
			subject.hoursPerWeek,
			subject.weight
		);
	}
</script>

<h1>Subjects</h1>

<table>
	<thead>
		<tr>
			<th>Class</th>
			<th>Teacher</th>
			<th>Abbreviation</th>
			<th>Name</th>
			<th>Hours per week</th>
			<th>Weight</th>
			<th>Actions</th>
		</tr>
	</thead>
	<tbody>
		{#each subjects as subject, index}
			{#if editingSubjectID !== index}
				<tr>
					<td>{subject.schoolClass}</td>
					<td>{subject.professor}</td>
					<td>{subject.abbreviation}</td>
					<td>{subject.name}</td>
					<td>{subject.hoursPerWeek}</td>
					<td>{subject.weight}/10</td>
					<td>
						<Button
							color="primary"
							on:click={() => editSubject(subject)}
						>
							Edit <Icon name="pencil-square" />
						</Button>
						<Button color="danger">
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
						/>
					</td>
					<td>
						<Label for="teacher">Teacher</Label>
						<Input
							type="select"
							label="teacher"
							name="teacher"
							id="teacher"
							bind:value={editingSubject.professor}
						/>
					</td>
					<td>
						<Label for="abbreviation">Abbreviation</Label>
						<Input
							type="text"
							label="abbreviation"
							name="abbreviation"
							id="abbreviation"
							bind:value={editingSubject.abbreviation}
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
				</tr>
			{/if}
		{/each}
	</tbody>
</table>
