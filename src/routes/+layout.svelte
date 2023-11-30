<script lang="ts">
	import {
		allClassrooms,
		allDaysOfWeek,
		allHoursOfDay,
		allProfessors,
		allSubjects,
		theme,
	} from "$lib/stores/global_store";
	import { generateCookieFile } from "$lib/stores/utils/cookie_file_writer";
	import { onMount } from "svelte";
	import { Container, Styles } from "sveltestrap";
	import { goto } from "$app/navigation";
	import ThemeSwitcher from "$lib/components/ThemeSwitcher.svelte";
	import { Navbar, NavbarBrand } from "sveltestrap";
	import { createPDFClassView, createPDFProfView } from "$lib/stores/utils/export_to_pdf";
    import { DayOfWeek } from "$model/timetable/day-of-week";
    import { HourOfDay } from "$model/timetable/hour-of-day";
    import { createExcel } from "$lib/stores/utils/create_excel_file";
    import { professorTimetableMap } from "$model/timetable/time-table";
    import { get } from "svelte/store";
    import { Subject } from "$model/subject/subject";

	onMount(() => {
		const generate_file = () =>
			localStorage.setItem(
				"data.tdf",
				generateCookieFile($allProfessors, $allClassrooms, $allSubjects, $allHoursOfDay, $allDaysOfWeek)
			);

		allProfessors.subscribe(generate_file);
		allClassrooms.subscribe(generate_file);
		allSubjects.subscribe(generate_file);

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
				goto("/");
			}}
		>
			SCHOOL TIMETABLE
		</p>

		<div class="vl"></div>
		<div class="zoom-hover">
			<NavbarBrand style="margin-left: 20px;" href="/data-input-form">
				Input Form
			</NavbarBrand>
		</div>
		<div class="zoom-hover">
			<NavbarBrand style="margin-left: 20px;" on:click={createPDFProfView}>
				PdfProf
			</NavbarBrand>
		</div>
		<div class="zoom-hover">
			<NavbarBrand style="margin-left: 20px;" on:click={createPDFClassView}>
				PdfClass
			</NavbarBrand>
		</div>
		<div class="zoom-hover">
			<NavbarBrand style="margin-left: 20px;" on:click={() => createExcel("Professor")}>
				Excel
			</NavbarBrand>
		</div>
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
