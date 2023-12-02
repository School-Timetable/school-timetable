<script lang="ts">
    import { Table } from 'sveltestrap';
	import { stringToSubject, Subject } from "$model/subject/subject";
    import Hour from '$lib/components/hour.svelte';
    import { daysPerWeek, getTimetableOf, hoursPerDay, removeSubject, setSubject, setUnavailable, type TimeTable } from '$model/timetable/time-table';
    import { UNAVAILABLE, Unavailable } from '$model/timetable/unavailable';
    import type { SchoolClass } from '$model/school-class/school-class';
    import type { Professor } from '$model/professor/professor';
    import Grid from './Grid.svelte';
    import { allHoursOfDay, allDaysOfWeek } from '$lib/stores/global_store'; //TODO utilizzare i dati reali
    import { DayOfWeek } from '$model/timetable/day-of-week';
    import { HourOfDay } from '$model/timetable/hour-of-day';
	let weekNames = ["MON","TUE","WED","THU","FRI","SAT"];
    //let mockHours = ["8:30","9:30","10:30","11:30","12:30","13:30","14:30","15:30"]
    export let grid: TimeTable;
    export let sidebar: Subject[];
    export let professorView: boolean;
    export let selectedItem: Professor | SchoolClass;
    let realGrid: Grid;

    // getting subjects colors
    const availableColors: readonly string[] = [
        "#fa968e",  // red
        "#79c9f7",  // blue
        "#88f28d",  // green
        "#f0ce78",  // yellow
        "#f2a477",  // orange
        "#c57ff0",  // purple
    ]

    // Map<subject.id, color>
    export let subjectColors: Map<string, string> = new Map()
    
    $: sidebar && onSidebarChange()

    const onSidebarChange = () => {
        let index = 0
        subjectColors.clear()
        sidebar.forEach(subject => subjectColors.set(subject.id, availableColors[(index++)%availableColors.length]))

    }

	function sideBarDrop(event: any)
	{

        const subject = stringToSubject(event.dataTransfer.getData("subject"))
        
		const id = event.dataTransfer.getData("id")
		const pos = id.split(",")
        removeSubject(Number.parseInt(pos[1]),Number.parseInt(pos[0]),subject)
        grid = grid
        sidebar = sidebar
	
	}

    function validateTimetable() 
    {
        alert("Work in progess...")
    }

    function getSubjectColor(item: Subject | null | Unavailable) 
    {
        if (item == null || item instanceof Unavailable)
            return 'transparent'
        return subjectColors!.get(item.id)
    }

    function getRemainingHours(subject: Subject)
    {
        return subject.hoursPerWeek.value - grid.getCountOf(subject)
    }

    export function refresh(){
        sidebar = sidebar;
    }

</script>


<head>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
</head>
            
<!--todo:   sidebar e grid di uguale altezza
            hover sulle celle OK
            bordi attorno alle celle OK
            celle con undefined devono essere vuote OK
-->
<div class="container-fluid">
    <div class="row ">
        <!--sidebar-->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <div class="overflow-auto vh-100 row col-2">
            <ul class="list-group" on:dragover={event => event.preventDefault()} on:drop={event => sideBarDrop(event)}>
                {#each sidebar as item, itemIndex }
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                        <div class="w-75">
                            <Hour on:hourDrag="{() => realGrid.onSubjectDrag(item)}" on:dragend="{realGrid.onSubjectDragEnd}" isProfessorView={professorView} color={getSubjectColor(item)} droppable={false} draggable={getRemainingHours(item) > 0} id="prova" subject={item} on:hourDrop={event => {}}></Hour>
                        </div>
                        <span class="badge bg-primary rounded-pill">{item.hoursPerWeek.value - grid.getCountOf(item)}</span>
                    </li>
                {/each}
            </ul>
        </div>
        
        <!--grid-->
        <div class="col-10">
            <Grid timeTable={grid} professorView={professorView} selectedItem={selectedItem} subjectColors={subjectColors} bind:this= { realGrid } callback = {refresh}></Grid>
            
            <div class="d-flex justify-content-center">
                <button type="button" class="btn btn-primary btn-lg w-100" on:click={event => validateTimetable()}>valida orario</button>
            </div>
            
        </div>
        
    </div>
</div>
 
<style>
    td, tr, th {
      border: 1px solid #e3e0e0;
      text-align: center;
      width: fit-content;
    }
    .input_text {
        border: none;
        width: 100%;
        text-align: center;
    }
</style>
