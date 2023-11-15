<script lang="ts">
    import { Button, Col, Container, Form, Icon, Row } from "sveltestrap";
    import { fade, slide } from "svelte/transition";
    import ProfessorFormRow from "./ProfessorFormRow.svelte";
    import { circIn } from "svelte/easing";
    import { flip } from 'svelte/animate'
    import { get } from "svelte/store";
    import { allProfessors } from "$lib/stores/global_store";
    import { Professor } from "$model/professor/professor";

    let professors = get(allProfessors);
    professors = [...professors, Professor.of(null, "John", "Doe", "johndoe@gmail.com", "+391234567890"), 
                        Professor.of(null, "Jane", "Doe", "janedoe@gmail.com", "+391334567890"),
                        Professor.of(null, "Will", "Spt", "willspt@gmail.com", "+391234367890")]

    type ProfessorFormData = {
        name: { value: string };
        surname: { value: string };
        email: { value: string };
        cellPhone: { value: string };
    };

    let options = {duration: 200 ,easing: circIn};

    let editingProfessor: ProfessorFormData | null = null;
    let editingIndex: number | null = null;

    function editProfessor(index: number) {
        editingIndex = index;
        professors = professors;
    }

    const saveProfessor = (event: { detail: any }, index:number) => {
        professors[index] = event.detail.professor;
        editingIndex = null;
        allProfessors.set(professors);
    }

    function addProfessor() {
        editingProfessor = {
            name: { value: "" },
            surname: { value: "" },
            email: { value: "" },
            cellPhone: { value: "" },
        };
        editingIndex = professors.length;
    }

    const createProfessor = (event: { detail: any }) => {
            professors = [
                ...professors,
                event.detail.professor,
            ];
        editingIndex = null;
        allProfessors.set(professors);
    }


</script>

<Form>

    <Container>
        <Row>
            <Col sm={{size: 2}}><strong>Name</strong></Col>
            <Col sm={{size: 2}}><strong>Surname</strong></Col>
            <Col sm={{size: 3}}><strong>Mail</strong></Col>
            <Col sm={{size: 2}}><strong>Cellphone</strong></Col>
        </Row>
        {#each professors as professor (professor.id)}
            <div class="row" animate:flip >
                {#if editingIndex != professors.indexOf(professor)}
                    <Col sm={{size: 2}}>{professor.name.value}</Col>
                    <Col sm={{size: 2}}>{professor.surname.value}</Col>
                    <Col sm={{size: 3}}>{professor.email.value}</Col>
                    <Col sm={{size: 2}}>{professor.cellPhone.value}</Col>
                    <Col sm={{size: 3}} style="display: flex; justify-content: flex-end; align-items: center; margin-bottom: 13pt;">
                        <Button color="primary" on:click={() => editProfessor(professors.indexOf(professor))}>
                            <Icon name="pencil-square" /> Edit
                        </Button>
                        <Button color="danger" on:click={() => {professors.splice(professors.indexOf(professor),1); professors = professors}}>
                            <Icon name="trash-fill"/> Delete
                        </Button>
                    </Col>
                {:else}
                    <ProfessorFormRow {professor} on:cancel={() =>{editingIndex = null}} 
                        on:save={(e) => {saveProfessor(e, professors.indexOf(professor))}}/>
                {/if}
            </div>
        {/each}
        {#if editingIndex == professors.length}
            <div class="row" in:slide|local={{...options}}>
                <ProfessorFormRow on:cancel={() =>{editingIndex = null}} 
                    on:save={createProfessor}/>
            </div>
        {/if}
        <Row>
            <div class="col-12 text-center">
                <Button color="primary" on:click={() => addProfessor()}><Icon name="plus" />Add</Button>
            </div>
        </Row>
    </Container>

</Form>
