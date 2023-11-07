import { z } from 'zod';


const MAX_HOURS_PER_WEEK = 40;
const hoursPerWeekSchema = z.number()
    .gte(1, { message: "hours per week must be at least 1" })
    .lte(MAX_HOURS_PER_WEEK, { message: `hours per week must be at most ${MAX_HOURS_PER_WEEK}` });

export class hoursPerWeek {
    public readonly value: number;

    constructor(value: number) {
        hoursPerWeekSchema.parse(value);
        this.value = value;
    }
}
