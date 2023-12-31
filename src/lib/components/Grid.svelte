<script lang="ts">
	import { onMount } from "svelte";
	import type { TimeTable } from "$model/timetable/time-table";
	import type { SchoolClass } from "$model/school-class/school-class";
	import type { Professor } from "$model/professor/professor";
	import {
		changeTimeTableSize,
		getTimetableOf,
		removeSubject,
		setSubject,
		setUnavailable,
	} from "$model/timetable/time-table";
	import { allHoursOfDay, allDaysOfWeek } from "$lib/stores/global_store";
	import { DayOfWeek } from "$model/timetable/day-of-week";
	import { HourOfDay, hourOfDaySchema } from "$model/timetable/hour-of-day";
	import Hour from "$lib/components/hour.svelte";
	import { Subject } from "$model/subject/subject";
	import { Unavailable } from "$model/timetable/unavailable";
	import { theme } from "$lib/stores/global_store";
	import MyModal from "./MyModal.svelte";
	import Subjects from "./Subjects.svelte";

	export let timeTable: TimeTable;
	export let professorView: boolean;
	export let selectedItem: Professor | SchoolClass;
	export let subjectColors: Map<string, string> = new Map();
	export let callback: () => void;

	let unavailableTimeTable: TimeTable | null = null;
	let isAskingToRemoveDay = false;
	let showRemoveHourOrDayModal = false;
	let showConflictModal = false;
	let conflictHour: number;
	let conflictDay: number;
	let conflictInfo: any;
	let conflictMessage = "";

	theme.subscribe((value) => {
		timeTable = timeTable;
	});

	export function onSubjectDrag(subject: Subject | null | Unavailable) {
		if (!(subject instanceof Subject)) return;
		unavailableTimeTable = getTimetableOf(
			professorView ? subject.schoolClass : subject.professor,
		);
	}

	export function onSubjectDragEnd() {
		unavailableTimeTable = null;
	}

	function onHourClick(day: number, hour: number) {
		const subject = timeTable.getSubjectOn(day, hour);

		//se la materia è non disponibile allora si mette a null
		if (subject instanceof Unavailable)
			setUnavailable(day, hour, selectedItem, true);
		//se la materia è null allora si mette a indisponibile
		else if (subject == null)
			setUnavailable(day, hour, selectedItem, false);

		timeTable = timeTable;
	}

	function onDropValue(hour: number, day: number, info: any) {
		// if we are on professor view, we make sure
		// that the subject is not already assigned to another class on the same time slot
		// and vice versa for class view
		let otherTimeTable = getTimetableOf(
			professorView ? info.subject.schoolClass : info.subject.professor,
		);
		const otherOldValue = otherTimeTable.getSubjectOn(day, hour);

		if (
			otherOldValue instanceof Subject &&
			otherOldValue.id != info.subject.id
		) {
			showConflictModal = true;
			conflictHour = hour;
			conflictDay = day;
			conflictInfo = info;
			UpdateConflictMessage();
		} else {
			dropValue(hour, day, info);
		}
	}

	function handleConflict() {
		dropValue(conflictHour, conflictDay, conflictInfo);
	}

	function dropValue(hour: number, day: number, info: any) {
		const oldValue = timeTable.getSubjectOn(day, hour);
		setSubject(day, hour, info.subject);
		onSubjectDragEnd();
		const pos = info.id.split(",");
		if (pos.length == 2) {
			removeSubject(
				Number.parseInt(pos[1]),
				Number.parseInt(pos[0]),
				info.subject,
			);
			if (oldValue instanceof Subject)
				setSubject(
					Number.parseInt(pos[1]),
					Number.parseInt(pos[0]),
					oldValue,
				);
		}
		callback();
		timeTable = timeTable;
	}

	function getSubjectColor(item: Subject | null | Unavailable) {
		if (item == null || item instanceof Unavailable) return "transparent";
		return subjectColors!.get(item.id);
	}

	function assignDefaultDay(index: number): string {
		let defaultValue = "day " + (index + 1);
		allDaysOfWeek.update((array) => {
			if (array.length <= index)
				array.push(DayOfWeek.of(index, defaultValue));
			else array[index] = DayOfWeek.of(index, defaultValue);
			return array;
		});
		return defaultValue;
	}

	function onDayLabelChange(index: number) {
		let input = document.getElementById(
			"day_label_" + index,
		) as HTMLInputElement;
		let value: string = input.value;
		if (value.match(/^[a-zA-Z0-9_\sì]*$/)) {
			$allDaysOfWeek[index] = DayOfWeek.of(index, value);
			allDaysOfWeek.set; //updates subscribers
			console.log($allDaysOfWeek);
		} else {
			$allDaysOfWeek[index]
				? (input.value = $allDaysOfWeek[index].label)
				: (input.value = "day_" + (index + 1));
		}
	}

	function assignDefaultHour(index: number) {
		let defaultValue = "hour " + (index + 1);
		allHoursOfDay.update((array) => {
			if (array.length <= index)
				array.push(HourOfDay.of(index, defaultValue));
			else array[index] = HourOfDay.of(index, defaultValue);
			return array;
		});
		return defaultValue;
	}

	function onHourLabelChange(index: number) {
		let input = document.getElementById(
			"hour_label_" + index,
		) as HTMLInputElement;
		let value: string = input.value;
		if (value.match(/^[a-zA-Z0-9_ \:/\s]*$/)) {
			$allHoursOfDay[index] = HourOfDay.of(index, value);
			allHoursOfDay.set; //updates subscribers
			console.log($allHoursOfDay);
		} else {
			$allHoursOfDay[index]
				? (input.value = $allHoursOfDay[index].label)
				: (input.value = "hour_" + (index + 1));
		}
	}

	function addDay() {
		allDaysOfWeek.update((array) => {
			array.push(DayOfWeek.of(array.length, "day " + (array.length + 1)));
			return array;
		});
		changeTimeTableSize(timeTable.daysPerWeek + 1, timeTable.hoursPerDay);
		callback();
		timeTable = timeTable;
	}
	function removeDay() {
		allDaysOfWeek.update((array) => {
			array.pop();
			return array;
		});
		changeTimeTableSize(timeTable.daysPerWeek - 1, timeTable.hoursPerDay);
		callback();
		showRemoveHourOrDayModal = false;
		timeTable = timeTable;
	}
	function askToRemoveDay() {
		isAskingToRemoveDay = true;
		showRemoveHourOrDayModal = true;
	}

	function addHour() {
		allHoursOfDay.update((array) => {
			array.push(
				HourOfDay.of(array.length, "hour " + (array.length + 1)),
			);
			return array;
		});
		changeTimeTableSize(timeTable.daysPerWeek, timeTable.hoursPerDay + 1);
		callback();
		timeTable = timeTable;
	}

	function removeHour() {
		allHoursOfDay.update((array) => {
			array.pop();
			return array;
		});
		changeTimeTableSize(timeTable.daysPerWeek, timeTable.hoursPerDay - 1);
		callback();
		showRemoveHourOrDayModal = false;
		timeTable = timeTable;
	}
	function askToRemoveHour() {
		isAskingToRemoveDay = false;
		showRemoveHourOrDayModal = true;
	}

	function UpdateConflictMessage() {
		if (conflictInfo == null) return "";

		let otherTimeTable = getTimetableOf(
			professorView
				? conflictInfo.subject.schoolClass
				: conflictInfo.subject.professor,
		);
		const otherSubject = otherTimeTable.getSubjectOn(
			conflictDay,
			conflictHour,
		);

		if (otherSubject instanceof Subject) {
			let profName = otherSubject.professor;
			let className = otherSubject.schoolClass;

			conflictMessage =
				"There already exists a subject assigned to the same time slot in ";
			conflictMessage += `class <b>${className}</b> by professor <b>${profName}</b>. `;
			conflictMessage += "<br/>Do you want to replace it?";
		}
	}

	function throw_alert_on_inconsistency() {}

	onMount(throw_alert_on_inconsistency);
</script>

<div style="min-width: {($allDaysOfWeek.length + 1) * 120}px;">
	<table style="table-layout: fixed;" class="w-100 border shadow border-2">
		<thead>
			<tr>
				<th class="bg-body-tertiary border"></th>
				<!-- {length: columns_number} -->
				{#each { length: timeTable.daysPerWeek } as _, dayIndex}
					<th class="bg-body-tertiary border">
						<!-- label with input for days -->
						<div class="row g-0 align-items-center">
							<input
								id="day_label_{dayIndex}"
								type="text"
								class="input_text col"
								value={$allDaysOfWeek[dayIndex]
									? $allDaysOfWeek[dayIndex].label
									: assignDefaultDay(dayIndex)}
								on:input={() => onDayLabelChange(dayIndex)}
							/>
							{#if dayIndex == $allDaysOfWeek.length - 1}
								<div class="col-auto">
									<button
										class="btn btn-primary btn-sm px-2 py-1"
										on:click={addDay}
									>
										<i class="bi bi-plus-lg"></i>
									</button>
									<button
										class="btn btn-danger btn-sm px-2 py-1"
										on:click={askToRemoveDay}
									>
										<i class="bi bi-trash-fill"></i>
									</button>
								</div>
							{/if}
						</div>
					</th>
				{/each}
				<!-- <th><button on:click={timeTable.add_column}>+</button></th> -->
			</tr>
		</thead>

		<tbody>
			<!--cells-->
			{#each { length: timeTable.hoursPerDay } as _, hourIndex}
				<tr>
					<td class="bg-body-tertiary align-items-top border">
						<input
							id="hour_label_{hourIndex}"
							type="text"
							class="input_text col"
							value={$allHoursOfDay[hourIndex]
								? $allHoursOfDay[hourIndex].label
								: assignDefaultHour(hourIndex)}
							on:input={() => onHourLabelChange(hourIndex)}
						/>

						{#if hourIndex == $allHoursOfDay.length - 1}
							<div>
								<button
									class="btn btn-primary btn-sm px-2 py-1"
									on:click={addHour}
								>
									<i class="bi bi-plus-lg"></i>
								</button>
								<button
									class="btn btn-danger btn-sm px-2 py-1"
									on:click={askToRemoveHour}
								>
									<i class="bi bi-trash-fill"></i>
								</button>
							</div>
						{/if}
					</td>
					{#each { length: timeTable.daysPerWeek } as _, dayIndex}
						<td class="border">
							<Hour
								on:hourDrag={() =>
									onSubjectDrag(
										timeTable.values[dayIndex][hourIndex],
									)}
								on:dragend={onSubjectDragEnd}
								on:click={() =>
									onHourClick(dayIndex, hourIndex)}
								on:hourDrop={(event) =>
									onDropValue(
										hourIndex,
										dayIndex,
										event.detail,
									)}
								unavailable={unavailableTimeTable !== null &&
									unavailableTimeTable.values[dayIndex][
										hourIndex
									] instanceof Unavailable}
								isProfessorView={professorView}
								color={getSubjectColor(
									timeTable.getSubjectOn(dayIndex, hourIndex),
								)}
								id={`${hourIndex},${dayIndex}`}
								subject={timeTable.values[dayIndex][hourIndex]}
							></Hour>
						</td>
					{/each}
				</tr>
			{/each}
		</tbody>
	</table>

	<MyModal
		bind:showModal={showRemoveHourOrDayModal}
		on:confirm={isAskingToRemoveDay ? removeDay : removeHour}
	>
		<h2 slot="header">Remove {isAskingToRemoveDay ? "day" : "hour"}</h2>
		<p slot="body">
			Are you sure you want to remove a {isAskingToRemoveDay
				? "day"
				: "hour"}? All the time slots you have assigned to that {isAskingToRemoveDay
				? "day"
				: "hour"} will be lost.
		</p>
	</MyModal>
	<MyModal bind:showModal={showConflictModal} on:confirm={handleConflict}>
		<h2 slot="header">Subject conflict</h2>
		<p slot="body">
			{@html conflictMessage}
		</p>
	</MyModal>
</div>

<style>
	td,
	tr,
	th {
		text-align: center;
	}

	.input_text {
		border: none;
		width: 100%;
		text-align: center;
		height: 100%;
		background-color: transparent;
	}
</style>
