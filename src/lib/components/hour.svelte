<script lang="ts">
    import { Subject, stringToSubject, subjectToString } from "$model/subject/subject";
    import  { Unavailable } from "$model/timetable/unavailable";
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();
    export let id : String
    export let draggable: boolean = true
    export let droppable: boolean = true
    let highlight: Boolean = false
    export let subject: Subject | Unavailable | null
    export let color: string = "transparent"
    export let isProfessorView: boolean = false
    export let unavailable: boolean = false


    function allowDrop(ev:any) {
        if(droppable)
            ev.preventDefault();
    }

    function drag(ev:any) {

        ev.dataTransfer.setData("subject", subjectToString(subject))
        ev.dataTransfer.setData("id", ev.target.id);
        

        dispatch("hourDrag", subject)

    }

    function drop(ev:any) {
        ev.preventDefault();
        let draggedSubject : Subject | null = stringToSubject(ev.dataTransfer.getData("subject"))
        dispatch("hourDrop", {subject: draggedSubject, id: ev.dataTransfer.getData("id")})
        highlight = false
    }


    function set_cell_content(subject: Subject | null) {
        if (!subject) {
            return undefined;
        }
        if (isProfessorView)
            return `${subject.schoolClass} - ${subject.abbreviation}`
        else
            return `${subject.professor.name} ${subject.professor.surname} - ${subject.abbreviation}`
    }

    function onClick()
    {
        dispatch("click")
    }

    function onDragEnd()
    {
        dispatch("dragend")
    }

</script>



<!-- svelte-ignore a11y-click-events-have-key-events -->
<div on:dragend={onDragEnd} on:dragleave={() => highlight = false}  on:dragenter={() => highlight = draggable} id={id} on:dragstart={event => drag(event)} draggable={subject != null && draggable} on:dragover={event => allowDrop(event)} on:drop={event => drop(event)} class="text-wrap align-middle hour" on:click={onClick} >
    {#if subject instanceof Unavailable || unavailable}
         <!-- TODO <img src="images/cross.png"> -->
        <section class="hourItem unavailable">Unavailable</section>
    {:else}
        <section class="hourItem" style="user-select: none;" class:highlight="{highlight}" class:disabled="{!draggable}" style:background-color="{color}" >{set_cell_content(subject) || ""}</section>
    {/if}
</div>
<style>

    .highlight {
        background-color: gainsboro;
    }

    .hour {
        border: transparent;
        min-width: 100px;
        height: 50px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .disabled {
        background-color: rgb(178, 177, 177) !important; 
    }

    .unavailable
    {
        background-color: rgb(239, 107, 107);
    }

    .hourItem
    {
        width: 100%;
        height: 100%;
    }

</style>