import { getClassroomTimetablesFromFile } from "$lib/stores/utils/cookie_file_parser";
import { generateCookieTimetableFile } from "$lib/stores/utils/cookie_file_writer";
import { Professor } from "$model/professor/professor";
import { SchoolClass } from "$model/school-class/school-class";
import { Subject } from "$model/subject/subject";
import { TimeTable } from "$model/timetable/time-table";
import { Unavailable } from "$model/timetable/unavailable";
import { time } from "console";

let professors = [
    Professor.of("prof-1", "Mario", "Rossi", "a@mail.com", "111222333"),
    Professor.of("prof-2", "Luigi", "Verdi", "b@mail.com", "122222333"),
]

let classrooms = [
    SchoolClass.of("class-1", 1, "A"),
    SchoolClass.of("class-2", 2, "A")
]

let subjects = [
    Subject.of("subj-1", classrooms[0], professors[0], "Matematica", "MAT", 5, 2),
    Subject.of("subj-2", classrooms[0], professors[1], "Italiano", "ITA", 5, 2),

    Subject.of("subj-3", classrooms[1], professors[0], "Matematica", "MAT", 5, 2),
    Subject.of("subj-4", classrooms[1], professors[1], "Italiano", "MAT", 5, 2),
]


test("Test matrix to csv succeed", () => {
    let classTimetable: Map<string, TimeTable> = new Map();

    // 2x3 matrix for each timetable
    classTimetable.set("class-1", new TimeTable(3, 2));
    classTimetable.set("class-2", new TimeTable(3, 2));

    // -------- Compongo l'orario per la prima classe ---------------- 
    // Risultato prima classe
    //               LUN             MAR                  MER
    //
    // 1 ora   subj-1;prof-1      subj-2;prof-2        unavailable
    // 
    // 2 ora   subj-1;prof-1      unavailable         subj-2;prof-2
    //

    classTimetable.get("class-1")?.setSubjectOn(0, 0, subjects[0]);
    classTimetable.get("class-1")?.setSubjectOn(0, 1, subjects[0]);

    classTimetable.get("class-1")?.setSubjectOn(1, 0, subjects[1]);
    classTimetable.get("class-1")?.setSubjectOn(1, 1, new Unavailable());
    
    classTimetable.get("class-1")?.setSubjectOn(2, 0, new Unavailable());
    classTimetable.get("class-1")?.setSubjectOn(2, 1, subjects[1]);


    // -------- Compongo l'orario per la seconda classe ---------------- 
    // Risultato prima classe
    //               LUN             MAR                MER
    //
    // 1 ora   subj-3;prof-1      subj-4;prof-2         null
    // 
    // 2 ora   subj-3;prof-1      subj-4;prof-2         null
    //

    classTimetable.get("class-2")?.setSubjectOn(0, 0, subjects[2]);
    classTimetable.get("class-2")?.setSubjectOn(0, 1, subjects[2]);

    classTimetable.get("class-2")?.setSubjectOn(1, 0, subjects[3]);
    classTimetable.get("class-2")?.setSubjectOn(1, 1, subjects[3]);

    let expected_result = 
        "SM:class-1;subj-1;0:0;0:1\n"      +
        "SM:class-1;subj-2;1:0;2:1\n"      +
        "SM:class-1;unavailable;1:1;2:0\n" +
        "SM:class-2;subj-3;0:0;0:1\n"      +
        "SM:class-2;subj-4;1:0;1:1";

    let computed_result = generateCookieTimetableFile(classTimetable);

    //console.log(computed_result);
    
    expect(computed_result).toEqual(expected_result);
})


test("Test csv to matrix succeed", () => {
    let timetable_csv = [
        "SM:class-1;subj-1;0:0;0:1",    
        "SM:class-1;subj-2;1:0;2:1",      
        "SM:class-1;unavailable;1:1;2:0",
        "SM:class-2;subj-3;0:0;0:1", 
        "SM:class-2;subj-4;1:0;1:1"
    ];


    let expectedTimetable: Map<string, TimeTable> = new Map();

    // 2x2 matrix for each timetable
    expectedTimetable.set("class-1", new TimeTable(3, 2));
    expectedTimetable.set("class-2", new TimeTable(3, 2));


    expectedTimetable.get("class-1")?.setSubjectOn(0, 0, subjects[0]);
    expectedTimetable.get("class-1")?.setSubjectOn(0, 1, subjects[0]);

    expectedTimetable.get("class-1")?.setSubjectOn(1, 0, subjects[1]);
    expectedTimetable.get("class-1")?.setSubjectOn(1, 1, new Unavailable());

    expectedTimetable.get("class-1")?.setSubjectOn(2, 0, new Unavailable());
    expectedTimetable.get("class-1")?.setSubjectOn(2, 1, subjects[1]);



    expectedTimetable.get("class-2")?.setSubjectOn(0, 0, subjects[2]);
    expectedTimetable.get("class-2")?.setSubjectOn(0, 1, subjects[2]);

    expectedTimetable.get("class-2")?.setSubjectOn(1, 0, subjects[3]);
    expectedTimetable.get("class-2")?.setSubjectOn(1, 1, subjects[3]);


    let computed_result = getClassroomTimetablesFromFile(timetable_csv, subjects, 3, 2);

    require('util').inspect.defaultOptions.depth = null;
    /*console.log("-------- Expected ------")
    console.log(expectedTimetable);
    console.log("-------- Actual ----------");
    console.log(computed_result);*/
    
    expect(computed_result).toEqual(expectedTimetable);
})