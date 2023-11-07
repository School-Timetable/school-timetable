import { Abbreviation } from '../src/model/primitives/subject/abbreviation';
import { HoursPerWeek } from '../src/model/primitives/subject/hours-per-week';
import { Name } from '../src/model/primitives/subject/name';
import { Weight } from '../src/model/primitives/subject/weight';
import { Subject } from '../src/model/subject';
import { test, expect } from '@jest/globals';

test('Subject is created', () => {
    const name = new Name("Matematica");
    const abbreviation = new Abbreviation("MAT");
    const weight = new Weight(5);
    const hoursPerWeek = new HoursPerWeek(6);

    const subject = new Subject(null, null, name, abbreviation, weight, hoursPerWeek);

    expect(subject.schoolClass).toBe(null);
    expect(subject.teacher).toBe(null);
    expect(subject.name).toBe(name);
    expect(subject.abbreviation).toBe(abbreviation);
    expect(subject.weight).toBe(weight);
    expect(subject.hoursPerWeek).toBe(hoursPerWeek);
});


test('Subject is created with of', () => {
    const subject = Subject.of("Matematica", "MAT", 5, 6);

    expect(subject.schoolClass).toBe(undefined);
    expect(subject.teacher).toBe(undefined);
    expect(subject.name).toStrictEqual(new Name("Matematica"));
    expect(subject.abbreviation).toStrictEqual(new Abbreviation("MAT"));
    expect(subject.weight).toStrictEqual(new Weight(5));
    expect(subject.hoursPerWeek).toStrictEqual(new HoursPerWeek(6));
});

