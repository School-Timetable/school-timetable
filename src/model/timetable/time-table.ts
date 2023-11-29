import { Professor } from "../professor/professor";
import { SchoolClass } from "../school-class/school-class";
import type { Subject } from "../subject/subject";
import { Unavailable } from "./unavailable";



const _classTimetableMap: Map<string, TimeTable> = new Map();
const _professorTimetableMap: Map<string, TimeTable> = new Map();

/**
 * Maps the id of a {@link SchoolClass} to its {@link TimeTable}
 * 
 * to reliably get the TimeTable of a SchoolClass use {@link getClassTimetableOf}
 */
export const classTimetableMap: ReadonlyMap<string, TimeTable> = _classTimetableMap;

/**
 * Maps the id of a {@link Professor} to its {@link TimeTable}
 * 
 * to reliably get the TimeTable of a Professor use {@link getProfessorTimetableOf}
 */
export const professorTimetableMap: ReadonlyMap<string, TimeTable> = _professorTimetableMap;

// TODO: remove
const daysPerWeek = 6;
const hoursPerDay = 8;


export class TimeTable {

    /** 
     * first list is day of week, second is time of day
     * null represents no subject in the timeslot
     * 
     * do not modify this array directly, 
     * use {@link setSubject} if you want to keep professors and classes timetables in sync
     * or {@link setSubjectOn} if you want to modify only this timetable
     * */
    readonly values: (Subject | Unavailable | null)[][] = [];
    readonly daysPerWeek: number;
    readonly hoursPerDay: number;

    /**
     * maps a subject id to a list of timeslots where the subject is assigned
     * do not modify this map directly, it is updated automatically
     * 
     * the list is sorted by day of week and then by time of day
     */
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

    /**
     * Returns the subject that has been assigned in the choosen time slot
     */
    getSubjectOn(dayOfWeek: number, timeOfDay: number): Subject | Unavailable | null {
        if (!this.isValidTimeslot(dayOfWeek, timeOfDay)) {
            throw new Error("Invalid timeslot");
        }

        return this.values[dayOfWeek][timeOfDay];
    }

    /**
     * Sets the subject to the choosen time slot
     * 
     * if the timeslot is already assigned to a subject, the old subject is removed from the timeslot
     * 
     * use {@link setSubject} if you want to keep professors and classes timetables in sync
     * 
     * @param subject the subject to assign to the timeslot, null to remove the subject from the timeslot, Unavailable to mark the timeslot as unavailable
     * @throws Error if the timeslot is invalid
     */
    setSubjectOn(dayOfWeek: number, timeOfDay: number, subject: Subject | Unavailable | null): void {
        if (!this.isValidTimeslot(dayOfWeek, timeOfDay)) {
            throw new Error("Invalid timeslot");
        }

        const oldSubject = this.values[dayOfWeek][timeOfDay];
        this.values[dayOfWeek][timeOfDay] = subject;

        this.updateSubjectsMap(dayOfWeek, timeOfDay, subject, oldSubject);
    }


    /**
     * Helper method to update the subjects map when a subject is assigned or removed from a timeslot
     */
    private updateSubjectsMap(dayOfWeek: number, timeOfDay: number, subject: Subject | Unavailable | null, oldSubject: Subject | Unavailable | null) {
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

            const subjectTimeslotList = this.subjectsMap.get(subject.id)!;
            subjectTimeslotList.push({ dayOfWeek, timeOfDay });
            this.sortTimeSlots(subjectTimeslotList);
        }
    }

    computeSubjectMap(): Map<string, { dayOfWeek: number, timeOfDay: number }[]> {
        //     const tmpSubjectsMap: Map<string, { dayOfWeek: number, timeOfDay: number }[]> = new Map();

        //     for (let i = 0; i < this.daysPerWeek; i++) {
        //         for (let j = 0; j < this.hoursPerDay; j++) {
        //             const subject = this.getSubjectOn(i, j);
        //             if (subject == null || subject.constructor.name == Unavailable.name)
        //                 continue;

        //             if (!tmpSubjectsMap.has(subject.id)) {
        //                 tmpSubjectsMap.set(subject.id, []);
        //             }

        //             tmpSubjectsMap.get(subject.id)!.push({ dayOfWeek: i, timeOfDay: j });
        //         }
        //     }

        //     // not needed because the subjects are added in order
        //     // for (const [key, value] of subjectMap) {
        //     //     this.sortTimeSlots(value);
        //     // }

        return this.subjectsMap;
    }

    /**
     * Sorts the timeslots in place by day of week and then by time of day
     */
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
        const className = this.getSubjectOn(dayOfWeek, timeOfDay)?.constructor.name ?? "";
        return className != Unavailable.name;
    }

    /**
     * @returns true if and only if the timeslot is marked as unavailable
     */
    isUnavailableOn(dayOfWeek: number, timeOfDay: number): boolean {
        return !this.isAvailableOn(dayOfWeek, timeOfDay);
    }

    /**
     * @returns true if and only if the timeslot is assigned to a subject (not null and not unavailable)
     */
    isAssignedOn(dayOfWeek: number, timeOfDay: number): boolean {
        const sub = this.getSubjectOn(dayOfWeek, timeOfDay);
        return sub != null && sub.constructor.name !== Unavailable.name;
    }


    /**
     * ensures that a subject can be assigned the timeslot
     * @returns true if the timeslot is not assigned to any subject
     */
    isUnassignedOn(dayOfWeek: number, timeOfDay: number): boolean {
        return this.getSubjectOn(dayOfWeek, timeOfDay) == null;
    }

    /**
     * @returns true if {@link dayOfWeek} and {@link timeOfDay} are form a valid timeslot
     * inside the timetable
     */
    isValidTimeslot(dayOfWeek: number, timeOfDay: number): boolean {
        return 0 <= dayOfWeek && dayOfWeek < this.daysPerWeek &&
            0 <= timeOfDay && timeOfDay < this.hoursPerDay &&
            Number.isInteger(dayOfWeek) && Number.isInteger(timeOfDay);
    }

    /**
     * Removes all subjects from the timetable, including unavailable timeslots
     * 
     * restores the timetable to its original state
     * 
     * @see {@link removeAllOf}
     */
    clear(): void {
        for (let i = 0; i < this.daysPerWeek; i++) {
            for (let j = 0; j < this.hoursPerDay; j++) {
                this.values[i][j] = null;
            }
        }

        this.subjectsMap.clear();
    }



    /**
     * removes all occourrences of {@link subject} from the timetable
     * 
     * @see {@link removeAllOf}
     */
    removeAllOf(subject: Subject | Unavailable): void {
        const subjectList = this.subjectsMap.get(subject.id);
        if (subjectList == null) {
            return;
        }

        for (const { dayOfWeek, timeOfDay } of subjectList) {
            this.values[dayOfWeek][timeOfDay] = null;
        }

        this.subjectsMap.delete(subject.id);
    }

    getTimeSlotsOf(subject: Subject | Unavailable): { dayOfWeek: number, timeOfDay: number }[] {
        return this.subjectsMap.get(subject.id) ?? [];
    }

    getCountOf(subject: Subject | Unavailable): number {
        return this.getTimeSlotsOf(subject).length;
    }

    getUnavailableTimeslots(): { dayOfWeek: number, timeOfDay: number }[] {
        return this.getTimeSlotsOf(new Unavailable());
    }

    /**
     * @returns all the timeslots that aren't assigned to any subject, using {@link isUnassignedOn}
     */
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



    /**
     * @returns true if and only if there are no subjects assigned to the timetable
     * or timeslot marked unavailable
     */
    isEmpty(): boolean {

        // return this.subjectsMap.size == 0;

        for (const timeslots of this.subjectsMap.values()) {
            if (timeslots.length > 0)
                return false;
        }
        return true;

    }
}


/**
 * Sets the subject to the correct timetables, ensuring they are kept in sync
 * 
 * @see {@link setUnavailable} to mark a timeslot as unavailable
 * 
 */
export function setSubject(dayOfWeek: number, timeOfDay: number, subject: Subject): void {

    const classTimeTable = getClassTimetableOf(subject.schoolClass);
    setSubjectOnTimeTable(dayOfWeek, timeOfDay, subject, classTimeTable);

    const professorTimeTable = getProfessorTimetableOf(subject.professor);
    setSubjectOnTimeTable(dayOfWeek, timeOfDay, subject, professorTimeTable);
}

/**
 * Helper method for {@link setSubject}
 */
function setSubjectOnTimeTable(dayOfWeek: number, timeOfDay: number, subject: Subject, timeTable: TimeTable) {
    const oldSubject = timeTable.getSubjectOn(dayOfWeek, timeOfDay);

    if (oldSubject?.constructor.name == Unavailable.name) {
        throw new Error("Trying to assign a subject on an unavailable timeslot");
    }
    else if (oldSubject != null) {
        // we replace the old subject from all the timetables
        removeSubject(dayOfWeek, timeOfDay, oldSubject);
    }

    timeTable.setSubjectOn(dayOfWeek, timeOfDay, subject);
}


export function removeSubject(dayOfWeek: number, timeOfDay: number, subject: Subject | Unavailable) {
    if (subject.constructor.name == Unavailable.name) {
        throw new Error("Trying to remove an unavailable subject");
    }

    // @ts-expect-error we know subject is of type Subject
    const ctt = getClassTimetableOf(subject.schoolClass);
    // @ts-expect-error we know subject is of type Subject
    const ptt = getProfessorTimetableOf(subject.professor);

    if (ctt.getSubjectOn(dayOfWeek, timeOfDay) != subject || ptt.getSubjectOn(dayOfWeek, timeOfDay) != subject) {
        throw new Error("Trying to remove a subject from a timeslot that doesn't contain it");
    }

    ctt.setSubjectOn(dayOfWeek, timeOfDay, null);
    ptt.setSubjectOn(dayOfWeek, timeOfDay, null);
}


/**
 * @param entity either a {@link SchoolClass} or {@link Professor} which is used to get the right timetable
 * @param available true for removing unavailable mark else false to mark as unavailable, by default it is false
 */
export function setUnavailable(dayOfWeek: number, timeOfDay: number, entity: SchoolClass | Professor, available: boolean = false): void {
    const timeTable = getTimetableOf(entity);
    const oldSubject = timeTable.getSubjectOn(dayOfWeek, timeOfDay);


    if (available) {
        if (oldSubject?.constructor.name != Unavailable.name) {
            // throw new Error("Trying to remove a subject from an available timeslot");
            return; // nothing to do
        }
    }
    else {
        if (timeTable.isAssignedOn(dayOfWeek, timeOfDay)) {
            throw new Error("Trying to set unavailable on an assigned timeslot");
        }
    }

    const newSubject = available ? null : new Unavailable();
    timeTable.setSubjectOn(dayOfWeek, timeOfDay, newSubject);
}


/**
 * Function to make removing unavailability more readable
 * 
 * @see {@link setUnavailable}
 */
export function setAvailable(dayOfWeek: number, timeOfDay: number, entity: SchoolClass | Professor) {
    setUnavailable(dayOfWeek, timeOfDay, entity, true);
}

/**
 * @returns the timetable of {@link schoolClass}, if it doesn't exists it will create it just before
 */
export function getClassTimetableOf(schoolClass: SchoolClass): TimeTable {
    const classID = schoolClass.id;
    if (!_classTimetableMap.has(classID)) {
        _classTimetableMap.set(classID, new TimeTable(daysPerWeek, hoursPerDay));
    }

    return _classTimetableMap.get(classID)!;
}

/**
 * @returns the timetable of {@link professor}, if it doesn't exists it will create it just before
 */
export function getProfessorTimetableOf(professor: Professor): TimeTable {
    const professorID = professor.id;
    if (!_professorTimetableMap.has(professorID)) {
        _professorTimetableMap.set(professorID, new TimeTable(daysPerWeek, hoursPerDay));
    }

    return _professorTimetableMap.get(professorID)!;
}


/**
 * @returns the timetable of {@link entity}, if it doesn't exists it will create it just before
 */
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


/**
 * resets both classTimetableMap and professorTimetableMap
 */
export function clearAll(): void {
    _classTimetableMap.clear();
    _professorTimetableMap.clear();
}

/** 
 * removes all 
 */
export function removeAllOf(subject: Subject): void {
    getClassTimetableOf(subject.schoolClass).removeAllOf(subject);
    getProfessorTimetableOf(subject.professor).removeAllOf(subject);
}


