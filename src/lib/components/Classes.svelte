<script lang="ts">
	import type { SchoolClass } from "$model/school-class/school-class";
	import { editingId, removeAllClassesFromStorage, removeSchoolClassFromStorage, saveObjectToStorage } from "$lib/stores/global_store";
	import { slide } from "svelte/transition";
	import { linear } from "svelte/easing";
	import ClassFormRow from "$lib/components/ClassFormRow.svelte";
	import { get } from "svelte/store";
	import { allClassrooms } from "$lib/stores/global_store";
	import type { FieldInfo } from "$model/model-generics";
	import TableList from "./TableList.svelte";
	import MyModal from "$lib/components/MyModal.svelte";
	import MyCsvModal from "$lib/components/MyCsvModal.svelte";
	import { readCsv } from "$lib/stores/utils/read_csv_from_file";
	import { Alert } from "sveltestrap";

	let options = { duration: 200, easing: linear };
	let failedClasses: string[] = []

	let showModal = false;
	let showCsvModal = false; 
	let showDuplicateAlert = false;
	let showCsvImportAlert = false;

	$: if(failedClasses.length > 0) {
		showCsvImportAlert = true
	}

	$: if (showCsvImportAlert) {
		setTimeout(() => {
			resetCsvImportAlert()
		}, failedClasses.length*10000)
	}
	function resetCsvImportAlert() {
		showCsvImportAlert = false
		failedClasses.length = 0
	}


	const toggleDuplicateAlert = () => {
		showDuplicateAlert = !showDuplicateAlert
	};

	const toggleCsvImportAlert = () => {
		showCsvImportAlert = !showCsvImportAlert
	}

	let fieldsInfo: FieldInfo[] = [
		{ fieldName: "year", label: "Year", columns: 3 },
		{ fieldName: "section", label: "Section", columns: 3 },
		{ fieldName: "track", label: "Track", columns: 4 },
	];

	function saveSchoolClass(newClass: SchoolClass) {
		if (classAlreadyExists(newClass)) {
			if (!showDuplicateAlert) 
				toggleDuplicateAlert();
			return;
		}

		const indexInFullList = get(allClassrooms).findIndex((sc) => sc.id === newClass.id);

		if (indexInFullList != -1)
			saveObjectToStorage(newClass, indexInFullList);
		else 
			saveObjectToStorage(newClass);

		if (showDuplicateAlert) toggleDuplicateAlert();

		editingId.set(null);
	}

	function classAlreadyExists(
		schoolClass: SchoolClass
	): boolean {
		return get(allClassrooms).some((old) => {
			return (
				old.id !== schoolClass.id &&
				old.year.value === schoolClass.year.value &&
				old.section.value === schoolClass.section.value &&
				old.track?.value.toLocaleUpperCase() ===
					schoolClass.track?.value.toLocaleUpperCase()
			);
		});
	}

	function removeClass(schoolClass: SchoolClass) {
		if(!removeSchoolClassFromStorage(schoolClass)) {
			alert("classroom cannot be removed");
			// TODO Improve alert
			// Avoid deleting of row when it is not confirmed
		}
	}

	function removeAllItems() {
		removeAllClassesFromStorage();
	}

	function handleConfirmCsvSubmission(event: { detail: any; }) {
        const file = event.detail;
		resetCsvImportAlert()
		readCsv(file, 'class').then((result) => {
			const classes = result[0] as SchoolClass[];
			failedClasses = result[1] as string[];
			classes.forEach((schoolClass) => {
				if (!classAlreadyExists(schoolClass)) {
					saveSchoolClass(schoolClass);
				}
			});
		});
    }

</script>

<TableList
	items={$allClassrooms}
	{fieldsInfo}
	itemsType="class"
	on:delete={(e) => removeClass(e.detail.value)}
	on:deleteAll={() => {
		showModal = true;
	}}
	on:importFromCsv={() => {
		showCsvModal = true;
	}}
>
	<ClassFormRow
		slot="edit"
		let:item
		schoolClass={item}
		on:save={(e) => saveSchoolClass(e.detail.schoolClass)}
		on:cancel={() => {
			editingId.set(null);
		}}
	/>
	<ClassFormRow
		slot="create"
		let:item
		let:cloning
		schoolClass={item}
		{cloning}
		on:save={(e) => saveSchoolClass(e.detail.schoolClass)}
		on:cancel={() => {
			editingId.set(null);
		}}
	/>
</TableList>

<MyModal bind:showModal on:confirm={removeAllItems}>
	<h2 slot="header">Delete all classes</h2>
	<p slot="body">
		Are you sure you want to delete all classes? All subjects will be
		deleted too!
	</p>
</MyModal>
<MyCsvModal bind:showCsvModal on:confirmCsvSubmission={handleConfirmCsvSubmission}>
	<h2 slot="header">Import class from CSV</h2>
	<p slot="body">Please select a CSV file with the following columns: <br> Year, Section, and Track.</p>
</MyCsvModal>
<Alert color="warning" isOpen={showDuplicateAlert} toggle={toggleDuplicateAlert}>
	You are trying to add a class that already exists! Please check whether the
	fields are unique.
</Alert>
<Alert color="warning" isOpen={showCsvImportAlert} toggle={toggleCsvImportAlert} style="white-space: pre-line">
	{failedClasses.length} classes failed to import. Please check the CSV file.
	The classes are:{"\n"+failedClasses.join("\n")}
</Alert>
