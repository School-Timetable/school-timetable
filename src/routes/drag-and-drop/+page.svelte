<script lang="ts">
    import Timetable from '$lib/component/timetable.svelte';
    import type { ClassSubject, WeekClass } from '$lib/model';
    import { TabContent, TabPane } from 'sveltestrap';

     // prova
     export let subjects1A: ClassSubject[] = [
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
    
    export let weekClass1: WeekClass = {
        name: "1A",
        grid: [],
        sidebar: subjects1A
    }

    export let weekClass2: WeekClass = {
        name: "2A",
        grid: [],
        sidebar: subjects2A
    }

    export let weekClass3: WeekClass = {
        name: "3A",
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
                <a class="nav-link" class:active={classTab == currentWeekClass} href="#" on:click={() => setCurrentClass(classTab)}>{classTab.name}</a>
            </li>
        {/each}
    </ul>
    
    <Timetable weekClass={currentWeekClass}></Timetable>
</div>