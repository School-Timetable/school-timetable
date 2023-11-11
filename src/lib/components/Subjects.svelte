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

	let professor = new Professor(
		new ProfessorName("Mario"),
		new Surname("Rossi"),
		new Mail("mario.rossi@gmail.com"),
		new Cellphone("3331234567")
	);

	let schoolClass = SchoolClass.of(69, 5, "A");

	let subjects: Subject[] = [
		Subject.of(schoolClass, professor, "Math", "Math", 7, 13),
		Subject.of(schoolClass, professor, "English", "Eng", 5, 9),
		Subject.of(schoolClass, professor, "Science", "Sci", 5, 8),
	];

	let editingSubjectIndex: number | null = null;
	let editingSubject: SubjectFormData | null = null;

	type SubjectFormData = {
		_schoolClass: SchoolClass;
		_professor: Professor;
		_name: { value: string };
		_abbreviation: { value: string };
		_weight: { value: number };
		_hoursPerWeek: { value: number };
	};

	function editSubject(subject: Subject) {
		editingSubjectIndex = subjects.indexOf(subject);
		editingSubject = {
			_schoolClass: subject.schoolClass,
			_professor: subject.professor,
			_name: { value: subject.name.value },
			_abbreviation: { value: subject.abbreviation.value },
			_weight: { value: subject.weight.value },
			_hoursPerWeek: { value: subject.hoursPerWeek.value },
		};
		subjects = subjects;
	}

	function createNewSubject() {
		if (editingSubjectIndex !== null) {
			cancelEditSubject();
		}
		editingSubject = {
			_schoolClass: schoolClass,
			_professor: professor,
			_name: { value: "" },
			_abbreviation: { value: "" },
			_weight: { value: 1 },
			_hoursPerWeek: { value: 0 },
		};
		subjects = subjects;
	}

	function saveSubject() {
		if (!editingSubject) return;

		try {
			const savedSubject = Subject.of(
				editingSubject._schoolClass,
				editingSubject._professor,
				editingSubject._name.value,
				editingSubject._abbreviation.value,
				editingSubject._weight.value,
				editingSubject._hoursPerWeek.value
			);
			if (editingSubjectIndex == null) {
				subjects.push(savedSubject);
			} else {
				subjects[editingSubjectIndex] = savedSubject;
			}
			editingSubjectIndex = null;
			editingSubject = null;
			subjects = subjects;
		} catch (e) {
			if (e instanceof ZodError) {
				alert(e.issues.map((issue) => issue.message).join("\n"));
			}
			return;
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
								bind:value={editingSubject._schoolClass}
							>
								<option value={schoolClass}
									>{schoolClass}</option
								>
							</Input>
						</td>
						<td>
							<Label for="professor">Professor</Label>
							<Input
								type="select"
								label="professor"
								name="professor"
								id="professor"
								bind:value={editingSubject._professor}
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
								bind:value={editingSubject._abbreviation.value}
							/>
						</td>
						<td>
							<Label for="name">Name</Label>
							<Input
								type="text"
								label="name"
								name="name"
								id="name"
								bind:value={editingSubject._name.value}
							/>
						</td>
						<td>
							<Label for="weight">Weight</Label>
							<Input
								type="number"
								label="weight"
								name="weight"
								id="weight"
								bind:value={editingSubject._weight.value}
								min="1"
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
								bind:value={editingSubject._hoursPerWeek.value}
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

			{#if editingSubject && editingSubjectIndex == null}
				<tr>
					<td>
						<Label for="schoolClass">Class</Label>
						<Input
							type="select"
							label="schoolClass"
							name="schoolClass"
							id="schoolClass"
							bind:value={editingSubject._schoolClass}
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
							bind:value={editingSubject._professor}
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
							bind:value={editingSubject._abbreviation.value}
						/>
					</td>
					<td>
						<Label for="name">Name</Label>
						<Input
							type="text"
							label="name"
							name="name"
							id="name"
							bind:value={editingSubject._name.value}
						/>
					</td>
					<td>
						<Label for="weight">Weight</Label>
						<Input
							type="number"
							label="weight"
							name="weight"
							id="weight"
							bind:value={editingSubject._weight.value}
							min="1"
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
							bind:value={editingSubject._hoursPerWeek.value}
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
