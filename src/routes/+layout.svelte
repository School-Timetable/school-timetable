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
	import { generateCompleteTimetableFile, generateCookieFile } from "$lib/stores/utils/cookie_file_writer";
	import { onMount } from "svelte";
	import { Container, Styles } from "sveltestrap";
	import { goto } from "$app/navigation";
	import ThemeSwitcher from "$lib/components/ThemeSwitcher.svelte";
	import { Navbar, NavbarBrand } from "sveltestrap";
	import ExportTimetableForm from "$lib/components/ExportTimetableForm.svelte";

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
			localStorage.setItem(
				"timetable.tdf",
				generateCompleteTimetableFile($classTimeTableMap, $professorTimeTableMap, true)
			)
		}

		classTimeTableMap.subscribe(generate_timetable_file);
	});
</script>

<Styles theme={$theme} />

<Navbar expand="md">
	<div class="left-group">
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->

		<p
			id="title"
			class="zoom-hover"
			on:click={() => {
				goto("/drag-and-drop");
			}}
		>
			SCHOOL TIMETABLE
		</p>

		<div class="vl mx-4"></div>
		<div class="zoom-hover mx-2">
			<NavbarBrand href="/data-input-form">Input Form</NavbarBrand>
		</div>
		<div class="zoom-hover mx-2">
			<ExportTimetableForm></ExportTimetableForm>
		</div>
		<!--<div class="zoom-hover">
			<NavbarBrand on:click={createPDFProfView}>
				PdfProf
			</NavbarBrand>
		</div>
		<div class="zoom-hover">
			<NavbarBrand on:click={createPDFClassView}>
				PdfClass
			</NavbarBrand>
		</div>
		<div class="zoom-hover">
			<NavbarBrand on:click={() => createExcel("Professor")}>
				Excel
			</NavbarBrand>
		</div>-->
	</div>

	<ThemeSwitcher />
</Navbar>
<Container xxl class="bg-body rounded shadow mt-2">
	<slot />
</Container>

<style>
	p {
		font-size: 23px;
		font-weight: bold;
		cursor: pointer;
		margin: 0 0 0 30px;
		padding: 0;
	}

	.left-group {
		display: flex;
		align-items: center;
	}

	.vl {
		border-left: 1px solid;
		height: 30px;
		margin-left: 20px;
	}
</style>
