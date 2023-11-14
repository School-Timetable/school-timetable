// from docs:
// Materia(Classe*, Prof*, Nome, Abbreviazione, Peso, Ore_Sett)

import { z } from 'zod';
import { Name, nameSchema } from './name';
import { abbreviationSchema, Abbreviation } from './abbreviation';
import { weightSchema, Weight } from './weight';
import { hoursPerWeekSchema, HoursPerWeek } from './hours-per-week';
import { SchoolClass, schoolClassSchema } from '$model/school-class/school-class';
import { Professor, professorSchema } from '$model/professor/professor';
import { v4 as uuid } from 'uuid';

const subjectSchema = z.object({
    _id: z.string(),
    _schoolClass: schoolClassSchema,
    _professor: professorSchema,
    _name: nameSchema,
    _abbreviation: abbreviationSchema,
    _weight: weightSchema,
    _hoursPerWeek: hoursPerWeekSchema,
}).strict();

export class Subject {
    public static schema = subjectSchema;

    private _id: string;
    private _schoolClass: SchoolClass;
    private _professor: Professor;
    private _name: Name;
    private _abbreviation: Abbreviation;
    private _weight: Weight;
    private _hoursPerWeek: HoursPerWeek;

    constructor(id: string | null, schoolClass: SchoolClass, professor: Professor, name: Name, abbreviation: Abbreviation,
        weight: Weight, hoursPerWeek: HoursPerWeek
    ) {
        if(!id || id === null) {
            id = uuid();
        }
        
        subjectSchema.parse({
            _id: id,
            _schoolClass: schoolClass,
            _professor: professor,
            _name: name,
            _abbreviation: abbreviation,
            _weight: weight,
            _hoursPerWeek: hoursPerWeek,
        });

        this._id = id;
        this._schoolClass = schoolClass;
        this._professor = professor;
        this._name = name;
        this._abbreviation = abbreviation;
        this._weight = weight;
        this._hoursPerWeek = hoursPerWeek;
    }

    static of(id: string | null,schoolClass: SchoolClass, professor: Professor, name: string, abbreviation: string, weight: number, hoursPerWeek: number): Subject {
        return new Subject(
            id,
            schoolClass,
            professor,
            new Name(name),
            new Abbreviation(abbreviation),
            new Weight(weight),
            new HoursPerWeek(hoursPerWeek)
        );
    }

    static ofCsv(csv: string, all_prof: Professor[], all_classes: SchoolClass[]) {
        if(csv.substring(0,2) !== "S:") {
            throw new Error(`${csv} is not a subject string`);
        }

        let match = csv.match(/^S:([a-z0-9\- ]+);([a-z0-9\- ]+);([a-z0-9\- ]+);([^;]+);([^;]+);([^;]+);([^;]+)$/)!;
        let classId = match[2];
        let profId = match[3];

        let classIdx = all_classes.findIndex((e) => e.id === classId);
        let profIdx = all_prof.findIndex((e) => e.id === profId);

        if(classIdx === -1 || profIdx === -1) {
            throw new Error("The class or prof id are not valid");
        }

        return Subject.of(match[1], all_classes[classIdx], all_prof[profIdx], match[4], match[5], Number(match[6]), Number(match[7]));
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

    public toCsv() {
        return `S:${this._id};${this._schoolClass.id};${this._professor.id};${this._name};${this._abbreviation};${this._weight};${this._hoursPerWeek}`
    }

}
