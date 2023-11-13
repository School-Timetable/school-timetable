import { z } from 'zod';
import { Year, yearSchema } from "./year";
import { Section, sectionSchema } from "./section";
import { Track, trackSchema } from "./track";
import { v4 as uuid } from "uuid"

export const schoolClassSchema = z.object({
    year: yearSchema,
    section: sectionSchema,
    track: trackSchema.optional()
})

// TODO: id check
export class SchoolClass {

    private readonly _id: string
    private _year: Year
    private _section: Section
    private _track?: Track

    private constructor(year: Year, section: Section) {
        schoolClassSchema.parse({
            year: year,
            section: section
        })
        this._id = uuid()
        this._year = year
        this._section = section
    }

    static of(year: number, section: string, track?: string){
        const instance = new SchoolClass(
            new Year(year),
            new Section(section)
        )
        if (track)
            instance.track = new Track(track)
        return instance
    }

    get id(): string {
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
