import { z } from 'zod';

const valueSchema = z.string()
    .min(2, "The surname is too short (min 2 characters)")
    .max(20, "The surname is too long (max 20 characters)")
    .regex(/^[a-z]+( [a-z]+)*$/i, "The surname is not valid");

export const surnameSchema = z.object({
    value: valueSchema,
}).strict();


export class Surname {
    public static readonly schema = surnameSchema;

    public readonly value: string;

    public get valueUppercase() {
        return this.value.toUpperCase();
    }

    constructor(surname: string) {
        valueSchema.parse(surname);
        this.value = surname;
    }

    public toString(): string {
        return this.value.toUpperCase();
    }
}
