<script lang="ts">
	import type { Subject } from "$model/subject/subject";
	import SubjectFormRow from "./SubjectFormRow.svelte";
	import TableList from "./TableList.svelte";
	import { allSubjects, editingId } from "$lib/stores/global_store";
	import { get } from "svelte/store";
	import type { FieldInfo } from "$model/model-generics";
	import MyModal from "$lib/components/MyModal.svelte";
	import { Alert } from "sveltestrap";

	let subjects = get(allSubjects);

	let showModal: boolean = false;
	let showDuplicateAlert = false;
	let toggle = () => {
		showDuplicateAlert = !showDuplicateAlert;
	};

	let fieldsInfo: FieldInfo[] = [
		{ fieldName: "schoolClass", label: "Class", columns: 2 },
		{ fieldName: "professor", label: "Professor", columns: 2 },
		{ fieldName: "abbreviation", label: "Abbreviation", columns: 2 },
		{ fieldName: "name", label: "Name", columns: 2 },
		{ fieldName: "weight", label: "Weight", columns: 1 },
		{ fieldName: "hoursPerWeek", label: "Hours", columns: 1 },
	];

	function saveSubject(subject: Subject) {
		if (subjectAlreadyExists(subject)) {
			if (!showDuplicateAlert) toggle();
			return;
		}
		const index = subjects.findIndex((i) => i.id === subject.id);
		if (index != -1) subjects[index] = subject;
		else subjects.push(subject);

		if (showDuplicateAlert) toggle();
		editingId.set(null);
		allSubjects.set(subjects);
		subjects = subjects;
	}

	function removeSubject(item: Subject) {
		let tmp = subjects.filter((i) => i.id != item.id);
		allSubjects.set(tmp);
		subjects = tmp;
	}

	function removeAllItems() {
		subjects = [];
		allSubjects.set(subjects);
	}

	function subjectAlreadyExists(subject: Subject): boolean {
		return subjects.some((s) => {
			return (
				s.id !== subject.id &&
				s.schoolClass.toString().toLowerCase() ===
					subject.schoolClass.toString().toLowerCase() &&
				s.professor.toString().toLowerCase() ===
					subject.professor.toString().toLowerCase() &&
				s.abbreviation.value.toLowerCase() ===
					subject.abbreviation.value.toLowerCase() &&
				s.name.value.toLowerCase() ===
					subject.name.value.toLowerCase() &&
				s.weight.value === subject.weight.value &&
				s.hoursPerWeek.value === subject.hoursPerWeek.value
			);
		});
	}
</script>

<!-- svelte-ignore missing-declaration -->
<TableList
	items={subjects}
	{fieldsInfo}
	itemsType="subject"
	on:delete={(e) => removeSubject(e.detail.value)}
	on:deleteAll={() => {
		showModal = true;
	}}
>
	<SubjectFormRow
		slot="edit"
		let:item
		subject={item}
		on:save={(e) => saveSubject(e.detail.subject)}
		on:cancel={() => {
			editingId.set(null);
		}}
	/>
	<SubjectFormRow
		slot="create"
		let:item
		let:cloning
		subject={item}
		{cloning}
		on:save={(e) => saveSubject(e.detail.subject)}
		on:cancel={() => {
			editingId.set(null);
		}}
	/>
</TableList>

<MyModal bind:showModal on:confirm={removeAllItems}>
	<h2 slot="header">Delete all subjects</h2>
	<p slot="body">Are you sure you want to delete all subjects?</p>
</MyModal>
<Alert color="warning" isOpen={showDuplicateAlert} {toggle}>
	You are trying to add a subject that already exists! Please check whether
	the fields are unique.
</Alert>
