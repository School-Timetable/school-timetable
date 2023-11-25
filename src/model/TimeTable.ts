import { log } from "console";
import { Professor } from "./professor/professor";
import { SchoolClass } from "./school-class/school-class";
import { Subject } from "./subject/subject";



const _classTimetableMap: Map<string, TimeTable> = new Map();
const _professorTimetableMap: Map<string, TimeTable> = new Map();

export const classTimetableMap: ReadonlyMap<string, TimeTable> = _classTimetableMap;
export const professorTimetableMap: ReadonlyMap<string, TimeTable> = _professorTimetableMap;


// TODO: remove
const daysPerWeek = 6;
const hoursPerDay = 8;

const mockClass = SchoolClass.of("class-mock", 1, "A");
const mockProfessor = Professor.of("professor-mock", "mock", "mock", "fake@ema.il", "0000000000");

// TODO: Create a more elegant solution
export const unavailableSubject = Subject.of("unavailable", mockClass, mockProfessor, "unavailable", "X", 1, 10);


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

    setSubjectOn(dayOfWeek: number, timeOfDay: number, subject: Subject | null): void {
        if (!this.isValidTimeslot(dayOfWeek, timeOfDay)) {
            throw new Error("Invalid timeslot");
        }

        this.values[dayOfWeek][timeOfDay] = subject;
    }

    /**
     * @returns true if and only if the timeslot is not marked as unavailable
     */
    isAvailableOn(dayOfWeek: number, timeOfDay: number): boolean {
        return this.getSubjectOn(dayOfWeek, timeOfDay) != unavailableSubject;
    }

    /**
     * @returns true if and only if the timeslot is marked as unavailable
     */
    isUnavailableOn(dayOfWeek: number, timeOfDay: number): boolean {
        return this.getSubjectOn(dayOfWeek, timeOfDay) == unavailableSubject;
    }

    /**
     * @returns true if and only if the timeslot is assigned to a subject (not null and not unavailable)
     */
    isAssignedOn(dayOfWeek: number, timeOfDay: number): boolean {
        const sub = this.getSubjectOn(dayOfWeek, timeOfDay);
        return sub != null && sub != unavailableSubject;
    }


    /**
     * ensures that a subject can be assigned the timeslot
     * @returns true if the timeslot is not assigned to any subject
     */
    isUnassignedOn(dayOfWeek: number, timeOfDay: number): boolean {
        return this.getSubjectOn(dayOfWeek, timeOfDay) == null;
    }

    isValidTimeslot(dayOfWeek: number, timeOfDay: number): boolean {
        return 0 <= dayOfWeek && dayOfWeek < this.daysPerWeek &&
            0 <= timeOfDay && timeOfDay < this.hoursPerDay &&
            Number.isInteger(dayOfWeek) && Number.isInteger(timeOfDay);
    }

    clear(): void {
        for (let i = 0; i < this.daysPerWeek; i++) {
            for (let j = 0; j < this.hoursPerDay; j++) {
                this.values[i][j] = null;
            }
        }
    }
}



export function setSubject(dayOfWeek: number, timeOfDay: number, subject: Subject): void {

    const classTimeTable = getClassTimetableOf(subject.schoolClass);
    setSubjectOnTimeTable(dayOfWeek, timeOfDay, subject, classTimeTable);

    const professorTimeTable = getProfessorTimetableOf(subject.professor);
    setSubjectOnTimeTable(dayOfWeek, timeOfDay, subject, professorTimeTable);
}

function setSubjectOnTimeTable(dayOfWeek: number, timeOfDay: number, subject: Subject, timeTable: TimeTable) {
    const oldSubject = timeTable.getSubjectOn(dayOfWeek, timeOfDay);

    if (oldSubject == unavailableSubject) {
        throw new Error("Trying to assign a subject on an unavailable timeslot");
    }
    else if (oldSubject != null) {
        // we replace the old subject from all the timetables
        removeSubject(dayOfWeek, timeOfDay, oldSubject);
    }

    timeTable.setSubjectOn(dayOfWeek, timeOfDay, subject);
}

export function removeSubject(dayOfWeek: number, timeOfDay: number, subject: Subject) {
    if (subject == unavailableSubject) {
        throw new Error("Trying to remove an unavailable subject");
    }

    const ctt = getClassTimetableOf(subject.schoolClass);
    const ptt = getProfessorTimetableOf(subject.professor);

    if (ctt.getSubjectOn(dayOfWeek, timeOfDay) != subject || ptt.getSubjectOn(dayOfWeek, timeOfDay) != subject) {
        throw new Error("Trying to remove a subject from a timeslot that doesn't contain it");
    }

    ctt.setSubjectOn(dayOfWeek, timeOfDay, null);
    ptt.setSubjectOn(dayOfWeek, timeOfDay, null);
}


export function setUnavailable(dayOfWeek: number, timeOfDay: number, entity: SchoolClass | Professor, available: boolean = false) {
    const timeTable = getTimetableOf(entity);
    const oldSubject = timeTable.getSubjectOn(dayOfWeek, timeOfDay);



    if (available) {
        if (oldSubject != unavailableSubject) {
            // throw new Error("Trying to remove a subject from an available timeslot");
            return; // nothing to do
        }
    }
    else {
        if (timeTable.isAssignedOn(dayOfWeek, timeOfDay)) {
            throw new Error("Trying to set unavailable on an assigned timeslot");
        }
    }

    const newSubject = available ? null : unavailableSubject;
    timeTable.setSubjectOn(dayOfWeek, timeOfDay, newSubject);
}

export function setAvailable(dayOfWeek: number, timeOfDay: number, entity: SchoolClass | Professor) {
    setUnavailable(dayOfWeek, timeOfDay, entity, true);
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
        throw new Error("entity is not a SchoolClass or a Professor");
    }
}


export function clearAll(): void {
    _classTimetableMap.clear();
    _professorTimetableMap.clear();
}


// export function isValidTimeslot(dayOfWeek: number, timeOfDay: number): boolean {
//     return dayOfWeek >= 0 && dayOfWeek < daysPerWeek && timeOfDay >= 0 && timeOfDay < hoursPerDay;
// }


