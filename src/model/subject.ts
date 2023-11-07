// from docs:
// Materia(Classe*, Prof*, Nome, Abbreviazione, Peso, Ore_Sett)

import { z } from 'zod';
import { Name, nameSchema } from './primitives/subject/name';
import { abbreviationSchema, Abbreviation } from './primitives/subject/abbreviation';
import { weightSchema, Weight } from './primitives/subject/weight';
import { hoursPerWeekSchema, HoursPerWeek } from './primitives/subject/hours-per-week';

const SubjectSchema = z.object({
    // schoolClass: z.string(),
    // teacher: z.string(),
    name: nameSchema,
    abbreviation: abbreviationSchema,
    weight: weightSchema,
    hoursPerWeek: hoursPerWeekSchema,
}).strict();

export class Subject {
    // readonly schoolClass: SchoolClass;
    // readonly teacher: Teacher;
    readonly name: Name;
    readonly abbreviation: Abbreviation;
    readonly weight: Weight;
    readonly hoursPerWeek: HoursPerWeek;

    constructor(name: Name, abbreviation: Abbreviation, weight: Weight, hoursPerWeek: HoursPerWeek) {
        this.name = name;
        this.abbreviation = abbreviation;
        this.weight = weight;
        this.hoursPerWeek = hoursPerWeek;
        SubjectSchema.parse(this);
    }

    static of(name: string, abbreviation: string, weight: number, hoursPerWeek: number): Subject {
        return new Subject(
            new Name(name),
            new Abbreviation(abbreviation),
            new Weight(weight),
            new HoursPerWeek(hoursPerWeek)
        );
    }
}
