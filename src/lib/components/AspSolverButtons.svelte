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
    import { TemporarySaving,confirmSaving,revertChanges,deleteTmp } from "$lib/utils/temporary_saving_during_generation";

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
        TemporarySaving();
        generating = true;
        askSolverForTimetable(() => { generating = false; });

        classTimeTableMap.subscribe(() => {
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
    let showRevertAreaModal=false;

</script>

<div style="display: flex;  width:50%;">
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
    
    <div class="mt-3" style="margin-left: 30px;">
        <Button color="danger" on:click={() => showClearModal = true}>
            <Icon name="trash-fill" /> Clear workspace
        </Button>
    </div>
</div>

{#if localAnswersetList.length > 0}
    <div class="mt-2" style="width: 50%;">
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
        <button class="btn btn-primary mt-2" on:click={() => { showConfirmSolutionModal = true }}>Confirm this solution</button>
        <button class="btn btn-warning mt-2" on:click={() => { showRevertAreaModal=true }}>Revert to the initial state</button>
    </div>
{/if}

    <MyModal bind:showModal={showClearModal} on:confirm={() => { deleteTmp(); clearAllTimetables() }}>
        <h2 slot="header">Clear all the workspace</h2>
	<p slot="body">
		Are you sure you want to clear the workspace? The timetable will be saved in the history. 
	</p>
</MyModal>

<MyModal bind:showModal={showConfirmSolutionModal} on:confirm={() => {localAnswersetList.length = 0; confirmSaving();}}>
    <h2 slot="header">Confirm this solution</h2>
    <p slot="body">
        By doing this operation you will accept the proposed solution. All the other solutions will be deleted.
    </p>
</MyModal>
<MyModal bind:showModal={showRevertAreaModal} on:confirm={() => {revertChanges();}}>
    <h2 slot="header">Revert your changes</h2>
    <p slot="body">
        Doing this will return your workspace to the state before the automatic generation.
    </p>
</MyModal>