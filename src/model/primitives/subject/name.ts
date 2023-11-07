import { z } from 'zod';

const MAX_LENGTH = 20;
const valueSchema = z.string()
    .min(2, "name must be at least 2 characters")
    .max(MAX_LENGTH, `name must be at most ${MAX_LENGTH} characters`)
    .regex(/^[a-z]+( [a-z]+)*$/i, "name contains invalid characters");

export const nameSchema = z.object({
    value: valueSchema,
}).strict();

export class Name {
    public readonly value: string;

    constructor(value: string) {
        valueSchema.parse(value);
        this.value = value.toUpperCase();
    }
}
