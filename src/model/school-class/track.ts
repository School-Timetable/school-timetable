import { z } from 'zod';

export const valueSchema = z.string()
    .min(3, {message: "The track is too short (min 3 char)"})
    .max(50, {message: "The track is too long (max 50 char)"})
    .regex(/^[a-z]+\.?$/i, "The track must contain only letters and an optional final dot")

export const trackSchema = z.object({
    value: valueSchema,
}).strict()

export class Track {
    public readonly value: string

    get valueUppercase() {
        return this.value.toUpperCase();
    }

    constructor(value: string) {
        valueSchema.parse(value)
        this.value = value;
    }

    public toString(): string {
        return this.value.toUpperCase();
    }
}