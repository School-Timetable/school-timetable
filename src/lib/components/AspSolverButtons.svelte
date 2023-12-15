<script lang="ts">
    import { askSolverForTimetable, classTimeTableMap, controller } from "$lib/stores/global_store";
    import { Button, Col, Icon } from "sveltestrap";
    import MyModal from "./MyModal.svelte";
    import { createEventDispatcher } from "svelte";

    let generating: boolean = false
    let showClearModal: boolean = false

    const eventDispatcher = createEventDispatcher<{
		reload: void;
        clear: void;
	}>();


    function startCreation() {
        generating = true
        askSolverForTimetable()
        classTimeTableMap.subscribe(() => {
            setTimeout(() => {
                generating = false
            }, 2000);
            console.log("call to subscribe")
            eventDispatcher("reload")
        })
    }

    function stopCreation() {
        generating = false
         console.log('Now aborting');
        // Abort.
        controller.abort()
    }

    function clearAllTimetables() {
        showClearModal = false
        eventDispatcher("clear")
    }

</script>

<div class="btn-group mt-3">
    <Button color="primary" on:click={startCreation}>
        Auto generate
        {#if generating}
        <span class="spinner-border spinner-border-sm mr-1"></span>
        {/if}
    </Button>
    {#if generating}
        <Button color="danger" on:click={stopCreation}><Icon name="stop-circle" /> Stop</Button>
    {/if}
</div>

<div class="mt-2">
    <Button color="danger" on:click={() => showClearModal = true}>
        <Icon name="trash-fill" /> Clear workspace
    </Button>
</div>


<MyModal bind:showModal={showClearModal} on:confirm={clearAllTimetables}>
	<h2 slot="header">Clear all the workspace</h2>
	<p slot="body">
		Are you sure you want to clear the workspace? The timetable will be saved in the history. 
	</p>
</MyModal>