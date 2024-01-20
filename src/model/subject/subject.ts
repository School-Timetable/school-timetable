/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
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
    public static readonly schema = subjectSchema;

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
        if (!id || id === null) {
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

    static of(id: string | null, schoolClass: SchoolClass, professor: Professor, name: string, abbreviation: string, weight: number, hoursPerWeek: number): Subject {
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

    static ofCsv(csv: string, professors: Professor[], classes: SchoolClass[]) {
        if (csv.substring(0, 2) !== "S:") {
            throw new Error(`${csv} is not a subject string`);
        }

        let match = csv.match(/^S:([a-z0-9\- ]+);([a-z0-9\- ]+);([a-z0-9\- ]+);([^;]+);([^;]+);([^;]+);([^;]+)$/)!;
        let classId = match[2];
        let profId = match[3];

        let classIdx = classes.findIndex((e) => e.id === classId);
        let profIdx = professors.findIndex((e) => e.id === profId);

        if (classIdx === -1 || profIdx === -1) {
            throw new Error("The class or prof id are not valid");
        }

        return Subject.of(match[1], classes[classIdx], professors[profIdx], match[4], match[5], Number(match[6]), Number(match[7]));
    }

    public toCsv() {
        return `S:${this.id};${this.schoolClass.id};${this.professor.id};${this.name};${this.abbreviation};${this.weight};${this.hoursPerWeek}`
    }

    public toFullString() {
        return `${this.schoolClass} ${this.professor} ${this.name} ${this.abbreviation} ${this.weight} ${this.hoursPerWeek}}`
    }

    public toAspFact() {
        return `subject("${this.id}", "${this.schoolClass.id}", "${this.professor.id}", ${this.weight}, ${this.hoursPerWeek})`;
    }
    

    public match(filter: string): boolean {
        filter = filter.toLowerCase()
        if(this.name.value.toLowerCase().match(filter))
            return true
        if(this.abbreviation.value.toLowerCase().match(filter))
            return true
        if(this.professor.match(filter))
            return true
        if(this.schoolClass.match(filter))
            return true
        return false
    }

    get id() { return this._id; }
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

export function subjectToString(subject: Subject | null): string
{
    return JSON.stringify(
        {
            id: subject?.id,
            schoolClass: {
                id: subject?.schoolClass.id,
                year: subject?.schoolClass.year.value,
                section: subject?.schoolClass.section.value,
                track: subject?.schoolClass.track?.value
            },
            professor: {
                id: subject?.professor.id,
                name: subject?.professor.name.value,
                surname: subject?.professor.surname.value,
                email: subject?.professor.email.value,
                cellphone: subject?.professor.cellPhone.value
            },
            name: subject?.name.value,
            abbreviation: subject?.abbreviation.value,
            weight: subject?.weight.value,
            hoursPerWeek: subject?.hoursPerWeek.value
        }
    );
}

export function stringToSubject(subject: string): Subject
{
    const sub = JSON.parse(subject)
    return Subject.of(
        sub.id,
        SchoolClass.of(sub.schoolClass.id,sub.schoolClass.year,sub.schoolClass.section,sub.schoolClass.track),
        Professor.of(sub.professor.id,sub.professor.name,sub.professor.surname,sub.professor.email,sub.professor.cellphone),
        sub.name,
        sub.abbreviation,
        sub.weight,
        sub.hoursPerWeek)
}

