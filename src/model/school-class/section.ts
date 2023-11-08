import { z } from 'zod';

export class Section {
    private readonly _section: string;

    constructor(section: string) {
        z.string()
            .min(1, {message : "The section must be a single char (A-Z)"})
            .max(1, {message : "The section must be a single char (A-Z)"})
            .regex(/[A-Z]/)
            .parse(section);
        this._section = section;
    }

    section(): string {
        return this._section;
    }

    // TODO: edit?
}