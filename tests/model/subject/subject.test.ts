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
    return new Professor(
        new ProfessorName("Mario"),
        new Surname("Rossi"),
        new Mail("mario.rossi@gmail.com"),
        new Cellphone("3331234567"));
}

function getSchoolClass(): SchoolClass {
    return SchoolClass.of(
        5,
        "A"
    );
}


test('Subject is created', () => {

    const schoolClass = getSchoolClass();
    const professor = getProfessor();

    const name = new Name("Matematica");
    const abbreviation = new Abbreviation("MAT");
    const weight = new Weight(5);
    const hoursPerWeek = new HoursPerWeek(6);

    const subject = new Subject(schoolClass, professor, name, abbreviation, weight, hoursPerWeek);


    expect(subject.schoolClass).toBe(schoolClass);
    expect(subject.professor).toBe(professor);
    expect(subject.name).toBe(name);
    expect(subject.abbreviation).toBe(abbreviation);
    expect(subject.weight).toBe(weight);
    expect(subject.hoursPerWeek).toBe(hoursPerWeek);
});


test('Subject is created with of', () => {
    const schoolClass = getSchoolClass();
    const professor = getProfessor();

    const subject = Subject.of(schoolClass, professor, "Matematica", "MAT", 5, 6);

    expect(subject.schoolClass).toBe(schoolClass);
    expect(subject.professor).toBe(professor);
    expect(subject.name).toStrictEqual(new Name("Matematica"));
    expect(subject.abbreviation).toStrictEqual(new Abbreviation("MAT"));
    expect(subject.weight).toStrictEqual(new Weight(5));
    expect(subject.hoursPerWeek).toStrictEqual(new HoursPerWeek(6));
});

