import { z } from 'zod';

const valueSchema = z.number()
    .gte(1, "weight must be between 1 and 10")
    .lte(10, "weight must be between 1 and 10");


export const weightSchema = z.object({
    value: valueSchema,
}).strict();

export class Weight {
    public readonly value: number;

    constructor(value: number) {
        valueSchema.parse(value);
        this.value = value;
    }
}
