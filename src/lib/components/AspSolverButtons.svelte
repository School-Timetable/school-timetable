<script lang="ts">
    import { askSolverForTimetable, controller } from "$lib/stores/global_store";
    import { Button, Icon } from "sveltestrap";

    let generating: boolean = false

    function startCreation() {
        generating = true
        askSolverForTimetable()
    }

    function stopCreation() {
        generating = false
         console.log('Now aborting');
        // Abort.
        controller.abort()
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