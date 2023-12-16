<script lang="ts">
    import {
        allAnswersets,
        askSolverForTimetable,
        classTimeTableMap,
        controller,
        parseSolverResponse
    } from "$lib/stores/global_store";
    import {Button, Col, Icon, Input} from "sveltestrap";
    import MyModal from "./MyModal.svelte";
    import { createEventDispatcher } from "svelte";

    let generating: boolean = false
    let showClearModal: boolean = false

    let localAnswersetList: string[][] = []

    let selectedSolution: number;

    $: allAnswersets.subscribe((answersets) => {
        localAnswersetList = answersets
        if (answersets.length > 0){
            parseSolverResponse(answersets[0])
            selectedSolution = 0
        }

        console.log("answersets updated")
    })

    $: if (selectedSolution != undefined && localAnswersetList.length > 0) {
        console.log("selectedSolution: " + selectedSolution)
        parseSolverResponse(localAnswersetList[selectedSolution])
    }

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
            }, 4000);
            //console.log("call to subscribe")
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

    let showConfirmSolutionModal = false;

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

{#if localAnswersetList.length > 0}
    <div class="mt-2">
        <Input
                bind:value={selectedSolution}
                type="select"
                name="select-solution"
                id="select-solution"
                >
            {#each localAnswersetList as answerset, i}
                <option value={i}>Solution {i+1}</option>
            {/each}
        </Input>
    </div>
    <button class="btn btn-primary mt-2" on:click={() => showConfirmSolutionModal = true}>Confirm this solution</button>
{/if}

<MyModal bind:showModal={showClearModal} on:confirm={clearAllTimetables}>
	<h2 slot="header">Clear all the workspace</h2>
	<p slot="body">
		Are you sure you want to clear the workspace? The timetable will be saved in the history. 
	</p>
</MyModal>

<MyModal bind:showModal={showConfirmSolutionModal} on:confirm={() => {localAnswersetList.length = 0}}>
    <h2 slot="header">Confirm this solution</h2>
    <p slot="body">
        By doing this operation you will accept the proposed solution. All the other solutions will be deleted.
    </p>
</MyModal>