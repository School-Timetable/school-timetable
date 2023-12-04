import type { Professor } from "$model/professor/professor";
import type { SchoolClass } from "$model/school-class/school-class";
import type { Subject } from "$model/subject/subject";
import type { DayOfWeek } from "$model/timetable/day-of-week";
import type { HourOfDay } from "$model/timetable/hour-of-day";
import type { TimeTable } from "$model/timetable/time-table";

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


export function generateCookieTimetableFile(classTimetableMap: Map<string, TimeTable>, base64: boolean = false): string {
    let line_str = [];

    let keys = classTimetableMap.keys();
    // For each class in the map, check the timetable
    for(var classId of keys) {
        // Get the subjectsMap for each class
        let subjectsMap = classTimetableMap.get(classId)?.computeSubjectMap();

        // For each subject, write a line containing all the timeslots where it have been put
        for(var subjectId of subjectsMap!.keys()) {
            let line = `SM:${classId};${subjectId}`;

            for(var timeslot of subjectsMap!.get(subjectId)!) {
                line = line + `;${timeslot.dayOfWeek}:${timeslot.timeOfDay}`
            }

            line_str.push(line);
        }
    }

    return base64 ? btoa(line_str.join("\n")) : line_str.join("\n");
}

export function generateCookieProfessorsConstraintFile(professorTimetableMap: Map<string, TimeTable>, base64: boolean = false): string {
    let allProfIds = professorTimetableMap.keys();
    let lineStr = []

    for(var profId of allProfIds) {
        let timeslots = professorTimetableMap.get(profId)!.getUnavailableTimeslots();
        let line = `SC:${profId}`;

        for(var timeslot of timeslots) {
            line = line + `;${timeslot.dayOfWeek}:${timeslot.timeOfDay}`;
        }

        lineStr.push(line);
    }

    return base64 ? btoa(lineStr.join("\n")) : lineStr.join("\n");
}

export function generateCompleteTimetableFile(classTimetableMap: Map<string, TimeTable>, profTimetableFile: Map<string, TimeTable>, base64: boolean = false) {
    let complete_str = generateCookieTimetableFile(classTimetableMap) + "\n"+ generateCookieProfessorsConstraintFile(profTimetableFile);

    return base64 ? btoa(complete_str) : complete_str;
}