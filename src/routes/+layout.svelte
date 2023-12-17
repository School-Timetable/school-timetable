<script lang="ts">
	import {
		allClassrooms,
		allDaysOfWeek,
		allHoursOfDay,
		allProfessors,
		allSubjects,
		classTimeTableMap,
		professorTimeTableMap,
		theme,
	} from "$lib/stores/global_store";
	import {
		generateCompleteTimetableFile,
		generateCookieFile,
	} from "$lib/stores/utils/cookie_file_writer";
	import { onMount } from "svelte";
	import { Container, NavLink, Styles } from "sveltestrap";
	import ThemeSwitcher from "$lib/components/ThemeSwitcher.svelte";
	import { Navbar, NavbarBrand } from "sveltestrap";
	import ExportTimetableForm from "$lib/components/ExportTimetableForm.svelte";
	import { page } from "$app/stores";
	import { slide } from "svelte/transition";
	import SaveLoadWorkspace from "$lib/components/SaveLoadWorkspace.svelte";
	import Timetable from "$lib/components/timetable.svelte";

	onMount(() => {
		const generate_file = () =>
			localStorage.setItem(
				"data.tdf",
				generateCookieFile(
					$allProfessors,
					$allClassrooms,
					$allSubjects,
					$allHoursOfDay,
					$allDaysOfWeek,
				),
			);

		allProfessors.subscribe(generate_file);
		allClassrooms.subscribe(generate_file);
		allSubjects.subscribe(generate_file);
		allDaysOfWeek.subscribe(generate_file);
		allHoursOfDay.subscribe(generate_file);

		const generate_timetable_file = () => {
			let file = generateCompleteTimetableFile(
				$classTimeTableMap,
				$professorTimeTableMap,
				true,
			);

			localStorage.setItem("timetable.tdf", file);
		};

		classTimeTableMap.subscribe(generate_timetable_file);
	});
</script>

<Styles theme={$theme} />

<Navbar expand="shadow text-light" style="background-color: #6A009F;">
	<div class="d-flex align-items-center container-xxl">
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->

		<div class="mx-3">
			<div class="zoom-hover">
				<a href="/">
					<i class="bi bi-house-door-fill text-light h4 mb-0"></i>
				</a>
			</div>
		</div>
		<span class="vr"></span>
		<div class="mx-3">
			<div class="zoom-hover">
				<NavLink href="/drag-and-drop">Timetable</NavLink>
			</div>
		</div>
		<span class="vr"></span>

		<div class="mx-3">
			<div class="zoom-hover">
				<NavLink href="/data-input-form">Input Form</NavLink>
			</div>
		</div>
		<span class="vr"></span>
		<div class="ms-auto"></div>
		<div class="mx-2">
			<ExportTimetableForm></ExportTimetableForm>
		</div>
		<div class="mx-2">
			<SaveLoadWorkspace></SaveLoadWorkspace>
		</div>
		<div class="mx-2">
			<ThemeSwitcher />
		</div>
	</div>
</Navbar>
<Container xxl class="bg-body rounded shadow mt-2">
	<slot />
</Container>
