<script lang="ts">
    import { Button, Table } from 'sveltestrap';

	// Inspired by https://svelte.dev/repl/810b0f1e16ac4bbd8af8ba25d5e0deff?version=3.4.2.
	
	import type { ClassSubject, WeekClass } from "$lib/model";
 	import Hour from '$lib/component/hour.svelte';


	// export let weekMatrix : (Professor | null)[][];

	export let weekNames = ["MON","TUE","WED","THU","FRI","SAT"]

    // prova    
    export let weekClass: WeekClass 

	
	function dropValue(hour: number,day: number, info: any)
	{

		//if(info.prof.name == weekClass.grid[hour][day]?.professor.name)
		//	return

		const oldValue = weekClass.grid[hour][day]
		weekClass.grid[hour][day] = info.subject

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

    function validateTimetable() 
    {
        alert("Work in progess...")
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
                {#each weekClass.sidebar as item, itemIndex }
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                        <div class="w-75">
                            <Hour droppable={false} draggable={item.remainingHours > 0} id="prova" subject={item} on:hourDrop={event => {}}></Hour>
                        </div>
                        <span class="badge bg-primary rounded-pill">{item.remainingHours}</span>
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
