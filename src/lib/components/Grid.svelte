<script lang="ts">
    import { Table } from 'sveltestrap';
    import { onMount } from 'svelte';
    import type { TimeTable } from '$model/timetable/time-table';
    import type { SchoolClass } from '$model/school-class/school-class';
    import type { Professor } from '$model/professor/professor';
    import { getTimetableOf, removeSubject, setSubject, setUnavailable} from '$model/timetable/time-table';
    import Hour from '$lib/components/hour.svelte';
    import { Subject } from '$model/subject/subject';
    import { Unavailable } from '$model/timetable/unavailable';


    export let timeTable: TimeTable;
    export let professorView: boolean
    export let weekNames = ["MON","TUE","WED","THU","FRI","SAT"]
    export let selectedItem: Professor | SchoolClass
    export let subjectColors: Map<string, string> = new Map()


    let unavailableTimeTable: TimeTable | null = null
    let rows_number: number = timeTable.hoursPerDay;
    let columns_number: number = timeTable.daysPerWeek;

    function onSubjectDrag(subject: Subject | null | Unavailable)
    {
        if(!(subject instanceof Subject)) return;
        unavailableTimeTable = getTimetableOf(professorView ? subject.schoolClass : subject.professor)
        console.log("POG", unavailableTimeTable.values)
    }

    function onSubjectDragEnd()
    {
        unavailableTimeTable = null
        location.reload();
        console.log("UNPOG")
    }

    function onHourClick(day: number, hour: number)
    {
        
        const subject = timeTable.getSubjectOn(day,hour)

        //se la materia è non disponibile allora si mette a null
        if(subject instanceof Unavailable)
            setUnavailable(day,hour,selectedItem,true)
        //se la materia è null allora si mette a indisponibile
        else if(subject == null)
            setUnavailable(day,hour,selectedItem, false)
    
        timeTable = timeTable  
    }

    function dropValue(hour: number,day: number, info: any)
	{
		const oldValue = timeTable.getSubjectOn(day,hour)
		setSubject(day,hour,info.subject)
        onSubjectDragEnd();

		const pos = info.id.split(",")
		if(pos.length == 2)
        {
            removeSubject(Number.parseInt(pos[1]),Number.parseInt(pos[0]),info.subject)
            if(oldValue instanceof Subject)
                setSubject(Number.parseInt(pos[1]),Number.parseInt(pos[0]),oldValue)
        }
        timeTable = timeTable
	}

    function getSubjectColor(item: Subject | null | Unavailable) 
    {
        if (item == null || item instanceof Unavailable)
            return 'transparent'
        return subjectColors!.get(item.id)
    }
    

    
    function throw_alert_on_inconsistency(){
        
    }
    
    onMount(throw_alert_on_inconsistency);
</script>

<div>
   <Table >  
    <!--header-->
    <thead>
        <tr>
            {#each weekNames as col_name}
                <th class="col-2">{col_name}</th>
            {/each}
        </tr>
    </thead>
    
    <!--cells-->
    {#each {length: rows_number} as _, hourIndex}
        <tr>
            {#each {length: columns_number} as _, dayIndex}
                <td>
                    <Hour 
                                on:hourDrag="{() => onSubjectDrag(timeTable.values[dayIndex][hourIndex])}"
                                on:dragend="{onSubjectDragEnd}"
                                on:click="{() => onHourClick(dayIndex,hourIndex)}"
                                on:hourDrop={event => dropValue(hourIndex,dayIndex,event.detail)} 
                                unavailable="{unavailableTimeTable !== null && unavailableTimeTable.values[dayIndex][hourIndex] instanceof Unavailable}"
                                isProfessorView={professorView} 
                                color={getSubjectColor(timeTable.getSubjectOn(dayIndex,hourIndex))}
                                id={`${hourIndex},${dayIndex}`}
                                subject={timeTable.values[dayIndex][hourIndex]}></Hour>
                </td>
            {/each}
        </tr>
    {/each}
</Table>
</div>

<style>
    td, tr, th {
      border: 1px solid #e3e0e0;
      text-align: center;
    }
</style>