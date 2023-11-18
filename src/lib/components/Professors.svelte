<script lang="ts">
	import { allProfessors, editingId } from "$lib/stores/global_store";
	import type { Professor } from "$model/professor/professor";
	import { get } from "svelte/store";
	import TableList from "./TableList.svelte";
	import ProfessorFormRow from "./ProfessorFormRow.svelte";
	import type { FieldInfo } from "$model/model-generics";

	let items = get(allProfessors);

	function save(item: Professor, index?: number) {
		if (index != undefined && index >= 0 && index < items.length)
			items[index] = item;
		else items.push(item);
		editingId.set(null);
		allProfessors.set(items);
		items = items;
	}

	let fieldsInfo: FieldInfo[] = [
		{ fieldName: "name", label: "Name", columns: 2 },
		{ fieldName: "surname", label: "Surname", columns: 2 },
		{ fieldName: "email", label: "Email", columns: 3 },
		{ fieldName: "cellPhone", label: "Cell Phone", columns: 3 },
	];
</script>

<TableList {items} {fieldsInfo}>
	<ProfessorFormRow
		slot="edit"
		let:item
		let:index
		professor={item}
		on:save={(e) => save(e.detail.professor, index)}
		on:cancel={() => {
			editingId.set(null);
		}}
	/>
	<ProfessorFormRow
		slot="create"
		on:save={(e) => save(e.detail.professor)}
		on:cancel={() => {
			editingId.set(null);
		}}
	/>
</TableList>
