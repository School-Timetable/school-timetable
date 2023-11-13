<script lang="ts">
    import { Button, Form, Icon, Input, Label } from "sveltestrap";
    import { Professor } from '$model/professor/professor'
    import { Name } from '$model/professor/name'
    import { Surname } from '$model/professor/surname'
    import { Mail } from '$model/professor/mail'
    import { Cellphone } from '$model/professor/cellphone'
    import ProfessorFormRow from "./ProfessorFormRow.svelte";

    let professors = [  Professor.of("John", "Doe", "johndoe@gmail.com", "+391234567890"), 
                        Professor.of("Jane", "Doe", "janedoe@gmail.com", "+391334567890"),
                        Professor.of("Will", "Spt", "willspt@gmail.com", "+391234367890")]

    type ProfessorFormData = {
        name: { value: string };
        surname: { value: string };
        email: { value: string };
        cellPhone: { value: string };
    };

    let editingProfessor: ProfessorFormData | null = null;
    let editingIndex: number | null = null;

    function editProfessor(index: number) {
        editingIndex = index;
        professors = professors;
    }

    const saveProfessor = (event: { detail: any }, index:number) => {
        professors[index] = event.detail.professor;
        editingIndex = null;
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
    }


</script>

<Form>

    <table class="text-center">
        <thead>
            <tr>
                <th>Name</th>
                <th>Surname</th>
                <th>Mail</th>
                <th>Cellphone</th>
            </tr>
        </thead>
        <tbody>
            {#each professors as professor, i}
                <tr>
                    {#if editingIndex != i}

                        <td>{professor.name.value}</td>
                        <td>{professor.surname.value}</td>
                        <td>{professor.email.value}</td>
                        <td>{professor.cellPhone.value}</td>
                        <td>
                            <Button color="primary" on:click={() => editProfessor(i)}>
                                <Icon name="pencil-square" /> Edit</Button>
                        </td>
                        <td><Button color="danger" on:click={() => {professors.splice(i,1); professors = professors}}>
                                <Icon name="trash-fill"/> Delete</Button>
                        </td>
                    {:else}
                        <ProfessorFormRow {professor} on:cancel={() =>{editingIndex = null}} 
                            on:save={(e) => {saveProfessor(e, i)}}/>
                    {/if}
                </tr>
            {/each}
            {#if editingIndex == professors.length}
                <tr>
                    <ProfessorFormRow on:cancel={() =>{editingIndex = null}} 
                        on:save={createProfessor}/>
                </tr>
            {/if}
            <tr>
                <td colspan="7">
                    <Button color="primary" on:click={() => addProfessor()}>Add</Button>
                </td>
            </tr>
        </tbody>
    </table>

</Form>