import { Name, nameSchema } from '$model/professor/name';
import { Surname, surnameSchema } from '$model/professor/surname';
import { Cellphone, cellPhoneSchema } from '$model/professor/cellphone';
import { Mail, mailSchema } from '$model/professor/mail';
import { string, z } from 'zod';
import { v4 as uuid } from "uuid"

export const professorSchema = z.object({
    _id: z.string(),
    _name: nameSchema,
    _surname: surnameSchema,
    _email: mailSchema,
    _cellPhone: cellPhoneSchema,
}).strict();

export class Professor {
    public static readonly schema = professorSchema;

    private _id: string;
    private _name: Name;
    private _surname: Surname;
    private _email: Mail;
    private _cellPhone: Cellphone;

    constructor(id: string | null, name: Name, surname: Surname, email: Mail, cellPhone: Cellphone) {
        if (!id || id === null) {
            id = uuid();
        }

        professorSchema.parse({
            _id: id,
            _name: name,
            _surname: surname,
            _email: email,
            _cellPhone: cellPhone,
        });

        this._id = id;
        this._name = name;
        this._surname = surname;
        this._email = email;
        this._cellPhone = cellPhone;
    }

    static of(id: string | null, name: string, surname: string, email: string, cellPhone: string): Professor {
        return new Professor(
            id,
            new Name(name),
            new Surname(surname),
            new Mail(email),
            new Cellphone(cellPhone)
        );
    }

    static ofCsv(csv: string): Professor {
        if (csv.substring(0, 2) !== "P:") {
            throw new Error(`${csv} is not a professor string`);
        }

        let match = csv.match(/^P:([^;]+);([^;]+);([^;]+);([^;]+);([^;]+)$/)!;
        return Professor.of(match[1], match[2], match[3], match[4], match[5]);
    }

    get id(): string {
        return this._id;
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
        cellPhoneSchema.parse(cellPhone);
        this._cellPhone = cellPhone;
    }

    public toString(): string {
        return this._name.toString() + " " + this._surname.toString();
    }

    public toFullString(): string {
        return this._name.toString() + " " + this._surname.toString() + " " + this._email.toString() + " " + this._cellPhone.toString();
    }

    public toCsv() {
        return `P:${this._id};${this._name.value};${this._surname.value};${this._email.value};${this._cellPhone.value}`;
    }

}
