<script lang="ts">
	import { hoursPerWeekSchema } from "../../model/primitives/subject/hours-per-week";
	import { Subject } from "../../model/subject";

	let subjects: Subject[] = [
		Subject.of("Math", "Math", 7, 10),
		Subject.of("English", "Eng", 5, 12),
		Subject.of("Science", "Sci", 5, 8),
	];
</script>

<h1>Subjects</h1>

<table>
	<tr>
		<th>Class</th>
		<th>Teacher</th>
		<th>Abbreviation</th>
		<th>Name</th>
		<th>Hours per week</th>
		<th>Weight</th>
	</tr>
	{#each subjects as subject}
		<tr>
			<td>{subject.schoolClass}</td>
			<td>{subject.teacher}</td>
			<td>{subject.abbreviation}</td>
			<td>{subject.name}</td>
			<td>{subject.hoursPerWeek}</td>
			<td>{subject.weight}/10</td>
		</tr>
	{/each}
</table>
