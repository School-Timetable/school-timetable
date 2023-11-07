import { z } from 'zod';

export class Name {

    constructor(name: string) {
        z.string().min(2, {message : "The name is too short (min 2 characters)"})
            .max(20, {message : "The name is too long (max 20 characters)"})
            .regex(/^[A-Z][a-z]+( [A-Z][a-z]+)*/, {message : "The name is not valid"})
            .parse(name);
        this._name = name;
    }

    private _name: string;

    name(): string {
        return this._name;
    }
}