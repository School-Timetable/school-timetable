<script lang="ts">
	import {
		allProfessors,
		editingId,
        removeAllProfessorsFromStorage,
        removeProfessorFromStorage,
        saveObjectToStorage,
	} from "$lib/stores/global_store";
	import type { Professor } from "$model/professor/professor";
	import { get } from "svelte/store";
	import TableList from "./TableList.svelte";
	import ProfessorFormRow from "./ProfessorFormRow.svelte";
	import type { FieldInfo } from "$model/model-generics";
	import MyModal from "$lib/components/MyModal.svelte";
	import MyCsvModal from "$lib/components/MyCsvModal.svelte";
	import { readCsv } from "$lib/stores/utils/read_csv_from_file";
	import {
		Alert,
		Modal,
		ModalBody,
		ModalFooter,
		ModalHeader,
	} from "sveltestrap";
	let showModal = false;
	let showCsvModal = false; 
	let showDuplicateAlert = false;
	let failedProfessors: string[] = []
	let showCsvImportAlert = false

	$: if(failedProfessors.length > 0) {
		showCsvImportAlert = true
	}

	$: if (showCsvImportAlert) {
		setTimeout(() => {
			resetCsvImportAlert()
		}, failedProfessors.length*10000)
	}
	function resetCsvImportAlert() {
		showCsvImportAlert = false
		failedProfessors.length = 0
	}


	const toggleDuplicateAlert = () => {
		showDuplicateAlert = !showDuplicateAlert
	};

	const toggleCsvImportAlert = () => {
		showCsvImportAlert = !showCsvImportAlert
	}

	function save(item: Professor) {
		if (professorAlreadyExists(item)) {
			if (!showDuplicateAlert) toggleDuplicateAlert();
			return;
		}

		const index = get(allProfessors).findIndex((i) => i.id === item.id);
		if (index != -1) 
			saveObjectToStorage(item, index);
		else 
			saveObjectToStorage(item);

		if (showDuplicateAlert) toggleDuplicateAlert();

		editingId.set(null);
	}

	function removeItem(item: Professor): void {
		if(!removeProfessorFromStorage(item)) {
			// TODO Improve message
			alert("prof cannot be removed");
		}
	}

	let fieldsInfo: FieldInfo[] = [
		{ fieldName: "name", label: "Name", columns: 2 },
		{ fieldName: "surname", label: "Surname", columns: 2 },
		{ fieldName: "email", label: "Email", columns: 3 },
		{ fieldName: "cellPhone", label: "Cell Phone", columns: 3 },
	];

	function removeAllItems() {
		removeAllProfessorsFromStorage();
	}

	function professorAlreadyExists(professor: Professor): boolean {
		return get(allProfessors).some((old) => {
			return (
				old.id !== professor.id &&
				old.name.valueUppercase === professor.name.valueUppercase &&
				old.surname.valueUppercase === professor.surname.valueUppercase &&
				old.email.value === professor.email.value
			);
		});
	}

	function handleConfirmCsvSubmission(event: { detail: any; }) {
        const file = event.detail;
		resetCsvImportAlert()
		readCsv(file, 'professor').then((result) => {
			const professors = result[0] as Professor[];
			failedProfessors = result[1] as string[];
			professors.forEach((professor) => {
				if (!professorAlreadyExists(professor)) {
					save(professor);
				}
			});
		});
    }

	function addProfessor(professor: Professor) {
		const professors = get(allProfessors);
		professors.push(professor);
		allProfessors.set(professors);
	}
</script>

<TableList
	items={$allProfessors}
	{fieldsInfo}
	itemsType="professor"
	on:delete={(e) => removeItem(e.detail.value)}
	on:deleteAll={() => {
		showModal = true;
	}}
	on:importFromCsv={() => {
		showCsvModal = true;
	}}
>
	<ProfessorFormRow
		slot="edit"
		let:item
		let:index
		professor={item}
		on:save={(e) => save(e.detail.professor)}
		on:cancel={() => {
			editingId.set(null);
		}}
	/>
	<ProfessorFormRow
		slot="create"
		let:item
		let:cloning
		professor={item}
		{cloning}
		on:save={(e) => save(e.detail.professor)}
		on:cancel={() => {
			editingId.set(null);
		}}
	/>
</TableList>

<MyModal bind:showModal on:confirm={removeAllItems}>
	<h2 slot="header">Delete all professors</h2>
	<p slot="body">
		Are you sure you want to delete all professors? All subjects will be
		deleted too!
	</p>
</MyModal>
<MyCsvModal bind:showCsvModal on:confirmCsvSubmission={handleConfirmCsvSubmission}>
	<h2 slot="header">Import professors from CSV</h2>
	<p slot="body">Please select a CSV file with the following columns: <br> Name, Surname, Email, and Cellphone.</p>
</MyCsvModal>
<Alert color="warning" isOpen={showDuplicateAlert} toggle={toggleDuplicateAlert}>
	You are trying to add a professor that already exists! Please check the
	name, surname and email.
</Alert>
<Alert color="warning" isOpen={showCsvImportAlert} toggle="{toggleCsvImportAlert}" style="white-space: pre-line">
	{failedProfessors.length} professors failed to import. Please check the CSV file.
	The failed entries are:
	{failedProfessors.join("\n")}
</Alert>
