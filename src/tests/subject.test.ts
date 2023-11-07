import { Subject } from '../model/subject';
import { test, expect } from '@jest/globals';

test('Subjects is created', () => {
    const subject = new Subject("Matematica", "MAT", 5, 6)
    // expect(subject.schoolClass).toBe(undefined);
    // expect(subject.teacher).toBe(undefined);
    expect(subject.name).toBe("Matematica");
    expect(subject.abbreviation).toBe("MAT");
    expect(subject.weight).toBe(5);
    expect(subject.hoursPerWeek).toBe(6);
});
