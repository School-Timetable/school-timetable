<script lang="ts">
    import { Professor } from "$model/professor/professor";
    import { Button, Icon, Input, Label } from "sveltestrap";
    import { createEventDispatcher } from "svelte";
    import { ZodError } from "zod";

    const eventDispatcher = createEventDispatcher();

    export let professor: Professor | null = null;

    type ProfessorFormData = {
        name: { value: string };
        surname: { value: string };
        email: { value: string };
        cellPhone: { value: string };
    };

    let editingProfessor: ProfessorFormData;

    {
        if(professor){
            editingProfessor = {
                name: { value: professor.name.value },
                surname: { value: professor.surname.value },
                email: { value: professor.email.value},
                cellPhone: { value: professor.cellPhone.value },
            }
        }
        else{
            editingProfessor = { name: { value: "" },
                surname: { value: "" },
                email: { value: "" },
                cellPhone: { value: "" },
            }
        }
    }

    function save() {
        try{
            let savedProfessor: Professor = Professor.of(   editingProfessor.name.value,
                                                            editingProfessor.surname.value,
                                                            editingProfessor.email.value,
                                                            editingProfessor.cellPhone.value)
            eventDispatcher('save', { professor: savedProfessor })
        }catch(e){
            if(e instanceof ZodError)
            alert("invalid professor: "+e.message)
        }
    }


</script>

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
    <Button color="primary" on:click={save}>
        <Icon name="check" /> Save</Button>
</td>
<td><Button color="danger" on:click={() => eventDispatcher('cancel')}>
        <Icon name="x"/> Cancel</Button>
</td>