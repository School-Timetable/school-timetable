import  { Name, nameSchema } from '$model/professor/name';
import  { Surname, surnameSchema } from '$model/professor/surname';
import  { Cellphone, cellphoneSchema } from '$model/professor/cellphone';
import  { Mail, mailSchema } from '$model/professor/mail';
import { z } from 'zod';

const ProfessorSchema = z.object({
    name: nameSchema,
    surname: surnameSchema,
    email: mailSchema,
    cellphone: cellphoneSchema,
}).strict();

export class Professor {
    
    //public readonly id: number = 0;
    private name: Name;
    private surname: Surname;
    private email: Mail;
    private cellPhone: Cellphone;

    constructor(name: Name, surname: Surname, email: Mail, cellPhone: Cellphone) {
        
        ProfessorSchema.parse({
            name: name,
            surname: surname,
            email: email,
            cellphone: cellPhone,
        });
        
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.cellPhone = cellPhone;
    }

    get Name(): Name {
        return this.name;
    }

    get Surname(): Surname {
        return this.surname;
    }

    get Email(): Mail {
        return this.email;
    }

    get CellPhone(): Cellphone {
        return this.cellPhone;
    }

    set Name(name: Name) {
        nameSchema.parse(name);
        this.name = name;
    }

    set Surname(surname: Surname) {
        surnameSchema.parse(surname);
        this.surname = surname;
    }

    set Email(email: Mail) {
        mailSchema.parse(email);
        this.email = email;
    }

    set CellPhone(cellPhone: Cellphone) {
        cellphoneSchema.parse(cellPhone);
        this.cellPhone = cellPhone;
    }

    public toString(): string {
        return this.name.toString() + " " + this.surname.toString() + " " + this.email.toString() + " " + this.cellPhone.toString();
    }

}