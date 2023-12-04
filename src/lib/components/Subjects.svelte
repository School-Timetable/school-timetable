<script lang="ts">
	import { allClassrooms } from "$lib/stores/global_store";
	import { allProfessors } from "$lib/stores/global_store";
	import type { Subject } from "$model/subject/subject";
	import SubjectFormRow from "./SubjectFormRow.svelte";
	import TableList from "./TableList.svelte";
	import { allSubjects, editingId, removeAllSubjectsFromStorage, removeSubjectFromStorage, saveObjectToStorage } from "$lib/stores/global_store";
	import { get } from "svelte/store";
	import type { FieldInfo } from "$model/model-generics";
	import MyModal from "$lib/components/MyModal.svelte";
	import MyCsvModal from "$lib/components/MyCsvModal.svelte";
	import { readCsv } from "$lib/stores/utils/read_csv_from_file";
	import { Alert } from "sveltestrap";
	let failedSubjects: string[] = []

	let showModal: boolean = false;
	let showCsvModal: boolean = false;
	let showDuplicateAlert = false;
	let showCsvImportAlert = false;

	let toggleDuplicateAlert = () => {
		showDuplicateAlert = !showDuplicateAlert;
	};

	let toggleCsvImportAlert = () => {
		showCsvImportAlert = !showCsvImportAlert;
	}

	$: if (failedSubjects.length > 0){
		toggleCsvImportAlert()
	}

	$: if (showCsvImportAlert) {
		setTimeout(() => {
			resetCsvImportAlert()
		}, failedSubjects.length*20000)
	}

	function resetCsvImportAlert() {
		showCsvImportAlert = false
		failedSubjects.length = 0
	}

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
			if (!showDuplicateAlert) 
				toggleDuplicateAlert();
			return;
		}

		const index = get(allSubjects).findIndex((i) => i.id === subject.id);

		if (index != -1) 
			saveObjectToStorage(subject, index);
		else 
			saveObjectToStorage(subject);

		if (showDuplicateAlert) 
			toggleDuplicateAlert();

		editingId.set(null);
	}

	function removeSubject(item: Subject) {
		removeSubjectFromStorage(item);
	}

	function removeAllItems() {
		removeAllSubjectsFromStorage();
	}

	function subjectAlreadyExists(subject: Subject): boolean {
		return get(allSubjects).some((s) => {
			return (
				s.id !== subject.id &&
				s.schoolClass.toString().toLowerCase() === subject.schoolClass.toString().toLowerCase() &&
				s.professor.toString().toLowerCase() === subject.professor.toString().toLowerCase() &&
				s.abbreviation.value.toLowerCase() === subject.abbreviation.value.toLowerCase() &&
				s.name.value.toLowerCase() === subject.name.value.toLowerCase() &&
				s.weight.value === subject.weight.value &&
				s.hoursPerWeek.value === subject.hoursPerWeek.value
			);
		});
	}

	function handleConfirmCsvSubmission(event: { detail: any; }) {
        const file = event.detail;
		resetCsvImportAlert()
		readCsv(file, 'subject').then((result) => {
			const subjects = result[0] as Subject[];
			failedSubjects = result[1] as string[];
			subjects.forEach((subject) => {
				if (!subjectAlreadyExists(subject)) {
					saveSubject(subject);
				}
			});
		});
    }
</script>

<!-- svelte-ignore missing-declaration -->
<TableList
	items={$allSubjects}
	{fieldsInfo}
	itemsType="subject"
	on:delete={(e) => removeSubject(e.detail.value)}
	on:deleteAll={() => {
		showModal = true;
	}}
	on:importFromCsv={() => {
		showCsvModal = true;
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
<MyCsvModal bind:showCsvModal on:confirmCsvSubmission={handleConfirmCsvSubmission}>
	<h2 slot="header">Import subjects from CSV</h2>
	<p slot="body">Please select a CSV file with the following columns: <br> Year, Section, and Track of the class, Name, Surname, and Email of the professor, Abbreviation, Name, Weight, and Hours .</p>
</MyCsvModal>
<Alert color="warning" isOpen={showDuplicateAlert} {toggleDuplicateAlert}>
	You are trying to add a subject that already exists! Please check whether
	the fields are unique.
</Alert>
<Alert color="warning" isOpen={showCsvImportAlert} toggle={toggleCsvImportAlert} style="white-space: pre-line">
	{failedSubjects.length} subjects failed to import. Please check the CSV file.
	The failed entries are:
	{failedSubjects.join("\n")}
</Alert>
