import { z } from 'zod';

export class Mail {

    constructor(mail: string) {
        z.string().email({message : "The mail is not valid"})
            .min(5, {message : "The mail is too short (min 5 characters)"})
            .max(30, {message : "The mail is too long (max 30 characters)"})
            .parse(mail);
        this._mail = mail;
    }

    private _mail: string;

    mail(): string {
        return this._mail;
    }
}