import { Professor } from "../professor/professor";
import { SchoolClass } from "../school-class/school-class";
import { Subject } from "../subject/subject";



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

    private readonly subjectsMap: Map<string, { dayOfWeek: number, timeOfDay: number }[]> = new Map();

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
        const oldSubject = this.values[dayOfWeek][timeOfDay];

        this.values[dayOfWeek][timeOfDay] = subject;

        this.updateSubjectsMap(dayOfWeek, timeOfDay, subject, oldSubject);
    }


    private updateSubjectsMap(dayOfWeek: number, timeOfDay: number, subject: Subject | null, oldSubject: Subject | null) {
        // remove the old subject's time slot from the map
        if (oldSubject != null) {
            const subjectList = this.subjectsMap.get(oldSubject.id)!;
            const index = subjectList.findIndex((value) => value.dayOfWeek == dayOfWeek && value.timeOfDay == timeOfDay);
            subjectList.splice(index, 1);

            // remove the subject from the map if it has no more timeslots
            if (subjectList.length == 0) {
                this.subjectsMap.delete(oldSubject.id);
            }
        }

        // add the subject to the map
        if (subject != null) {
            if (!this.subjectsMap.has(subject.id)) {
                this.subjectsMap.set(subject.id, []);
            }
            const subjectList = this.subjectsMap.get(subject.id)!;
            subjectList.push({ dayOfWeek, timeOfDay });
            this.sortTimeSlots(subjectList);
        }
    }

    computeSubjectMap(): Map<string, { dayOfWeek: number, timeOfDay: number }[]> {
        const subjectMap: Map<string, { dayOfWeek: number, timeOfDay: number }[]> = new Map();

        for (let i = 0; i < this.daysPerWeek; i++) {
            for (let j = 0; j < this.hoursPerDay; j++) {
                const subject = this.getSubjectOn(i, j);
                if (subject == null)
                    continue;

                if (!subjectMap.has(subject.id)) {
                    subjectMap.set(subject.id, []);
                }
                const subjectList = subjectMap.get(subject.id)!;
                subjectList.push({ dayOfWeek: i, timeOfDay: j });
            }
        }

        // not needed because the subjects are added in order
        // for (const [key, value] of subjectMap) {
        //     this.sortTimeSlots(value);
        // }

        return subjectMap;
    }

    private sortTimeSlots(timeslots: { dayOfWeek: number, timeOfDay: number }[]): void {
        timeslots.sort((a, b) => {
            if (a.dayOfWeek != b.dayOfWeek) {
                return a.dayOfWeek - b.dayOfWeek;
            }
            else {
                return a.timeOfDay - b.timeOfDay;
            }
        });
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

        this.subjectsMap.clear();
    }


    removeAllOf(subject: Subject): void {
        const subjectList = this.subjectsMap.get(subject.id);
        if (subjectList == null) {
            return;
        }

        for (const { dayOfWeek, timeOfDay } of subjectList) {
            this.values[dayOfWeek][timeOfDay] = null;
        }

        this.subjectsMap.delete(subject.id);
    }

    getTimeSlotsOf(subject: Subject): { dayOfWeek: number, timeOfDay: number }[] {
        return this.subjectsMap.get(subject.id) ?? [];
    }

    getCountOf(subject: Subject): number {
        return this.getTimeSlotsOf(subject).length;
    }

    getUnavailableTimeslots(): { dayOfWeek: number, timeOfDay: number }[] {
        return this.getTimeSlotsOf(unavailableSubject);
    }

    getUnassignedTimeslots(): { dayOfWeek: number, timeOfDay: number }[] {
        const unassigned: { dayOfWeek: number, timeOfDay: number }[] = [];
        for (let i = 0; i < this.daysPerWeek; i++) {
            for (let j = 0; j < this.hoursPerDay; j++) {
                if (this.isUnassignedOn(i, j)) {
                    unassigned.push({ dayOfWeek: i, timeOfDay: j });
                }
            }
        }
        return unassigned;
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


export function removeAllOf(subject: Subject): void {
    getClassTimetableOf(subject.schoolClass).removeAllOf(subject);
    getProfessorTimetableOf(subject.professor).removeAllOf(subject);
}


