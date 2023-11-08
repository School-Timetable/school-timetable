// from docs:
// Materia(Classe*, Prof*, Nome, Abbreviazione, Peso, Ore_Sett)

import { z } from 'zod';
import { Name, nameSchema } from './name';
import { abbreviationSchema, Abbreviation } from './abbreviation';
import { weightSchema, Weight } from './weight';
import { hoursPerWeekSchema, HoursPerWeek } from './hours-per-week';

const SubjectSchema = z.object({
    _schoolClass: z.any(),
    _teacher: z.any(),
    _name: nameSchema,
    _abbreviation: abbreviationSchema,
    _weight: weightSchema,
    _hoursPerWeek: hoursPerWeekSchema,
}).strict();

export class Subject {
    private _schoolClass: any;
    private _teacher: any;
    private _name: Name;
    private _abbreviation: Abbreviation;
    private _weight: Weight;
    private _hoursPerWeek: HoursPerWeek;

    constructor(schoolClass: any, teacher: any, name: Name, abbreviation: Abbreviation,
        weight: Weight, hoursPerWeek: HoursPerWeek) {
        this._schoolClass = schoolClass;
        this._teacher = teacher;
        this._name = name;
        this._abbreviation = abbreviation;
        this._weight = weight;
        this._hoursPerWeek = hoursPerWeek;
        SubjectSchema.parse(this);
    }

    static of(name: string, abbreviation: string, weight: number, hoursPerWeek: number): Subject {
        return new Subject(
            undefined,
            undefined,
            new Name(name),
            new Abbreviation(abbreviation),
            new Weight(weight),
            new HoursPerWeek(hoursPerWeek)
        );
    }

    get schoolClass() { return this._schoolClass; }
    get teacher() { return this._teacher; }
    get name() { return this._name; }
    get abbreviation() { return this._abbreviation; }
    get weight() { return this._weight; }
    get hoursPerWeek() { return this._hoursPerWeek; }

    set schoolClass(value) { this._schoolClass = value; }
    set teacher(value) { this._teacher = value; }
    set name(value) { this._name = value; }
    set abbreviation(value) { this._abbreviation = value; }
    set weight(value) { this._weight = value; }
    set hoursPerWeek(value) { this._hoursPerWeek = value; }

}
