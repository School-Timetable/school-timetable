import { z } from 'zod';


const MAX_HOURS_PER_WEEK = 40;
const valueSchema = z.number()
    .gte(1, "hours per week must be at least 1")
    .lte(MAX_HOURS_PER_WEEK, `hours per week must be at most ${MAX_HOURS_PER_WEEK}`);

export const hoursPerWeekSchema = z.object({
    value: valueSchema,
}).strict();

export class HoursPerWeek {
    public readonly value: number;

    constructor(value: number) {
        valueSchema.parse(value);
        this.value = value;
    }
}
