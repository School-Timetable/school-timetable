import { z } from 'zod';

export const valueSchema = z.number({errorMap: (issue) => {
        switch (issue.code) {
            default:
                return { message: 'The year is not a number' };
        }
}})
    .int("The year given is not an integer number")
    .min(1, { message: "The year given is too small (min 1)" })
    .max(5, { message: "The year given is too big (max 5)" })

export const yearSchema = z.object({
    value: valueSchema
}).strict()

export class Year {
    public static readonly schema = yearSchema;

    public readonly value: number;

    constructor(value: number) {
        valueSchema.parse(value);
        this.value = value;
    }

    public toString(): string {
        return this.value.toString()
    }
}
