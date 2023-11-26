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
	import { Alert } from "sveltestrap";

	let options = { duration: 200, easing: linear };

	let showModal = false;
	let showDuplicateAlert = false;
	let toggle = () => {
		showDuplicateAlert = !showDuplicateAlert;
	};

	let fieldsInfo: FieldInfo[] = [
		{ fieldName: "year", label: "Year", columns: 3 },
		{ fieldName: "section", label: "Section", columns: 3 },
		{ fieldName: "track", label: "Track", columns: 4 },
	];

	function saveSchoolClass(newClass: SchoolClass) {
		if (classAlreadyExists(newClass)) {
			if (!showDuplicateAlert) 
				toggle();
			return;
		}

		const indexInFullList = get(allClassrooms).findIndex((sc) => sc.id === newClass.id);

		if (indexInFullList != -1)
			saveObjectToStorage(newClass, indexInFullList);
		else 
			saveObjectToStorage(newClass);

		if (showDuplicateAlert) toggle();

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

</script>

<TableList
	items={$allClassrooms}
	{fieldsInfo}
	itemsType="class"
	on:delete={(e) => removeClass(e.detail.value)}
	on:deleteAll={() => {
		showModal = true;
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
<Alert color="warning" isOpen={showDuplicateAlert} {toggle}>
	You are trying to add a class that already exists! Please check whether the
	fields are unique.
</Alert>
