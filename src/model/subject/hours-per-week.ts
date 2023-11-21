import { z } from 'zod';


const MAX_HOURS_PER_WEEK = 30;
const valueSchema = z.number()
    .gte(1, "hours per week must be at least 1")
    .lte(MAX_HOURS_PER_WEEK, `hours per week must be at most ${MAX_HOURS_PER_WEEK}`);

export const hoursPerWeekSchema = z.object({
    value: valueSchema,
}).strict();

export class HoursPerWeek {
    public static readonly schema = hoursPerWeekSchema;

    public readonly value: number;

    constructor(value: number) {
        valueSchema.parse(value);
        this.value = value;
    }

    public toString(): string {
        return this.value.toString();
    }
}
