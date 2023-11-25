
import { Professor } from "./professor/professor";
import { SchoolClass } from "./school-class/school-class";
import { Subject } from "./subject/subject";



const _classTimetableMap: Map<string, TimeTable> = new Map();
const _professorTimetableMap: Map<string, TimeTable> = new Map();

export const classTimetableMap: ReadonlyMap<string, TimeTable> = _classTimetableMap;
export const professorTimetableMap: ReadonlyMap<string, TimeTable> = _professorTimetableMap;

export class TimeTable {
    // first list is day of week, second is time of day
    // null means no subject
    values: (Subject | null)[][] = [];

    constructor(daysPerWeek: number, hoursPerDay: number) {
        for (let i = 0; i < daysPerWeek; i++) {
            this.values.push([]);
            for (let j = 0; j < hoursPerDay; j++) {
                this.values[i].push(null);
            }
        }
    }

}

// TODO: remove
export const daysPerWeek = 6;
export const hoursPerDay = 8;

const mockClass = SchoolClass.of("class-mock", 1, "A");
const mockProfessor = Professor.of("professor-mock", "mock", "mock", "fake@ema.il", "0000000000");

const unavailableSubject = Subject.of("unavailable", mockClass, mockProfessor, "unavailable", "X", 1, 10);


export function setSubject(subject: Subject, dayOfWeek: number, timeOfDay: number) {
    console.log("setting subject", subject, "on", dayOfWeek, timeOfDay);


    let classID = subject.schoolClass.id
    if (!_classTimetableMap.has(classID)) {
        console.log("creating new timetable for class", classID);
        _classTimetableMap.set(classID, new TimeTable(daysPerWeek, hoursPerDay));
    }

    const c_timeTable = _classTimetableMap.get(classID)!.values;

    if (c_timeTable[dayOfWeek][timeOfDay] != null) {
        removeSubject(c_timeTable[dayOfWeek][timeOfDay]!, dayOfWeek, timeOfDay);
    }
    c_timeTable[dayOfWeek][timeOfDay] = subject;

    let professorID = subject.professor.id
    if (!_professorTimetableMap.has(professorID)) {
        console.log("creating new timetable for professor", professorID);
        _professorTimetableMap.set(professorID, new TimeTable(daysPerWeek, hoursPerDay));
    }

    const p_timeTable = _professorTimetableMap.get(professorID)!.values;


    if (p_timeTable[dayOfWeek][timeOfDay] != null) {
        removeSubject(p_timeTable[dayOfWeek][timeOfDay]!, dayOfWeek, timeOfDay);
    }


    _professorTimetableMap.get(professorID)!.values[dayOfWeek][timeOfDay] = subject;
}

export function removeSubject(subject: Subject, dayOfWeek: number, timeOfDay: number) {
    console.log("removing subject", subject, "from", dayOfWeek, timeOfDay);

    let classID = subject.schoolClass.id
    if (_classTimetableMap.has(classID)) {
        _classTimetableMap.get(classID)!.values[dayOfWeek][timeOfDay] = null;
    }

    let professorID = subject.professor.id
    if (_professorTimetableMap.has(professorID)) {
        _professorTimetableMap.get(professorID)!.values[dayOfWeek][timeOfDay] = null;
    }
}



export function setUnavailable(dayOfWeek: number, timeOfDay: number, entity: SchoolClass | Professor, remove: boolean = false) {
    if (entity instanceof SchoolClass) {
        let classID = entity.id
        if (!_classTimetableMap.has(classID)) {
            _classTimetableMap.set(classID, new TimeTable(daysPerWeek, hoursPerDay));
        }

        if (remove && _classTimetableMap.get(classID)!.values[dayOfWeek][timeOfDay] != unavailableSubject) {
            throw new Error("Trying to remove a subject using 'setUnavailable' method");
        }

        _classTimetableMap.get(classID)!.values[dayOfWeek][timeOfDay] = remove ? null : unavailableSubject;
    }
    else if (entity instanceof Professor) {
        let professorID = entity.id
        if (!_professorTimetableMap.has(professorID)) {
            _professorTimetableMap.set(professorID, new TimeTable(daysPerWeek, hoursPerDay));
        }

        if (remove && _professorTimetableMap.get(professorID)!.values[dayOfWeek][timeOfDay] != unavailableSubject) {
            throw new Error("Trying to remove a subject using 'setUnavailable' method");
        }

        _professorTimetableMap.get(professorID)!.values[dayOfWeek][timeOfDay] = remove ? null : unavailableSubject;
    }
    else {
        throw new Error("what is not a SchoolClass or a Professor");
    }
}



// TODO: TEST THIS SHIT
