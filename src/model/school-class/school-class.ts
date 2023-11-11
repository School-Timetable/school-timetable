import { z } from 'zod';
import { ClassNumber, classNumberSchema } from "./class-number";
import { Section, sectionSchema } from "./section";
import { Track, trackSchema } from "./track";

export const schoolClassSchema = z.object({
    classNumber: classNumberSchema,
    section: sectionSchema,
    track: trackSchema.optional()
})

// TODO: id check
export class SchoolClass {
    private readonly _id: number
    private _classNumber: ClassNumber
    private _section: Section
    private _track?: Track

    private constructor(id: number, classNumber: ClassNumber, section: Section) {
        schoolClassSchema.parse({
            classNumber: classNumber,
            section: section
        })
        this._id = id
        this._classNumber = classNumber
        this._section = section
    }

    static of(id: number, classNumber: number, section: string, track?: string){
        const instance = new SchoolClass(
            id,
            new ClassNumber(classNumber),
            new Section(section)
        )
        if (track)
            instance.track = new Track(track)
        return instance
    }

    get id(): number {
        return this._id;
    }

    get classNumber(): ClassNumber {
        return this._classNumber
    }

    set classNumber(classNumber: ClassNumber) {
        classNumberSchema.parse(classNumber)
        this._classNumber = classNumber
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
        let res = `${this._classNumber.value}${this._section.value}`
        if (this._track)
            res += ` ${this._track.value}`
        return res
    }
}
