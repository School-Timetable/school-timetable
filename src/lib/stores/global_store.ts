import { getExistingClassroomsFromFile, getExistingDaysOfWeekFromFile, getExistingHoursOfDayFromFile, getExistingProfessorFromFile, getExistingSubjectsFromFile, readCookieFile } from "$lib/stores/utils/cookie_file_reader";
import type { Professor } from "$model/professor/professor";
import type { SchoolClass } from "$model/school-class/school-class";
import type { Subject } from "$model/subject/subject";
import { get, writable } from "svelte/store";

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

export const theme = writable<"light" | "dark" | "auto">("auto");
export const editingId = writable<string | null>(null);


/* ----------------- THIS PART BELOW CONTAINS THE METHOD TO ACCESS THE STORAGE ------------------ */



type AcceptedTypes = Professor | SchoolClass | Subject;

function getCorrectList(item: AcceptedTypes) {
    switch(item.constructor.name) {
        case 'Professor':
            return allProfessors;
        case 'SchoolClass':
            return allClassrooms;
        case 'Subject':
            return allSubjects;
    }
}

/**
 * Insert a new Professor inside the storage, or replace an existing one
 * 
 * @param {AcceptedTypes} item - The professor to be inserted
 * @param {number} index - If it is specified, then the professor will replace whatever is inserted at [index] position
 */
export function addObjectToStorage(item: AcceptedTypes, index?: number) {
    let generic_store = getCorrectList(item)!; 
    // @ts-ignore
    let generic_data = get(generic_store);

    console.log("Adding prof ", item, " with index ", index);

    if(index === undefined) {
        console.log("New add");
        // @ts-ignore 
        generic_store.set([...generic_data, item]);
    }
    else {
        console.log("edit");
        // @ts-ignore
        generic_data[index] = item
        // @ts-ignore
        generic_store.set(generic_data);
    }
}

/**
 * Removes the specified professor from the storage. The selection is based on the prof id
 * 
 * @param {Professor} prof 
 */
export function removeProfessorFromStorage(prof: Professor) {
    allProfessors.set(get(allProfessors).filter((item) => item.id !== prof.id));
}

/**
 * Removes all the professors and subjects from the storage
 */
export function removeAllProfessorsFromStorage() {
    allProfessors.set([]);
    allSubjects.set([]);
}

