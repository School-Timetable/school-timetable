<script lang="ts">
	import type { SchoolClass } from "$model/school-class/school-class";
	import { editingId } from "$lib/stores/global_store";
	import { slide } from "svelte/transition";
	import { linear } from "svelte/easing";
	import ClassFormRow from "$lib/components/ClassFormRow.svelte";
	import FormSearch from "$lib/components/FormSearch.svelte";
	import { get } from "svelte/store";
	import { allClassrooms } from "$lib/stores/global_store";
	import type { FieldInfo } from "$model/model-generics";
	import TableList from "./TableList.svelte";

	let options = { duration: 200, easing: linear };

	let schoolClasses = get(allClassrooms);

	let filteredList = schoolClasses;

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
			alert("Class already exists");
			return;
		}
		const indexInFullList = schoolClasses.findIndex(
			(sc) => sc.id === newClass.id
		);
		if (indexInFullList != -1) {
			schoolClasses.splice(indexInFullList, 1, newClass);
		} else schoolClasses = [...schoolClasses, newClass];

		schoolClasses = schoolClasses;
		allClassrooms.set(schoolClasses);
		editingId.set(null);
	}

	function classAlreadyExists(
		schoolClass: SchoolClass,
		schoolClasses: SchoolClass[]
	): boolean {
		let exists = false;
		schoolClasses.forEach((sc) => {
			if (
				sc.id !== schoolClass.id &&
				sc.year.value === schoolClass.year.value &&
				sc.section.value === schoolClass.section.value &&
				sc.track?.value === schoolClass.track?.value
			) {
				exists = true;
			}
		});

		return exists;
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
</script>

<TableList
	items={schoolClasses}
	{fieldsInfo}
	itemsType="class"
	on:delete={(e) => removeClass(e.detail.value)}
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
		let:cloningItem
		schoolClass={cloningItem}
		on:save={(e) => saveSchoolClass(e.detail.schoolClass)}
		on:cancel={() => {
			editingId.set(null);
		}}
	/>
</TableList>
