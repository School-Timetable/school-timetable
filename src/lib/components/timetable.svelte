<script lang="ts">
    import { Table } from 'sveltestrap';
	import { stringToSubject, Subject } from "$model/subject/subject";
    import Hour from '$lib/components/hour.svelte';
    import { daysPerWeek, hoursPerDay, removeSubject, setSubject, type TimeTable } from '$model/timetable/time-table';
    import { Unavailable } from '$model/timetable/unavailable';
	export let weekNames = ["MON","TUE","WED","THU","FRI","SAT"]
    export let grid: TimeTable
    export let sidebar: Subject[]
    export let professorView: boolean


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

	function dropValue(hour: number,day: number, info: any)
	{
		const oldValue = grid.getSubjectOn(day,hour)
		setSubject(day,hour,info.subject)

		const pos = info.id.split(",")
		if(pos.length == 2)
        {
            removeSubject(Number.parseInt(pos[1]),Number.parseInt(pos[0]),info.subject)
            if(oldValue instanceof Subject)
                setSubject(Number.parseInt(pos[1]),Number.parseInt(pos[0]),oldValue)
        }
        sidebar = sidebar
        grid = grid
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
                            <Hour isProfessorView={professorView} color={getSubjectColor(item)} droppable={false} draggable={getRemainingHours(item) > 0} id="prova" subject={item} on:hourDrop={event => {}}></Hour>
                        </div>
                        <span class="badge bg-primary rounded-pill">{getRemainingHours(item)}</span>
                    </li>
                {/each}
            </ul>
        </div>
        
        

    
<!--
        <div class="row col-2 overflow-auto vh-100 my-1" on:dragover={event => event.preventDefault()} on:drop={event => sideBarDrop(event)}>
            {#each weekClass.sidebar as item, itemIndex}
                <div class="row d-inline-block h-auto">
                    <div class="col-10">
                        <Hour droppable={false} draggable={item.remainingHours > 0} id="prova" subject={item} on:hourDrop={event => {}}></Hour>
                    </div>
                    <div class="col-1 text-center">{item.remainingHours}</div>
                </div>
                
            {/each}
        </div>
    -->
        <!--grid-->
        <div class="col-10">
            <Table responsive>  
                <!--header-->
                <thead>
                    <tr>
                        {#each {length: daysPerWeek} as _, dayIndex}
                            <th class="col-2">{weekNames[dayIndex]}</th>
                        {/each}
                    </tr>
                </thead>
                
                <!--cells-->
                {#each {length: hoursPerDay} as _, hourIndex}
                    <tr>
                        {#each {length: daysPerWeek} as _, dayIndex}
                            <td>
                                <Hour isProfessorView={professorView} color={getSubjectColor(grid.getSubjectOn(dayIndex,hourIndex))} id={`${hourIndex},${dayIndex}`} on:hourDrop={event => dropValue(hourIndex,dayIndex,event.detail)} subject={grid.values[dayIndex][hourIndex]}></Hour>
                            </td>
                        {/each}
                    </tr>
                {/each}
            </Table>

            
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
    }
</style>
