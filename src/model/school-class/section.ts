import { z } from 'zod';

export const valueSchema = z.string()
    .length(1, { message: "The section must be a single char (A-Z)" })
    .regex(/[A-Z]/, "The section must contain only uppercase letters (A-Z)")

export const sectionSchema = z.object({
    value: valueSchema
}).strict()

export class Section {
    public static readonly schema = sectionSchema;

    public readonly value: string;

    constructor(value: string) {
        valueSchema.parse(value);
        this.value = value;
    }

    public toString(): string {
        return this.value;
    }
}
