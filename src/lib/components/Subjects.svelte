<script lang="ts">
	import type { Subject } from "$model/subject/subject";
	import SubjectFormRow from "./SubjectFormRow.svelte";
	import TableList from "./TableList.svelte";
    import { allSubjects, editingId } from "$lib/stores/global_store";
    import { get } from "svelte/store";
    import type { FieldInfo } from "$model/model-generics";
    import Modal from "./Modal.svelte";
	
	let subjects = get(allSubjects)

	let showModal: boolean = false

	let fieldsInfo: FieldInfo[] = [
		{ fieldName: "schoolClass", label: "Class", columns: 2 },
		{ fieldName: "professor", label: "Professor", columns: 2 },
		{ fieldName: "abbreviation", label: "Abbreviation", columns: 2 },
		{ fieldName: "name", label: "Name", columns: 2 },
		{ fieldName: "weight", label: "Weight", columns: 1 },
		{ fieldName: "hoursPerWeek", label: "Hours", columns: 1 },
	];

	function saveSubject(subject: Subject, index?: number) {
		if (index != undefined && isIndexValid(index)) {
			subjects[index] = subject;
		} else {
			subjects.push(subject);
		}
		editingId.set(null);
		allSubjects.set(subjects);
		subjects = subjects;
	}

	function removeSubject(item: Subject) {
		let tmp = subjects.filter((i) => i.id != item.id);
		allSubjects.set(tmp);
		subjects = tmp;		
	}

	function isIndexValid(index: number): boolean {
		return 0 <= index && index < subjects.length;
	}

	function removeAllItems() {
		subjects = [];
		allSubjects.set(subjects);
	}
	
</script>

<!-- svelte-ignore missing-declaration -->
<TableList items={subjects} {fieldsInfo} itemsType="subject" 
	on:delete={(e) => removeSubject(e.detail.value)}
	on:deleteAll={() => { showModal = true }}
>
	<SubjectFormRow
		slot="edit"
		let:item
		let:index
		subject={item}
		on:save={(e) => saveSubject(e.detail.subject, index)}
		on:cancel={() => {
			editingId.set(null);
		}}
	/>
	<SubjectFormRow
		slot="create"
		on:save={(e) => saveSubject(e.detail.subject)}
		on:cancel={() => {
			editingId.set(null);
		}}
	/>
</TableList>

<Modal bind:showModal on:confirm={removeAllItems}>
	<h2 slot="header">
		Delete all subjects
	</h2>
	<p slot="body">
		Are you sure you want to delete all subjects?
</Modal>