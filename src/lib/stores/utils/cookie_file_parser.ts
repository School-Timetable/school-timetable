import { Professor } from "$model/professor/professor";
import { SchoolClass } from "$model/school-class/school-class";
import { Subject } from "$model/subject/subject";
import { DayOfWeek } from "$model/timetable/day-of-week";
import { HourOfDay } from "$model/timetable/hour-of-day";
import { TimeTable } from "$model/timetable/time-table";
import { Unavailable } from "$model/timetable/unavailable";


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

    // if the file is empty, then we set the default hours of day
    if(hoursOfDay.length === 0) {
        hoursOfDay = [
            HourOfDay.of(0, "1"),
            HourOfDay.of(1, "2"),
            HourOfDay.of(2, "3"),
            HourOfDay.of(3, "4"),
            HourOfDay.of(4, "5"),
            HourOfDay.of(5, "6"),
            HourOfDay.of(6, "7")
        ]
    }

    return hoursOfDay;
}


export function getExistingDaysOfWeekFromFile(file_data: string[]) {
    let daysOfWeek: DayOfWeek[] = [];
    file_data.forEach(line => {
        if (line.substring(0, 2) === "D:") {
            daysOfWeek.push(DayOfWeek.ofCsv(line))
        }
    })

    // if the file is empty, then we set the default days of week
    if(daysOfWeek.length === 0) {
        daysOfWeek = [
            DayOfWeek.of(0, "Monday"),
            DayOfWeek.of(1, "Tuesday"),
            DayOfWeek.of(2, "Wednesday"),
            DayOfWeek.of(3, "Thursday"),
            DayOfWeek.of(4, "Friday"),
            DayOfWeek.of(5, "Saturday")
        ]
    }
    return daysOfWeek;
}

export function getClassroomTimetablesFromFile(
    file_data: string[], 
    allSubjects: Subject[], 
    daysOfWeek: number, 
    hoursOfDay: number
): Map<string, TimeTable> {
    let allClassesTimetable = new Map<string, TimeTable>();

    file_data.forEach((line) => {
        let matcher = line.match(/^SM:([A-Za-z0-9\-]+);([A-Za-z0-9\-]+);([\d:;]+)$/);
        if(matcher != null) {
            let classId = matcher[1];
            let subjectId = matcher[2];
            let timeslotsSplitted = matcher[3].split(";");

            let subject: Subject | Unavailable;

            if(subjectId === Unavailable.static_id) {
                subject = new Unavailable();
            } else { 
                subject = allSubjects.find((subject) => subject.id === subjectId)!;
            }

            if(allClassesTimetable.get(classId) === undefined)
                allClassesTimetable.set(classId, new TimeTable(daysOfWeek, hoursOfDay));

            for(var timeslot of timeslotsSplitted) {
                console.log(timeslot);
                let timeslotData = timeslot.split(":");
                allClassesTimetable.get(classId)!.setSubjectOn(Number(timeslotData[0]), Number(timeslotData[1]), subject);

            }
        }
    });

    return allClassesTimetable;
}
