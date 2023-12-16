import {  getCompleteTimetableFromFile } from "$lib/stores/utils/cookie_file_parser";
import { generateCompleteTimetableFile, generateCookieProfessorsConstraintFile, generateCookieTimetableFile } from "$lib/stores/utils/cookie_file_writer";
import { Professor } from "$model/professor/professor";
import { SchoolClass } from "$model/school-class/school-class";
import { Subject } from "$model/subject/subject";
import { TimeTable, setSubject, setUnavailable } from "$model/timetable/time-table";
import { Unavailable } from "$model/timetable/unavailable";


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
        "SM:class-2;subj-4;0:0;0:1", 
        "SM:class-2;subj-3;1:0;1:1"
    ];


    let expectedTimetable: Map<string, TimeTable> = new Map();

    // 3x2 matrix for each timetable
    expectedTimetable.set("class-1", new TimeTable(3, 2));
    expectedTimetable.set("class-2", new TimeTable(3, 2));


    expectedTimetable.get("class-1")?.setSubjectOn(0, 0, subjects[0]);
    expectedTimetable.get("class-1")?.setSubjectOn(0, 1, subjects[0]);

    expectedTimetable.get("class-1")?.setSubjectOn(1, 0, subjects[1]);
    expectedTimetable.get("class-1")?.setSubjectOn(1, 1, new Unavailable());

    expectedTimetable.get("class-1")?.setSubjectOn(2, 0, new Unavailable());
    expectedTimetable.get("class-1")?.setSubjectOn(2, 1, subjects[1]);



    expectedTimetable.get("class-2")?.setSubjectOn(0, 0, subjects[3]);
    expectedTimetable.get("class-2")?.setSubjectOn(0, 1, subjects[3]);

    expectedTimetable.get("class-2")?.setSubjectOn(1, 0, subjects[2]);
    expectedTimetable.get("class-2")?.setSubjectOn(1, 1, subjects[2]);


    // require('util').inspect.defaultOptions.depth = 4;
    let computed_result = getCompleteTimetableFromFile(timetable_csv, subjects, 3, 2)[0];
    
    expect(computed_result).toEqual(expectedTimetable);
})

test("Test professor constraints to csv works", () => {
    let profTimetable: Map<string, TimeTable> = new Map();

    profTimetable.set("prof-1", new TimeTable(2,2));
    profTimetable.set("prof-2", new TimeTable(2,2));

    profTimetable.get("prof-1")?.setSubjectOn(0, 0, subjects[0]);
    profTimetable.get("prof-1")?.setSubjectOn(0, 1, new Unavailable());
    profTimetable.get("prof-1")?.setSubjectOn(1, 1, new Unavailable());


    profTimetable.get("prof-2")?.setSubjectOn(0, 0, new Unavailable());
    profTimetable.get("prof-2")?.setSubjectOn(0, 1, subjects[1]);
    profTimetable.get("prof-2")?.setSubjectOn(1, 1, new Unavailable());


    let expected_result = 
        "SC:prof-1;0:1;1:1\n" +
        "SC:prof-2;0:0;1:1";

    let computed_result = generateCookieProfessorsConstraintFile(profTimetable);

    expect(computed_result).toEqual(expected_result);

})


test("Test complete csv generation works", () => {
    let classTimetable: Map<string, TimeTable> = new Map();
    let profTimetable: Map<string, TimeTable> = new Map();

    // 2x2 matrix for each timetable
    classTimetable.set("class-1", new TimeTable(2, 2));
    classTimetable.set("class-2", new TimeTable(2, 2));

    profTimetable.set("prof-1", new TimeTable(2, 2));
    profTimetable.set("prof-2", new TimeTable(2, 2));

    // prof-1  0,0  0,1
    // prof-2  1,0  1,1 

    setSubject    (0, 0, subjects[0], classTimetable.get("class-1")!, profTimetable.get("prof-1")!);
    setUnavailable(0, 1, classrooms[0], false, classTimetable.get("class-1")!);
    
    setSubject    (1, 0, subjects[1], classTimetable.get("class-1")!, profTimetable.get("prof-2")!);
    setUnavailable(1, 1, classrooms[0], false, classTimetable.get("class-1")!);

  
    setUnavailable(0, 0, classrooms[1], false, classTimetable.get("class-2")!);
    setSubject    (0, 1, subjects[2], classTimetable.get("class-2")!, profTimetable.get("prof-1")!);

    setUnavailable(1, 0, classrooms[1], false, classTimetable.get("class-2")!);
    setSubject    (1, 1, subjects[3], classTimetable.get("class-2")!, profTimetable.get("prof-2")!);



    setUnavailable(1, 0, professors[0], false, profTimetable.get("prof-1")!);
    setUnavailable(0, 0, professors[1], false, profTimetable.get("prof-2")!);


    let expected_result = 
        "SM:class-1;subj-1;0:0\n"          +
        "SM:class-1;unavailable;0:1;1:1\n" +
        "SM:class-1;subj-2;1:0\n"          +
        "SM:class-2;unavailable;0:0;1:0\n" +
        "SM:class-2;subj-3;0:1\n"      +
        "SM:class-2;subj-4;1:1\n"      +
        "SC:prof-1;1:0\n"              +
        "SC:prof-2;0:0";


    let computed_result = generateCompleteTimetableFile(classTimetable, profTimetable);
    expect(computed_result).toEqual(expected_result);
})


test("Test complete timetable from csv read works", () => {
    let csv = [
        "SM:class-1;subj-1;0:0",
        "SM:class-1;unavailable;0:1;1:1",
        "SM:class-1;subj-2;1:0",
        "SM:class-2;unavailable;0:0;1:0",
        "SM:class-2;subj-3;0:1",
        "SM:class-2;subj-4;1:1", 
        "SC:prof-1;1:0",
        "SC:prof-2;0:0"
    ]


    let classTimetable: Map<string, TimeTable> = new Map();
    let profTimetable: Map<string, TimeTable> = new Map();

    // 2x2 matrix for each timetable
    classTimetable.set("class-1", new TimeTable(2, 2));
    classTimetable.set("class-2", new TimeTable(2, 2));

    profTimetable.set("prof-1", new TimeTable(2, 2));
    profTimetable.set("prof-2", new TimeTable(2, 2));

    // prof-1  0,0  0,1
    // prof-2  1,0  1,1 

    setSubject    (0, 0, subjects[0], classTimetable.get("class-1")!, profTimetable.get("prof-1")!);
    setUnavailable(0, 1, classrooms[0], false, classTimetable.get("class-1")!);
    
    setSubject    (1, 0, subjects[1], classTimetable.get("class-1")!, profTimetable.get("prof-2")!);
    setUnavailable(1, 1, classrooms[0], false, classTimetable.get("class-1")!);

  
    setUnavailable(0, 0, classrooms[1], false, classTimetable.get("class-2")!);
    setSubject    (0, 1, subjects[2], classTimetable.get("class-2")!, profTimetable.get("prof-1")!);

    setUnavailable(1, 0, classrooms[1], false, classTimetable.get("class-2")!);
    setSubject    (1, 1, subjects[3], classTimetable.get("class-2")!, profTimetable.get("prof-2")!);



    setUnavailable(1, 0, professors[0], false, profTimetable.get("prof-1")!);
    setUnavailable(0, 0, professors[1], false, profTimetable.get("prof-2")!);


    let computed_result = getCompleteTimetableFromFile(csv, subjects, 2, 2);

    expect(computed_result[0]).toEqual(classTimetable);
    expect(computed_result[1]).toEqual(profTimetable);
})

