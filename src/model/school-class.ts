import type {ClassNumber} from "./primitives/classNumber";
import type {Section} from "./primitives/section";
import type {Track} from "./primitives/track";

export class SchoolClass {
    constructor(id: number, classNumber: ClassNumber, section: Section) {
        this._id = id;
        this._classNumber = classNumber;
        this._section = section;
    }

    private _id: number;
    private _classNumber: ClassNumber;
    private _section: Section;
    private _track?: Track;

    id(): number {
        return this._id;
    }

    classNumber(): number {
        return this._classNumber.classNumber()
    }

    section(): string {
        return this._section.section()
    }

    track(): string | undefined {
        return this._track?.track()
    }

    // SchoolClass builder
    static builder = class {
        private schoolClass?: SchoolClass

        constructor(id: number, classNumber: ClassNumber, section: Section) {
            this.schoolClass = new SchoolClass(id, classNumber, section)
        }

        withTrack(track: Track){
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