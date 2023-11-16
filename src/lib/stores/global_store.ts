import { browser } from "$app/environment";
import { getExistingClassroomsFromFile, getExistingProfessorFromFile, getExistingSubjectsFromFile } from "$lib/utils/cookie_file_reader";
import { onDestroy } from "svelte";
import { writable } from "svelte/store";


function getExistingData(): string[] {
    if (!browser) {
        return [];
    }

    let all_lines = (atob(localStorage.getItem("data.tdf") || "")).split("\n");
    return all_lines;
}

export const file_data = getExistingData();

const prof_data = getExistingProfessorFromFile(file_data);
const class_data = getExistingClassroomsFromFile(file_data);

export const allProfessors = writable(prof_data);
export const allClassrooms = writable(class_data);
export const allSubjects = writable(getExistingSubjectsFromFile(file_data, prof_data, class_data));

export const theme = writable<"light" | "dark" | "auto">('auto');



