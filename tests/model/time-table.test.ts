import { classTimetableMap, professorTimetableMap, setSubject, getClassTimetableOf, getProfessorTimetableOf, getTimetableOf, removeSubject, setUnavailable, setAvailable, clearAll } from "$model/TimeTable";
import { Professor } from "$model/professor/professor";
import { SchoolClass } from "$model/school-class/school-class";
import { Subject } from "$model/subject/subject";


const professors = [
    Professor.of("prof-1", "Marco", "Rossi", "marco.rossi@mail.com", "3332221110"),
    Professor.of("prof-2", "Francesca", "Verdi", "francesca.verdi@mail.com", "3334441110"),
]

const classes = [
    SchoolClass.of("class-1", 1, "A"),
    SchoolClass.of("class-2", 2, "A")
]

const subjects = [
    Subject.of("subj-1", classes[0], professors[0], "Matematica", "MAT", 5, 20),
    Subject.of("subj-2", classes[0], professors[1], "Italiano", "ITA", 6, 18),
    Subject.of("subj-3", classes[1], professors[0], "Fisica quantistica per bambini", "FIS", 5, 20),
    Subject.of("subj-4", classes[1], professors[1], "Italiano per grezzi di paese", "ITAG", 10, 30),
]

describe("Timetable", () => {

    beforeEach(() => {
        clearAll();
    });

    it("Time table should be empty at the beginning", () => {
        expect(classTimetableMap.size).toBe(0);
        expect(professorTimetableMap.size).toBe(0);
    });

    it("Time table should create on demand", () => {
        const c0tt = getClassTimetableOf(classes[0])

        expect(c0tt).not.toBeNull();
        expect(c0tt.daysPerWeek).toBeGreaterThan(0);
        expect(c0tt.hoursPerDay).toBeGreaterThan(0);
        expect(c0tt.values.length).toEqual(c0tt.daysPerWeek);
        for (let i = 0; i < c0tt.daysPerWeek; i++) {
            expect(c0tt.values[i].length).toEqual(c0tt.hoursPerDay);
        }
        expect(classTimetableMap.size).toBe(1);

        const p0tt = getProfessorTimetableOf(professors[0])
        expect(p0tt).not.toBeNull();
        expect(p0tt.daysPerWeek).toBeGreaterThan(0);
        expect(p0tt.hoursPerDay).toBeGreaterThan(0);
        expect(p0tt.values.length).toEqual(p0tt.daysPerWeek);
        for (let i = 0; i < p0tt.daysPerWeek; i++) {
            expect(p0tt.values[i].length).toEqual(p0tt.hoursPerDay);
        }
        expect(professorTimetableMap.size).toBe(1);

    });


    it("Time table should handle overlaps by removing old subjects", () => {

        const c0tt = getTimetableOf(classes[0]);
        const p0tt = getTimetableOf(professors[0]);
        const c1tt = getTimetableOf(classes[1]);
        const p1tt = getTimetableOf(professors[1]);



        setSubject(0, 0, subjects[0]);
        expect(c0tt.getSubjectOn(0, 0)).toBe(subjects[0]);
        expect(p0tt.getSubjectOn(0, 0)).toBe(subjects[0]);

        setSubject(0, 0, subjects[3]);
        expect(c1tt.getSubjectOn(0, 0)).toBe(subjects[3]);
        expect(p1tt.getSubjectOn(0, 0)).toBe(subjects[3]);

        // subject 0 didn't get removed from subject 0 and class 0
        // because it was added to class 1 and professor 1, so there is no overlap
        expect(c0tt.getSubjectOn(0, 0)).toBe(subjects[0]);
        expect(p0tt.getSubjectOn(0, 0)).toBe(subjects[0]);

        // subject 1 has the same class as subject 0, so there is an overlap which removes subject 0
        // from class 0 and professor 0
        // there's also an overlap with subject 3, which removes subject 3 from class 1 and professor 1
        // and sets subject 1 to class 0 and professor 1
        setSubject(0, 0, subjects[1]);

        expect(c0tt.getSubjectOn(0, 0)).toBe(subjects[1]);
        expect(p1tt.getSubjectOn(0, 0)).toBe(subjects[1]);

        expect(c1tt.getSubjectOn(0, 0)).toBeNull();
        expect(p0tt.getSubjectOn(0, 0)).toBeNull();

    });

    it("should remove subjects", () => {
        const c0tt = getTimetableOf(classes[0]);
        const p0tt = getTimetableOf(professors[0]);

        setSubject(0, 0, subjects[0]);

        expect(c0tt.getSubjectOn(0, 0)).toBe(subjects[0]);
        expect(p0tt.getSubjectOn(0, 0)).toBe(subjects[0]);

        removeSubject(0, 0, subjects[0]);

        expect(c0tt.getSubjectOn(0, 0)).toBeNull();
        expect(p0tt.getSubjectOn(0, 0)).toBeNull();
    });

    it("should set unavailable", () => {
        const c0tt = getTimetableOf(classes[0]);
        const p0tt = getTimetableOf(professors[0]);


        expect(c0tt.isAvailableOn(0, 0)).toBe(true);
        expect(p0tt.isAvailableOn(0, 0)).toBe(true);

        setUnavailable(0, 0, classes[0]);

        // the unvaliability is set only on the class timetable
        expect(c0tt.isAvailableOn(0, 0)).toBe(false);
        expect(p0tt.isAvailableOn(0, 0)).toBe(true);

        setUnavailable(0, 0, professors[0]);

        expect(c0tt.isAvailableOn(0, 0)).toBe(false);
        expect(p0tt.isAvailableOn(0, 0)).toBe(false);

        setAvailable(0, 0, professors[0]);

        expect(c0tt.isAvailableOn(0, 0)).toBe(false);
        expect(p0tt.isAvailableOn(0, 0)).toBe(true);

        setAvailable(0, 0, classes[0]);

        expect(c0tt.isAvailableOn(0, 0)).toBe(true);
        expect(p0tt.isAvailableOn(0, 0)).toBe(true);
    });

    it("should throw when setting unavailable on an assigned timeslot", () => {
        setSubject(0, 0, subjects[0]);

        expect(() => setUnavailable(0, 0, classes[0])).toThrow();
        expect(() => setUnavailable(0, 0, professors[0])).toThrow();

        expect(getTimetableOf(classes[0]).getSubjectOn(0, 0)).toBe(subjects[0]);
        expect(getTimetableOf(professors[0]).getSubjectOn(0, 0)).toBe(subjects[0]);
    });

    it("shouldn't throw when setting available on an assigned timeslot", () => {
        setSubject(0, 0, subjects[0]);


        setAvailable(0, 0, classes[0])
        setAvailable(0, 0, professors[0])

        expect(getTimetableOf(classes[0]).getSubjectOn(0, 0)).toBe(subjects[0]);
        expect(getTimetableOf(professors[0]).getSubjectOn(0, 0)).toBe(subjects[0]);
    });

    it("should throw when removing a subject from an unassigned timeslot", () => {
        expect(() => removeSubject(0, 0, subjects[0])).toThrow();
    });

    it("shouldn't throw when setting available on an unassigned timeslot", () => {
        expect(() => setAvailable(0, 0, classes[0])).not.toThrow();
    });

    it("shouldn't throw when setting unavailable on an unavailable timeslot", () => {
        setUnavailable(0, 0, classes[0]);

        expect(() => setUnavailable(0, 0, classes[0])).not.toThrow();
    });


    test.each([-123, -1, 7, 2.1, 1234356])('throws on invalid dayOfWeek %p', (value) => {
        expect(() => setSubject(value, 0, subjects[0])).toThrow();
    });

    test.each([-123, -1, 2.1, 13, 1234356])('throws on invalid timeOfDay %p', (value) => {
        expect(() => setSubject(0, value, subjects[0])).toThrow();
    });



});
