import { Abbreviation } from '$model/subject/abbreviation';
import { HoursPerWeek } from '$model/subject/hours-per-week';
import { Name } from '$model/subject/name';
import { Weight } from '$model/subject/weight';
import { Subject } from '$model/subject/subject';
import { test, expect } from '@jest/globals';
import { Professor } from '$model/professor/professor';
import { Surname } from '$model/professor/surname';
import { Mail } from '$model/professor/mail';
import { Cellphone } from '$model/professor/cellphone';
import { Name as ProfessorName } from '$model/professor/name';
import { SchoolClass } from '$model/school-class/school-class';

function getProfessor(): Professor {
    return Professor.of("customId", "Mario", "Rossi", "mario.rossi@gmail.com", "3331234567");
}

function getSchoolClass(): SchoolClass {
    return SchoolClass.of("customId", 5, "A");
}

const name = new Name("Matematica");
const abbreviation = new Abbreviation("MAT");
const weight = new Weight(5);
const hoursPerWeek = new HoursPerWeek(6);
const subject = new Subject("abc", getSchoolClass(), getProfessor(), name, abbreviation, weight, hoursPerWeek);
const subjectWithOf = Subject.of("abc", getSchoolClass(), getProfessor(), name.value, abbreviation.value, weight.value, hoursPerWeek.value);


test('Subject is created', () => {
    expect(subject.schoolClass).toStrictEqual(getSchoolClass());
    expect(subject.professor).toStrictEqual(getProfessor());
    expect(subject.name).toBe(name);
    expect(subject.abbreviation).toBe(abbreviation);
    expect(subject.weight).toBe(weight);
    expect(subject.hoursPerWeek).toBe(hoursPerWeek);
});

test('subject Match', () => {
    expect(subject.match(name.value.toUpperCase().substring(0,2))).toBe(true)
    expect(subject.match(abbreviation.value.toUpperCase().substring(0,2))).toBe(true)
    expect(subject.match(getProfessor().name.value.toUpperCase().substring(0,2))).toBe(true)
    expect(subject.match(getSchoolClass().year.value.toString().substring(0,2))).toBe(true)
})

test('Subject is created with of', () => {
    expect(subject.schoolClass).toStrictEqual(getSchoolClass());
    expect(subject.professor).toStrictEqual(getProfessor());
    expect(subject.name).toStrictEqual(name);
    expect(subject.abbreviation).toStrictEqual(abbreviation);
    expect(subject.weight).toStrictEqual(weight);
    expect(subject.hoursPerWeek).toStrictEqual(hoursPerWeek);
});

test('Name changes', () => {
    subject.name = new Name("Storia");
    expect(subject.name.value).toBe("Storia");
})

test('Abbreviation changes', () => {
    subject.abbreviation = new Abbreviation("STO");
    expect(subject.abbreviation.value).toBe("STO");
})

test('Weight changes', () => {
    subject.weight = new Weight(2);
    expect(subject.weight.value).toBe(2);
})

test('HoursPerWeek changes', () => {
    subject.hoursPerWeek = new HoursPerWeek(2);
    expect(subject.hoursPerWeek.value).toBe(2);
})
