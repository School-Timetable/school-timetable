import type { Professor } from "$model/professor/professor";
import type { SchoolClass } from "$model/school-class/school-class";
import type { Subject } from "$model/subject/subject";
import type { DayOfWeek } from "$model/timetable/day-of-week";
import type { HourOfDay } from "$model/timetable/hour-of-day";

export function generateCookieFile(
    all_professor: Professor[], 
    all_classrooms: SchoolClass[], 
    all_subjects: Subject[], 
    all_hoursOfDay: HourOfDay[],
    all_daysOfWeek: DayOfWeek[],
    base64: boolean = true
) {
    let global_lines: string[] = [];

    all_professor.map((e) => e.toCsv()).forEach(element => {
        global_lines.push(element);
    });

    all_classrooms.map((e) => e.toCsv()).forEach(element => {
        global_lines.push(element);
    });

    all_subjects.map((e) => e.toCsv()).forEach(element => {
        global_lines.push(element);
    });

    all_hoursOfDay.map((e) => e.toCsv()).forEach(element => {
        global_lines.push(element);
    })

    all_daysOfWeek.map((e) => e.toCsv()).forEach(element => {
        global_lines.push(element);
    })

    const file_str = global_lines.join("\n");

    return base64 ? btoa(file_str) : file_str;
}