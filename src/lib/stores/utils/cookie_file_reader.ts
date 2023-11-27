import { browser } from "$app/environment";

/**
 * Read the cookie file saved inside the browser local storage
 * @returns The list of lines inside the file
 */
export function readCookieFile(): string[] {
    if (!browser) {
        return [];
    }

    let all_lines = (atob(localStorage.getItem("data.tdf") || "")).split("\n");
    return all_lines;
}

/**
 * Read the cookie file that contains the timetable saved inside the browser local storage
 * @returns The list of lines inside the file
 */
export function readCookieFileTimetable(): string[] {
    if (!browser) {
        return [];
    }

    let all_lines = (atob(localStorage.getItem("timetable.tdf") || "")).split("\n");
    return all_lines;
}