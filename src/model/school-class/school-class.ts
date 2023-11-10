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
    private constructor(id: number, classNumber: ClassNumber, section: Section) {
        schoolClassSchema.parse({
            classNumber: classNumber,
            section: section
        })
        this._id = id;
        this._classNumber = classNumber;
        this._section = section;
    }

    private readonly _id: number;
    private _classNumber: ClassNumber;
    private _section: Section;
    private _track?: Track;

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

    set section(section: Section) {
        sectionSchema.parse(section)
        this._section = section
    }

    set track(track: Track) {
        trackSchema.parse(track)
        this._track = track
    }

    get section(): Section {
        return this._section
    }

    get track(): Track | undefined {
        return this._track
    }

    public toString(): string {
        let res = `${this._classNumber.value}${this._section.value}`
        if (this._track)
            res += ` ${this._track.value}`
        return res
    }
    // SchoolClass builder
    static builder = class {
        private schoolClass?: SchoolClass

        constructor(id: number, classNumber: ClassNumber, section: Section) {
            this.schoolClass = new SchoolClass(id, classNumber, section)
        }

        withTrack(track: Track) {
            this.schoolClass!._track = track
            return this
        }

        build(): SchoolClass {
            const res = this.schoolClass
            this.schoolClass = undefined
            return res!
        }
    }
}
