import { z } from 'zod';

export const valueSchema = z.number()
    .min(1, {message : "The class number is too small (min 1)"})
    .max(5, {message : "The class number is too big (max 5)"})

export const classNumberSchema = z.object({
    value: valueSchema
}).strict()

export class ClassNumber {
    public readonly value: number;

    constructor(value : number) {
        valueSchema.parse(value);
        this.value = value;
    }

    public toString(): string {
        return this.value.toString()
    }
}