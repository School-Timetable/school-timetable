<script lang="ts">
    import type { Professor } from "$lib/model";
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    export let id : String
    
    export let draggable: boolean = true
    export let droppable: boolean = true


    export let highlight: Boolean = false


    export let professor: Professor | null



    function allowDrop(ev:any) {
        if(droppable)
            ev.preventDefault();
    }

    function drag(ev:any) {
        //ev.dataTransfer.setData("text", ev.target.id);
        ev.dataTransfer.setData("prof", JSON.stringify(professor));
        ev.dataTransfer.setData("id", ev.target.id);
        

        dispatch("hourDrag",professor)

    }

    function drop(ev:any) {
        ev.preventDefault();
        //var data = ev.dataTransfer.getData("text");
        let prof : Professor | null = JSON.parse(ev.dataTransfer.getData("prof"))

        dispatch("hourDrop", {prof: prof,id: ev.dataTransfer.getData("id")})
        highlight = false


    }

   


    function set_cell_content(professor: Professor) {
        if (!professor) {
            return undefined;
        }
        return `${professor.name} ${professor.surname} - ${professor.subject}`
    }

</script>

<!--per avere le classi colorate con un colore diverso in base alla materia, elimina class:notNullHour="{professor}"-->
<section class="hour text-wrap btn align-middle container-fluid {professor?.subject}"  class:highlight="{highlight}" on:dragleave={event => highlight = false}  on:dragenter={event => highlight = draggable} style="user-select: none;" id={id} on:dragstart={event => drag(event)} draggable={professor != null && draggable} on:dragover={event => allowDrop(event)} on:drop={event => drop(event)}>{set_cell_content(professor) || ""}</section>


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

    .hour:hover {
        background-color: +50%;
    }

    .ENG {
        background-color: rgb(255, 204, 0);
    }

    .ENG:hover {
        background-color: rgb(255, 170, 0);
    }

    .MAT {
        background-color: rgb(167, 24, 24);
    }

    .MAT:hover {
        background-color: rgb(151, 19, 52);
    }

    .GEO {
        background-color: rgb(11, 113, 11);
    }

    .GEO:hover {
        background-color: rgb(10, 103, 47);
    }

    .STO {
        background-color: rgb(145, 101, 166);
    }

    .STO:hover {
        background-color: rgb(98, 62, 114);
    }

    .ITA {
        background-color: rgb(78, 139, 235);
    }

    .ITA:hover {
        background-color: rgb(78, 123, 235);
    }

    
</style>