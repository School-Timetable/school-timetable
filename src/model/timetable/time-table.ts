import { Professor } from "../professor/professor";
import { SchoolClass } from "../school-class/school-class";
import type { Subject } from "../subject/subject";
import { Unavailable } from "./unavailable";


let updateClassroomsCallback: (map: Map<string, TimeTable>) => void
let updateProfessorsCallback: (map: Map<string, TimeTable>) => void

let _classTimetableMap: Map<string, TimeTable> = new Map();
let _professorTimetableMap: Map<string, TimeTable> = new Map();

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


export class TimeTable {

    /** 
     * first list is day of week, second is time of day
     * null represents no subject in the timeslot
     * 
     * do not modify this array directly, 
     * use {@link setSubject} if you want to keep professors and classes timetables in sync
     * or {@link setSubjectOn} if you want to modify only this timetable
     * */
    get values() { return this._values; }
    private _values: (Subject | Unavailable | null)[][] = [];

    private _daysPerWeek: number;
    private _hoursPerDay: number;




    /**
     * maps a subject id to a list of timeslots where the subject is assigned
     * do not modify this map directly, it is updated automatically
     * 
     * the list is sorted by day of week and then by time of day
     */
    private _subjectMap: Map<string, { dayOfWeek: number, timeOfDay: number }[]> = new Map();

    constructor(daysPerWeek: number, hoursPerDay: number) {
        this._daysPerWeek = daysPerWeek;
        this._hoursPerDay = hoursPerDay;
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
            const subjectList = this._subjectMap.get(oldSubject.id)!;
            const index = subjectList.findIndex((value) => value.dayOfWeek == dayOfWeek && value.timeOfDay == timeOfDay);
            subjectList.splice(index, 1);

            // remove the subject from the map if it has no more timeslots
            if (subjectList.length == 0) {
                this._subjectMap.delete(oldSubject.id);
            }
        }

        // add the subject to the map
        if (subject != null) {
            if (!this._subjectMap.has(subject.id)) {
                this._subjectMap.set(subject.id, []);
            }

            const subjectTimeslotList = this._subjectMap.get(subject.id)!;
            subjectTimeslotList.push({ dayOfWeek, timeOfDay });
            this.sortTimeSlots(subjectTimeslotList);
        }
    }

    get subjectMap(): ReadonlyMap<string, { dayOfWeek: number, timeOfDay: number }[]> {
        return this._subjectMap;
    }

    computeSubjectMap(): Map<string, { dayOfWeek: number, timeOfDay: number }[]> {
        const tmpSubjectsMap: Map<string, { dayOfWeek: number, timeOfDay: number }[]> = new Map();

        for (let i = 0; i < this.daysPerWeek; i++) {
            for (let j = 0; j < this.hoursPerDay; j++) {
                const subject = this.getSubjectOn(i, j);
                if (subject == null || subject instanceof Unavailable)
                    continue;

                if (!tmpSubjectsMap.has(subject.id)) {
                    tmpSubjectsMap.set(subject.id, []);
                }

                tmpSubjectsMap.get(subject.id)!.push({ dayOfWeek: i, timeOfDay: j });
            }
        }

        return tmpSubjectsMap;
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


    get daysPerWeek(): number {
        return this._daysPerWeek;
    }

    get hoursPerDay(): number {
        return this._hoursPerDay;
    }


    /**
     * @returns true if and only if the timeslot is not marked as unavailable
     */
    isAvailableOn(dayOfWeek: number, timeOfDay: number): boolean {
        const sub = this.getSubjectOn(dayOfWeek, timeOfDay);
        return !(sub instanceof Unavailable)
        
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
        return sub != null && !(sub instanceof Unavailable);
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

        this._subjectMap.clear();
    }



    /**
     * removes all occourrences of {@link subject} from the timetable
     * 
     * @see {@link removeAllOf}
     */
    removeAllOf(subject: Subject | Unavailable): void {
        const subjectList = this._subjectMap.get(subject.id);
        if (subjectList == null) {
            return;
        }

        for (const { dayOfWeek, timeOfDay } of subjectList) {
            this.values[dayOfWeek][timeOfDay] = null;
        }

        this._subjectMap.delete(subject.id);
    }

    getTimeSlotsOf(subject: Subject | Unavailable): { dayOfWeek: number, timeOfDay: number }[] {
        return this._subjectMap.get(subject.id) ?? [];
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

        for (const timeslots of this._subjectMap.values()) {
            if (timeslots.length > 0)
                return false;
        }
        return true;

    }

    /**
     * Restructures the value matrix to a new size of daysPerWeek, hoursPerDay
     * 
     */
    setSize(daysPerWeek: number, hoursPerDay: number) {
        if (daysPerWeek == this.daysPerWeek && hoursPerDay == this.hoursPerDay) {
            // nothing to do, we are already at the desired size
            return;
        }

        for (let day = 0; day < daysPerWeek; day++) {
            let dayValues;
            if (day < this.daysPerWeek) {
                // when decreasing hours per day
                if (hoursPerDay < this.hoursPerDay) {
                    // slice out the extra hours per day
                    dayValues = this.values[day].slice(0, hoursPerDay)
                }
                else {
                    // use the array from before
                    dayValues = this.values[day];
                    // add empty timeslots to reach the new size
                    for (let hour = this.hoursPerDay; hour < hoursPerDay; hour++) {
                        dayValues.push(null);
                    }
                }
                this.values[day] = dayValues;
            }
            else {
                this.values.push(new Array(hoursPerDay).fill(null))
            }
        }

        while (this.values.length > daysPerWeek) {
            this.values.pop();
        }

        this._subjectMap = this.computeSubjectMap();

        this._daysPerWeek = daysPerWeek;
        this._hoursPerDay = hoursPerDay;
    }

}


/**
 * Sets the subject to the correct timetables, ensuring they are kept in sync
 * 
 * @see {@link setUnavailable} to mark a timeslot as unavailable
 * 
 */
export function setSubject(dayOfWeek: number, timeOfDay: number, subject: Subject, 
    classTimetable?: TimeTable, profTimetable?: TimeTable
): void {

    const classTimeTable = (classTimetable) ? classTimetable : getClassTimetableOf(subject.schoolClass);
    setSubjectOnTimeTable(dayOfWeek, timeOfDay, subject, classTimeTable);

    const professorTimeTable = (profTimetable) ? profTimetable : getProfessorTimetableOf(subject.professor);
    setSubjectOnTimeTable(dayOfWeek, timeOfDay, subject, professorTimeTable);

    if(updateClassroomsCallback) {
        updateClassroomsCallback(_classTimetableMap)
        updateProfessorsCallback(_professorTimetableMap)
    }
}

/**
 * Helper method for {@link setSubject}
 */
function setSubjectOnTimeTable(dayOfWeek: number, timeOfDay: number, subject: Subject, timeTable: TimeTable) {
    const oldSubject = timeTable.getSubjectOn(dayOfWeek, timeOfDay);

    if (oldSubject instanceof Unavailable) {
        throw new Error("Trying to assign a subject on an unavailable timeslot");
    }
    else if (oldSubject != null) {
        console.log(`Volevo inserire subject ${subject.id} allo slot ${dayOfWeek} ${timeOfDay}, ma c'è già ${subject.id}`)
        // we replace the old subject from all the timetables
        removeSubject(dayOfWeek, timeOfDay, oldSubject);
    }

    timeTable.setSubjectOn(dayOfWeek, timeOfDay, subject);
}


export function removeSubject(dayOfWeek: number, timeOfDay: number, subject: Subject | Unavailable) {
    if (subject instanceof Unavailable) {
        throw new Error("Trying to remove an unavailable subject");
    }

    
    const ctt = getClassTimetableOf(subject.schoolClass);
    const ptt = getProfessorTimetableOf(subject.professor);

    if (ctt.getSubjectOn(dayOfWeek, timeOfDay)?.id != subject.id || ptt.getSubjectOn(dayOfWeek, timeOfDay)?.id != subject.id) {
        throw new Error("Trying to remove a subject from a timeslot that doesn't contain it");
    }
    

    ctt.setSubjectOn(dayOfWeek, timeOfDay, null);
    ptt.setSubjectOn(dayOfWeek, timeOfDay, null);

    if(updateClassroomsCallback) {
        updateClassroomsCallback(_classTimetableMap)
        updateProfessorsCallback(_professorTimetableMap)
    }
}


/**
 * @param entity either a {@link SchoolClass} or {@link Professor} which is used to get the right timetable
 * @param available true for removing unavailable mark else false to mark as unavailable, by default it is false
 */
export function setUnavailable(dayOfWeek: number, timeOfDay: number, entity?: SchoolClass | Professor, available: boolean = false, timetable?: TimeTable): void {
    const timeTable = (timetable) ? timetable : getTimetableOf(entity!);
    const oldSubject = timeTable.getSubjectOn(dayOfWeek, timeOfDay);


    if (available) {
        if (!(oldSubject instanceof Unavailable)) {
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

    if(updateClassroomsCallback) {
        updateClassroomsCallback(_classTimetableMap)
        updateProfessorsCallback(_professorTimetableMap)
    }
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
        _classTimetableMap.set(classID, new TimeTable(6,7));//getAllDaysOfWeek().length, getAllHoursOfDay().length));
    }

    return _classTimetableMap.get(classID)!;
}

/**
 * @returns the timetable of {@link professor}, if it doesn't exists it will create it just before
 */
export function getProfessorTimetableOf(professor: Professor): TimeTable {
    const professorID = professor.id;
    if (!_professorTimetableMap.has(professorID)) {
        _professorTimetableMap.set(professorID, new TimeTable(6,7));//getAllDaysOfWeek().length, getAllHoursOfDay().length));
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


export function removeSchoolClass(schoolClass: SchoolClass): void {
    _classTimetableMap.delete(schoolClass.id);
}


export function removeProfessor(professor: Professor): void {
    _professorTimetableMap.delete(professor.id);
}


export function changeTimeTableSize(daysPerWeek: number, hoursPerDay: number) {
    if (daysPerWeek <= 0 || hoursPerDay <= 0)
        throw new Error("Invalid timetable size, daysPerWeek and hoursPerDay must be greater than 0");


    _classTimetableMap.forEach((timeTable) => {
        timeTable.setSize(daysPerWeek, hoursPerDay);
    });
    _professorTimetableMap.forEach((timeTable) => {
        timeTable.setSize(daysPerWeek, hoursPerDay);
    });
}

export function putClassTimetable(classId: string, allTimetables: Map<string, TimeTable>, daysOfWeek: number, hoursOfDay: number) {
    allTimetables.set(classId, new TimeTable(daysOfWeek, hoursOfDay));
}


export function putProfTimetable(profId: string, allTimetables: Map<string, TimeTable>, daysOfWeek: number, hoursOfDay: number) {
    allTimetables.set(profId, new TimeTable(daysOfWeek, hoursOfDay));
}


export function setUpdateClassroomsCallback(callback: (map: Map<string, TimeTable>) => void) {
    updateClassroomsCallback = callback;
}

export function setUpdateProfessorsCallback(callback: (map: Map<string, TimeTable>) => void) {
    updateProfessorsCallback = callback;
}

export function updateTimetablesMatrix(classTimeTable: Map<string, TimeTable>, profTimetable: Map<string, TimeTable>) {
    _classTimetableMap = classTimeTable;
    _professorTimetableMap = profTimetable;
}