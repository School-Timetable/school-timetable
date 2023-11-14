<script lang="ts">
    import { Table } from 'sveltestrap';

	// Inspired by https://svelte.dev/repl/810b0f1e16ac4bbd8af8ba25d5e0deff?version=3.4.2.
	import Prova from '$lib/component/hour.svelte';
	import {flip} from 'svelte/animate';
	import type { DayColumn, Professor, ProfessorOption, WeekClass } from "$lib/model";
 	import Hour from '$lib/component/hour.svelte';


	export let weekMatrix : (Professor | null)[][];

	export let weekNames = ["MON","TUE","WED","THU","FRI","SAT"]

	export let options : ProfessorOption[] = [  {amount: 5, prof: {id: 1, name: "Mario", surname: "Rossi", subject: "MAT"}},
                                                {amount: 3, prof: {id: 2, name: "Luigi", surname: "Bianchi", subject: "ITA"}},
                                                {amount: 7, prof: {id: 3, name: "Michele", surname: "Verdi", subject: "GEO"}},
                                                {amount: 3, prof: {id: 4, name: "Elisa", surname: "Gialli", subject: "ENG"}},
                                                {amount: 3, prof: {id: 5, name: "Filomena", surname: "Violi", subject: "STO"}},
                                            ]



	weekMatrix = []

	for(let i = 0;i < weekNames.length;i++)
		weekMatrix.push([null,null,null,null,null])


	
	function dropValue(hour: number,day: number,info: any)
	{

		if(info.prof.name == weekMatrix[hour][day]?.name)
			return

		const oldValue = weekMatrix[hour][day]
		weekMatrix[hour][day] = info.prof

		const pos = info.id.split(",")
		if(pos.length == 2)
			weekMatrix[pos[0]][pos[1]] = oldValue
		else
		{
			if(oldValue)
				options.find(val => val.prof.name == oldValue.name)!.amount += 1
			options.find(val => val.prof.name == info.prof.name)!.amount -= 1
			options = options
		}
	}

	function sideBarDrop(event: any)
	{
		const professor : Professor = JSON.parse(event.dataTransfer.getData("prof"))
		const id = event.dataTransfer.getData("id")
		const coord = id.split(",")
		weekMatrix[coord[0]][coord[1]] = null
		options.find(val => val.prof.name == professor.name)!.amount += 1
		options = options
	
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
            {#each options as option, optionIndex (option)}
                <div class='col-10'>
                   <Hour droppable={false} draggable={option.amount > 0} id="prova" professor={option.prof} on:hourDrop={event => {}}></Hour>
                </div>
                <div class="col-1 text-center">{option.amount}</div>
            {/each}
        </div>

        <!--grid-->
        <div class="col-10">
            <Table responsive>  
                <!--header-->
                <thead>
                    <tr>
                        {#each weekMatrix as day, dayIndex (day)}
                            <th class="col-2">{weekNames[dayIndex]}</th>
                        {/each}
                    </tr>
                </thead>
                
                <!--cells-->
                {#each {length: 5} as _, i}
                    <tr>
                        {#each weekMatrix as day, dayIndex (day)}
                            <td>
                                <Hour id={`${i},${dayIndex}`} on:hourDrop={event => dropValue(i,dayIndex,event.detail)} professor={weekMatrix[i][dayIndex]}></Hour>
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
