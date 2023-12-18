import { Professor } from "$model/professor/professor"
import { SchoolClass } from "$model/school-class/school-class"
import { Subject } from "$model/subject/subject"
import { EntityType, TimeTable, generateTimetablesFromAspFile, setSubject, setUnavailable } from "$model/timetable/time-table"


let professors = [
    Professor.of("prof-0", "Caro", "Amico", "tiscrivo@mail.com", "+3912345678"),
    Professor.of("prof-1", "Ai", "Caramba", "tiscrivo2@mail.com", "+3912345678"),
]

let classes = [
    SchoolClass.of("class-0", 1, "A"),
    SchoolClass.of("class-1", 2, "A")
]

let subjects = [
    Subject.of("subj-00", classes[0], professors[0], "Matematica", "MAT", 10, 20),
    Subject.of("subj-01", classes[0], professors[1], "Italiano", "ITA", 6, 16),
    Subject.of("subj-10", classes[1], professors[0], "Matematica", "MAT", 10, 20),
    Subject.of("subj-11", classes[1], professors[1], "Italiano", "ITA", 5, 10),
]

test("Subject conversion to asp works", () => {

    // subject(ID, ClassID, ProfID, Weight, HoursPerWeek).
    let expectedSubjects = [
        'subject("subj-00", "class-0", "prof-0", 10, 20)',
        'subject("subj-01", "class-0", "prof-1", 6, 16)',
        'subject("subj-10", "class-1", "prof-0", 10, 20)',
        'subject("subj-11", "class-1", "prof-1", 5, 10)'
    ]

    let computedSubjects = subjects.map((e) => e.toAspFact());

    expect(computedSubjects).toEqual(expectedSubjects)
})


test("Timetable to unavailability asp works", () => {
    let classTimetable: Map<string, TimeTable> = new Map();
    let profTimetable: Map<string, TimeTable> = new Map();

    // 2x2 matrix for each timetable
    classTimetable.set("class-0", new TimeTable(2, 2));
    classTimetable.set("class-1", new TimeTable(2, 2));

    profTimetable.set("prof-0", new TimeTable(2, 2));
    profTimetable.set("prof-1", new TimeTable(2, 2));

    // Class 1
    //    LUN        MAR
    //   subj-00   subj-01
    //     X          X

    setSubject    (0, 0, subjects[0], classTimetable.get("class-0")!, profTimetable.get("prof-0")!);
    setUnavailable(0, 1, classes[0], false, classTimetable.get("class-0")!);
    
    setSubject    (1, 0, subjects[1], classTimetable.get("class-0")!, profTimetable.get("prof-1")!);
    setUnavailable(1, 1, classes[0], false, classTimetable.get("class-0")!);

    // Class 2
    //    LUN        MAR
    //     X          X
    //  subj-10     subj-11
  
    setUnavailable(0, 0, classes[1], false, classTimetable.get("class-1")!);
    setSubject    (0, 1, subjects[2], classTimetable.get("class-1")!, profTimetable.get("prof-0")!);

    setUnavailable(1, 0, classes[1], false, classTimetable.get("class-1")!);
    setSubject    (1, 1, subjects[3], classTimetable.get("class-1")!, profTimetable.get("prof-1")!);


    setUnavailable(1, 0, professors[0], false, profTimetable.get("prof-0")!);
    setUnavailable(0, 0, professors[1], false, profTimetable.get("prof-1")!);

    let expected_result = [
        'unavailable_on("class", "class-0", 0, 1)',
        'unavailable_on("class", "class-0", 1, 1)',
        'unavailable_on("class", "class-1", 0, 0)',
        'unavailable_on("class", "class-1", 1, 0)',
        'unavailable_on("prof", "prof-0", 1, 0)',
        'unavailable_on("prof", "prof-1", 0, 0)',
    ]

    let computed_result = []
    for(var classId of classTimetable.keys()) {
        computed_result.push(...classTimetable.get(classId)!.getAspUnavailability(EntityType.Classroom, classId))
    }

    for(var profId of profTimetable.keys()) {
        computed_result.push(...profTimetable.get(profId)!.getAspUnavailability(EntityType.Professor, profId))
    }

    expect(computed_result).toEqual(expected_result)

})


test("Asp mapping to object works", () => {
    let mapping = [
        'assign("subj-00",0,0).',
        'assign("subj-00",0,1).',
        'assign("subj-01",1,0).',
        'assign("subj-01",1,1).',

        'assign("subj-11",0,0).',
        'assign("subj-11",0,1).',
        'assign("subj-10",1,0).',
        'assign("subj-10",1,1).',
    ]

    let classTimetable: Map<string, TimeTable> = new Map();
    let profTimetable: Map<string, TimeTable> = new Map();

    // 2x2 matrix for each timetable
    classTimetable.set("class-0", new TimeTable(2, 2));
    classTimetable.set("class-1", new TimeTable(2, 2));

    profTimetable.set("prof-0", new TimeTable(2, 2));
    profTimetable.set("prof-1", new TimeTable(2, 2));

    setSubject(0, 0, subjects[0], classTimetable.get("class-0")!, profTimetable.get("prof-0")!);
    setSubject(0, 1, subjects[0], classTimetable.get("class-0")!, profTimetable.get("prof-0")!);
    setSubject(1, 0, subjects[1], classTimetable.get("class-0")!, profTimetable.get("prof-1")!);
    setSubject(1, 1, subjects[1], classTimetable.get("class-0")!, profTimetable.get("prof-1")!);

    setSubject(0, 0, subjects[3], classTimetable.get("class-1")!, profTimetable.get("prof-1")!);
    setSubject(0, 1, subjects[3], classTimetable.get("class-1")!, profTimetable.get("prof-1")!);
    setSubject(1, 0, subjects[2], classTimetable.get("class-1")!, profTimetable.get("prof-0")!);
    setSubject(1, 1, subjects[2], classTimetable.get("class-1")!, profTimetable.get("prof-0")!);

    let computedTimetables = generateTimetablesFromAspFile(mapping, subjects, true);
    
    expect(computedTimetables.profTimetables).toEqual(profTimetable);
    expect(computedTimetables.classTimetables).toEqual(classTimetable);

})

test("Existing timetable to mapping works", () => {
    let classTimetable: Map<string, TimeTable> = new Map();
    let profTimetable: Map<string, TimeTable> = new Map();

    // 2x2 matrix for each timetable
    classTimetable.set("class-0", new TimeTable(2, 2));
    classTimetable.set("class-1", new TimeTable(2, 2));

    profTimetable.set("prof-0", new TimeTable(2, 2));
    profTimetable.set("prof-1", new TimeTable(2, 2));

    setSubject(0, 0, subjects[0], classTimetable.get("class-0")!, profTimetable.get("prof-0")!);
    setSubject(0, 1, subjects[0], classTimetable.get("class-0")!, profTimetable.get("prof-0")!);
    setSubject(1, 0, subjects[1], classTimetable.get("class-0")!, profTimetable.get("prof-1")!);
    setSubject(1, 1, subjects[1], classTimetable.get("class-0")!, profTimetable.get("prof-1")!);

    setSubject(0, 0, subjects[3], classTimetable.get("class-1")!, profTimetable.get("prof-1")!);
    setSubject(0, 1, subjects[3], classTimetable.get("class-1")!, profTimetable.get("prof-1")!);
    setSubject(1, 0, subjects[2], classTimetable.get("class-1")!, profTimetable.get("prof-0")!);
    setSubject(1, 1, subjects[2], classTimetable.get("class-1")!, profTimetable.get("prof-0")!);

    let expected = [
        'assigned("subj-00", 0, 0)',
        'assigned("subj-00", 0, 1)',
        'assigned("subj-01", 1, 0)',
        'assigned("subj-01", 1, 1)',

        'assigned("subj-11", 0, 0)',
        'assigned("subj-11", 0, 1)',
        'assigned("subj-10", 1, 0)',
        'assigned("subj-10", 1, 1)',
    ]

    let assignements = []
    for(var classTT of classTimetable.values()) {
        assignements.push(...classTT.getAspSubjectsAssignments());
    }

    expect(assignements).toEqual(expected);
})