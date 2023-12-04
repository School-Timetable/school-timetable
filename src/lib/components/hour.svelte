<script lang="ts">
    import { Subject, stringToSubject, subjectToString } from "$model/subject/subject";
    import  { Unavailable } from "$model/timetable/unavailable";
    import { createEventDispatcher } from "svelte";
  import { Icon } from "sveltestrap";
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
<div class="text-wrap align-middle hour text-center" on:drop={event => drop(event)} on:click={onClick} >
    {#if subject instanceof Unavailable || unavailable}
         <!-- TODO <img src="images/cross.png"> -->
         <Icon style="font-size: 30px;" name="x" />
       
    {:else}
        <section class="btn hourItem" style="user-select: none;" draggable={subject != null && draggable}  on:dragend={onDragEnd} on:dragleave={() => highlight = false}  on:dragenter={() => highlight = draggable} id={id} on:dragstart={event => drag(event)} on:dragover={event => allowDrop(event)}   class:highlight="{highlight}" class:disabled="{!draggable}" style:background-color="{color}" >{set_cell_content(subject) || ""}</section>
    {/if}
</div>
<style>

    .highlight {
        background-color: gainsboro;
    }

    .hour {
        border: transparent;
        min-width: 120px;
        height: 60px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .disabled {
        background-color: rgb(178, 177, 177) !important; 
    }

    .hourItem
    {
        width: 100%;
        height: 100%;
    }

</style>