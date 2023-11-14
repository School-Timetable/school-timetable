<script lang="ts">
    import { Table } from 'sveltestrap';

	// Inspired by https://svelte.dev/repl/810b0f1e16ac4bbd8af8ba25d5e0deff?version=3.4.2.
	import Prova from '$lib/component/hour.svelte';
	import {flip} from 'svelte/animate';
	import type { ClassSubject, DayColumn, Professor, SubjectOption, WeekClass } from "$lib/model";
 	import Hour from '$lib/component/hour.svelte';


	// export let weekMatrix : (Professor | null)[][];

	export let weekNames = ["MON","TUE","WED","THU","FRI","SAT"]

    // prova
    export let subjects: ClassSubject[] = [
        {class: "1A", professor: {id: 1, name: "Mario", surname: "Rossi"}, subject: "MAT", remainingHours: 5},
        {class: "1A", professor: {id: 2, name: "Luigi", surname: "Rossi"}, subject: "GEO", remainingHours: 6},
        {class: "1A", professor: {id: 3, name: "Elisa", surname: "Rossi"}, subject: "STO", remainingHours: 3},
        {class: "1A", professor: {id: 4, name: "Michele", surname: "Rossi"}, subject: "ITA", remainingHours: 10}
    ]
    
    export let weekClass: WeekClass = {
        name: "1A",
        grid: [],
        sidebar: subjects
    }

	// weekMatrix = []

	for(let i = 0;i < weekNames.length;i++)
		//weekMatrix.push([null,null,null,null,null])
        weekClass.grid.push([null,null,null,null,null])

	
	function dropValue(hour: number,day: number, info: any)
	{

		//if(info.prof.name == weekClass.grid[hour][day]?.professor.name)
		//	return

		const oldValue = weekClass.grid[hour][day]
		weekClass.grid[hour][day] = info.subject
        console.log(info.subject.class)

		const pos = info.id.split(",")
		if(pos.length == 2)
			weekClass.grid[pos[0]][pos[1]] = oldValue
		else
		{
			if(oldValue)
				weekClass.sidebar.find(val => val.professor.id == oldValue.professor.id)!.remainingHours += 1
			weekClass.sidebar.find(val => val.professor.id == info.subject.professor.id)!.remainingHours -= 1
			weekClass.sidebar = weekClass.sidebar
		}
	}

	function sideBarDrop(event: any)
	{
		const subject : ClassSubject = JSON.parse(event.dataTransfer.getData("subject"))
		const id = event.dataTransfer.getData("id")
		const coord = id.split(",")
		weekClass.grid[coord[0]][coord[1]] = null
		weekClass.sidebar.find(val => val.professor.id == subject.professor.id)!.remainingHours += 1
		weekClass.sidebar = weekClass.sidebar
	
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
    <div class="row">
        <!--sidebar-->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <div class="col-2 row" on:dragover={event => event.preventDefault()} on:drop={event => sideBarDrop(event)}>
            {#each weekClass.sidebar as item, itemIndex}
                <div class='col-10'>
                   <Hour droppable={false} draggable={item.remainingHours > 0} id="prova" subject={item} on:hourDrop={event => {}}></Hour>
                </div>
                <div class="col-1 text-center">{item.remainingHours}</div>
            {/each}
        </div>

        <!--grid-->
        <div class="col-10">
            <Table responsive>  
                <!--header-->
                <thead>
                    <tr>
                        {#each weekClass.grid as day, dayIndex (day)}
                            <th class="col-2">{weekNames[dayIndex]}</th>
                        {/each}
                    </tr>
                </thead>
                
                <!--cells-->
                {#each {length: 5} as _, i}
                    <tr>
                        {#each weekClass.grid as day, dayIndex (day)}
                            <td>
                                <Hour id={`${i},${dayIndex}`} on:hourDrop={event => dropValue(i,dayIndex,event.detail)} subject={weekClass.grid[i][dayIndex]}></Hour>
                            </td>
                        {/each}
                    </tr>
                {/each}
            </Table>
        </div>
    </div>
</div>
 
<style>
    td, tr, th {
      border: 1px solid #000000;
      text-align: center;
    }
</style>
