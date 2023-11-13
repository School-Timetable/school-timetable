<script lang="ts">
    import { Professor } from "$model/professor/professor";
    import { Button, ButtonGroup, Col, FormGroup, Icon, Input, Label } from "sveltestrap";
    import { createEventDispatcher } from "svelte";
    import { ZodArray, ZodError, ZodIssueCode, type ZodIssue } from "zod";
    import { nameSchema } from "$model/professor/name";
    import { surnameSchema } from "$model/professor/surname";
    import { mailSchema } from "$model/professor/mail";
    import { cellPhoneSchema } from "$model/professor/cellphone";

    const eventDispatcher = createEventDispatcher();

    export let professor: Professor | null = null;

    let nameErrorMessage: string = "";
    let nameValid: boolean = false;
    let nameInvalid: boolean;
    $: nameInvalid = !nameValid;
    const correctFeedback = "";

    let surnameErrorMessage: string = "";
    let surnameValid: boolean = false;
    let surnameInvalid: boolean;
    $: surnameInvalid = !surnameValid;


    let emailErrorMessage: string = "";
    let emailValid: boolean = false;
    let emailInvalid: boolean;
    $: emailInvalid = !emailValid;

    let cellPhoneErrorMessage: string = "";
    let cellPhoneValid: boolean = false;
    let cellPhoneInvalid: boolean;
    $: cellPhoneInvalid = !cellPhoneValid;

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
            validateName()
            validateSurname()
            validateEmail()
            validateCellPhone()
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
        validateName()
        validateSurname()
        validateEmail()
        validateCellPhone()
        try{
            let savedProfessor: Professor = Professor.of(   editingProfessor.name.value,
                                                            editingProfessor.surname.value,
                                                            editingProfessor.email.value,
                                                            editingProfessor.cellPhone.value)
            eventDispatcher('save', { professor: savedProfessor })
        }catch(e){
            if(e instanceof ZodError)
            {
                
            }
        }
    }

    function validateName(){
        try{
            nameSchema.parse(editingProfessor.name);
            nameValid = true;
            nameErrorMessage = correctFeedback
        }catch(e){
            if(e instanceof ZodError)
            {
                nameErrorMessage = e.issues[0].message;
                nameValid = false;
            }
        }
    }

    function validateSurname(){
        try{
            surnameSchema.parse(editingProfessor.surname);
            surnameValid = true;
            surnameErrorMessage = correctFeedback
        }catch(e){
            if(e instanceof ZodError)
            {
                surnameErrorMessage = e.issues[0].message;
                surnameValid = false;
            }
        }
    }

    function validateEmail(){
        try{
            mailSchema.parse(editingProfessor.email);
            emailValid = true;
            emailErrorMessage = correctFeedback
        }catch(e){
            if(e instanceof ZodError)
            {
                emailErrorMessage = e.issues[0].message;
                emailValid = false;
            }
        }
    }

    function validateCellPhone(){
        try{
            cellPhoneSchema.parse(editingProfessor.cellPhone);
            cellPhoneValid = true;
            cellPhoneErrorMessage = correctFeedback
        }catch(e){
            if(e instanceof ZodError)
            {
                cellPhoneErrorMessage = e.issues[0].message;
                cellPhoneValid = false;
            }
        }
    }


</script>

<Col sm={{size: 2, offset: 1}}>
    <FormGroup floating label="Name" style="color: grey;">
        <Input type="text" label="name" placeholder="Enter a value" name="name" id="name"
            bind:value={editingProfessor.name.value} on:keyup={validateName} bind:feedback={nameErrorMessage}
            bind:valid={nameValid} bind:invalid={nameInvalid} />
    </FormGroup>
</Col>
<Col sm={{size: 2}}>
    <FormGroup floating label="Surname" style="color: grey;">
        <Input type="text" label="surname" placeholder="Enter a value" name="surname" id="surname"
            bind:value={editingProfessor.surname.value} on:keyup={validateSurname} bind:feedback={surnameErrorMessage}
            bind:valid={surnameValid} bind:invalid={surnameInvalid} />
    </FormGroup>
</Col>
<Col sm={{size: 2}}>
    <FormGroup floating label="Email" style="color: grey;">
        <Input type="text" label="email" placeholder="Enter a value" name="email" id="email"
            bind:value={editingProfessor.email.value} on:keyup={validateEmail} bind:feedback={emailErrorMessage}
            bind:valid={emailValid} bind:invalid={emailInvalid}/>
    </FormGroup>
</Col>
<Col sm={{size: 2}}>
    <FormGroup floating label="Phone number" style="color: grey;">
        <Input type="text" label="cellPhone" placeholder="Enter a value" name="cellPhone" id="cellPhone"
            bind:value={editingProfessor.cellPhone.value} on:keyup={validateCellPhone} bind:feedback={cellPhoneErrorMessage}
            bind:valid={cellPhoneValid} bind:invalid={cellPhoneInvalid} />
    </FormGroup>
</Col>
<Col sm={{size: 3}} style="display: flex; align-items: center; margin-bottom: 13pt;">
    <Button color="primary" on:click={save}>
        <Icon name="check"/> Save</Button>
    <Button color="danger" on:click={() => eventDispatcher('cancel')}>
        <Icon name="x"/> Cancel</Button>
</Col>
