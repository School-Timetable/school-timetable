import { z } from 'zod';

export const valueSchema = z.string()
    .min(3, {message: "The track is too short (min 3 char)"})
    .max(50, {message: "The track is too long (max 50 char)"})
    .regex(/[a-z]+\.?/i)

export const trackSchema = z.object({
    value: valueSchema,
}).strict()

export class Track {
    public readonly value: string

    constructor(value: string) {
        this.value = value.toUpperCase()
    }

    public toString(): string {
        return this.value
    }
}