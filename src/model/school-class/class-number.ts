import { z } from 'zod';

export class ClassNumber {
    private readonly _classNumber: number;

    constructor(classNumber : number) {
        z.number().min(1, {message : "The class number is too small (min 1)"})
            .max(5, {message : "The class number is too big (max 5)"})
            .parse(classNumber);
        this._classNumber = classNumber;
    }

    classNumber(): number {
        return this._classNumber;
    }

    // TODO: edit?
}