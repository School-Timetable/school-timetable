<script lang="ts">
    import { Professor } from "$model/professor/professor";
    import { Button, Col, FormGroup, Icon, Input, Label } from "sveltestrap";
    import { createEventDispatcher } from "svelte";
    import { ZodError } from "zod";
    import { nameSchema } from "$model/professor/name";
    import { surnameSchema } from "$model/professor/surname";
    import { mailSchema } from "$model/professor/mail";
    import { cellPhoneSchema } from "$model/professor/cellphone";

    const eventDispatcher = createEventDispatcher();

    export let professor: Professor | null = null;

    let nameValidation = { errorMessage: "", valid: false, invalid: false };
    let surnameValidation = { errorMessage: "", valid: false, invalid: false };
    let mailValidation = { errorMessage: "", valid: false, invalid: false };
    let cellPhoneValidation = { errorMessage: "", valid: false, invalid: false };

    const correctFeedback = "";

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
            let savedProfessor: Professor = Professor.of(   null, editingProfessor.name.value,
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
            nameValidation.valid = true;
            nameValidation.invalid = false;
            nameValidation.errorMessage = correctFeedback
        }catch(e){
            if(e instanceof ZodError)
            {
                nameValidation.errorMessage = e.issues[0].message;
                nameValidation.valid = false;
                nameValidation.invalid = true;
            }
        }
    }

    function validateSurname(){
        try{
            surnameSchema.parse(editingProfessor.surname);
            surnameValidation.valid = true;
            surnameValidation.invalid = false;
            surnameValidation.errorMessage = correctFeedback
        }catch(e){
            if(e instanceof ZodError)
            {
                surnameValidation.errorMessage = e.issues[0].message;
                surnameValidation.valid = false;
                surnameValidation.invalid = true;
            }
        }
    }

    function validateEmail(){
        try{
            mailSchema.parse(editingProfessor.email);
            mailValidation.valid = true;
            mailValidation.invalid = false;
            mailValidation.errorMessage = correctFeedback
        }catch(e){
            if(e instanceof ZodError)
            {
                mailValidation.errorMessage = e.issues[0].message;
                mailValidation.valid = false;
                mailValidation.invalid = true;
            }
        }
    }

    function validateCellPhone(){
        try{
            cellPhoneSchema.parse(editingProfessor.cellPhone);
            cellPhoneValidation.valid = true;
            cellPhoneValidation.invalid = false;
            cellPhoneValidation.errorMessage = correctFeedback
        }catch(e){
            if(e instanceof ZodError)
            {
                cellPhoneValidation.errorMessage = e.issues[0].message;
                cellPhoneValidation.valid = false;
                cellPhoneValidation.invalid = true;
            }
        }
    }


</script>

<Col sm={{size: 2}}>
    <FormGroup floating label="Name" style="color: grey;">
        <Input type="text" label="name" placeholder="Enter a value" name="name" id="name"
            bind:value={editingProfessor.name.value} on:keyup={validateName} bind:feedback={nameValidation.errorMessage}
            bind:valid={nameValidation.valid} bind:invalid={nameValidation.invalid} />
    </FormGroup>
</Col>
<Col sm={{size: 2}}>
    <FormGroup floating label="Surname" style="color: grey;">
        <Input type="text" label="surname" placeholder="Enter a value" name="surname" id="surname"
            bind:value={editingProfessor.surname.value} on:keyup={validateSurname} bind:feedback={surnameValidation.errorMessage}
            bind:valid={surnameValidation.valid} bind:invalid={surnameValidation.invalid} />
    </FormGroup>
</Col>
<Col sm={{size: 3}}>
    <FormGroup floating label="Email" style="color: grey;">
        <Input type="text" label="email" placeholder="Enter a value" name="email" id="email"
            bind:value={editingProfessor.email.value} on:keyup={validateEmail} bind:feedback={mailValidation.errorMessage}
            bind:valid={mailValidation.valid} bind:invalid={mailValidation.invalid}/>
    </FormGroup>
</Col>
<Col sm={{size: 2}}>
    <FormGroup floating label="Phone number" style="color: grey;">
        <Input type="text" label="cellPhone" placeholder="Enter a value" name="cellPhone" id="cellPhone"
            bind:value={editingProfessor.cellPhone.value} on:keyup={validateCellPhone} bind:feedback={cellPhoneValidation.errorMessage}
            bind:valid={cellPhoneValidation.valid} bind:invalid={cellPhoneValidation.invalid} />
    </FormGroup>
</Col>
<Col sm={{size: 3}} style="display: flex; justify-content: flex-end; align-items: center; margin-bottom: 13pt;">
    <Button color="primary" on:click={save}>
        <Icon name="check"/> Save</Button>
    <Button color="danger" on:click={() => eventDispatcher('cancel')}>
        <Icon name="x"/> Cancel</Button>
</Col>
