import { z } from 'zod';

const abbreviationSchema = z.string()
    .min(1, { message: "The abbreviation is too short (min 1 characters)" })
    .max(5, { message: "The abbreviation is too long (max 5 characters)" })
    .regex(/^[a-z]+( [a-z]+)*$/i, { message: "The abbreviation contains invalid characters" })


export class Abbreviation {
    public readonly value: string;

    constructor(value: string) {
        abbreviationSchema.parse(value);
        this.value = value.toUpperCase();
    }
}
