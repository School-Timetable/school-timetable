import { Name, nameSchema } from '$model/professor/name';
import { Surname, surnameSchema } from '$model/professor/surname';
import { Cellphone, cellphoneSchema } from '$model/professor/cellphone';
import { Mail, mailSchema } from '$model/professor/mail';
import { z } from 'zod';

export const professorSchema = z.object({
    _name: nameSchema,
    _surname: surnameSchema,
    _email: mailSchema,
    _cellPhone: cellphoneSchema,
}).strict();

export class Professor {

    //public readonly id: number = 0;
    private _name: Name;
    private _surname: Surname;
    private _email: Mail;
    private _cellPhone: Cellphone;

    constructor(name: Name, surname: Surname, email: Mail, cellPhone: Cellphone) {

        professorSchema.parse({
            _name: name,
            _surname: surname,
            _email: email,
            _cellPhone: cellPhone,
        });

        this._name = name;
        this._surname = surname;
        this._email = email;
        this._cellPhone = cellPhone;
    }

    static of(name: string, surname: string, email: string, cellPhone: string): Professor {
        return new Professor(
            new Name(name),
            new Surname(surname),
            new Mail(email),
            new Cellphone(cellPhone)
        );
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
        return this._name.toString() + " " + this._surname.toString();
    }

}
