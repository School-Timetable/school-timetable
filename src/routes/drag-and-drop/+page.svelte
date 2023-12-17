<script lang="ts">
	import Timetable from "$lib/components/timetable.svelte";
	import {
		allClassrooms,
		allProfessors,
		allSubjects,
	} from "$lib/stores/global_store";
	import { Professor } from "$model/professor/professor";
	import type { SchoolClass } from "$model/school-class/school-class";
	import type { Subject } from "$model/subject/subject";
	import {
		TimeTable,
		getClassTimetableOf,
		getProfessorTimetableOf,
	} from "$model/timetable/time-table";
	import { onMount } from "svelte";
	import { get } from "svelte/store";

	// prova

	let currentSidebar: Subject[] = [];

	export let professorView: boolean = false;
	export let selectedItem: Professor | SchoolClass | null = null;
	export let currentTimeTable: TimeTable | null = null;

	function setCurrentView(item: Professor | SchoolClass) {
		let timetable =
			item instanceof Professor
				? getProfessorTimetableOf(item)
				: getClassTimetableOf(item);
		currentTimeTable = timetable;
		selectedItem = item;

		if (item instanceof Professor)
			currentSidebar = get(allSubjects).filter(
				(subject) => subject.professor.id == item.id,
			);
		else
			currentSidebar = get(allSubjects).filter(
				(subject) => subject.schoolClass.id == item.id,
			);
	}

	function onViewSwitchClick() {
		professorView = !professorView;

		if (professorView) setCurrentView(get(allProfessors)[0]);
		else setCurrentView(get(allClassrooms)[0]);
	}

	onMount(() => {
		if (professorView) setCurrentView(get(allProfessors)[0]);
		else setCurrentView(get(allClassrooms)[0]);
	});
</script>

<div class="pt-3">
	<!--toggle professor view-->
	<div class="form-check form-switch">
		<input
			class="form-check-input"
			type="checkbox"
			id="flexSwitchCheckChecked"
			on:click={onViewSwitchClick}
			checked={professorView}
		/>
		<label class="form-check-label" for="flexSwitchCheckChecked"
			>Professor View</label
		>
	</div>

	<ul class="nav nav-tabs">
		{#each professorView ? $allProfessors : $allClassrooms as item}
			<li class="nav-item">
				<a
					class="nav-link"
					class:active={item == selectedItem}
					href="#"
					on:click={() => setCurrentView(item)}>{item.toString()}</a
				>
			</li>
		{/each}
	</ul>

	{#if currentTimeTable && selectedItem}
		<Timetable
			{selectedItem}
			{professorView}
			bind:grid={currentTimeTable}
			sidebar={currentSidebar}
		></Timetable>
	{/if}
</div>
