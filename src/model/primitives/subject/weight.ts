import { z } from 'zod';

const weightSchema = z.number()
    .gte(1, { message: "The weight is too small (min 1)" })
    .lte(10, { message: "The weight is too big (max 10)" });

export class Weight {
    public readonly value: number;

    constructor(value: number) {
        weightSchema.parse(value);
        this.value = value;
    }
}
