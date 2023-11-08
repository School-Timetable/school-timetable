import { z } from 'zod';

const MAX_LENGTH = 5;
const valueSchema = z.string()
    .min(1, "abbreviation must be at least 1 character")
    .max(MAX_LENGTH, `abbreviation must be at most ${MAX_LENGTH} characters`)
    .regex(/^[a-z]+$/i, "abbreviation contains invalid characters");

export const abbreviationSchema = z.object({
    value: valueSchema
}).strict();

export class Abbreviation {
    public readonly value: string;

    constructor(value: string) {
        valueSchema.parse(value);
        this.value = value.toUpperCase();
    }

    public toString(): string {
        return this.value;
    }
}
