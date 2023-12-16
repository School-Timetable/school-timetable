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
    import { get } from "svelte/store";

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
			let file = generateCompleteTimetableFile($classTimeTableMap, $professorTimeTableMap, true);

			localStorage.setItem(
				"timetable.tdf",
				file
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

		<div class="zoom-hover mx-2">
			<NavbarBrand href="/">
				<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-house-door-fill" viewBox="0 0 16 16">
					<path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5"/>
				</svg>
			</NavbarBrand>
		</div>
		<div class="zoom-hover mx-2">
			<NavbarBrand href="/drag-and-drop">Timetable</NavbarBrand>
		</div>
		<div class="vl mx-4"></div>
		<div class="zoom-hover mx-2">
			<NavbarBrand href="/data-input-form">Input Form</NavbarBrand>
		</div>
		<div class="vl mx-4"></div>
		<div class="zoom-hover mx-2">
			<NavbarBrand href="/downloadUploadData">Download-Upload Data</NavbarBrand>
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
