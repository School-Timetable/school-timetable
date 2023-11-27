<script lang="ts">
    import { Button, Table } from 'sveltestrap';

	// Inspired by https://svelte.dev/repl/810b0f1e16ac4bbd8af8ba25d5e0deff?version=3.4.2.
	
	import type { Professor } from "$model/professor/professor";
    import { stringToSubject, type Subject } from "$model/subject/subject";
    import type { SchoolClass } from "$model/school-class/school-class";
 	import Hour from '$lib/components/hour.svelte';
  import { TimeTable, classTimetableMap, daysPerWeek, hoursPerDay, professorTimetableMap, removeSubject, setSubject } from '$model/TimeTable';
  import { HoursPerWeek } from '$model/subject/hours-per-week';



	export let weekNames = ["MON","TUE","WED","THU","FRI","SAT"]

    // prova    
    export let grid: TimeTable
    export let sidebar: Subject[]
    export let professorView: boolean


    // getting subjects colors


    let availableColors: string[] = [
        "#fa968e",  // red
        "#79c9f7",  // blue
        "#88f28d",  // green
        "#f0ce78",  // yellow
        "#f2a477",  // orange
        "#c57ff0",  // purple
    ]

    // Map<subject.id, color>
    export let subjectColors: Map<string, string> = new Map()
    let index = 0
    sidebar.forEach(subject => subjectColors.set(subject.id, availableColors[(index++)%availableColors.length]))

    console.log(subjectColors)
	

    function getGridMap() : ReadonlyMap<String,TimeTable>
    {
        return professorView ? professorTimetableMap : classTimetableMap
    }

	function dropValue(hour: number,day: number, info: any)
	{

		//if(info.prof.name == weekClass.grid[hour][day]?.professor.name)
		//	return


		const oldValue = grid.values[day][hour]
		setSubject(info.subject,day,hour)
        
		const pos = info.id.split(",")
        console.log(info.id)
		if(pos.length == 2)
        {
            if(!oldValue)
                removeSubject(info.subject,pos[0],pos[1])
            else
                setSubject(oldValue,pos[0],pos[1])
        }
		else
		{
            
			if(oldValue)
            {
                const oldSubject = sidebar.find(val => val.professor.id == oldValue.professor.id)!
                oldSubject.hoursPerWeek = new HoursPerWeek(oldSubject.hoursPerWeek.value + 1)
            }
            
			
            const subject = sidebar.find(val => val.professor.id == info.subject.professor.id)!
            subject.hoursPerWeek = new HoursPerWeek(subject.hoursPerWeek.value - 1)
            sidebar = sidebar
		}
        
        grid.values = grid.values
	}

	function sideBarDrop(event: any)
	{

        const subject = stringToSubject(event.dataTransfer.getData("subject"))
        
		const id = event.dataTransfer.getData("id")
		const coord = id.split(",")
        removeSubject(subject,coord[0],coord[1])
		grid.values[coord[0]][coord[1]] = null

		const currentSubjectSidebar = sidebar.find(val => val.professor.id == subject.professor.id)!
		currentSubjectSidebar.hoursPerWeek = new HoursPerWeek(currentSubjectSidebar.hoursPerWeek.value + 1)
        sidebar = sidebar
	
	}

    function validateTimetable() 
    {
        alert("Work in progess...")
    }

    function getSubjectColor(item: Subject | null) 
    {
        console.log("Subject abbr = ", item?.abbreviation, "subject id = ", item?.id)
        console.log(subjectColors)
        if (item == null)
            return 'transparent'
        return subjectColors!.get(item.id)
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
                            <Hour isProfessorView={professorView} color={getSubjectColor(item)} droppable={false} draggable={item.hoursPerWeek.value > 0} id="prova" subject={item} on:hourDrop={event => {}}></Hour>
                        </div>
                        <span class="badge bg-primary rounded-pill">{item.hoursPerWeek.value}</span>
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
                                <Hour isProfessorView={professorView} color={getSubjectColor(grid.values[dayIndex][hourIndex])} id={`${hourIndex},${dayIndex}`} on:hourDrop={event => dropValue(hourIndex,dayIndex,event.detail)} subject={grid.values[dayIndex][hourIndex]}></Hour>
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
