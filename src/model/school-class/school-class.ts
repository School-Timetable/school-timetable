import { z } from 'zod';
import { Year, yearSchema } from "./year";
import { Section, sectionSchema } from "./section";
import { Track, trackSchema } from "./track";
import { v4 as uuid } from "uuid"

export const schoolClassSchema = z.object({
    id: z.string(),
    year: yearSchema,
    section: sectionSchema,
    track: trackSchema.optional()
})

export class SchoolClass {
    public static readonly schema = schoolClassSchema;

    private readonly _id: string;
    private _year: Year;
    private _section: Section;
    private _track?: Track;

    private constructor(id: string | null, year: Year, section: Section) {
        if (!id) {
            id = uuid();
        }

        schoolClassSchema.parse({
            id: id,
            year: year,
            section: section,
        })

        this._id = id;
        this._year = year;
        this._section = section;
    }

    static of(id: string | null, year: number, section: string, track?: string) {
        const instance = new SchoolClass(
            id,
            new Year(year),
            new Section(section)
        );

        if (track)
            instance.track = new Track(track);

        return instance
    }

    static ofCsv(csv: string): SchoolClass {
        if (csv.substring(0, 2) !== "C:") {
            throw new Error(`${csv} is not a school class string`);
        }

        let match = csv.match(/^C:([^;]+);([^;]+);([^;]+);?([^;]+)?$/)!;
        return SchoolClass.of(match[1], Number(match[2]), match[3], match[4]);
    }

    get id(): string {
        return this._id;
    }

    get year(): Year {
        return this._year;
    }

    set year(year: Year) {
        yearSchema.parse(year);
        this._year = year;
    }

    get section(): Section {
        return this._section;
    }

    set section(section: Section) {
        sectionSchema.parse(section);
        this._section = section;
    }

    get track(): Track | undefined {
        return this._track;
    }

    set track(track: Track) {
        trackSchema.parse(track);
        this._track = track;
    }

    public toString(): string {
        let res = `${this._year.value}${this._section.value}`;

        if (this._track)
            res += ` ${this._track.value}`;
        return res;
    }

    public toCsv(): string {
        return `C:${this._id};${this._year};${this._section};${this._track ? this._track.value : ''}`;
    }

    public toFullString(): string {
        return this.toString();
    }
}
