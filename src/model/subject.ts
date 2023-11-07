// from docs:
// Materia(Classe*, Prof*, Nome, Abbreviazione, Peso, Ore_Sett)

import { z } from 'zod';

const SubjectSchema = z.object({
    // schoolClass: z.string(),
    // teacher: z.string(),
    name: z.string().min(1).max(50).regex(/^[A-Z][A-Za-z ]*/),
    abbreviation: z.string().min(1).max(5).regex(/^[A-Z]+/),
    weight: z.number().min(1).max(10).default(5),
    hoursPerWeek: z.number().min(1).max(40),
});

export class Subject {
    // readonly schoolClass: SchoolClass;
    // readonly teacher: Teacher;
    readonly name: string;
    readonly abbreviation: string;
    readonly weight: number;
    readonly hoursPerWeek: number;

    constructor(name: string, abbreviation: string, weight: number, hoursPerWeek: number) {
        this.name = name;
        this.abbreviation = abbreviation;
        this.weight = weight;
        this.hoursPerWeek = hoursPerWeek;

        SubjectSchema.parse(this);
    }
}
