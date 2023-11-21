import { getExistingClassroomsFromFile, getExistingProfessorFromFile, getExistingSubjectsFromFile } from "$lib/utils/cookie_file_reader";
import { generateCookieFile } from "$lib/utils/cookie_file_writer";
import { Professor } from "$model/professor/professor";
import { SchoolClass } from "$model/school-class/school-class";
import { Subject } from "$model/subject/subject";

test("read-file-successfull-test", () => {
    let file_str = [
        "P:prof-1;Mario oiram;Rossi;test@mail.com;+393331122444",
        "P:prof-2;Mario oiram ross;De Rossi;test.mail@mail.com;3331122444",
        "C:class-1;5;A;Inf",
        "C:class-2;1;Z;",
        "S:subj-1;class-1;prof-1;Matematica;MAT;5;20",
        "S:subj-2;class-1;prof-2;Italiano;ITA;6;18",
    ]

    let professors = getExistingProfessorFromFile(file_str);
    let classrooms = getExistingClassroomsFromFile(file_str);
    let subjects = getExistingSubjectsFromFile(file_str, professors, classrooms);

    let expected_prof = [
        Professor.of("prof-1", "Mario oiram", "Rossi", "test@mail.com", "+393331122444"),
        Professor.of("prof-2", "Mario oiram ross", "De Rossi", "test.mail@mail.com", "3331122444"),
    ];

    let expected_class = [
        SchoolClass.of("class-1", 5, "A", "Inf"),
        SchoolClass.of("class-2", 1, "Z")
    ]

    let expected_subjects = [
        Subject.of("subj-1", expected_class[0], expected_prof[0], "Matematica", "MAT", 5, 20),
        Subject.of("subj-2", expected_class[0], expected_prof[1], "Italiano", "ITA", 6, 18),
    ];

    expect(professors).toEqual(expected_prof);
    expect(classrooms).toEqual(expected_class);
    expect(subjects).toEqual(expected_subjects);
})

test("read-file-unsuccessfull-test", () => {

})

test("write-file-test", () => {
    let expected_file_str = 
        "P:prof-1;Mario oiram;Rossi;test@mail.com;+393331122444\n" +
        "P:prof-2;Mario oiram ross;De Rossi;test.mail@mail.com;3331122444\n" +
        "C:class-1;5;A;Inf\n" +
        "C:class-2;1;Z;\n" + 
        "S:subj-1;class-1;prof-1;Matematica;MAT;5;20\n" +
        "S:subj-2;class-1;prof-2;Italiano;ITA;6;18";
    

    let professors = [
        Professor.of("prof-1", "Mario oiram", "Rossi", "test@mail.com", "+393331122444"),
        Professor.of("prof-2", "Mario oiram ross", "De Rossi", "test.mail@mail.com", "3331122444"),
    ];

    let classes = [
        SchoolClass.of("class-1", 5, "A", "Inf"),
        SchoolClass.of("class-2", 1, "Z")
    ]

    let subjects = [
        Subject.of("subj-1", classes[0], professors[0], "Matematica", "MAT", 5, 20),
        Subject.of("subj-2", classes[0], professors[1], "Italiano", "ITA", 6, 18),
    ];

    let generated_file = generateCookieFile(professors, classes, subjects, false);

    expect(generated_file).toEqual(expected_file_str);
})