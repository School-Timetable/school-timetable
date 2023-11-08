import  { Name, nameSchema } from './name';
import  { Surname, surnameSchema } from './surname';
import  { Cellphone, cellphoneSchema } from './cellphone';
import  { Mail, mailSchema } from './mail';
import { z } from 'zod';

const ProfessorSchema = z.object({
    name: nameSchema,
    surname: surnameSchema,
    email: mailSchema,
    cellphone: cellphoneSchema,
}).strict();

export class Professor {
    
    //public readonly id: number = 0;
    private _name: Name;
    private _surname: Surname;
    private _email: Mail;
    private _cellPhone: Cellphone;

    constructor(name: Name, surname: Surname, email: Mail, cellPhone: Cellphone) {
        
        ProfessorSchema.parse({
            name: name,
            surname: surname,
            email: email,
            cellphone: cellPhone,
        });
        
        this._name = name;
        this._surname = surname;
        this._email = email;
        this._cellPhone = cellPhone;
    }

    get name(): Name {
        return this._name;
    }

    get surname(): Surname {
        return this._surname;
    }

    get email(): Mail {
        return this._email;
    }

    get cellPhone(): Cellphone {
        return this._cellPhone;
    }

    set name(name: Name) {
        nameSchema.parse(name);
        this._name = name;
    }

    set surname(surname: Surname) {
        surnameSchema.parse(surname);
        this._surname = surname;
    }

    set email(email: Mail) {
        mailSchema.parse(email);
        this._email = email;
    }

    set cellPhone(cellPhone: Cellphone) {
        cellphoneSchema.parse(cellPhone);
        this._cellPhone = cellPhone;
    }

    public toString(): string {
        return this._name.toString() + " " + this._surname.toString() + " " + this._email.toString() + " " + this._cellPhone.toString();
    }

}