<script lang="ts">
    import Timetable from '$lib/components/timetable.svelte';
  import { allClassrooms, allProfessors, allSubjects } from '$lib/stores/global_store';
  import { classTimetableMap, professorTimetableMap, setSubject, type TimeTable } from '$model/TimeTable';
  import { Professor } from '$model/professor/professor';
  import type { SchoolClass } from '$model/school-class/school-class';
  import type { Subject } from '$model/subject/subject';

    // prova
    

    let subjects: Subject[] = []
    let classes: SchoolClass[] = []
    let professors: Professor[] = []
    let currentSidebar: Subject[] = []


    allClassrooms.subscribe(c => classes = c)
    allSubjects.subscribe(s => {
        subjects = s
        subjects.forEach(sub =>  setSubject(sub,0,0))
        
    })

    export let professorView : boolean = false
   

   
    export let selectedItem: Professor | SchoolClass | null = null

    export let currentTimeTable : TimeTable | null = null

     allProfessors.subscribe(profs =>{
        professors = profs
    })
    
    function setCurrentView(item: Professor | SchoolClass) {
        
        const timetableMap : ReadonlyMap<string,TimeTable> = item instanceof Professor ? professorTimetableMap : classTimetableMap
        
        let timetable = timetableMap.get(item.id)!
        currentTimeTable = timetable


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
</script>

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
    
    {#if currentTimeTable}
        <Timetable professorView={professorView} grid={currentTimeTable} sidebar={currentSidebar}></Timetable>
    {/if}
</div>
