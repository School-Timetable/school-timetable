<script>
    import {
        allProfessors,
        allClassrooms,
        allSubjects,
    } from "$lib/stores/global_store";
    import Professors from "$lib/components/Professors.svelte";
    import { Steps } from "svelte-steps";
    import Classes from "$lib/components/Classes.svelte";
    import Subjects from "$lib/components/Subjects.svelte";
    import { Button } from "sveltestrap";
    import ModalWithCloseOnly from "$lib/components/ModalWithCloseOnly.svelte";

    let steps = [
        {
            title: "Professors",
            text: "Professors",
        },
        {
            title: "Classes",
            text: "Classes",
        },
        {
            title: "Subjects",
            text: "Subjects",
        },
    ];

    let current = 0;
    $: showModal=false

    let areProfessorsNotEmpty = false;
    let areClassroomsNotEmpty = false;
    let areSubjectsNotEmpty = false;

    $: areProfessorsNotEmpty = $allProfessors.length > 0;
    $: areClassroomsNotEmpty = $allClassrooms.length > 0;
    $: areSubjectsNotEmpty = $allSubjects.length > 0;

    $: isClickable = areProfessorsNotEmpty && areClassroomsNotEmpty;

    function nextStep() {
        if (
            current === 1 &&
            (!areProfessorsNotEmpty || !areClassroomsNotEmpty)
        ) {
            current = current;
            showModal=true
        } else {
            current = Math.min(current + 1, steps.length - 1);
            showModal= false
        }
    }

    function previousStep() {
        current = Math.max(current - 1, 0);
    }
</script>
<div>
    <br>    
<Steps {steps} bind:current clickable={isClickable}/>
<hr />

{#if current === 0}
    <Professors />
{/if}
{#if current === 1}

    <Classes />
{/if}
{#if current === 2}
    <Subjects />
{/if}
<Button color="secondary" on:click={previousStep}
    >Previous</Button>
    <Button color="secondary"  on:click={nextStep}
    >Next</Button>
    <hr>

    <ModalWithCloseOnly {showModal}>
        <div slot="header">
          <h2>Impossible to create Subjects</h2>
        </div>
        <div slot="body">
          <!-- Contenuto per il corpo -->
          <p>You have to fill the professors and the classes both before the subjects</p>
        </div>
    </ModalWithCloseOnly>
</div>