import { z } from 'zod';

const MAX_LENGTH = 60;
const valueSchema = z.string()
    .min(2, "The name is too short (min 2 characters)")
    .max(MAX_LENGTH, `The name is too long (max ${MAX_LENGTH} characters)`)
    .regex(/^[a-z][\w' ]+[a-z]$/i, "The name contains invalid characters");

export const nameSchema = z.object({
    value: valueSchema,
}).strict();

export class Name {
    public static readonly schema = nameSchema;

    public readonly value: string;

    constructor(value: string) {
        valueSchema.parse(value);
        this.value = value;
    }

    public toString(): string {
        return this.value;
    }
}
