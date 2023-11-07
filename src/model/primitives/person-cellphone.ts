import { z } from 'zod';

export class Cellphone {

    constructor(cellphone: string) {
        z.string().min(6, {message : "The cellphone is too short (min 8 characters)"})
            .max(15,      {message : "The cellphone is too long (max 15 characters)"})
            .regex(/^[0-9]+$/, {message : "The cellphone is not valid"})
            .parse(cellphone);
        this._cellphone = cellphone;
    }

    private _cellphone: string;

    cellphone(): string {
        return this._cellphone;
    }
}