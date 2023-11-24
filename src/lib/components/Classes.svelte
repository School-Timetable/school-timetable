<script lang="ts">
	import type { SchoolClass } from "$model/school-class/school-class";
	import { allSubjects, editingId } from "$lib/stores/global_store";
	import { slide } from "svelte/transition";
	import { linear } from "svelte/easing";
	import ClassFormRow from "$lib/components/ClassFormRow.svelte";
	import FormSearch from "$lib/components/FormSearch.svelte";
	import { get } from "svelte/store";
	import { allClassrooms } from "$lib/stores/global_store";
	import type { FieldInfo } from "$model/model-generics";
	import TableList from "./TableList.svelte";
	import MyModal from "$lib/components/MyModal.svelte";
	import {Alert} from "sveltestrap";

	let options = { duration: 200, easing: linear };

	let schoolClasses = get(allClassrooms);

	let filteredList = schoolClasses;

	let showModal = false;
	let showDuplicateAlert = false;
	let toggle = () => {
		showDuplicateAlert = !showDuplicateAlert;
	}

	function editSchoolClass(id: string) {
		editingId.set(id);
	}

	let fieldsInfo: FieldInfo[] = [
		{ fieldName: "year", label: "Year", columns: 3 },
		{ fieldName: "section", label: "Section", columns: 3 },
		{ fieldName: "track", label: "Track", columns: 4 },
	];

	function addSchoolClass() {
		editingId.set("");
	}

	const createSchoolClass = (event: { detail: any }) => {
		const newClass = event.detail.schoolClass;
		if (classAlreadyExists(newClass, schoolClasses)) {
			alert("Class already exists");
			return;
		}
		schoolClasses = [...schoolClasses, newClass];
		allClassrooms.set(schoolClasses);
		editingId.set(null);
	};

	function saveSchoolClass(newClass: SchoolClass) {
		if (classAlreadyExists(newClass, schoolClasses)) {
			if (!showDuplicateAlert)
				toggle()
			return
		}
		const indexInFullList = schoolClasses.findIndex(
			(sc) => sc.id === newClass.id
		);
		if (indexInFullList != -1) {
			schoolClasses.splice(indexInFullList, 1, newClass);
		} else schoolClasses = [...schoolClasses, newClass];
		if (showDuplicateAlert)
			toggle()
		schoolClasses = schoolClasses;
		allClassrooms.set(schoolClasses);
		editingId.set(null);
	}

	function classAlreadyExists(
		schoolClass: SchoolClass,
		schoolClasses: SchoolClass[]
	): boolean {
		return schoolClasses.some((old) => {
			return (old.id !== schoolClass.id &&
					old.year.value === schoolClass.year.value &&
					old.section.value === schoolClass.section.value &&
					old.track?.value.toLocaleUpperCase() === schoolClass.track?.value.toUpperCase()
			)
		})
	}

	const manageSearchResults = (event: { detail: any }) => {
		filteredList = event.detail.searchResults;
	};

	function removeClass(schoolClass: SchoolClass) {
		const index = getIndexById(schoolClass.id);
		schoolClasses.splice(index, 1);
		schoolClasses = schoolClasses;
		allClassrooms.set(schoolClasses);
	}

	function getIndexById(id: string): number {
		return schoolClasses.findIndex((sc) => sc.id === id);
	}

	function removeAllItems() {
		schoolClasses = [];
		allClassrooms.set(schoolClasses);
		allSubjects.set([]);
	}

</script>

<TableList
	items={schoolClasses}
	{fieldsInfo}
	itemsType="class"
	on:delete={(e) => removeClass(e.detail.value)}
	on:deleteAll={() => { showModal = true }}
>
	<ClassFormRow
		slot="edit"
		let:item
		let:index
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
		cloning={cloning}
		on:save={(e) => saveSchoolClass(e.detail.schoolClass)}
		on:cancel={() => {
			editingId.set(null);
		}}
	/>
</TableList>

<MyModal bind:showModal on:confirm={removeAllItems}>
	<h2 slot="header">
		Delete all classes
	</h2>
	<p slot="body">
		Are you sure you want to delete all classes? All subjects will be deleted too!
	</p>
</MyModal>
<Alert color="warning" isOpen={showDuplicateAlert} toggle={toggle}>
	You are trying to add a class that already exists! Please check whether the fields are unique.
</Alert>