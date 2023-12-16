import { getCompleteTimetableFromFile, getExistingClassroomsFromFile, getExistingDaysOfWeekFromFile, getExistingHoursOfDayFromFile, getExistingProfessorFromFile, getExistingSubjectsFromFile } from "$lib/stores/utils/cookie_file_parser";
import { Professor } from "$model/professor/professor";
import { SchoolClass } from "$model/school-class/school-class";
import { Subject } from "$model/subject/subject";
import { get, writable } from "svelte/store";
import { readCookieFile, readCookieFileTimetable } from "./utils/cookie_file_reader";
import { EntityType, generateTimetablesFromAspFile, removeAllOf, removeProfessor, removeSchoolClass, setUpdateClassroomsCallback, setUpdateProfessorsCallback, setupCloneDaysOfWeekHoursOfDay, updateTimetablesMatrix } from "$model/timetable/time-table";
import { DayOfWeek } from "$model/timetable/day-of-week";
import { HourOfDay } from "$model/timetable/hour-of-day";


// Read the whole file and store the lines in this list
export const file_data = readCookieFile();

// Parse the prof and classes from the file readed above
const prof_data = getExistingProfessorFromFile(file_data);
const class_data = getExistingClassroomsFromFile(file_data);

export const allProfessors = writable(prof_data);
export const allClassrooms = writable(class_data);
export const allSubjects = writable(getExistingSubjectsFromFile(file_data, prof_data, class_data));
export const allHoursOfDay = writable(getExistingHoursOfDayFromFile(file_data));
export const allDaysOfWeek = writable(getExistingDaysOfWeekFromFile(file_data));

export const timetable_file_data = readCookieFileTimetable();
let timetableData = getCompleteTimetableFromFile(timetable_file_data, get(allSubjects), get(allDaysOfWeek).length, get(allHoursOfDay).length);

export const classTimeTableMap = writable(timetableData[0]);
export const professorTimeTableMap = writable(timetableData[1]);

updateTimetablesMatrix(get(classTimeTableMap), get(professorTimeTableMap));

setUpdateClassroomsCallback((allTimetables) => classTimeTableMap.set(allTimetables))
setUpdateProfessorsCallback((allTimetables) => professorTimeTableMap.set(allTimetables))

setupCloneDaysOfWeekHoursOfDay(allDaysOfWeek, allHoursOfDay);


export const theme = writable<"light" | "dark" | "auto">("auto");
export const editingId = writable<string | null>(null);

export let controller: any
export let signal: any

function parseSolverResponse(response: string[]) {
    let timetables = generateTimetablesFromAspFile(response, get(allSubjects))
 
    classTimeTableMap.set(timetables.classTimetables);
    professorTimeTableMap.set(timetables.profTimetables);
}

export function askSolverForTimetable() {
    const subjectsFacts = get(allSubjects).map((e) => e.toAspFact());
    const unavailabilityFacts: string[] = [];

    let classTimetables = get(classTimeTableMap);
    for(var classId of classTimetables.keys()) {
        unavailabilityFacts.push(...classTimetables.get(classId)!.getAspUnavailability(EntityType.Classroom, classId));
    }

    let profTimetables = get(professorTimeTableMap);
    for(var profId of profTimetables.keys()) {
        unavailabilityFacts.push(...profTimetables.get(profId)!.getAspUnavailability(EntityType.Professor, profId));
    }

    const existingAssignments = [];
    for(var classTT of classTimetables.values()) {
        existingAssignments.push(...classTT.getAspSubjectsAssignments());
    }

    const hoursOfDayFact = `hours_per_day(${get(allHoursOfDay).length})`;
    const daysPerWeekFacts = `days_per_week(${get(allDaysOfWeek).length})`;

    const factsArray = [hoursOfDayFact, daysPerWeekFacts, ...subjectsFacts, ...unavailabilityFacts, ...existingAssignments];
    const factString = factsArray.join(".\n") + ".";

    //console.log(factString);

    controller = new AbortController()
    signal = controller.signal
    
    const options = {
        method: "POST",
        headers: {
            'Content-Type': 'text/plain'
        },
        signal,
        body: factString
    }
    

    //@ts-ignore
    fetch("http://localhost:8000/solve", options)
        .then((resp) => {
            resp.json().then(content => {
                const answersetList: string[][] = content;
                console.log(answersetList)
                parseSolverResponse(answersetList[0])
            })
        })
        .catch(error => {
            if (error.name === 'AbortError') {
            console.log('Fetch interrotta: ', error);
            } else {
            console.error('Si è verificato un errore durante il fetch:', error);
            }
        });
    
    
}

/* ----------------- THIS PART BELOW CONTAINS THE METHOD TO ACCESS THE STORAGE ------------------ */



type AcceptedTypes = Professor | SchoolClass | Subject;

function getCorrectList(item: AcceptedTypes) {
    if(item instanceof Professor) {
        return allProfessors;
    }
    else if(item instanceof SchoolClass) {
        return allClassrooms;
    }
    else if(item instanceof Subject) {
        return allSubjects;
    }
    else {
        throw new Error("Invalid type");
    }
}

/**
 * Insert a new Professor | Subject | Classroom inside the storage, or replace an existing one
 * 
 * @param {AcceptedTypes} item - The object to be inserted
 * @param {number} index - If it is specified, then the ibject will replace whatever is inserted at [index] position
 */
export function saveObjectToStorage(item: AcceptedTypes, index?: number) {

    let generic_store = getCorrectList(item)!; 
    // @ts-ignore
    let generic_data = get(generic_store);

    if(index === undefined) {
        // @ts-ignore 
        generic_store.set([...generic_data, item]);
    }
    else {
        // @ts-ignore
        generic_data[index] = item
        // @ts-ignore
        generic_store.set(generic_data);
    }
}

/**
 * Removes the specified Subject from the storage. The selection is based on the item id
 * 
 * @param {Subject} subject 
 */
export function removeSubjectFromStorage(subject: Subject) {
    allSubjects.set(get(allSubjects).filter((sub) => sub.id !== subject.id));
    removeAllOf(subject);
}

/**
 * Attempts to remove a Professor from the storage.
 * 
 * @param {Professor} prof - The prof to be removed
 *  
 * @returns {boolean} Whether the prof can actually be removed or not.
 * 
 *  return false -> there is a dependency and the prof cannot be removed
 */
export function removeProfessorFromStorage(prof: Professor): boolean {
    try {
        get(allSubjects).filter((sub) => sub.professor.id === prof.id).forEach((sub) => removeSubjectFromStorage(sub));
    
        allProfessors.set(get(allProfessors).filter((item) => item.id !== prof.id));
        removeProfessor(prof);
        return true;
    }
    catch(e) {
        return false;
    }
}

/**
 * Attempts to remove a SchoolClass from the storage.
 * 
 * @param {SchoolClass} classroom - The class to be removed
 *  
 * @returns {boolean} Whether the prof can actually be removed or not.
 * 
 *  return false -> there is a dependency and the prof cannot be removed
 */
export function removeSchoolClassFromStorage(classroom: SchoolClass): boolean {
    try {
        get(allSubjects).filter((sub) => sub.schoolClass.id === classroom.id).forEach((sub) => removeSubjectFromStorage(sub));
    
        allClassrooms.set(get(allClassrooms).filter((item) => item.id !== classroom.id));
        removeSchoolClass(classroom);
        return true;
    }
    catch(e) {
        return false;
    }
}

/**
 * Removes all the professors and subjects from the storage
 */
export function removeAllProfessorsFromStorage() {
    allProfessors.set([]);
    allSubjects.set([]);
}

/**
 * Removes all the classes and subjects from the storage
 */
export function removeAllClassesFromStorage() {
    allClassrooms.set([]);
    allSubjects.set([]);
}

/**
 * Removes all the subjects from the storage
 */
export function removeAllSubjectsFromStorage() {
    allSubjects.set([]);
}


export function getAllDaysOfWeek() {
    try {
        return get(allDaysOfWeek);
    } catch {
        return [
            new DayOfWeek(0, "Monday"),
            new DayOfWeek(1, "Tuesday"),
            new DayOfWeek(2, "Wednesday"),
            new DayOfWeek(3, "Thursday"),
            new DayOfWeek(4, "Friday"),
            new DayOfWeek(5, "Saturday"),
        ]
    }
}

export function getAllHoursOfDay() {
    try {
        return get(allHoursOfDay);
    } catch {
        return [
            new HourOfDay(0, "08:00"),
            new HourOfDay(1, "09:00"),
            new HourOfDay(2, "10:00"),
            new HourOfDay(3, "11:00"),
            new HourOfDay(4, "12:00"),
            new HourOfDay(5, "13:00"),
            new HourOfDay(6, "14:00")
        ]
    }
}
