import { Professor } from "$model/professor/professor";
import { SchoolClass } from "$model/school-class/school-class";
import { Subject } from "$model/subject/subject";
import { DayOfWeek } from "$model/timetable/day-of-week";
import { HourOfDay } from "$model/timetable/hour-of-day";

export function getExistingProfessorFromFile(file_data: string[]) {
    let professors: Professor[] = []
    file_data.forEach(line => {
        if (line.substring(0, 2) === "P:") {
            professors.push(Professor.ofCsv(line))
        }
    });

    return professors;
}


export function getExistingClassroomsFromFile(file_data: string[]) {
    let classes: SchoolClass[] = []
    file_data.forEach(line => {
        if (line.substring(0, 2) === "C:") {
            classes.push(SchoolClass.ofCsv(line))
        }
    });

    return classes;
}

export function getExistingSubjectsFromFile(file_data: string[], existing_prof: Professor[], existing_class: SchoolClass[]) {
    let subjects: Subject[] = []
    file_data.forEach(line => {
        if (line.substring(0, 2) === "S:") {
            subjects.push(Subject.ofCsv(line, existing_prof, existing_class))
        }
    });

    return subjects;
}

export function getExistingHoursOfDayFromFile(file_data: string[]) {
    let hoursOfDay: HourOfDay[] = [];
    file_data.forEach(line => {
        if (line.substring(0, 2) === "H:") {
            hoursOfDay.push(HourOfDay.ofCsv(line))
        }
    })

    return hoursOfDay;
}


export function getExistingDaysOfWeekFromFile(file_data: string[]) {
    let daysOfWeek: DayOfWeek[] = [];
    file_data.forEach(line => {
        if (line.substring(0, 2) === "D:") {
            daysOfWeek.push(DayOfWeek.ofCsv(line))
        }
    })

    return daysOfWeek;
}
