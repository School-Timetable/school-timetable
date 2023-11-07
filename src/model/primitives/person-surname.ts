import { z } from 'zod';

export class Surname {

    constructor(name: string) {
        z.string().min(2, {message : "The surname is too short (min 2 characters)"})
            .max(20,      {message : "The surname is too long (max 20 characters)"})
            .regex(/^[a-z]+( [a-z]+)*$/i, {message : "The surname is not valid"})
            .parse(name);
        this._name = name.toUpperCase();
    }

    private _name: string;

    public get name(): string {
        return this._name;
    }
}