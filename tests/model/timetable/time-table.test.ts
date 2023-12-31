import * as timetable_lib from "$model/timetable/time-table";
import { Professor } from "$model/professor/professor";
import { SchoolClass } from "$model/school-class/school-class";
import { Subject } from "$model/subject/subject";

timetable_lib.setTestingMode();

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
        timetable_lib.clearAll();
    });

    it("Time table should be empty at the beginning", () => {
        expect(timetable_lib.classTimetableMap.size).toBe(0);
        expect(timetable_lib.professorTimetableMap.size).toBe(0);
    });

    it("Time table should create on demand", () => {
        
        const c0tt = timetable_lib.getClassTimetableOf(classes[0])

        expect(c0tt).not.toBeNull();
        expect(c0tt.daysPerWeek).toBeGreaterThan(0);
        expect(c0tt.hoursPerDay).toBeGreaterThan(0);
        expect(c0tt.values.length).toEqual(c0tt.daysPerWeek);
        for (let i = 0; i < c0tt.daysPerWeek; i++) {
            expect(c0tt.values[i].length).toEqual(c0tt.hoursPerDay);
        }
        expect(timetable_lib.classTimetableMap.size).toBe(1);

        const p0tt = timetable_lib.getProfessorTimetableOf(professors[0])
        expect(p0tt).not.toBeNull();
        expect(p0tt.daysPerWeek).toBeGreaterThan(0);
        expect(p0tt.hoursPerDay).toBeGreaterThan(0);
        expect(p0tt.values.length).toEqual(p0tt.daysPerWeek);
        for (let i = 0; i < p0tt.daysPerWeek; i++) {
            expect(p0tt.values[i].length).toEqual(p0tt.hoursPerDay);
        }
        expect(timetable_lib.professorTimetableMap.size).toBe(1);

    });


    it("Time table should handle overlaps by removing old subjects", () => {

        const c0tt = timetable_lib.getTimetableOf(classes[0]);
        const p0tt = timetable_lib.getTimetableOf(professors[0]);
        const c1tt = timetable_lib.getTimetableOf(classes[1]);
        const p1tt = timetable_lib.getTimetableOf(professors[1]);



        timetable_lib.setSubject(0, 0, subjects[0]);
        expect(c0tt.getSubjectOn(0, 0)).toBe(subjects[0]);
        expect(p0tt.getSubjectOn(0, 0)).toBe(subjects[0]);

        timetable_lib.setSubject(0, 0, subjects[3]);
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
        timetable_lib.setSubject(0, 0, subjects[1]);

        expect(c0tt.getSubjectOn(0, 0)).toBe(subjects[1]);
        expect(p1tt.getSubjectOn(0, 0)).toBe(subjects[1]);

        expect(c1tt.getSubjectOn(0, 0)).toBeNull();
        expect(p0tt.getSubjectOn(0, 0)).toBeNull();

    });

    it("should remove subjects", () => {
        const c0tt = timetable_lib.getTimetableOf(classes[0]);
        const p0tt = timetable_lib.getTimetableOf(professors[0]);

        timetable_lib.setSubject(0, 0, subjects[0]);

        expect(c0tt.getSubjectOn(0, 0)).toBe(subjects[0]);
        expect(p0tt.getSubjectOn(0, 0)).toBe(subjects[0]);

        timetable_lib.removeSubject(0, 0, subjects[0]);

        expect(c0tt.getSubjectOn(0, 0)).toBeNull();
        expect(p0tt.getSubjectOn(0, 0)).toBeNull();
    });

    it("should set unavailable", () => {
        const c0tt = timetable_lib.getTimetableOf(classes[0]);
        const p0tt = timetable_lib.getTimetableOf(professors[0]);


        expect(c0tt.isAvailableOn(0, 0)).toBe(true);
        expect(p0tt.isAvailableOn(0, 0)).toBe(true);

        timetable_lib.setUnavailable(0, 0, classes[0]);

        // the unvaliability is set only on the class timetable
        expect(c0tt.isAvailableOn(0, 0)).toBe(false);
        expect(p0tt.isAvailableOn(0, 0)).toBe(true);

        timetable_lib.setUnavailable(0, 0, professors[0]);

        expect(c0tt.isAvailableOn(0, 0)).toBe(false);
        expect(p0tt.isAvailableOn(0, 0)).toBe(false);

        timetable_lib.setAvailable(0, 0, professors[0]);

        expect(c0tt.isAvailableOn(0, 0)).toBe(false);
        expect(p0tt.isAvailableOn(0, 0)).toBe(true);

        timetable_lib.setAvailable(0, 0, classes[0]);

        expect(c0tt.isAvailableOn(0, 0)).toBe(true);
        expect(p0tt.isAvailableOn(0, 0)).toBe(true);
    });

    it("should throw when setting unavailable on an assigned timeslot", () => {
        timetable_lib.setSubject(0, 0, subjects[0]);

        expect(() => timetable_lib.setUnavailable(0, 0, classes[0])).toThrow();
        expect(() => timetable_lib.setUnavailable(0, 0, professors[0])).toThrow();

        expect(timetable_lib.getTimetableOf(classes[0]).getSubjectOn(0, 0)).toBe(subjects[0]);
        expect(timetable_lib.getTimetableOf(professors[0]).getSubjectOn(0, 0)).toBe(subjects[0]);
    });

    it("shouldn't throw when setting available on an assigned timeslot", () => {
        timetable_lib.setSubject(0, 0, subjects[0]);


        timetable_lib.setAvailable(0, 0, classes[0])
        timetable_lib.setAvailable(0, 0, professors[0])

        expect(timetable_lib.getTimetableOf(classes[0]).getSubjectOn(0, 0)).toBe(subjects[0]);
        expect(timetable_lib.getTimetableOf(professors[0]).getSubjectOn(0, 0)).toBe(subjects[0]);
    });

    it("should throw when removing a subject from an unassigned timeslot", () => {
        expect(() => timetable_lib.removeSubject(0, 0, subjects[0])).toThrow();
    });

    it("shouldn't throw when setting available on an unassigned timeslot", () => {
        expect(() => timetable_lib.setAvailable(0, 0, classes[0])).not.toThrow();
    });

    it("shouldn't throw when setting unavailable on an unavailable timeslot", () => {
        timetable_lib.setUnavailable(0, 0, classes[0]);

        expect(() => timetable_lib.setUnavailable(0, 0, classes[0])).not.toThrow();
    });


    // test.each([-123, -1, 7, 2.1, 1234356])('throws on invalid dayOfWeek %p', (value) => {
    //     expect(() => setSubject(value, 0, subjects[0])).toThrow();
    // });

    test.each([-123, -1, 2.1, 13, 1234356])('throws on invalid timeOfDay %p', (value) => {
        expect(() => timetable_lib.setSubject(0, value, subjects[0])).toThrow();
    });


    it("should remove all time slots of a subject", () => {
        const c0tt = timetable_lib.getTimetableOf(classes[0]);
        const p0tt = timetable_lib.getTimetableOf(professors[0]);
        const c1tt = timetable_lib.getTimetableOf(classes[1]);
        const p1tt = timetable_lib.getTimetableOf(professors[1]);

        timetable_lib.setSubject(0, 0, subjects[0]);
        timetable_lib.setSubject(1, 1, subjects[0]);

        timetable_lib.setSubject(2, 2, subjects[1]);
        timetable_lib.setSubject(3, 3, subjects[1]);
        timetable_lib.setSubject(3, 4, subjects[1]);
        timetable_lib.setSubject(4, 0, subjects[1]);

        timetable_lib.setSubject(0, 1, subjects[2]);
        timetable_lib.setSubject(0, 2, subjects[2]);

        expect(c0tt.getCountOf(subjects[0])).toBe(2);
        expect(p0tt.getCountOf(subjects[0])).toBe(2);
        expect(c1tt.getCountOf(subjects[0])).toBe(0);
        expect(p1tt.getCountOf(subjects[0])).toBe(0);

        expect(c0tt.getCountOf(subjects[1])).toBe(4);
        expect(p0tt.getCountOf(subjects[1])).toBe(0);
        expect(c1tt.getCountOf(subjects[1])).toBe(0);
        expect(p1tt.getCountOf(subjects[1])).toBe(4);

        expect(c0tt.getCountOf(subjects[2])).toBe(0);
        expect(p0tt.getCountOf(subjects[2])).toBe(2);
        expect(c1tt.getCountOf(subjects[2])).toBe(2);
        expect(p1tt.getCountOf(subjects[2])).toBe(0);

        timetable_lib.removeAllOf(subjects[1]);

        expect(c0tt.getCountOf(subjects[0])).toBe(2);
        expect(p0tt.getCountOf(subjects[0])).toBe(2);
        expect(c1tt.getCountOf(subjects[0])).toBe(0);
        expect(p1tt.getCountOf(subjects[0])).toBe(0);

        expect(c0tt.getCountOf(subjects[1])).toBe(0);
        expect(p0tt.getCountOf(subjects[1])).toBe(0);
        expect(c1tt.getCountOf(subjects[1])).toBe(0);
        expect(p1tt.getCountOf(subjects[1])).toBe(0);

        expect(c0tt.getCountOf(subjects[2])).toBe(0);
        expect(p0tt.getCountOf(subjects[2])).toBe(2);
        expect(c1tt.getCountOf(subjects[2])).toBe(2);
        expect(p1tt.getCountOf(subjects[2])).toBe(0);

    });


    describe("Subject map", () => {

        it("should update on setting subject", () => {

            const tt = timetable_lib.getTimetableOf(classes[0]);

            expect(tt.getCountOf(subjects[0])).toBe(0);
            timetable_lib.setSubject(0, 0, subjects[0]);

            expect(tt.getCountOf(subjects[0])).toBe(1);
            expect(tt.getTimeSlotsOf(subjects[0])).toEqual([{ dayOfWeek: 0, timeOfDay: 0 }]);

            timetable_lib.setSubject(3, 1, subjects[0]);
            expect(tt.getTimeSlotsOf(subjects[0])).toEqual([
                { dayOfWeek: 0, timeOfDay: 0 },
                { dayOfWeek: 3, timeOfDay: 1 }]);

            timetable_lib.setSubject(2, 4, subjects[0]);
            expect(tt.getTimeSlotsOf(subjects[0])).toEqual([
                { dayOfWeek: 0, timeOfDay: 0 },
                { dayOfWeek: 2, timeOfDay: 4 },
                { dayOfWeek: 3, timeOfDay: 1 }]);


                timetable_lib.removeSubject(0, 0, subjects[0]);
            expect(tt.getTimeSlotsOf(subjects[0])).toEqual([
                { dayOfWeek: 2, timeOfDay: 4 },
                { dayOfWeek: 3, timeOfDay: 1 }]);

        });


        it("unavailability", () => {
            const tt = timetable_lib.getTimetableOf(classes[0]);

            timetable_lib.setSubject(0, 1, subjects[0]);
            timetable_lib.setSubject(1, 2, subjects[0]);

            timetable_lib.setUnavailable(0, 0, classes[0]);
            timetable_lib.setUnavailable(1, 3, classes[0]);
            timetable_lib.setUnavailable(1, 1, classes[0]);
            timetable_lib.setUnavailable(0, 5, classes[0]);
            timetable_lib.setUnavailable(0, 4, classes[0]);


            expect(tt.getUnavailableTimeslots()).toEqual([
                { dayOfWeek: 0, timeOfDay: 0 },
                { dayOfWeek: 0, timeOfDay: 4 },
                { dayOfWeek: 0, timeOfDay: 5 },
                { dayOfWeek: 1, timeOfDay: 1 },
                { dayOfWeek: 1, timeOfDay: 3 },
            ]);

            timetable_lib.setAvailable(0, 0, classes[0]);
            timetable_lib.setAvailable(1, 3, classes[0]);
            timetable_lib.setAvailable(1, 1, classes[0]);

            expect(tt.getUnavailableTimeslots()).toEqual([
                { dayOfWeek: 0, timeOfDay: 4 },
                { dayOfWeek: 0, timeOfDay: 5 },
            ]);
        });

        it("get Unassigned Timeslots returns all the right time slots", () => {

            const tt = timetable_lib.getTimetableOf(classes[0]);

            const days = tt.daysPerWeek;
            const hours = tt.hoursPerDay;

            timetable_lib.setSubject(0, 1, subjects[0]);
            timetable_lib.setSubject(0, 2, subjects[0]);
            timetable_lib.setSubject(1, 2, subjects[1]);
            timetable_lib.setSubject(1, 3, subjects[1]);
            timetable_lib.setUnavailable(0, 0, classes[0]);
            timetable_lib.setUnavailable(1, 4, classes[0]);

            const unassigned = tt.getUnassignedTimeslots();

            expect(unassigned.length).toBe(days * hours - 6);
        });

        it("should reset on clear", () => {
            const tt = timetable_lib.getTimetableOf(classes[0]);

            timetable_lib.setSubject(0, 1, subjects[0]);
            timetable_lib.setSubject(0, 2, subjects[0]);
            timetable_lib.setSubject(1, 2, subjects[1]);
            timetable_lib.setSubject(1, 3, subjects[1]);
            expect(tt.getCountOf(subjects[0])).toBe(2);

            tt.clear();
            expect(tt.getCountOf(subjects[0])).toBe(0);
        });

        it("should be empty", () => {
            const tt = timetable_lib.getTimetableOf(classes[0]);

            expect(tt.isEmpty()).toBe(true);

            timetable_lib.setSubject(0, 1, subjects[0]);
            expect(tt.isEmpty()).toBe(false);

            tt.setSubjectOn(0, 1, null);
            expect(tt.isEmpty()).toBe(true);

            timetable_lib.setSubject(0, 2, subjects[1]);
            expect(tt.isEmpty()).toBe(false);

            tt.clear();
            expect(tt.isEmpty()).toBe(true);
        });



        it("should update size correctly", () => {
            const tt = timetable_lib.getTimetableOf(classes[0]);

            tt.setSubjectOn(2,1, subjects[0]);
            tt.setSubjectOn(2,2, subjects[0]);
            
            tt.setSubjectOn(5,0, subjects[1]);
            tt.setSubjectOn(5,1, subjects[1]);

            expect(tt.getCountOf(subjects[0])).toBe(2);
            expect(tt.getCountOf(subjects[1])).toBe(2);
            
            tt.setSize(5,5);
            
            expect(tt.getTimeSlotsOf(subjects[0])).toEqual([
                { dayOfWeek: 2, timeOfDay: 1 },
                { dayOfWeek: 2, timeOfDay: 2 }
            ]);
            expect(tt.getCountOf(subjects[1])).toBe(0);
            expect(tt.daysPerWeek).toBe(5);
            expect(tt.hoursPerDay).toBe(5);

            tt.setSize(7,8);

            expect(tt.getCountOf(subjects[0])).toBe(2);
            expect(tt.getCountOf(subjects[1])).toBe(0);

            tt.setSubjectOn(6,5, subjects[1]);
            tt.setSubjectOn(6,6, subjects[1]);
            tt.setSubjectOn(6,7, subjects[1]);
            expect(tt.daysPerWeek).toBe(7);
            expect(tt.hoursPerDay).toBe(8);

            expect(tt.getCountOf(subjects[1])).toBe(3);
        });
    });
});


