import { z } from 'zod';

const valueSchema = z.string()
    .min(2, "The name is too short (min 2 characters)")
    .max(20, "The name is too long (max 20 characters)")
    .regex(/^[a-z]+( [a-z]+)*$/i, "The name is not valid");

export const nameSchema = z.object({
    value: valueSchema,
}).strict();

export class Name {
    public static readonly schema = nameSchema;

    public readonly value: string;

    public get valueUppercase() {
        return this.value.toUpperCase();
    }

    constructor(name: string) {
        valueSchema.parse(name);
        this.value = name;
    }

    public toString(): string {
        return this.value.toUpperCase();
    }

}
