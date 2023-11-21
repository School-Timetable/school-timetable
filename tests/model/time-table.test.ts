import { classTimetableMap, professorTimetableMap, setSubject, removeSubject } from "$model/TimeTable";
import { Professor } from "$model/professor/professor";
import { SchoolClass } from "$model/school-class/school-class";
import { Subject } from "$model/subject/subject";
import { set } from "zod";


const professors = [
    Professor.of("prof-1", "Marco", "Rossi", "marco.rossi@mail.com", "3332221110"),
    Professor.of("prof-2", "Francesca", "Verdi", "francesca.verdi@mail.com", "3334441110"),
]

const classes = [
    SchoolClass.of("class-1", 1, "A"),
    SchoolClass.of("class-2", 2, "A")
]

let subjects = [
    Subject.of("subj-1", classes[0], professors[0], "Matematica", "MAT", 5, 20),
    Subject.of("subj-2", classes[0], professors[1], "Italiano", "ITA", 6, 18),
    Subject.of("subj-3", classes[1], professors[0], "Fisica quantistica per bambini", "FIS", 5, 20),
    Subject.of("subj-4", classes[1], professors[1], "Italiano per grezzi di paese", "ITAG", 10, 30),
]

describe("Timetable", () => {

    it("should update readonly maps when timetable changes", () => {


        setSubject(subjects[0], 0, 0);
        expect(classTimetableMap.get("class-1")!.values[0][0]).toBe(subjects[0]);
        expect(professorTimetableMap.get("prof-1")!.values[0][0]).toBe(subjects[0]);
        setSubject(subjects[3], 0, 0);
        expect(classTimetableMap.get("class-2")!.values[0][0]).toBe(subjects[3]);
        expect(professorTimetableMap.get("prof-2")!.values[0][0]).toBe(subjects[3]);

        expect(classTimetableMap.get("class-1")!.values[0][0]).toBe(subjects[0]);
        expect(professorTimetableMap.get("prof-1")!.values[0][0]).toBe(subjects[0]);

        setSubject(subjects[1], 0, 0);
        expect(classTimetableMap.get("class-1")!.values[0][0]).toBe(subjects[1]);
        expect(professorTimetableMap.get("prof-2")!.values[0][0]).toBe(subjects[1]);

        expect(professorTimetableMap.get("prof-1")!.values[0][0]).toBe(null);
    });
});
