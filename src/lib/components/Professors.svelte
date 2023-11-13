<script lang="ts">
    import { Button, Form, Icon, Input, Label } from "sveltestrap";
    import { Professor } from '$model/professor/professor'
    import { Name } from '$model/professor/name'
    import { Surname } from '$model/professor/surname'
    import { Mail } from '$model/professor/mail'
    import { Cellphone } from '$model/professor/cellphone'

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
        editingProfessor = {
            name: { value: professors[index].name.value },
            surname: { value: professors[index].surname.value },
            email: { value: professors[index].email.value },
            cellPhone: { value: professors[index].cellPhone.value },
        };
        professors = professors;
    }

    function saveProfessor(index: number) {
        if (editingProfessor) {
            professors[index].name = new Name(editingProfessor.name.value);
            professors[index].surname = new Surname(editingProfessor.surname.value);
            professors[index].email = new Mail(editingProfessor.email.value);
            professors[index].cellPhone = new Cellphone(editingProfessor.cellPhone.value);
        }
        editingIndex = null;
        editingProfessor = null;
        professors = professors;
    
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

    function createProfessor() {
        if (editingProfessor) {
            professors = [
                ...professors,
                Professor.of(
                    editingProfessor.name.value,
                    editingProfessor.surname.value,
                    editingProfessor.email.value,
                    editingProfessor.cellPhone.value
                ),
            ];
        }
        editingIndex = null;
        editingProfessor = null;
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
                    {:else if editingProfessor}
                        <td>
                            <Label for="name">Name</Label>
                            <Input type="text" label="name" name="name" id="name" bind:value={editingProfessor.name.value} />
                        </td>
                        <td>
                            <Label for="surname">Surname</Label>
                            <Input type="text" label="surname" name="surname" id="surname" bind:value={editingProfessor.surname.value} /></td>
                        <td>
                            <Label for="email">Mail</Label>
                            <Input type="text" label="email" name="email" id="email" bind:value={editingProfessor.email.value} /></td>
                        <td>
                            <Label for="cellPhone">Cellphone</Label>
                            <Input type="text" label="cellPhone" name="cellPhone" id="cellPhone" bind:value={editingProfessor.cellPhone.value} /></td>
                        <td>
                            <Button color="primary" on:click={() => saveProfessor(i)}>
                                <Icon name="check" /> Save</Button>
                        </td>
                        <td><Button color="danger" on:click={() => {editingIndex = null; editingProfessor = null;}}>
                                <Icon name="x"/> Cancel</Button>
                        </td>
                    {/if}
                </tr>
            {/each}
            {#if editingIndex == professors.length}
                <tr>
                    <td>
                        <Label for="name">Name</Label>
                        <Input type="text" label="name" name="name" id="name" bind:value={editingProfessor.name.value} />
                    </td>
                    <td>
                        <Label for="surname">Surname</Label>
                        <Input type="text" label="surname" name="surname" id="surname" bind:value={editingProfessor.surname.value} /></td>
                    <td>
                        <Label for="email">Mail</Label>
                        <Input type="text" label="email" name="email" id="email" bind:value={editingProfessor.email.value} /></td>
                    <td>
                        <Label for="cellPhone">Cellphone</Label>
                        <Input type="text" label="cellPhone" name="cellPhone" id="cellPhone" bind:value={editingProfessor.cellPhone.value} /></td>
                    <td>
                        <Button color="primary" on:click={() => createProfessor()}>
                            <Icon name="check" /> Save</Button>
                    </td>
                    <td><Button color="danger" on:click={() => {editingIndex = null; editingProfessor = null;}}>
                            <Icon name="x"/> Cancel</Button>
                    </td>
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