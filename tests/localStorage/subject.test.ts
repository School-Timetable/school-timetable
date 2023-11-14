import { Professor } from "$model/professor/professor"
import { SchoolClass } from "$model/school-class/school-class"
import { Subject } from "$model/subject/subject"

const professors = [
    Professor.of("prof-1", "Marco", "Rossi", "marco.rossi@mail.com", "3332221110"),
    Professor.of("prof-2", "Francesca", "Verdi", "francesca.verdi@mail.com", "3334441110"),
]

const classes = [
    SchoolClass.of("class-1", 1, "A"),
    SchoolClass.of("class-2", 2, "A")
]

test("subject_to_csv_test", () => {
    let subjects = [
        Subject.of("subj-1", classes[0], professors[0], "Matematica", "MAT", 5, 20),
        Subject.of("subj-2", classes[0], professors[1], "Italiano", "ITA", 6, 18),
        Subject.of("subj-3", classes[1], professors[0], "Fisica quantistica per bambini", "FIS", 5, 20),
        Subject.of("subj-4", classes[1], professors[1], "Italiano per grezzi di paese", "ITAG", 10, 30),
    ]

    let expecteds = [
        "S:subj-1;class-1;prof-1;Matematica;MAT;5;20",
        "S:subj-2;class-1;prof-2;Italiano;ITA;6;18",
        "S:subj-3;class-2;prof-1;Fisica quantistica per bambini;FIS;5;20",
        "S:subj-4;class-2;prof-2;Italiano per grezzi di paese;ITAG;10;30"   
    ]

    subjects.forEach((e, idx) => {
        expect(e.toCsv()).toEqual(expecteds[idx]);
    })
})


test("csv_to_subject_test", () => {
    let subjects = [
        Subject.ofCsv("S:subj-1;class-1;prof-1;Matematica;MAT;5;20", professors, classes),
        Subject.ofCsv("S:subj-2;class-1;prof-2;Italiano;ITA;6;18", professors, classes),
        Subject.ofCsv("S:subj-3;class-2;prof-1;Fisica quantistica per bambini;FIS;5;20", professors, classes),
        Subject.ofCsv("S:subj-4;class-2;prof-2;Italiano per grezzi di paese;ITAG;10;30", professors, classes)  
    ]

    let expecteds = [
        Subject.of("subj-1", classes[0], professors[0], "Matematica", "MAT", 5, 20),
        Subject.of("subj-2", classes[0], professors[1], "Italiano", "ITA", 6, 18),
        Subject.of("subj-3", classes[1], professors[0], "Fisica quantistica per bambini", "FIS", 5, 20),
        Subject.of("subj-4", classes[1], professors[1], "Italiano per grezzi di paese", "ITAG", 10, 30), 
    ]

    subjects.forEach((e, idx) => {
        expect(e).toEqual(expecteds[idx]);
    })
})