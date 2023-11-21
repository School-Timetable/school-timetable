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