import { z } from 'zod';
import { Year, yearSchema } from "./year";
import { Section, sectionSchema } from "./section";
import { Track, trackSchema } from "./track";

export const schoolClassSchema = z.object({
    year: yearSchema,
    section: sectionSchema,
    track: trackSchema.optional()
})

// TODO: id check
export class SchoolClass {

    private readonly _id: number
    private _year: Year
    private _section: Section
    private _track?: Track

    private constructor(id: number, year: Year, section: Section) {
        schoolClassSchema.parse({
            year: year,
            section: section
        })
        this._id = id
        this._year = year
        this._section = section
    }

    static of(id: number, year: number, section: string, track?: string){
        const instance = new SchoolClass(
            id,
            new Year(year),
            new Section(section)
        )
        if (track)
            instance.track = new Track(track)
        return instance
    }

    get id(): number {
        return this._id;
    }

    get year(): Year {
        return this._year
    }

    set year(year: Year) {
        yearSchema.parse(year)
        this._year = year
    }

    get section(): Section {
        return this._section
    }

    set section(section: Section) {
        sectionSchema.parse(section)
        this._section = section
    }

    get track(): Track | undefined {
        return this._track
    }

    set track(track: Track) {
        trackSchema.parse(track)
        this._track = track
    }

    public toString(): string {
        let res = `${this._year.value}${this._section.value}`
        if (this._track)
            res += ` ${this._track.value}`
        return res
    }
}
