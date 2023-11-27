import { z } from "zod";

export const hourOfDaySchema = z.object({
    _id: z.number()
        .int("Only integer numbers are allowed for the hour of day")
        .min(0, "The hour of day must be at least 0")
        .max(23, "The hour of day must be at most 23"),

    _label: z.string()
        .min(1, "The hour label must be at least 1 character long")
        .max(10, "The hour label must be at most 10 characters long")
        .regex(/^[a-zA-Z0-9: ]+$/)
});

export class HourOfDay {
    private _id: number;
    private _label: string;

    constructor(id: number, label: string) {
        hourOfDaySchema.parse({
            _id: id,
            _label: label
        });

        this._id = id;
        this._label = label;
    }

    static of(id: number, label: string): HourOfDay {
        return new HourOfDay(id, label);
    }

    static ofCsv(csv: string): HourOfDay {
        if (csv.substring(0, 2) !== "H:") {
            throw new Error(`${csv} is not a hourOfDay string`);
        }

        let match = csv.match(/^H:([^;]+);([^;]+)$/)!;
        return HourOfDay.of(Number(match[1]), match[2]);
    }

    public toCsv(): string {
        return `H:${this._id};${this._label}`;
    }

    get id(): number {
        return this._id;
    }

    get label(): string {
        return this._label;
    }
}