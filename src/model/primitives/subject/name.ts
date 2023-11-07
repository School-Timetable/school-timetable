import { z } from 'zod';

const nameSchema = z.string()
    .min(2, { message: "The name is too short (min 2 characters)" })
    .max(20, { message: "The name is too long (max 20 characters)" })
    .regex(/^[a-z]+( [a-z]+)*$/i, { message: "The name is not valid" });

export class Name {
    public readonly value: string;

    constructor(value: string) {
        nameSchema.parse(value);
        this.value = value.toUpperCase();
    }
}
