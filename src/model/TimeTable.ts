import { Professor } from "./professor/professor";
import { SchoolClass } from "./school-class/school-class";
import { Subject } from "./subject/subject";



const _classTimetableMap: Map<string, TimeTable> = new Map();
const _professorTimetableMap: Map<string, TimeTable> = new Map();

export const classTimetableMap: ReadonlyMap<string, TimeTable> = _classTimetableMap;
export const professorTimetableMap: ReadonlyMap<string, TimeTable> = _professorTimetableMap;

class TimeTable {

    // first list is day of week, second is time of day
    // null means no subject
    readonly values: (Subject | null)[][] = [];
    readonly daysPerWeek: number;
    readonly hoursPerDay: number;

    constructor(daysPerWeek: number, hoursPerDay: number) {
        this.daysPerWeek = daysPerWeek;
        this.hoursPerDay = hoursPerDay;
        for (let i = 0; i < daysPerWeek; i++) {
            this.values.push([]);
            for (let j = 0; j < hoursPerDay; j++) {
                this.values[i].push(null);
            }
        }
    }

    getSubjectOn(dayOfWeek: number, timeOfDay: number): Subject | null {
        if (!this.isValidTimeslot(dayOfWeek, timeOfDay)) {
            throw new Error("Invalid timeslot");
        }

        return this.values[dayOfWeek][timeOfDay];
    }

    setSubjectOn(subject: Subject | null, dayOfWeek: number, timeOfDay: number): void {
        if (!this.isValidTimeslot(dayOfWeek, timeOfDay)) {
            throw new Error("Invalid timeslot");
        }

        this.values[dayOfWeek][timeOfDay] = subject;
    }

    isAvailableOn(dayOfWeek: number, timeOfDay: number): boolean {
        return this.getSubjectOn(dayOfWeek, timeOfDay) != unavailableSubject;
    }

    isUnavailableOn(dayOfWeek: number, timeOfDay: number): boolean {
        return this.getSubjectOn(dayOfWeek, timeOfDay) == unavailableSubject;
    }

    isAssignedOn(dayOfWeek: number, timeOfDay: number): boolean {
        const sub = this.getSubjectOn(dayOfWeek, timeOfDay);
        return sub != null && sub != unavailableSubject;
    }

    isUnassignedOn(dayOfWeek: number, timeOfDay: number): boolean {
        return this.getSubjectOn(dayOfWeek, timeOfDay) == null;
    }

    isValidTimeslot(dayOfWeek: number, timeOfDay: number): boolean {
        return 0 <= dayOfWeek && dayOfWeek < this.daysPerWeek &&
            0 <= timeOfDay && timeOfDay < this.hoursPerDay;
    }



}

// TODO: remove
const daysPerWeek = 6;
const hoursPerDay = 8;

const mockClass = SchoolClass.of("class-mock", 1, "A");
const mockProfessor = Professor.of("professor-mock", "mock", "mock", "fake@ema.il", "0000000000");

const unavailableSubject = Subject.of("unavailable", mockClass, mockProfessor, "unavailable", "X", 1, 10);

export function setSubject(subject: Subject, dayOfWeek: number, timeOfDay: number): void {

    const classTimeTable = getClassTimetableOf(subject.schoolClass);
    setSubjectOnTimeTable(subject, classTimeTable, dayOfWeek, timeOfDay);

    const professorTimeTable = getProfessorTimetableOf(subject.professor);
    setSubjectOnTimeTable(subject, professorTimeTable, dayOfWeek, timeOfDay);
}

function setSubjectOnTimeTable(subject: Subject, timeTable: TimeTable, dayOfWeek: number, timeOfDay: number) {
    const oldSubject = timeTable.getSubjectOn(dayOfWeek, timeOfDay);

    if (oldSubject == unavailableSubject) {
        throw new Error("Trying to assign a subject on an unavailable timeslot");
    }
    else if (oldSubject != null) {
        // we replace the old subject from all the timetables
        removeSubject(oldSubject, dayOfWeek, timeOfDay);
    }

    timeTable.setSubjectOn(subject, dayOfWeek, timeOfDay);
}

export function removeSubject(subject: Subject, dayOfWeek: number, timeOfDay: number) {
    getClassTimetableOf(subject.schoolClass).setSubjectOn(null, dayOfWeek, timeOfDay);
    getProfessorTimetableOf(subject.professor).setSubjectOn(null, dayOfWeek, timeOfDay);

}



export function setUnavailable(dayOfWeek: number, timeOfDay: number, entity: SchoolClass | Professor, remove: boolean = false) {
    const timeTable = getTimetableOf(entity);
    const oldSubject = timeTable.getSubjectOn(dayOfWeek, timeOfDay);

    if (timeTable.isAssignedOn(dayOfWeek, timeOfDay)) {
        throw new Error("Trying to setUnavailable on an assigned timeslot");
    }

    if (remove && oldSubject != unavailableSubject) {
        throw new Error("Trying to remove a subject from an available timeslot");
    }

    const newSubject = remove ? null : unavailableSubject;
    timeTable.setSubjectOn(newSubject, dayOfWeek, timeOfDay);
}

export function getClassTimetableOf(schoolClass: SchoolClass): TimeTable {
    const classID = schoolClass.id;
    if (!_classTimetableMap.has(classID)) {
        _classTimetableMap.set(classID, new TimeTable(daysPerWeek, hoursPerDay));
    }

    return _classTimetableMap.get(classID)!;
}

export function getProfessorTimetableOf(professor: Professor): TimeTable {
    const professorID = professor.id;
    if (!_professorTimetableMap.has(professorID)) {
        _professorTimetableMap.set(professorID, new TimeTable(daysPerWeek, hoursPerDay));
    }

    return _professorTimetableMap.get(professorID)!;
}

export function getTimetableOf(entity: SchoolClass | Professor): TimeTable {
    if (entity instanceof SchoolClass) {
        return getClassTimetableOf(entity);
    }
    else if (entity instanceof Professor) {
        return getProfessorTimetableOf(entity);
    }
    else {
        throw new Error("what is not a SchoolClass or a Professor");
    }
}


// export function isValidTimeslot(dayOfWeek: number, timeOfDay: number): boolean {
//     return dayOfWeek >= 0 && dayOfWeek < daysPerWeek && timeOfDay >= 0 && timeOfDay < hoursPerDay;
// }



// TODO: TEST THIS SHIT
