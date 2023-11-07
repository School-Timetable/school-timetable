import  { Name, nameSchema } from './primitives/professor/professor-name';
import  { Surname, surnameSchema } from './primitives/professor/professor-surname';
import  { Cellphone, cellphoneSchema } from './primitives/professor/professor-cellphone';
import  { Mail, mailSchema } from './primitives/professor/professor-mail';
import { z } from 'zod';

const ProfessorSchema = z.object({
    name: nameSchema,
    surname: surnameSchema,
    email: mailSchema,
    cellphone: cellphoneSchema,
}).strict();

export class Professor {
    
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

    //public readonly id: number = 0;
    public readonly name: Name;
    public readonly surname: Surname;
    public readonly email: Mail;
    public readonly cellPhone: Cellphone;
}