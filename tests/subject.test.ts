import { Abbreviation } from '../src/model/primitives/subject/abbreviation';
import { HoursPerWeek } from '../src/model/primitives/subject/hours-per-week';
import { Name } from '../src/model/primitives/subject/name';
import { Weight } from '../src/model/primitives/subject/weight';
import { Subject } from '../src/model/subject';
import { test, expect } from '@jest/globals';

test('Subject is created', () => {
    const subject = new Subject(
        new Name("Matematica"),
        new Abbreviation("MAT"),
        new Weight(5),
        new HoursPerWeek(6));
    // expect(subject.schoolClass).toBe(undefined);
    // expect(subject.teacher).toBe(undefined);
    expect(subject.name).toStrictEqual(new Name("Matematica"));
    expect(subject.abbreviation).toStrictEqual(new Abbreviation("MAT"));
    expect(subject.weight).toStrictEqual(new Weight(5));
    expect(subject.hoursPerWeek).toStrictEqual(new HoursPerWeek(6));
});
