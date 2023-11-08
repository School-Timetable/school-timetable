import { z } from 'zod';

const valueSchema = z.string()
    .min(6,     "The cellphone is too short (min 8 characters)")
    .max(15,    "The cellphone is too long (max 15 characters)")
    .regex(/^[0-9]+$/,  "The cellphone is not valid");

export const cellphoneSchema = z.object({
    value: valueSchema,
}).strict();

export class Cellphone {

    public readonly value: string;

    constructor(cellphone: string) {

        valueSchema.parse(cellphone);
        this.value = cellphone;
    }

    public toString(): string {
        return this.value.toString();
    }

}