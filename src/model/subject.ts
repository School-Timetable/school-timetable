// from docs:
// Materia(Classe*, Prof*, Nome, Abbreviazione, Peso, Ore_Sett)

import { z } from 'zod';
import { type Name, nameSchema } from './primitives/subject/name';
import { abbreviationSchema, type Abbreviation } from './primitives/subject/abbreviation';
import { weightSchema, type Weight } from './primitives/subject/weight';
import { hoursPerWeekSchema, type HoursPerWeek } from './primitives/subject/hours-per-week';

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
}
