import { z } from 'zod';

export const valueSchema = z.string()
    .min(3, { message: "The track is too short (min 3 char)" })
    .max(50, { message: "The track is too long (max 50 char)" })
    .regex(/^[a-z]+\.?( [a-z]+\.?)*$/i, "The track must contain only letters, an optional whitespace between words and an optional dot per word")

export const trackSchema = z.object({
    value: valueSchema,
}).strict()

export class Track {
    public static readonly schema = trackSchema;

    public readonly value: string

    constructor(value: string) {
        valueSchema.parse(value)
        this.value = value;
    }

    public toString(): string {
        return this.value.toUpperCase();
    }
}
