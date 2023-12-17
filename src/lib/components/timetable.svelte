<script lang="ts">
	import { stringToSubject, Subject } from "$model/subject/subject";
	import Hour from "$lib/components/hour.svelte";
	import {
		clearAll,
		removeAllOf,
		removeSubject,
		TimeTable,
	} from "$model/timetable/time-table";
	import { Unavailable } from "$model/timetable/unavailable";
	import type { SchoolClass } from "$model/school-class/school-class";
	import type { Professor } from "$model/professor/professor";
	import Grid from "./Grid.svelte";
	import {
		allProfessors,
		allSubjects,
		theme,
	} from "$lib/stores/global_store";
	import { darkThemeColors, lightThemeColors } from "$lib/colors";
	import AspSolverButtons from "./AspSolverButtons.svelte";
	import { get } from "svelte/store";
	import WeakConstraintsWidget from "./WeakConstraintsWidget.svelte";

	export let grid: TimeTable;
	export let sidebar: Subject[];
	export let professorView: boolean;
	export let selectedItem: Professor | SchoolClass;
	let realGrid: Grid;

	let currentColors: readonly string[] = lightThemeColors;

	// Map<subject.id, color>
	export let subjectColors: Map<string, string> = new Map();

	$: sidebar && onSidebarChange();

	const onSidebarChange = () => {
		let index = 0;
		subjectColors.clear();
		sidebar.forEach((subject) =>
			subjectColors.set(
				subject.id,
				currentColors[index++ % currentColors.length],
			),
		);
	};

	theme.subscribe((value) => {
		if (value == "light") {
			currentColors = lightThemeColors;
		} else if (value == "dark") {
			currentColors = darkThemeColors;
		} else {
			currentColors = darkThemeColors; // todo: detect auto theme and set colors consequently
		}
		let index = 0;
		subjectColors.clear();
		sidebar.forEach((subject) =>
			subjectColors.set(
				subject.id,
				currentColors[index++ % currentColors.length],
			),
		);
		refresh();
	});

	function sideBarDrop(event: any) {
		const subject = stringToSubject(event.dataTransfer.getData("subject"));

		const id = event.dataTransfer.getData("id");
		const pos = id.split(",");
		removeSubject(
			Number.parseInt(pos[1]),
			Number.parseInt(pos[0]),
			subject,
		);
		grid = grid;
		sidebar = sidebar;
	}

	function getSubjectColor(item: Subject | null | Unavailable) {
		if (item == null || item instanceof Unavailable) return "transparent";
		return subjectColors!.get(item.id);
	}

	function getRemainingHours(subject: Subject) {
		return subject.hoursPerWeek.value - grid.getCountOf(subject);
	}

	export function refresh() {
		sidebar = sidebar;
	}

	function clearWorkspace() {
		get(allSubjects).forEach((s) => {
			removeAllOf(s);
		});
		grid = grid;
		refresh();
	}
</script>

<div class="container-fluid">
	<div class="row flex-nowrap">
		<!--sidebar-->
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<div class="col-3 col-lg-2 pt-2">

			<h5>Subjects</h5>
			<ul
				class="list-group my-2"
				on:dragover={(event) => event.preventDefault()}
				on:drop={(event) => sideBarDrop(event)}
			>
				{#each sidebar as item, itemIndex}
					<li
						class="list-group-item d-flex justify-content-between align-items-center p-1"
					>
						<div class="w-100">
							<Hour
								on:hourDrag={() => realGrid.onSubjectDrag(item)}
								on:dragend={realGrid.onSubjectDragEnd}
								isProfessorView={professorView}
								color={getSubjectColor(item)}
								droppable={false}
								draggable={getRemainingHours(item) > 0}
								id="prova"
								subject={item}
								on:hourDrop={(event) => {}}
							></Hour>
						</div>
						<span class="badge bg-primary rounded-pill position-absolute translate-middle shadow border border-light">
							{item.hoursPerWeek.value - grid.getCountOf(item)}
						</span>
					</li>
				{/each}
			</ul>
			<div>
				<WeakConstraintsWidget />
			</div>
		</div>

		<!--grid-->
		<div class="col ps-2 pt-2" style="overflow-x: auto;">
			<Grid
				bind:timeTable={grid}
				{professorView}
				{selectedItem}
				{subjectColors}
				bind:this={realGrid}
				callback={refresh}
			></Grid>

			<AspSolverButtons
				on:reload={() => grid = grid}
				on:clear={clearWorkspace}
			></AspSolverButtons>

		</div>
	</div>
</div>

<style>
</style>
