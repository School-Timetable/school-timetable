<script lang="ts">
  import { Professor } from "$model/professor/professor";
  import { SchoolClass } from "$model/school-class/school-class";
  import { HoursPerWeek } from "$model/subject/hours-per-week";
    import { Subject, stringToSubject, subjectToString } from "$model/subject/subject";
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    export let id : String
    
    export let draggable: boolean = true
    export let droppable: boolean = true


    export let highlight: Boolean = false


    export let subject: Subject | null

    export let color: string



    function allowDrop(ev:any) {
        if(droppable)
            ev.preventDefault();
    }

    function drag(ev:any) {
        //ev.dataTransfer.setData("text", ev.target.id);

        console.log(JSON.stringify(subject))
        ev.dataTransfer.setData("subject", subjectToString(subject))
        ev.dataTransfer.setData("id", ev.target.id);
        

        dispatch("hourDrag", subject)

    }

    function drop(ev:any) {
        ev.preventDefault();
        console.log("ciao")
        //var data = ev.dataTransfer.getData("text");

        let draggedSubject : Subject | null = stringToSubject(ev.dataTransfer.getData("subject"))

        



        dispatch("hourDrop", {subject: draggedSubject, id: ev.dataTransfer.getData("id")})
        highlight = false

        console.log(draggedSubject)
    }


    function set_cell_content(subject: Subject | null) {
        if (!subject) {
            return undefined;
        }
        return `${subject.professor.name} ${subject.professor.surname} - ${subject.abbreviation}`
    }

   
</script>

<section class="hour text-wrap btn align-middle container-fluid" class:highlight="{highlight}" class:disabled="{!draggable}" style:background-color="{color}" on:dragleave={event => highlight = false}  on:dragenter={event => highlight = draggable} style="user-select: none;" id={id} on:dragstart={event => drag(event)} draggable={subject != null && draggable} on:dragover={event => allowDrop(event)} on:drop={event => drop(event)}>{set_cell_content(subject) || ""}</section>


<style>

    .highlight {
        background-color: gainsboro;
    }

    .hour {
        min-width: 50px;
        min-height: 50px;
        border: transparent;
    }

    .disabled {
        background-color: rgb(178, 177, 177) !important; 
    }

</style>