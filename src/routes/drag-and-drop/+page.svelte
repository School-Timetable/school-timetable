<script lang="ts">
    import Timetable from '$lib/components/timetable.svelte';
    import { allClassrooms, allProfessors, allSubjects } from '$lib/stores/global_store';
    import { Professor } from '$model/professor/professor';
    import type { SchoolClass } from '$model/school-class/school-class';
    import type { Subject } from '$model/subject/subject';
    import { TimeTable, clearAll, daysPerWeek, getClassTimetableOf, getProfessorTimetableOf, hoursPerDay, updateTimetableSize } from '$model/timetable/time-table';
    // prova
    

    let subjects: Subject[] = []
    let classes: SchoolClass[] = []
    let professors: Professor[] = []
    let currentSidebar: Subject[] = []


    export let inputDays: string = daysPerWeek.toString()
    export let inputHours: string = hoursPerDay.toString()


    allClassrooms.subscribe(c => classes = c)
    allSubjects.subscribe(s => {
        subjects = s
    })


    export let professorView : boolean = false
   

   
    export let selectedItem: Professor | SchoolClass | null = null

    export let currentTimeTable : TimeTable | null = null

     allProfessors.subscribe(profs =>{
        professors = profs
    })
    
    function setCurrentView(item: Professor | SchoolClass) {
        
        
        let timetable = item instanceof Professor ? getProfessorTimetableOf(item) : getClassTimetableOf(item)
        currentTimeTable = timetable
        console.log("PORCO",currentTimeTable.values.length)
        selectedItem = item
        if(item instanceof Professor)
            currentSidebar = subjects.filter(subject => subject.professor.id == item.id)
        else
            currentSidebar = subjects.filter(subject => subject.schoolClass.id == item.id)
    }
    
    function onViewSwitchClick()
    {
        professorView = !professorView
        if(professorView) 
            setCurrentView(professors[0])
        else
            setCurrentView(classes[0])
    }


    function updateTimetable()
    {
        
        const numberPattern = new RegExp("^[0-9]+$")

        if(inputDays.match(numberPattern) && inputHours.match(numberPattern))
        {
            updateTimetableSize(parseInt(inputDays),parseInt(inputHours))
            clearAll()
            if(selectedItem != null)
                setCurrentView(selectedItem)
           
        }
        else
        {
            alert("Invalid Grid Size")
        }
        
    }



</script>



<input placeholder="days" bind:value="{inputDays}">
<input placeholder="hours" bind:value="{inputHours}">
<button class="btn" on:click={_ => {updateTimetable()}}>Update Size</button>
<div class="m-3">

    <!--toggle professor view-->
    <div class="form-check form-switch">
        <input class="form-check-input" type="checkbox" id="flexSwitchCheckChecked" on:click={onViewSwitchClick} checked={professorView}>
        <label class="form-check-label" for="flexSwitchCheckChecked">Professor View</label>
    </div>

    <ul class="nav nav-tabs">
        {#each professorView ? professors : classes as item}
            <li class="nav-item">
                <a class="nav-link" class:active={item == selectedItem} href="#" on:click={() => setCurrentView(item)}>{item.toString()}</a>
            </li>
        {/each}
    </ul>
    
    {#if currentTimeTable && selectedItem}
        <Timetable selectedItem="{selectedItem}" professorView={professorView} bind:grid={currentTimeTable} sidebar={currentSidebar}></Timetable>
    {/if}
</div>
