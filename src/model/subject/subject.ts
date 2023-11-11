// from docs:
// Materia(Classe*, Prof*, Nome, Abbreviazione, Peso, Ore_Sett)

import { z } from 'zod';
import { Name, nameSchema } from './name';
import { abbreviationSchema, Abbreviation } from './abbreviation';
import { weightSchema, Weight } from './weight';
import { hoursPerWeekSchema, HoursPerWeek } from './hours-per-week';
import { SchoolClass, schoolClassSchema } from '$model/school-class/school-class';
import { Professor, professorSchema } from '$model/professor/professor';

const subjectSchema = z.object({
    _schoolClass: schoolClassSchema,
    _professor: professorSchema,
    _name: nameSchema,
    _abbreviation: abbreviationSchema,
    _weight: weightSchema,
    _hoursPerWeek: hoursPerWeekSchema,
}).strict();

export class Subject {
    public static schema = subjectSchema;

    private _schoolClass: SchoolClass;
    private _professor: Professor;
    private _name: Name;
    private _abbreviation: Abbreviation;
    private _weight: Weight;
    private _hoursPerWeek: HoursPerWeek;

    constructor(schoolClass: SchoolClass, professor: Professor, name: Name, abbreviation: Abbreviation,
        weight: Weight, hoursPerWeek: HoursPerWeek) {
        subjectSchema.parse({
            _schoolClass: schoolClass,
            _professor: professor,
            _name: name,
            _abbreviation: abbreviation,
            _weight: weight,
            _hoursPerWeek: hoursPerWeek,
        });

        this._schoolClass = schoolClass;
        this._professor = professor;
        this._name = name;
        this._abbreviation = abbreviation;
        this._weight = weight;
        this._hoursPerWeek = hoursPerWeek;
    }

    static of(schoolClass: SchoolClass, professor: Professor, name: string, abbreviation: string, weight: number, hoursPerWeek: number): Subject {
        return new Subject(
            schoolClass,
            professor,
            new Name(name),
            new Abbreviation(abbreviation),
            new Weight(weight),
            new HoursPerWeek(hoursPerWeek)
        );
    }

    get schoolClass() { return this._schoolClass; }
    get professor() { return this._professor; }
    get name() { return this._name; }
    get abbreviation() { return this._abbreviation; }
    get weight() { return this._weight; }
    get hoursPerWeek() { return this._hoursPerWeek; }

    set schoolClass(value) {
        schoolClassSchema.parse(value);
        this._schoolClass = value;
    }
    set professor(value) {
        professorSchema.parse(value);
        this._professor = value;
    }
    set name(value) {
        nameSchema.parse(value);
        this._name = value;
    }
    set abbreviation(value) {
        abbreviationSchema.parse(value);
        this._abbreviation = value;
    }
    set weight(value) {
        weightSchema.parse(value);
        this._weight = value;
    }
    set hoursPerWeek(value) {
        hoursPerWeekSchema.parse(value);
        this._hoursPerWeek = value;
    }

}
