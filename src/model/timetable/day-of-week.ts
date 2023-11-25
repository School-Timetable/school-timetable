import { z } from "zod";

export const dayOfWeekSchema = z.object({
    _id: z.number()
        .int("Only integer numbers are allowed for the day of the week")
        .min(0, "The day of week must be at least 0")
        .max(30, "The day of week must be at most 30"),

    _label: z.string()
        .min(1, "The day of week label must be at least 1 character long")
        .max(20, "The day of week label must be at most 20 characters long")
        .regex(/^[a-zA-Z0-9 ]+$/)
});

export class DayOfWeek {
    private _id: number;
    private _label: string;

    constructor(id: number, label: string) {
        dayOfWeekSchema.parse({
            _id: id,
            _label: label
        });

        this._id = id;
        this._label = label;
    }

    static of(id: number, label: string): DayOfWeek {
        return new DayOfWeek(id, label);
    }

    static ofCsv(csv: string): DayOfWeek {
        if (csv.substring(0, 2) !== "D:") {
            throw new Error(`${csv} is not a dayOfWeek string`);
        }

        let match = csv.match(/^D:([^;]+);([^;]+)$/)!;
        return DayOfWeek.of(Number(match[1]), match[2]);
    }

    public toCsv(): string {
        return `D:${this._id};${this._label}`;
    }

    get id(): number {
        return this._id;
    }

    get label(): string {
        return this._label;
    }
}