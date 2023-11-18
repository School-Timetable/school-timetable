<script lang="ts">
    import type { ClassSubject } from "$lib/model";
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    export let id : String
    
    export let draggable: boolean = true
    export let droppable: boolean = true


    export let highlight: Boolean = false


    export let subject: ClassSubject | null

    export let color: string



    function allowDrop(ev:any) {
        if(droppable)
            ev.preventDefault();
    }

    function drag(ev:any) {
        //ev.dataTransfer.setData("text", ev.target.id);
        ev.dataTransfer.setData("subject", JSON.stringify(subject));
        ev.dataTransfer.setData("id", ev.target.id);
        

        dispatch("hourDrag", subject)

    }

    function drop(ev:any) {
        ev.preventDefault();
        console.log("ciao")
        //var data = ev.dataTransfer.getData("text");
        let draggedSubject : ClassSubject | null = JSON.parse(ev.dataTransfer.getData("subject"))

        dispatch("hourDrop", {subject: draggedSubject, id: ev.dataTransfer.getData("id")})
        highlight = false

        console.log(draggedSubject)
    }


    function set_cell_content(subject: ClassSubject | null) {
        if (!subject) {
            return undefined;
        }
        return `${subject.professor.name} ${subject.professor.surname} - ${subject.subject}`
    }

</script>

<!--per avere le classi colorate con un colore diverso in base alla materia, elimina class:notNullHour="{subject}"-->
<section class="hour text-wrap btn align-middle container-fluid" class:highlight="{highlight}" class:disabled="{!draggable}" style:background-color="{color}" on:dragleave={event => highlight = false}  on:dragenter={event => highlight = draggable} style="user-select: none;" id={id} on:dragstart={event => drag(event)} draggable={subject != null && draggable} on:dragover={event => allowDrop(event)} on:drop={event => drop(event)}>{set_cell_content(subject) || ""}</section>


<style>

    .highlight {
        background-color: gainsboro;
    }

    .notNullHour {
        background-color: rgb(8, 144, 229);
    }
    
    .notNullHour:hover {
        background-color: rgb(17, 110, 197);
    }

    .hour {
        min-width: 50px;
        min-height: 50px;
        border: transparent;
    }

    

    .disabled {
        background-color: rgb(178, 177, 177) !important; 
    }

    .ENG {
        background-color: rgb(252, 229, 138);
    }

    .ENG:hover {
        background-color: rgb(245, 202, 117);
    }

    .MAT {
        background-color: rgb(195, 79, 79);
    }

    .MAT:hover {
        background-color: rgb(184, 55, 87);
    }

    .GEO {
        background-color: rgb(88, 175, 88);
    }

    .GEO:hover {
        background-color: rgb(61, 134, 90);
    }

    .STO {
        background-color: rgb(182, 143, 199);
    }

    .STO:hover {
        background-color: rgb(151, 116, 165);
    }

    .ITA {
        background-color: rgb(136, 177, 242);
    }

    .ITA:hover {
        background-color: rgb(78, 123, 235);
    }

    .ECO {
        background-color: rgb(238, 170, 150);
    }

    .ECO:hover {
        background-color: rgb(238, 146, 110);
    }
    
</style>