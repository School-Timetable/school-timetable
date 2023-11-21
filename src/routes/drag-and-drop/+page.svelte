<script lang="ts">
    import Timetable from '$lib/component/timetable.svelte';
    import type { ClassSubject, WeekClass } from '$lib/model';
    import { SubjectService } from '../../services/__mocks__/SubjectService';

    // prova
    

    export let subjects1A: ClassSubject[] = new SubjectService().getSubjects(5, 1)
    export let subjects2A: ClassSubject[] = new SubjectService().getSubjects(5, 1)
    export let subjects3A: ClassSubject[] = new SubjectService().getSubjects(5, 1)


    
    console.log(subjects1A)
    /*
    [
        {class: "1A", professor: {id: 1, name: "Mario", surname: "Rossi"}, subject: "MAT", remainingHours: 5},
        {class: "1A", professor: {id: 2, name: "Luigi", surname: "Rossi"}, subject: "GEO", remainingHours: 6},
        {class: "1A", professor: {id: 3, name: "Elisa", surname: "Rossi"}, subject: "STO", remainingHours: 3},
        {class: "1A", professor: {id: 4, name: "Michele", surname: "Rossi"}, subject: "ITA", remainingHours: 10},
        {class: "1A", professor: {id: 5, name: "Giulia", surname: "Aranci"}, subject: "ECO", remainingHours: 3},
        {class: "1A", professor: {id: 6, name: "Filomena", surname: "Gialli"}, subject: "ENG", remainingHours: 3},
        {class: "1A", professor: {id: 1, name: "Mario", surname: "Rossi"}, subject: "MAT", remainingHours: 5},
        {class: "1A", professor: {id: 2, name: "Luigi", surname: "Rossi"}, subject: "GEO", remainingHours: 6},
        {class: "1A", professor: {id: 3, name: "Elisa", surname: "Rossi"}, subject: "STO", remainingHours: 3},
        {class: "1A", professor: {id: 4, name: "Michele", surname: "Rossi"}, subject: "ITA", remainingHours: 10},
        {class: "1A", professor: {id: 5, name: "Giulia", surname: "Aranci"}, subject: "ECO", remainingHours: 3},
        {class: "1A", professor: {id: 6, name: "Filomena", surname: "Gialli"}, subject: "ENG", remainingHours: 3},
        {class: "1A", professor: {id: 1, name: "Mario", surname: "Rossi"}, subject: "MAT", remainingHours: 5},
        {class: "1A", professor: {id: 2, name: "Luigi", surname: "Rossi"}, subject: "GEO", remainingHours: 6},
        {class: "1A", professor: {id: 3, name: "Elisa", surname: "Rossi"}, subject: "STO", remainingHours: 3},
        {class: "1A", professor: {id: 4, name: "Michele", surname: "Rossi"}, subject: "ITA", remainingHours: 10},
        {class: "1A", professor: {id: 5, name: "Giulia", surname: "Aranci"}, subject: "ECO", remainingHours: 3},
        {class: "1A", professor: {id: 6, name: "Filomena", surname: "Gialli"}, subject: "ENG", remainingHours: 3},
        {class: "1A", professor: {id: 1, name: "Mario", surname: "Rossi"}, subject: "MAT", remainingHours: 5},
        {class: "1A", professor: {id: 2, name: "Luigi", surname: "Rossi"}, subject: "GEO", remainingHours: 6},
        {class: "1A", professor: {id: 3, name: "Elisa", surname: "Rossi"}, subject: "STO", remainingHours: 3},
        {class: "1A", professor: {id: 4, name: "Michele", surname: "Rossi"}, subject: "ITA", remainingHours: 10},
        {class: "1A", professor: {id: 5, name: "Giulia", surname: "Aranci"}, subject: "ECO", remainingHours: 3},
        {class: "1A", professor: {id: 6, name: "Filomena", surname: "Gialli"}, subject: "ENG", remainingHours: 3},   
        {class: "1A", professor: {id: 1, name: "Mario", surname: "Rossi"}, subject: "MAT", remainingHours: 5},
        {class: "1A", professor: {id: 2, name: "Luigi", surname: "Rossi"}, subject: "GEO", remainingHours: 6},
        {class: "1A", professor: {id: 3, name: "Elisa", surname: "Rossi"}, subject: "STO", remainingHours: 3},
        {class: "1A", professor: {id: 4, name: "Michele", surname: "Rossi"}, subject: "ITA", remainingHours: 10},
        {class: "1A", professor: {id: 5, name: "Giulia", surname: "Aranci"}, subject: "ECO", remainingHours: 3},
        {class: "1A", professor: {id: 6, name: "Filomena", surname: "Gialli"}, subject: "ENG", remainingHours: 3},
    ]
    

    export let subjects2A: ClassSubject[] = [
        {class: "2A", professor: {id: 3, name: "Elisa", surname: "Rossi"}, subject: "STO", remainingHours: 3},
        {class: "2A", professor: {id: 6, name: "Filomena", surname: "Gialli"}, subject: "ENG", remainingHours: 3},
        {class: "2A", professor: {id: 4, name: "Michele", surname: "Rossi"}, subject: "ITA", remainingHours: 10},
        {class: "2A", professor: {id: 5, name: "Giulia", surname: "Aranci"}, subject: "ECO", remainingHours: 3},
    ]

    export let subjects3A: ClassSubject[] = [
        {class: "3A", professor: {id: 1, name: "Mario", surname: "Rossi"}, subject: "MAT", remainingHours: 5},
        {class: "3A", professor: {id: 2, name: "Luigi", surname: "Rossi"}, subject: "GEO", remainingHours: 6},
        {class: "3A", professor: {id: 5, name: "Giulia", surname: "Aranci"}, subject: "ECO", remainingHours: 3},

    ]
    */

    export let weekClass1: WeekClass = {
        className: subjects1A[0].class.name,
        grid: [],
        sidebar: subjects1A
    }

    export let weekClass2: WeekClass = {
        className: subjects2A[0].class.name,
        grid: [],
        sidebar: subjects2A
    }

    export let weekClass3: WeekClass = {
        className: subjects3A[0].class.name,
        grid: [],
        sidebar: subjects3A
    }
    

    for(let i = 0;i < 6; i++)
        weekClass1.grid.push([null,null,null,null,null])

    for(let i = 0;i < 6; i++)
        weekClass2.grid.push([null,null,null,null,null])
    
    for(let i = 0;i < 6; i++)
        weekClass3.grid.push([null,null,null,null,null])
 

    export let classes: WeekClass[]
    classes = [weekClass1, weekClass2, weekClass3]

    export let currentWeekClass = weekClass1

    function setCurrentClass(classTab: WeekClass) {
        currentWeekClass = classTab
    }
</script>

<div class="m-3">
    <ul class="nav nav-tabs">
        {#each classes as classTab}
            <li class="nav-item">
                <a class="nav-link" class:active={classTab == currentWeekClass} href="#" on:click={() => setCurrentClass(classTab)}>{classTab.className}</a>
            </li>
        {/each}
    </ul>
    
    <Timetable weekClass={currentWeekClass}></Timetable>
</div>