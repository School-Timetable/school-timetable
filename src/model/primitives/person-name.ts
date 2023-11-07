import { z } from 'zod';

export class Name {

    constructor(name: string) {
        z.string().min(2, {message : "The name is too short (min 2 characters)"})
            .max(20,      {message : "The name is too long (max 20 characters)"})
            .regex(/^[a-z]+( [a-z]+)*$/i, {message : "The name is not valid"})
            .parse(name);
        this._name = name.toUpperCase();
    }

    private _name: string;

    name(): string {
        return this._name;
    }
}