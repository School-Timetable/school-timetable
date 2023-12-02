<script lang="ts">
    import { Table } from 'sveltestrap';
    import { onMount } from 'svelte';
    import type { TimeTable } from '$model/timetable/time-table';
    import type { SchoolClass } from '$model/school-class/school-class';
    import type { Professor } from '$model/professor/professor';
    import { getTimetableOf, removeSubject, setSubject, setUnavailable} from '$model/timetable/time-table';
    import { allHoursOfDay, allDaysOfWeek } from '$lib/stores/global_store'; //TODO utilizzare i dati reali
    import { DayOfWeek } from '$model/timetable/day-of-week';
    import { HourOfDay } from '$model/timetable/hour-of-day';
    import Hour from '$lib/components/hour.svelte';
    import { Subject } from '$model/subject/subject';
    import { Unavailable } from '$model/timetable/unavailable';


    export let timeTable: TimeTable;
    export let professorView: boolean
    let weekNames = ["MON","TUE","WED","THU","FRI","SAT"]
    export let selectedItem: Professor | SchoolClass
    export let subjectColors: Map<string, string> = new Map()
    export let callback: () => void;


    let unavailableTimeTable: TimeTable | null = null
    let rows_number: number = timeTable.hoursPerDay;
    let columns_number: number = timeTable.daysPerWeek;

    export function onSubjectDrag(subject: Subject | null | Unavailable)
    {
        if(!(subject instanceof Subject)) return;
        unavailableTimeTable = getTimetableOf(professorView ? subject.schoolClass : subject.professor)
        console.log("POG", unavailableTimeTable.values)
    }

    export function onSubjectDragEnd()
    {
        unavailableTimeTable = null
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
        callback();
        timeTable = timeTable
	}

    function getSubjectColor(item: Subject | null | Unavailable) 
    {
        if (item == null || item instanceof Unavailable)
            return 'transparent'
        return subjectColors!.get(item.id)
    }
    
    function onDayLabelChange(index: number) {
        let input = document.getElementById("day_label_"+index) as HTMLInputElement;
        let value: string = input.value;
        if (value.match(/^[a-zA-Z0-9_\sì]*$/)) {
            $allDaysOfWeek[index] = DayOfWeek.of(index,value);
            allDaysOfWeek.set   //updates subscribers
            console.log($allDaysOfWeek)
        } else {
            $allDaysOfWeek[index]? input.value=$allDaysOfWeek[index].label : input.value="day_"+(index+1);
        }
    }

    function onHourLabelChange(index: number) {
        let input = document.getElementById("hour_label_"+index) as HTMLInputElement;
        let value: string = input.value;
        if (value.match(/^[a-zA-Z0-9_\:/\s]*$/)) {
            $allHoursOfDay[index] = HourOfDay.of(index,value);
            allHoursOfDay.set   //updates subscribers
            console.log($allHoursOfDay)
        } else {
            $allHoursOfDay[index]? input.value=$allHoursOfDay[index].label : input.value="hour_"+(index+1);
        }
    }

    
    function throw_alert_on_inconsistency(){
        
    }
    
    onMount(throw_alert_on_inconsistency);
</script>

<div>
   <Table >  
    <thead>
        <tr>
            <th class="col-2"></th>
            {#each {length: columns_number} as _, dayIndex}
                <th class="col-2">
                    <!-- 
                        label with input for days
                    -->
                    <input  id="day_label_{dayIndex}" type="text" class="input_text"
                        value={$allDaysOfWeek[dayIndex]? $allDaysOfWeek[dayIndex].label : "day_"+(dayIndex+1)}
                        on:input={() => onDayLabelChange(dayIndex)}/> 
                </th>
            {/each}
        </tr>
    </thead>
    
    <!--cells-->
    {#each {length: rows_number} as _, hourIndex}
        <tr>
            <input id="hour_label_{hourIndex}" type="text" class="input_text"
                            value={$allHoursOfDay[hourIndex]? $allHoursOfDay[hourIndex].label : "hour_"+(hourIndex+1)}
                            on:input={() => onHourLabelChange(hourIndex)}/>
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

    .input_text {
        border: none;
        width: 100%;
        text-align: center;
        min-width: 70px;
    }
</style>